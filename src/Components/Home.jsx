import React, { useState, useEffect, useRef } from 'react'
import { Box, Container, VStack, HStack, Button, Input } from '@chakra-ui/react'
// import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import Message from './Message'
import { signOut, getAuth } from 'firebase/auth'
import { app } from '../api/firebase'
import {
    addDoc,
    collection,
    getFirestore,
    serverTimestamp,
    onSnapshot,
    query, orderBy
} from 'firebase/firestore'


const auth = getAuth(app);

const db = getFirestore(app);
const logoutHandler = () => {

    signOut(auth).then(() => {

    }).catch((error) => {
        // console.log(error);d
    })
};




const Home = (props) => {

    const user = props.user;

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const scrollV = useRef(null);
    const submitHandler = async (e) => {
        e.preventDefault();

        try {


            await addDoc(collection(db, "Message"), {
                text: message,
                uid: user.uid,
                uri: user.photoURL,
                createdAt: serverTimestamp(),
            });
            setMessage("");
            scrollV.current.scrollIntoView({ behavior: "smooth" })
        } catch (error) {
            alert(error);
        }

    }
    useEffect(() => {
        const q = query(collection(db, "Message"), orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(q, (snap) => {
            
            setMessages(
                snap.docs.map((item) => {
                    const id = item.id;
                    return { id, ...item.data() };
                })
            );
        });

        return () => {
            unsubscribe();
        }
    }, []);
    return (
        <Box bg={"blue.100"}>
            <Container h={"100vh"} maxWidth={"60vh"} bg={"white"}>
                <VStack margin={"0"} h={"full"} paddingY={"2"} bg={'green.100'}>
                    <Button onClick={logoutHandler} bg={"blue"} color={"white"} width={"100%"}>LOGOUT</Button>


                    <VStack h={"full"} w={"full"} bg={"pink.100"} overflowY={"auto"} sx={{
                        '&::-webkit-scrollbar': {
                            width: '16px',
                            borderRadius: '8px',
                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                        },
                    }}>
                        {messages.map((item) => (

                            <Message key={item.id} user={item.uid === user.uid ? "me" : "other"} text={item.text} uri={item.uri} />
                        ))
                        }
                        <div ref={scrollV}></div>
                    </VStack>
                    <form onSubmit={submitHandler} style={{ width: "100%", backgroundColor: "" }}>

                        <HStack width={"full"}>
                            <Input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder='Enter a Message'>
                            </Input >
                            <Button type="submit" bg={"blue"} color='white'>Send</Button>
                        </HStack>
                    </form>
                </VStack>
            </Container>
        </Box>
    )
}

export default Home