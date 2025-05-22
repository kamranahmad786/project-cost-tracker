import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    getDocs,
    onSnapshot
  } from 'firebase/firestore';
  import { db } from '../firebase';
  
  // Get all other costs for a user
  export const fetchOtherCosts = async (userId) => {
    try {
      const costsCollection = collection(db, "users", userId, "otherCosts");
      const snapshot = await getDocs(costsCollection);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  };
  
  // Set up real-time listener for other costs
  export const setupOtherCostsListener = (userId, callback) => {
    const costsCollection = collection(db, "users", userId, "otherCosts");
    return onSnapshot(costsCollection, (snapshot) => {
      const costs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(costs);
    });
  };
  
  // Add a new cost
  export const addNewCost = async (userId, cost) => {
    try {
      const docRef = await addDoc(collection(db, "users", userId, "otherCosts"), {
        description: cost.description,
        amount: cost.amount
      });
      return { id: docRef.id, ...cost };
    } catch (error) {
      throw error;
    }
  };
  
  // Update an existing cost
  export const updateExistingCost = async (userId, cost) => {
    try {
      const costRef = doc(db, "users", userId, "otherCosts", cost.id);
      await updateDoc(costRef, {
        description: cost.description,
        amount: cost.amount
      });
      return cost;
    } catch (error) {
      throw error;
    }
  };
  
  // Delete a cost
  export const deleteExistingCost = async (userId, costId) => {
    try {
      const costRef = doc(db, "users", userId, "otherCosts", costId);
      await deleteDoc(costRef);
      return costId;
    } catch (error) {
      throw error;
    }
  };