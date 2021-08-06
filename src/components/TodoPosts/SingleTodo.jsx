import React from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons'

import { deleteTodos,updateTodos } from '../../redux/actions/todoAction'
import {findTodo } from '../../redux/reducers/todoReducer'

const StyleTd = styled.td`
max-width: 200px;
text-overflow: ellipsis;
overflow: hidden;

& .btn--delete, .btn--edit{
    cursor:pointer;
    &:hover{
        transform: scale(1.33);
        transition: .5s;
    }
}
`
const Status = styled.span`
padding: 2px 20px;
border-radius: 4px;
cursor: pointer;
transition: .5s;

&.todo{
    border:1px solid #000;
    &:hover{
        color: #fff;
        background: #000;
    }
}
&.inProgress{
    color: red;
    border: 1px solid red;
    &:hover{
        background-color: red;
        color: white;
    }
}
&.complete{
    color: green;
    border: 1px solid green;
    &:hover{
        background-color: green;
        color: white;
    }
}

`

   

const SingleTodo = ({todo}) => {

    const dispatch = useDispatch()

    //Delete todo
    const onDeleteTodo = e=>{
        e.preventDefault()
        dispatch(deleteTodos(todo._id))
    }
    //Change status
    const onChangeStatus = e =>{
        e.preventDefault()
        const temp ={
            id: todo._id,
            title:todo.title,
            status:todo.status
        }
        temp.status==='Todo'
        ?temp.status = 'In Progress'
        :temp.status ==='In Progress'
            ? temp.status ='Complete'
            :temp.status ='Todo'

        dispatch(updateTodos(temp))
    }

    const onShowEditModal = ()=>{
        dispatch(findTodo({ftodo:todo,isShowEditModal:true}))
    }

    return (
            <tr className="text-center fs-2">
                    <StyleTd>{todo.title}</StyleTd>
                    <StyleTd>
                        <Status
                            className={
                            todo.status==='Todo'
                            ?'todo'
                            :todo.status==='Complete'
                                ?'complete'
                                :'inProgress'
                            }
                            onClick={onChangeStatus.bind(this)}>
                            {todo.status}
                        </Status>
                    </StyleTd>
                    <StyleTd>
                        <FontAwesomeIcon
                          className="btn--edit"
                          icon={faPencilAlt}
                          onClick={onShowEditModal}>
                        </FontAwesomeIcon>
                    </StyleTd>
                    <StyleTd>
                        <FontAwesomeIcon
                            onClick={onDeleteTodo.bind(this)}
                            className="btn--delete"
                            icon={faTrashAlt}>
                        </FontAwesomeIcon>
                    </StyleTd>
                </tr>

    )
}

export default SingleTodo
