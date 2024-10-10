import React, { useContext } from 'react'
import './BlogDetail.css'
import { useLocation } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext';


function BlogDetail() {

  const {url}=useContext(storeContext)
  const location = useLocation();
  const { image, author, title, description, date } = location.state || {};
  
  const formatDate = (dbDate) => {
    return new Date(dbDate).toISOString().split('T')[0];
  }

  return (

      
      <div className='blog-fullsize'>
        <p className='title'>{title}</p>
        <img className='image' src={`${url}/blogimage/${image}`} alt="" />
        <p className='note'>{description}</p>

        <div className="dateAndAuthor">
        <p> {formatDate(date)}</p>
        <p>|</p>
        <p className='author'>{author.name}</p>
        </div>
        
      </div>
   

  )
}

export default BlogDetail
