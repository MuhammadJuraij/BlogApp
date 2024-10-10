import React, { useContext } from 'react'
import profilepic from '../../assets/profile.png'
import './Blog.css'
import { useNavigate } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'



function Blog({ title, author, description, image, date,id ,handledelete }) {
  const navigate = useNavigate();

  const { url, user } = useContext(storeContext)

  const handlenavigate = (id) => {
    navigate(`/blogdetail/${id}`, {
      state: {
        image,
        author,
        title,
        description,
        date
      }
    })
  }

  const formatDate = (dbDate) => {
    return new Date(dbDate).toISOString().split('T')[0];
  }


  return (
    <div >
    <div className='blog'>
      

      <div onClick={() => handlenavigate(id)}  >

        <div className="profile-pic">
          {
            author.userImage ?
              (<img src={`${url}/userprofile/${author.userImage}`} alt="" />)
              : null
          }
          <p className='profile-name'>{author.name}</p>
        </div>

        <div className="upload-image"><img src={`${url}/blogimage/${image}`} alt="" /></div>
        <div className="header"><p>{title}</p></div>
        <div className="date"> <p>Date: {formatDate(date)}</p></div>
        </div>
       
        

     
     
    </div>
    
     {
     author.name ?
       <></>
       :

       (
         <div className='deletebutton'><i class="fa-solid fa-trash" onClick={() => handledelete(id)}></i></div>
       )
      }
     </div>
  )
}

export default Blog
