import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { storeContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Blog from '../../components/Blog/Blog';
import { toast } from 'react-toastify';




function Profile() {

  const { user, url } = useContext(storeContext)
  const [userBlog, setUserBlog] = useState([]);


  const navigate = useNavigate()


  // fetchUserBlogs

  const fetchUserblogs = async () => {

    const response = await axios.get(`${url}/api/blog/getblogs/${user.id}`)
    if (response.data.success) {
      setUserBlog(response.data.userblogs)
      // console.log(response.data.userblogs)
    }
  }


  useEffect(() => {
    if (user.id) {
      fetchUserblogs();
    }

  }, [user.id])

  useEffect(() => {
    console.log(userBlog);
  }, [userBlog])


  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
    navigate('/', { replace: true })

  }

  const handledelete = async (id) => {

    try {
      const response = await axios.delete(`${url}/api/blog/delete/${id}`)
      if (response.data.success) {
        toast.success(response.data.message)
        fetchUserblogs();

      }
      else {
        toast.error(response.data.message)
      }

    }
    catch (error) {
      console.log(error)
      toast.error('An error occured in deleting the blog ')
    }


  }


  return (
    <div >
      <div className='top'>


        <div className='backtohome'>
          <a href="/home" >
            <i class="fa-solid fa-arrow-left" ></i>
            Home
          </a>
        </div>
        <div className="settings">
          <i class="fa-solid fa-gear"></i>
          <ul className='dropdown'>
            <li onClick={() => { navigate('/edit') }}>Personal Details</li>
            <hr />
            <li className='logout' onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </div>
      <div className="main-container">
        <div className='profile-container'>

          <div className="Profile-pic">
            <img src={`${url}/userprofile/${user.userImage}`} alt="" />
            <div className="details">
              <p className='name'>{user.name}</p>
              <p className='email'>{user.email}</p>
            </div>
          </div>


        </div>

        <div >
          <div className="posted">
            <div className='bloghead'>
              <p className='head'>Posted Blogs</p>
              <button onClick={() => navigate('/createblog')}>Add Blog</button>
            </div>

            {
              userBlog.length < 1 ?
                (
                  <div className='empty-blog'>
                    <p>No Blog Posted!</p>
                  </div>
                ) :
                (
                  <div className="userBlogs">
                    {
                      userBlog.map((blog, index) => {
                        return (
                          <div key={index}>

                            <Blog id={blog._id} author={user.name} title={blog.title} image={blog.image} description={blog.description} date={blog.date} handledelete={handledelete} />
                          </div>
                        )
                      })
                    }
                  </div>
                )
            }


          </div>
        </div>

      </div>
    </div>
  )
}


export default Profile
