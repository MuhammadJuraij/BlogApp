import React, { useContext, useState } from 'react'
import './Navbar.css'
import { storeContext } from '../../Context/StoreContext'
import { Link } from 'react-router-dom';



function Navbar() {

  const [menu, setMenu] = useState('home')

  const { url, user, token } = useContext(storeContext)

  return (

    <div className='navbar'>
      <div className='left'>
        <p>WriteNow.</p>
      </div>
      <div className='right'>


        <div onClick={() => setMenu('home')}
          className={menu == 'home' ? 'home active' : 'home'} >
          <a href="">Home</a>
        </div>

        {
          !user ? (
            <div onClick={() => setMenu('profile')}>
              <Link to='/'>Login</Link>
            </div>
          ) : (
            <div
              onClick={() => setMenu('profile')}
              className={menu === 'profile' ? 'profile active' : 'profile'}
            >
              <Link to='/profile' className='profile'>
                <img src={`${url}/userprofile/${user.userImage}`} alt="" />
                <div className='username'>
                  {user.name}
                </div>
              </Link>


            </div>
          )
        }




      </div>

    </div>
  )
}

export default Navbar;
