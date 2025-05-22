import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { createItem, editItem } from '../redux/itemsThunks';

function ItemForm({ isOpen, onClose, item }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector(state => state.auth);
  
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [nameError, setNameError] = useState('');
  const [costError, setCostError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when opening/closing or changing selected item
  useEffect(() => {
    if (isOpen) {
      if (item) {
        setName(item.name || '');
        setCost(item.cost || '');
      } else {
        setName('');
        setCost('');
      }
      setNameError('');
      setCostError('');
    }
  }, [isOpen, item]);

  const validateForm = () => {
    let isValid = true;
    
    // Validate name
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    // Validate cost
    if (!cost) {
      setCostError('Cost is required');
      isValid = false;
    } else if (isNaN(cost) || parseFloat(cost) < 0) {
      setCostError('Cost must be a positive number');
      isValid = false;
    } else {
      setCostError('');
    }
    
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const itemData = {
        name: name.trim(),
        cost: parseFloat(cost)
      };
      
      if (item) {
        // Edit existing item
        await dispatch(editItem({
          userId: user.uid,
          item: { ...itemData, id: item.id }
        })).unwrap();
        
        toast({
          title: "Item updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Create new item
        await dispatch(createItem({
          userId: user.uid,
          item: itemData
        })).unwrap();
        
        toast({
          title: "Item added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      
      onClose();
    } catch (error) {
      toast({
        title: item ? "Error updating item" : "Error adding item",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {item ? 'Edit Item' : 'Add New Item'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={!!nameError} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="E.g., Laptop, Software License"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <FormErrorMessage>{nameError}</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={!!costError} isRequired>
            <FormLabel>Cost ($)</FormLabel>
            <NumberInput
              min={0}
              precision={2}
              value={cost}
              onChange={(valueString) => setCost(valueString)}
            >
              <NumberInputField placeholder="E.g., 99.99" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {costError && <FormErrorMessage>{costError}</FormErrorMessage>}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button 
            colorScheme="blue" 
            mr={3} 
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            {item ? 'Save Changes' : 'Add Item'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ItemForm;