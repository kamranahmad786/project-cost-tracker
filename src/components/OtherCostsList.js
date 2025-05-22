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
import { removeOtherCost } from '../redux/otherCostsThunks';

function OtherCostsList({ costs, onEdit }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector(state => state.auth);

  const handleDelete = (costId) => {
    if (window.confirm('Are you sure you want to delete this cost?')) {
      dispatch(removeOtherCost({ userId: user.uid, costId }))
        .unwrap()
        .then(() => {
          toast({
            title: "Cost deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: "Error deleting cost",
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
      {costs.length === 0 ? (
        <Box textAlign="center" py={10} color="gray.500">
          No other costs added yet. Click "Add Other Cost" to create your first cost.
        </Box>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th isNumeric>Amount ($)</Th>
              <Th width="100px">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {costs.map((cost) => (
              <Tr key={cost.id}>
                <Td>{cost.description}</Td>
                <Td isNumeric>${parseFloat(cost.amount).toFixed(2)}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit cost"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => onEdit(cost)}
                  />
                  <IconButton
                    aria-label="Delete cost"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(cost.id)}
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

export default OtherCostsList;