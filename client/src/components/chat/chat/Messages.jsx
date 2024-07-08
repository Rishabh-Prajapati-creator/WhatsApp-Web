import { Box, styled } from '@mui/material';
import { useContext, useState, useEffect, useRef } from 'react';

import Footer from './Footer';
import Message from './Message';

import { AccountContext } from '../../../context/AccountProvider';
import { getMessages, newMessage } from '../../../service/api';

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;

const Component = styled(Box)`
    overflow-y: scroll; 
    height: 79vh;
    width: 67vw;
`;

const Container = styled(Box)`
    padding: 1.5px 70px;
`;

export default function Messages({ person, conversation }) {

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState();
    const [image, setImage] = useState('');
    const [incomimgMessage, setIncomimgMessage] = useState(null);

    const scrollRef = useRef();

    const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomimgMessage({
                ...data,
                createdAt: Date.now(),
            })
        })
    })

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(conversation._id);
            console.log("data base messages ", data);
            setMessages(data);
        }
        conversation._id && getMessageDetails();
    }, [person._id, conversation._id, newMessageFlag]);

    useEffect(() => {
        incomimgMessage && conversation?.members?.includes(incomimgMessage.senderId) && setMessages(prev => [...prev, incomimgMessage])
    },[incomimgMessage, conversation])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: 'smooth '})
    }, [messages])

    const sendText = async (e) => {
        const code = e.keyCode || e.which;
        if (code === 13) {
            let message = {};
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value,
                }
            } else {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: image,
                }
            }
            // console.log('hiiiiiiiiiii ', message);

            socket.current.emit('sendMessage', message);

            await newMessage(message)

            setValue('');
            setFile('');
            setImage('');

            setNewMessageFlag(prev => !prev);
        }
    }

    return (
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message => (
                        <Container ref={scrollRef}>
                            <Message message={message} />
                        </Container>
                    ))
                }
            </Component>
            <Footer sendText={sendText}
                    setValue={setValue}
                    value={value}
                    file={file}
                    setFile={setFile}
                    setImage={setImage}
            />
        </Wrapper>
    )
}