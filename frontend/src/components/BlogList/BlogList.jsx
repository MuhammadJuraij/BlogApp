import React from 'react'
import './BlogList.css'
// import {blogs} from '../../assets/category'
import Blog from '../Blog/Blog'
import {storeContext} from '../../Context/StoreContext'
import { useContext } from 'react'



function Blogs({category}) {

  const {blog}=useContext(storeContext)

 

  return (
    <div className='blogs-container'>
      <p className='blog-head'>Featured Blogs</p>
      <div className="blogs">
      {
        blog.map((item,index)=>{
          if(category==='all' || category===item.category){
            return(
              <div key={index} >
              <Blog id={item._id} author={item.author} title={item.title} image={item.image} description={item.description} date={item.date}/>
              </div>
            )
          }  
        })
     }
      </div>
    </div>
  )
}

export default Blogs


