import React from 'react'
import {useLocation} from 'react-router-dom'
import {NavDropdown,Form, Navbar, Nav,} from 'react-bootstrap'
import styled from 'styled-components'

import { useDispatch,useSelector } from 'react-redux'
import {setLogout,authSelector} from '../../redux/reducers/authReducer'

const Logo = styled(Navbar.Brand)`
    font-size: 2rem;
    color: #fff!important;
`
const LogoBlue = styled.span`
    color:rgb(8, 160, 233);
`
const Links = styled(Nav.Link)`
    font-weight: 700;
    font-size: 1.3rem;
    opacity: 1;
    &:hover{
        opacity: 1;
        color: #fff!important;
        transition: .5s;
    }
`


const NavbarMenu = () => {
    const data = useSelector(authSelector)
    const {user} = data
    const dispatch = useDispatch()

    const onLogout = e=>{
        e.preventDefault()
        dispatch(setLogout(false))
    
    }
    let location = useLocation().pathname
    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="p-3 w-100 shadow" >
            <Logo href="#">ANA<LogoBlue>LYTIC</LogoBlue></Logo>
            <Form className="d-flex w-25">
                <Form.Group className="me-2 w-100">
                    <Form.Control type="text" placeholder="search" className="rounded-pill"></Form.Control>
                </Form.Group>
            </Form>
            <Navbar.Toggle aria-controls="navbar-menu"></Navbar.Toggle>
            <Navbar.Collapse id="navbar-menu" className="justify-content-between">
                <Nav>
                    <Links href="./home" className={location==='/home'?"active":""}>Home</Links>
                    <Links href="./todoslist" className={location==='/todoslist'?"active":""}>Todo's List</Links>
                </Nav>
                <Nav className="d-flex align-items-center">
                    <Nav.Link href="./profile">
                        <img src={user.avatar===null?null:user.avatar} width="32px" height="32px" className="rounded-circle" alt="avatsar"></img>
                    </Nav.Link>
                    <Links href="./notifications" className={location==='/notifications'?"active":""} >Notifications</Links>
                    <NavDropdown id="nav-dropdown" align="end">
                        <NavDropdown.Item>setting</NavDropdown.Item>
                        <NavDropdown.Item onClick={onLogout.bind(this)}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu
