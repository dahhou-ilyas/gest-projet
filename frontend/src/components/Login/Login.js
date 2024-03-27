import { useEffect, useState } from "react";
import "./Login.css"
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode"
import { useUser } from "../../context";
import { Navigate } from "react-router-dom";

function Login() {
  const {user,setUser}=useUser();

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false)



  async function submit(e){
    e.preventDefault();
    const res=await fetch('http://localhost:8080/users/login',{
      method:'POST',
      body:JSON.stringify({email,password}),
      headers:{'Content-Type':'application/json'},
      credentials:'include'
    })

    if(res.ok){
      const token=Cookies.get('jwt')
      if(token){
        const decoded=jwtDecode(token);
        setUser(prev=>{
          return {...prev,...decoded}
        });
      }
      setEmail('')
      setPassword('')
      setRedirect(true)
    }
    
  }
  if (redirect) {
    return <Navigate to={'/'} replace/>;
  }


  return (
    <div className='login-page'>
        <h1 className='form-header1'>flow</h1>
        <h4 className='form-header4'>Managing team projects like never before.</h4>
        <div className='form-container'>
        <form onSubmit={submit}>
            <input
                    name='email'
                    className='form-input'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
            />
            <br />
            <input
                	  name='password'
                    className='form-input'                
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
            />
            <br />

            <button value="Login" className='form-button ml-auto mr-auto mt-1'>LogIn</button>
            <br/>
            <p>You don't have an account? SignUp now </p>
          </form>
          </div>
            {/* <p>You don't have an account? <Link to="/Signup" className='link'>Sign Up here</Link></p> */}
            

      </div>
  );
}

export default Login;
