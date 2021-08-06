import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import styled from 'styled-components'

import {addTodos} from '../../redux/actions/todoAction'
import {todosSelector, setShowAddModal } from '../../redux/reducers/todoReducer'


const StyleModal = styled(Modal)`
    margin-top: 20vh;
    & .modal-90w{
      max-width: 800px; 
    }
`

const AddTodo = () => {
    
    const data = useSelector(todosSelector)
    const {isShowAddModal} = data
    const dispatch =useDispatch()
    const [newTodo,setNewTodo] = useState('')
    const onSubmit=e=>{
        e.preventDefault()
        if(newTodo===''){
            alert('abc')
        }
        else{
            dispatch(addTodos(newTodo))
        }
    }
    const onClose=()=>{
        dispatch(setShowAddModal(!isShowAddModal))
    }
    return (
        <StyleModal show={isShowAddModal} dialogClassName="modal-90w">
                    <Modal.Header className="fs-2 p-4" closeButton onClick={onClose}>Newtask</Modal.Header>
                    <Form onSubmit={onSubmit}>
                        <Modal.Body className="p-4">
                            <Form.Group className="d-flex align-items-center">
                                <Form.Label className="fs-3 pe-3">Task</Form.Label>
                                <Form.Control 
                                name="taskname" 
                                type="text" 
                                className="fs-3" 
                                placeholder="Description of task"
                                value={newTodo}
                                onChange={e=>setNewTodo(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer className="p-4">
                                <Button className="fs-4" variant="secondary" 
                                onClick={onClose}
                                >Close</Button>
                                <Button type="submit"
                                 className="fs-4" variant="primary">Save Changes</Button>
                        </Modal.Footer>
                    </Form>
                </StyleModal>
    )
}

export default AddTodo
