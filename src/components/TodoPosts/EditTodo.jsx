import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import styled from 'styled-components'

import {updateTodos} from '../../redux/actions/todoAction'
import { todosSelector,setShowEditModal } from '../../redux/reducers/todoReducer'
const StyleModal = styled(Modal)`
    margin-top: 20vh;
    & .modal-90w{
      max-width: 800px; 
    }
`

const EditTodo = () => {
    const data = useSelector(todosSelector)
    const {todo,isShowEditModal} = data
    const dispatch = useDispatch()
    const [updateTodo,setUpdateTodo] = useState(todo)
    const {title}=updateTodo
    console.log(todo,updateTodo)
    const onEditSubmit= e=>{
        e.preventDefault()
        if(updateTodo.title===''){
            alert("The title isn't be empty!!");
        }
        else{
            const temp = {
                id:todo._id,
                title:updateTodo.title,
                status: todo.status
            }
            dispatch(updateTodos(temp))
            
        }
    }
    const onEditClose = ()=>{
        dispatch(setShowEditModal(isShowEditModal))
    }
    return (
        <StyleModal show={isShowEditModal} dialogClassName="modal-90w">
                    <Modal.Header className="fs-2 p-4" closeButton onClick={onEditClose}>Updatetask</Modal.Header>
                    <Form onSubmit={onEditSubmit}>
                        <Modal.Body className="p-4">
                            <Form.Group className="d-flex align-items-center">
                                <Form.Label className="fs-3 pe-3">Task</Form.Label>
                                <Form.Control 
                                name="taskname" 
                                type="text" 
                                className="fs-3" 
                                placeholder="Description of task"
                                value={title}
                                onChange={e=>setUpdateTodo({...updateTodo,title:e.target.value})}>
                                </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer className="p-4">
                                <Button className="fs-4" variant="secondary" 
                                onClick={onEditClose}
                                >Close</Button>
                                <Button type="submit"
                                 className="fs-4" variant="primary">Save Changes</Button>
                        </Modal.Footer>
                    </Form>
                </StyleModal>
    )
}

export default EditTodo
