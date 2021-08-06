import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

import styled from 'styled-components'

import SingleTodo from '../components/TodoPosts/SingleTodo'
import AddTodo from '../components/TodoPosts/AddTodo'
import EditTodo from '../components/TodoPosts/EditTodo'

import { todosSelector,setShowAddModal } from '../redux/reducers/todoReducer'
import { getTodos } from '../redux/actions/todoAction'
const Header = styled(Card.Header)`
    background-color: #fff;
`

const ColTitle= styled.th`
    width: 200px;
`


const TodoList = () => {
    const dispatch = useDispatch()  
    useEffect(()=>{
        dispatch(getTodos())
    },[dispatch])

    const data =useSelector(todosSelector)

    const {listTodo,todo,isShowAddModal} = data

    const onShowAddModal= ()=>{
        dispatch(setShowAddModal(!isShowAddModal))
    }

    let body
    if(listTodo.length===0)
    {
        body =(
            <>
                    <Card className="text-center mx-5 my-5 border-0">
                        <Header as='h1' className="border-0">Usersname</Header>
                        <Card.Body>
                            <Card.Title>Welcome to todo's list</Card.Title>
                            <Card.Text>
                                Click the button below to track you first work!!
                            </Card.Text>
                            <Button variant="primary" onClick={onShowAddModal}>
                                Add Todo
                            </Button>
                        </Card.Body>
                    </Card>
            </>
    )
    }else{
        body=(
            <>
            <Container className="align-items-start">
                <Row className='mt-5'> 
                    <h1>TODO List</h1>
                    <Button
                        className="w-25 my-4 ms-3" 
                        variant="outline-primary"
                        onClick={onShowAddModal}
                        >Add Todo</Button>
                    <Table>
                        <thead>
                            <tr className="text-center fs-1">
                                <ColTitle  className="px-4">Task Name</ColTitle>
                                <ColTitle>Status</ColTitle>
                                <ColTitle>Edit</ColTitle>
                                <ColTitle>Remove</ColTitle>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listTodo.map((todo,index)=>{
                                   return <SingleTodo
                                   todo={todo} 
                                   key={index}/> 
                                })
                            }
                        </tbody>
                    </Table>
                </Row>
            </Container>
            </>
        )
    }
    return (
            <>
                {body}
                <AddTodo/>
                {todo!==null&&<EditTodo/>}
            </>
    )
}

export default TodoList
