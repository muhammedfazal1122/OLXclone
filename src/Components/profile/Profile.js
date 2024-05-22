import React , {useContext}from 'react'
import Header from '../Header/Header'
import './profile.css'
import {AuthContext} from '../../store/Context';


function Profile() {
    const {user} = useContext(AuthContext)
  return (
    <div>
        <Header/>
        <div className='container'>
        <div className='row'>
        <div className='col-lg-12 profiledivleft card'>
              <div>
                <h5 className='divheading'>Account Information</h5>
                  <h5>Name  :  {user ? user.displayName :  ''}</h5>
                  <h5>Email : {user ? user.email : ""} </h5>
                
              </div>
        </div>
       
        </div>
        </div>
    </div>
  )
}

export default Profile