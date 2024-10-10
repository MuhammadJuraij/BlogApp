import { createContext, useEffect, useState } from 'react';

import axios from 'axios'

// Create the context
export const storeContext = createContext(null);

const StoreContextProvider = ({ children }) => {


  const url = 'http://localhost:4000';
  const [blog, setBlog] = useState([]);
  const [token, setToken] = useState('')
  const [user, setUser] = useState('')


  // Fetch blogs function
  const fetchBlogs = async() => {

    try{
      const response=await axios.get(`${url}/api/blog/getall`)
      setBlog(response.data.blogs); 
      console.log(response.data.blogs)
    }
    catch(err){
      console.log(err)
    }
    
    
  };

  
  // fetch Active userData
  const fetchActiveUserData = async () => {
    const token = localStorage.getItem('token');

    // console.log('token :', token)
    if (token) {
      setToken(token)
      try {
        const response = await axios.get(`${url}/api/user/getuser`, { headers: { token: `${token}` } })
        if (response.data.success) {
          setUser(response.data)
          console.log(response.data)
          
        }

      }
      catch (error) {
        console.log('error fetching user profile', error);

      }
    }
    else {
      console.log('token not found')
    }
  }



// useEffect
  useEffect(() => {
    fetchActiveUserData();
    fetchBlogs();  // Fetch blogs on mount
  }, []);



  const contextValues = {
    url,
    blog,
    setToken,
    setUser,
    user,
    token,
  };

  return (
    <storeContext.Provider value={contextValues}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
