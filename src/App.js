import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { setUser } from './redux/authSlice';
import { setupAuthListener } from './services/authService';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const unsubscribe = setupAuthListener((user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email
        }));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Box minH="100vh" bg="gray.50">
      {user ? <Dashboard /> : <AuthPage />}
    </Box>
  );
}

export default App;