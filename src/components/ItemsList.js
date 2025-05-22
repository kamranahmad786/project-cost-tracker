import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { removeItem } from '../redux/itemsThunks';

function ItemsList({ items, onEdit }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector(state => state.auth);

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(removeItem({ userId: user.uid, itemId }))
        .unwrap()
        .then(() => {
          toast({
            title: "Item deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: "Error deleting item",
            description: error,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Box overflowX="auto">
      {items.length === 0 ? (
        <Box textAlign="center" py={10} color="gray.500">
          No items added yet. Click "Add Item" to create your first item.
        </Box>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Cost ($)</Th>
              <Th width="100px">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td isNumeric>${parseFloat(item.cost).toFixed(2)}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit item"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => onEdit(item)}
                  />
                  <IconButton
                    aria-label="Delete item"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(item.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default ItemsList;