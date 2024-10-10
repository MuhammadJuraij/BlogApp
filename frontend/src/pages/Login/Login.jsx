import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import profileIcon from '../../assets/profile.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storeContext } from '../../Context/StoreContext';


function Login() {


  const [currentState, setCurrentState] = useState('Login')
  const [profile, setProfile] = useState(false)

  const navigate = useNavigate()

  const { url, setToken, setUser } = useContext(storeContext)

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleOnchange = (event) => {

    const { name, value } = event.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }



  const handleFormdata = async (e) => {
    e.preventDefault()

    const formdata = new FormData();
    if (currentState == 'Signup') {
      formdata.append('name', data.name)
      formdata.append('profile', profile)
    }
    formdata.append('email', data.email)
    formdata.append('password', data.password)


    if (currentState == 'Signup' && !profile) {
      // alert(".Please upload a profile picture");
      toast.error('Please upload a profile picture')
      return;
    }

    let newUrl;

    {
      currentState=='Signup'?newUrl = `${url}/api/user/register`:newUrl = `${url}/api/user/login`;
    }

    try {
      const response = await axios.post(newUrl, formdata, {
        headers: {
           'Content-Type': currentState=='Signup'
           ?'multipart/form-data'
            :'application/json'
          
        },
      });
     

      if (response.data.success) {
        console.log('formresponse', response.data)
        setToken(response.data.token)
        setUser(response.data.user)

        localStorage.setItem('token', response.data.token)

        setData({
          name: '',
          email: '',
          password: ''
        })
        setProfile(false)
        // navigate('/home')
      }
      else {
        toast.error(response.data.message)
      }
    }

    catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='login-page'>
      <div className='left-side'>
        <p className='heading'>Happy Blogging!</p>
        <p className='para'>Your voice matters here. Let’s inspire each other!
        </p>
      </div>
      <div className='right-side'>
        <form onSubmit={handleFormdata} className='login-container'>
          <div className="login-title">
            <h2>{currentState}</h2>

          </div>
          <div className="input-field">
            {
              currentState == 'Signup' ?
                <div className="signup">
                  <div className='signup-img'>
                    <label htmlFor="image">
                      <img src={profile ? URL.createObjectURL(profile) : profileIcon} alt="" />
                    </label>
                    <input type="file" onChange={(e) => setProfile(e.target.files[0])} id='image' name='profile'   hidden />
                  </div>
                  <div className='signup-input'>
                    <input type="text" name='name' onChange={handleOnchange} value={data.name} placeholder='Enter your Fullname' />
                  </div>
                </div>
                : <></>
            }
            <input type="email" onChange={handleOnchange} name='email' value={data.email} placeholder='Enter your email' />
            <input type="password" onChange={handleOnchange} name='password' value={data.password} placeholder='Enter the Password' />
          </div>
          <button type='submit'>{currentState}</button>
          <div className="condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
          {
            currentState == 'Signup' ? <p>Already have account?  <span onClick={() => setCurrentState('Login')}>Login</span></p> : <p>Create new account.   <span onClick={() => setCurrentState('Signup')}>Click here</span></p>
          }



        </form>
      </div>

    </div>
  )
}

export default Login
