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
import { createOtherCost, editOtherCost } from '../redux/otherCostsThunks';

function OtherCostForm({ isOpen, onClose, cost }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector(state => state.auth);
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when opening/closing or changing selected cost
  useEffect(() => {
    if (isOpen) {
      if (cost) {
        setDescription(cost.description || '');
        setAmount(cost.amount || '');
      } else {
        setDescription('');
        setAmount('');
      }
      setDescriptionError('');
      setAmountError('');
    }
  }, [isOpen, cost]);

  const validateForm = () => {
    let isValid = true;
    
    // Validate description
    if (!description.trim()) {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }
    
    // Validate amount
    if (!amount) {
      setAmountError('Amount is required');
      isValid = false;
    } else if (isNaN(amount) || parseFloat(amount) < 0) {
      setAmountError('Amount must be a positive number');
      isValid = false;
    } else {
      setAmountError('');
    }
    
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const costData = {
        description: description.trim(),
        amount: parseFloat(amount)
      };
      
      if (cost) {
        // Edit existing cost
        await dispatch(editOtherCost({
          userId: user.uid,
          cost: { ...costData, id: cost.id }
        })).unwrap();
        
        toast({
          title: "Cost updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Create new cost
        await dispatch(createOtherCost({
          userId: user.uid,
          cost: costData
        })).unwrap();
        
        toast({
          title: "Cost added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      
      onClose();
    } catch (error) {
      toast({
        title: cost ? "Error updating cost" : "Error adding cost",
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
          {cost ? 'Edit Other Cost' : 'Add Other Cost'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={!!descriptionError} isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="E.g., Shipping, Taxes, Delivery"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {descriptionError && <FormErrorMessage>{descriptionError}</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={!!amountError} isRequired>
            <FormLabel>Amount ($)</FormLabel>
            <NumberInput
              min={0}
              precision={2}
              value={amount}
              onChange={(valueString) => setAmount(valueString)}
            >
              <NumberInputField placeholder="E.g., 9.99" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {amountError && <FormErrorMessage>{amountError}</FormErrorMessage>}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button 
            colorScheme="blue" 
            mr={3} 
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            {cost ? 'Save Changes' : 'Add Cost'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OtherCostForm;