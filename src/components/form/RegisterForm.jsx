import React,{useState} from 'react'
import {Link} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { postRegister } from '../../redux/actions/authAction'

const RegisterForm = () => {
    const dispatch = useDispatch()

    const [registerForm,setRegisterForm] = useState(
        {
            username:'',
            password:'',
            confirmPass:'',
            focusUser: false,
            focusPass: false,
            focusConfirmPass:false,
            showPass:false,
            showConfirmPass:false,
            checked: false
        }
    )
    const {
        username, password,confirmPass,
        focusUser,focusPass,focusConfirmPass,
        showPass,showConfirmPass,checked
    }=registerForm;


  /*  const error_username=['Username required!','Username is less than 4 characters!',
    'Incorrect Username!'];
    const error_password = ['Password required!','Password is less than 4 characters!',
    'Incorrect Password!'];
    const error_confirmPassword = ["Password didn't match!"];*/

  /*  const Submit = event =>{
        event.preventDefault();
        const error = document.querySelectorAll('.form__register__error');
        const _input = document.querySelectorAll('.form__register__input');
        const [user,pass,cfPass]=error;
        const [input_user,input_pass,input_cfPass] = _input;
        // validate
        // Check User
        if(username.length === 0){
           input_user.classList.add('error');
           user.innerHTML=error_username[0];
           user.classList.add('active');           
        }
        // Check less than 4 character!
        else  if(username.length < 4){
            input_user.classList.add('error');
            user.innerHTML=error_username[1];
            user.classList.add('active');
           }
           //Check Correct username
           else if(username!=="admin"){
            input_user.classList.add('error');
            user.innerHTML=error_username[2];
            user.classList.add('active');
            }
            //Correct username
            else{
                input_user.classList.remove('error');
                user.innerHTML="";
                user.classList.remove('active');   
            }
        // Check Password
        if(password.length === 0){
            input_pass.classList.add('error');
            pass.innerHTML=error_password[0];
            pass.classList.add('active');
        }
        // Check less than 4 character!
        else  if(password.length < 4){
            input_pass.classList.add('error');
            pass.innerHTML=error_password[1];
            pass.classList.add('active');
        }
        // Check correct password
        else if(password!=="admin"){
            input_pass.classList.add('error');
            pass.innerHTML=error_password[2];
            pass.classList.add('active');
        }
        // Correct password
        else{
            input_pass.classList.remove('error');
            pass.innerHTML="";
            pass.classList.remove('active');
        }

        if(confirmPass!==password){
            input_cfPass.classList.add('error');
            cfPass.innerHTML=error_confirmPassword[0];
            cfPass.classList.add('active');
        }
        else{
            input_cfPass.classList.remove('error');
            cfPass.innerHTML="";
            cfPass.classList.remove('active');
        }
    }*/
    const Submit = e=>{
        e.preventDefault();
        dispatch(postRegister({username,password}))
    }
    
    return (
        <div className="form">
            <h1 className="form__title">ANALYTICS</h1>
            <form className="form__register" onSubmit={Submit}>
                 <div className={
                    [username].length>0
                    ?focusUser===true
                        ?"form__register__input active focus"
                        :"form__register__input active"
                    :focusUser===true
                        ?"form__register__input focus"
                        :"form__register__input"
                    }>
                    <label>
                        <span>Username, email, phone number</span>
                        <input type="text" name="username"
                        value={username}
                        onChange={e=>setRegisterForm({...registerForm,username:e.target.value})}
                        onFocus={()=>setRegisterForm({...registerForm,focusUser:!focusUser})}
                        onBlur={()=>setRegisterForm({...registerForm,focusUser:!focusUser})}/>
                    </label>
                </div>
                <div className="form__register__error"></div>
                <div className={
                    [password].length>0
                    ?focusPass===true
                        ?"form__register__input active focus"
                        :"form__register__input active"
                    :focusPass===true
                        ?"form__register__input focus"
                        :"form__register__input"
                    }>
                    <label>
                        <span>Password</span>
                        <input type={showPass===true?"text":"password"} name="password"
                        value={password}
                        onChange={e=>setRegisterForm({...registerForm,password:e.target.value})}
                        onFocus={()=>setRegisterForm({...registerForm,focusPass:!focusPass})}
                        onBlur={()=>setRegisterForm({...registerForm,focusPass:!focusPass})}
                        />
                    </label>
                    <div className={
                        [password].length>0
                        ?showPass === false
                            ?"form__register__input__showPass show"
                            :"form__register__input__showPass hide"
                        :"form__register__input__showPass"
                    }
                     onClick={()=>setRegisterForm({...registerForm,showPass:!showPass})}>
                        <span>Show</span>
                        <span>Hide</span>
                   </div>
                </div>
                <div className="form__register__error"></div>
                <div className={
                    [confirmPass].length>0
                    ?focusConfirmPass===true
                        ?"form__register__input active focus"
                        :"form__register__input active"
                    :focusConfirmPass===true
                        ?"form__register__input focus"
                        :"form__register__input"
                    }>
                    <label>
                        <span>confirm Password</span>
                        <input type={showConfirmPass===true?"text":"password"} name="password"
                        value={confirmPass}
                        onChange={e=>setRegisterForm({...registerForm,confirmPass:e.target.value})}
                        onFocus={()=>setRegisterForm({...registerForm,focusConfirmPass:!focusConfirmPass})}
                        onBlur={()=>setRegisterForm({...registerForm,focusConfirmPass:!focusConfirmPass})}
                        />
                    </label>
                    <div className={
                        [confirmPass].length>0
                        ?showConfirmPass === false
                            ?"form__register__input__showPass show"
                            :"form__register__input__showPass hide"
                        :"form__register__input__showPass"
                    }
                     onClick={()=>setRegisterForm({...registerForm,showConfirmPass:!showConfirmPass})}>
                        <span>Show</span>
                        <span>Hide</span>
                   </div>
                </div>
                <div className="form__register__error"></div>
                <div className="form__register__remember">
                    <label className={checked===true?"check":""}>
                        <input type="checkbox" 
                        onChange={()=>setRegisterForm({...registerForm,checked:!checked})}
                        defaultChecked={checked}
                        />
                        <i className='bx bx-check'></i>
                            I accept the <Link to="/abc">Term of Use</Link> &#38; <Link to="/abc">Privacy Policy</Link>
                    </label>
                </div>
                <button className={checked===true?"btn--register active":"btn--register"}>Register</button>
            </form>
            <div className="form__signUp">
                Do have an account? <Link to='/login'>Sign in</Link>
            </div>
        </div>
    )
}

export default RegisterForm
