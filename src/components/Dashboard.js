import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { fetchUserItems } from '../redux/itemsThunks';
import { fetchUserOtherCosts } from '../redux/otherCostsThunks';
import { signoutUser } from '../redux/authThunks';
import ItemsList from './ItemsList';
import OtherCostsList from './OtherCostsList';
import ItemForm from './ItemForm';
import OtherCostForm from './OtherCostForm';

function Dashboard() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.items);
  const { otherCosts } = useSelector(state => state.otherCosts);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCost, setSelectedCost] = useState(null);
  
  const {
    isOpen: isItemFormOpen,
    onOpen: onItemFormOpen,
    onClose: onItemFormClose
  } = useDisclosure();
  
  const {
    isOpen: isOtherCostFormOpen,
    onOpen: onOtherCostFormOpen,
    onClose: onOtherCostFormClose
  } = useDisclosure();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserItems(user.uid));
      dispatch(fetchUserOtherCosts(user.uid));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(signoutUser());
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddItem = () => {
    setSelectedItem(null);
    onItemFormOpen();
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    onItemFormOpen();
  };

  const handleAddOtherCost = () => {
    setSelectedCost(null);
    onOtherCostFormOpen();
  };

  const handleEditOtherCost = (cost) => {
    setSelectedCost(cost);
    onOtherCostFormOpen();
  };

  // Calculate total cost
  const totalItemsCost = items.reduce((sum, item) => sum + Number(item.cost), 0);
  const totalOtherCosts = otherCosts.reduce((sum, cost) => sum + Number(cost.amount), 0);
  const totalProjectCost = totalItemsCost + totalOtherCosts;

  return (
    <Container maxW="container.lg" py={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading as="h1" size="xl">Project Cost Tracker</Heading>
        <Button onClick={handleLogout} colorScheme="red">Logout</Button>
      </Flex>
      
      <Box bg="white" p={5} borderRadius="md" boxShadow="md" mb={8}>
        <Stat>
          <StatLabel fontSize="lg">Total Project Cost</StatLabel>
          <StatNumber fontSize="3xl" color="green.500">
            ${totalProjectCost.toFixed(2)}
          </StatNumber>
          <Text fontSize="sm" color="gray.500">
            Items: ${totalItemsCost.toFixed(2)} | Other Costs: ${totalOtherCosts.toFixed(2)}
          </Text>
        </Stat>
      </Box>
      
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Items</Tab>
          <Tab>Other Costs</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading as="h2" size="md">Items</Heading>
              <Button colorScheme="blue" onClick={handleAddItem}>
                Add Item
              </Button>
            </Flex>
            <ItemsList items={items} onEdit={handleEditItem} />
          </TabPanel>
          
          <TabPanel>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading as="h2" size="md">Other Costs</Heading>
              <Button colorScheme="blue" onClick={handleAddOtherCost}>
                Add Other Cost
              </Button>
            </Flex>
            <OtherCostsList costs={otherCosts} onEdit={handleEditOtherCost} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      <ItemForm 
        isOpen={isItemFormOpen} 
        onClose={onItemFormClose}
        item={selectedItem}
      />
      
      <OtherCostForm
        isOpen={isOtherCostFormOpen}
        onClose={onOtherCostFormClose}
        cost={selectedCost}
      />
    </Container>
  );
}

export default Dashboard;