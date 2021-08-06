import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import {postLogin} from '../../redux/actions/authAction'


const LoginForm = () => {   
   
    const dispatch = useDispatch()

    const [loginForm,setLoginForm]=useState(
        {
            username:'',
            password:'',
            focusUser:false,
            focusPass:false,
            show:false,
            checked:false,
        }
    )
    const {username,password,focusUser,focusPass,show,checked}=loginForm;

   

  /*  const error_username=['Username required!','Username is less than 4 characters!',
                          'Incorrect Username!'];
    const error_password = ['Password required!','Password is less than 4 characters!',
    'Incorrect Password!'];*/
    
    /*const Submit = event =>{
        event.preventDefault();
        const error = document.querySelectorAll('.form__login__error');
        const _input = document.querySelectorAll('.form__login__input');
        const [user,pass]=error;
        const [input_user,input_pass] = _input
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
        console.log(dispatch(postLogin(username,password)))
    }*/

    const Submit = e=>{
        e.preventDefault();
        dispatch(postLogin({username,password}))
    }
    return (
        <div className="form">
            <h1 className="form__title">ANALYTICS</h1>
            <form className="form__login" onSubmit={Submit}>
                <div className={
                    username.length>0
                    ?focusUser===true
                        ?"form__login__input active focus"
                        :"form__login__input active"
                    :focusUser===true
                        ?"form__login__input focus"
                        :"form__login__input"
                    } id="username" >
                    <label>
                        <span>Username, email, phone number</span>
                        <input type="text" name="username"
                        value={username}
                        onChange={e=>setLoginForm({...loginForm,username:e.target.value})}
                        onFocus={()=>setLoginForm({...loginForm,focusUser:!focusUser})}
                        onBlur={()=>setLoginForm({...loginForm,focusUser:!focusUser})}/>
                    </label>
                </div>
                <div className="form__login__error"></div>
                <div className={
                    password.length>0
                    ?focusPass===true
                        ?"form__login__input active focus"
                        :"form__login__input active"
                    :focusPass===true
                        ?"form__login__input focus"
                        :"form__login__input"
                    } id="password">
                    <label>
                        <span>Password</span>
                        <input type={show===true?"text":"password"} name="password"
                        value={password}
                        onChange={e=>setLoginForm({...loginForm,password:e.target.value})}
                        onFocus={()=>setLoginForm({...loginForm,focusPass:!focusPass})}
                        onBlur={()=>setLoginForm({...loginForm,focusPass:!focusPass})}
                        />
                    </label>
                    <div className={
                        password.length>0
                        ?show === false
                            ?"form__login__input__showPass show"
                            :"form__login__input__showPass hide"
                        :"form__login__input__showPass"
                    }
                     onClick={()=>setLoginForm({...loginForm,show:!show})}>
                        <span>Show</span>
                        <span>Hide</span>
                   </div>
                </div>
                
                <div className="form__login__error"></div>
                <div className="form__login__remember">
                    <label className={checked===true?"check":""}>
                        <input type="checkbox" defaultChecked={checked} onChange={()=>setLoginForm({...loginForm,checked:!checked})}/>
                        <i className='bx bx-check'></i>
                            Remember me
                    </label>
                </div>
                <button className={checked?"btn--login active":"btn--login"}>Login</button>
            </form>
            <div className="form__signUp">
                Dont' have an account? <Link to='/register'>Sign up</Link>
            </div>
        </div>
    )
}

export default LoginForm
