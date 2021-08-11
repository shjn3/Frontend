import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Col,Row} from 'antd'

const Conversation = ({conversation,currentUser,isActive,handleClick}) => {
    const [user,setUser] =useState(null)

    useEffect(()=>{
        const friendId = conversation.members.find((m)=>m!==currentUser._id)
        const getUser = async()=>{
        try{
                const response = await axios.get(`http://localhost:8080/api/findfriend?userId=${friendId}`)
                setUser(response.data)
            }catch(error){
                console.log(error)

            }
        }
        getUser()
    },[conversation,currentUser])

    return (
        <Row className={isActive
            ?"main__listFriend__container__row active"
            :"main__listFriend__container__row"}
            onClick={handleClick.bind(this,user?.username)}
            >
                <Col  className="main__listFriend__container__row__col">
                    {user?.username}
                </Col>
            </Row>
    )
}

export default Conversation
