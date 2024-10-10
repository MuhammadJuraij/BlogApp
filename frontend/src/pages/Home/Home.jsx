import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import BlogList from '../../components/BlogList/BlogList'

function Home() {

  const [category,setCategory]=useState('all');
  return (
    <div>
      <Navbar/>
      <Header category={category} setCategory={setCategory}/>
      <BlogList category={category}/>
    </div>
  )
}

export default Home
