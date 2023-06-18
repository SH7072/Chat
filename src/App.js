import './App.css';
import Home from './Components/Home';
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from './api/firebase';
import { useEffect, useState } from 'react';
import { Button, VStack } from '@chakra-ui/react';

const auth = getAuth(app);
const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    })
  
    return ()=>{
      unsubscribe();
    }
  },[]);


  return (

    <div>
      {
        user ?
          (<Home user={user} />) :

          (
            <VStack h={'100vh'} justifyContent={'center'} alignItems={'center'}>

              <Button onClick={loginHandler} >Sign In</Button>
            </VStack>
          )
      }
    </div>
  );
}

export default App;
