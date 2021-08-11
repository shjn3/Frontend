import React,{useContext,useState,useRef,useEffect}  from 'react'
import {Divider,Row,Col,Typography,Form,Input,Button} from 'antd'
import Conversation from '../components/mesenger/conversation'
import Messenger from '../components/mesenger/messenger'

import { AuthContext } from '../context/authContext'

import axios from 'axios'
import {io} from 'socket.io-client'

const {Title} =Typography


const Message= () => {
    const socket = useRef()

    const {authState:{user}} = useContext(AuthContext)
    //list conversation of user
    const [conversations,setConversation] =useState([])
    //list messages of user
    const [messages,setMessages] = useState([])
    //message receive from socket io
    const [arrivalMessage,setArrivalMessage] = useState(null)

    //a conversation of user--focus
    // current is a conversation
    // active is chatting with friend
    // currentFriend: name of friend
    const [currentChat,setCurrentChat] = useState({
        current:null,
        active:0,
        currentFriend:''
    })
    const [newMessage,setNewMessage] = useState('')

    //listen event received message
    useEffect(()=>{
        socket.current = io('ws://localhost:8900')
        socket.current.on('getMessages',(data)=>{
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createAt:Date.now(),
            })
        })
    },[])
    //update message received from friend
    useEffect(()=>{
        arrivalMessage && currentChat.current?.members.includes(arrivalMessage.sender) &&
        setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])

    useEffect(()=>{
        socket.current.emit('addUser',user._id)
    })
    //get conversation
    useEffect(()=>{
        const getConversation = async ()=>{
            try{
                const response = await axios.get('http://localhost:8080/api/conversation/'+user._id)
                setConversation(response.data)

            }catch(error){
                console.log(error)
            }
        }
        getConversation()
    },[user._id])
    //get Message
    useEffect(()=>{
        const getMessages = async ()=>{
            try{
                const response = await axios.get("http://localhost:8080/api/messenger/" + currentChat.current?._id);
                setMessages(response.data)
               
            }catch(error){
                console.log(error)
            }
        }
        getMessages();
    },[currentChat])

    //sendMessage
    const handleSubmit =  async (e) =>{
        const message={
            senderId:user._id,
            text:newMessage,
            conversationId:currentChat.current._id
        }

        const receiverId = currentChat.current.members.find((member)=>member!==user._id)
        //event sendMessage
        socket.current.emit('sendMessage',{
            senderId:user._id,
            receiverId,
            text:newMessage
        })
        
        try{
            const response = await axios.post('http://localhost:8080/api/messenger',message)
            // update message from send message
            setMessages([...messages,response.data])
            // reset input your message
            setNewMessage('')

        }catch(error){
            console.log(error)
        }
    }

    return (
        <Divider>
            <Row className="header">
                <Title code strong>{user.username}</Title>
            </Row>
            <Row className="main">
                <Col className="main__listFriend">
                    <Row className="main__listFriend__row">
                        <Col className="main__listFriend__container">
                            {conversations.map(
                                (c,index)=>
                                <Conversation
                                    isActive={index===currentChat.active?true:false}
                                    key={index}
                                    handleClick={friend =>setCurrentChat({
                                        ...currentChat,
                                        current:c,
                                        active:index,
                                        currentFriend:friend
                                    })}
                                    conversation={c}
                                    currentUser = {user}
                                />
                            )}
                        </Col>
                    </Row>
                </Col>
                
                <Col className="main__message">
                    <Row className="main__message__header">
                        <Col className="main__message__header__name">
                                    {currentChat?.currentFriend}
                        </Col>
                    </Row>
                    <Row className="main__message__body">
                        <Col className="main__message__body__col" >
                            {
                            messages.map((message,index)=>
                                <Messenger
                                message={message}
                                key={index}
                                userId={user._id}
                                currentFriend={currentChat.currentFriend}
                                />
                            )
                            } 
                        </Col>
                    </Row>

                    <Row className="main__message__footer">
                        <Col className="main__message__footer__formSend">
                            <Form layout="inline" 
                                className="main__message__footer__formSend__form" 
                                onFinish={handleSubmit}>
                                <Form.Item className="main__message__footer__formSend__form__input" >
                                    <Input onChange ={e=>setNewMessage(e.target.value)} 
                                    value={newMessage}
                                    placeholder="Chat message!!"/>
                                </Form.Item>
                                <Form.Item className="main__message__footer__formSend__form__button" >
                                    <Button type="primary"  htmlType="submit">Send</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Divider>
    )
}

export default Message
