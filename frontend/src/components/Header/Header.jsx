import React from 'react'
import './Header.css'
import { categories } from '../../assets/category.js'

function Header({category,setCategory}) {

  return (
    
      <div className='category-list'>
        {
            categories.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory((prev)=>(prev===item.cat_name?'all':item.cat_name))} className='category-items'  key={index} >
                        <img className={category===item.cat_name?'active':''} src={item.image} alt="" />
                        <p className={category===item.cat_name?'pactive':''}>{item.cat_name}</p>
                    </div>
                )
                 
            })
        }
      </div>
   
  )
}

export default Header
