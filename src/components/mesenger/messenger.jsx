import React from 'react'

import {Col,Row} from 'antd'



const  Messenger = ({message,userId,currentFriend}) => {

let    body=( message.senderId===userId
                ?(<Row className="main__message__body__items">
                                <Col className="main__message__body__items__messageIn">
                                    <Row className="content">
                                        <Col span={8}></Col>
                                        <Col span={4}></Col>
                                        <Col span={12}>
                                            <Row style={{justifyContent:'flex-end'}}>
                                                <Col className="content__text">
                                                    {message.text}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>)
                :(
                <Row className="main__message__body__items">
                    <Col className="main__message__body__items__namePartner">
                    <Row className="container__namePartner">
                        <Col className="content__namePartner">{currentFriend}</Col>
                    </Row>
                </Col>
                <Col className="main__message__body__items__messageFrom">
                    <Row className="content">
                        <Col span={8} order={3}></Col>
                        <Col span={4} order={2}></Col>
                        <Col span={12} order={1}> 
                            <Row style={{justifyContent:'flex-start'}}>
                                <Col className="content__text">{message.text}</Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        ))
    return (
            <>
            {body}
            </>
                
    )
}

export default Messenger
