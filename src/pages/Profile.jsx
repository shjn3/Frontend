import React,{useRef} from 'react'
import Footer from '../components/layout/footer'
import styled from 'styled-components'

import {useDispatch,useSelector} from 'react-redux'

import { authSelector } from '../redux/reducers/authReducer'
import { updateProfile } from '../redux/actions/authAction'




const ProContainer= styled.div`
    height: 75vh;
    & .main{
        width: 960px;
        height: 100%;
        margin: 20px auto 0;
        &__avatar{
            width: 250px;
            border-right: 1px solid gray;
            &__btn{
                border:0;
            }
            &__upload{
                display:flex;
                & input{
                    display:none;
                }
            }
        }
    }
`


const Profile = () => {
    const inputFile = useRef(null) 
    const data = useSelector(authSelector)

    const {user} = data
    const dispatch = useDispatch()

    const onClickFile =()=>{
        inputFile.current.click()
    }
    const onFileUpload = e=>{
        console.log(e.target.files[0])
        if(e.target.files[0]===null) alert('abc')

        const formData = new FormData()
        formData.append(
            'avatar',
            e.target.files[0]
        )
        dispatch(updateProfile(formData))

    }
    return (
        <>
        <ProContainer>
            <div className="main d-flex align-items-stretch">
                <div className="main__avatar"> 
                    <div>
                    <button  className="main__avatar__btn" title="add a profile avatar" onClick={onClickFile}>
                        <img src={user.avatar===null?null:user.avatar} alt="" width="200px" height="200px" className="rounded-circle"/>
                    </button>
                    <div className="main__avatar__upload">
                        <form >
                            <input type="file" name="avatar" ref={inputFile} onChange={onFileUpload}/>
                        </form>
                    </div>
                    </div>
                </div>
                <div className="main__info fs-1 ms-5">{user.username}</div>
            </div>
        </ProContainer>
        <Footer/>
        </>
    )
}

export default Profile
