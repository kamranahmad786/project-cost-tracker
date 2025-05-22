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
  
  // Get all items for a user
  export const fetchItems = async (userId) => {
    try {
      const itemsCollection = collection(db, "users", userId, "items");
      const snapshot = await getDocs(itemsCollection);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  };
  
  // Set up real-time listener for items
  export const setupItemsListener = (userId, callback) => {
    const itemsCollection = collection(db, "users", userId, "items");
    return onSnapshot(itemsCollection, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(items);
    });
  };
  
  // Add a new item
  export const addNewItem = async (userId, item) => {
    try {
      const docRef = await addDoc(collection(db, "users", userId, "items"), {
        name: item.name,
        cost: item.cost
      });
      return { id: docRef.id, ...item };
    } catch (error) {
      throw error;
    }
  };
  
  // Update an existing item
  export const updateExistingItem = async (userId, item) => {
    try {
      const itemRef = doc(db, "users", userId, "items", item.id);
      await updateDoc(itemRef, {
        name: item.name,
        cost: item.cost
      });
      return item;
    } catch (error) {
      throw error;
    }
  };
  
  // Delete an item
  export const deleteExistingItem = async (userId, itemId) => {
    try {
      const itemRef = doc(db, "users", userId, "items", itemId);
      await deleteDoc(itemRef);
      return itemId;
    } catch (error) {
      throw error;
    }
  };