import React  , {useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import {FirebaseContext} from '../../store/Context'
import {useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';





export default function Signup() {
  const [error , setError] = useState("")
  const history = useHistory()
  const [userName , setUsername] = useState("")
  const [email , setEmail] = useState("")
  const [phone , setPhone] = useState("")
  const [password , setPassword] = useState("")
  const {firebase}=useContext(FirebaseContext)


const handleSubmit = (e) =>{
  e.preventDefault()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/;


  if(userName.trim()===""){
    setError("please enter a valid username..")
  }
  else if(email.trim()===""){
    setError("email cannot be empty")
  }else if(!emailRegex.test(email)){
    setError("please enter a valid email")
  }
  
  else if(phone.trim()===""){
  setError("phone shouldn't be empty..")
  }else if(!phoneRegex.test(phone)){
  setError("Please enter a valid 10-digit phone number.")
  }
  
  else if(password.trim()===""){
    setError("password shouldnt be empty.")
  }

  if (userName && email && emailRegex.test(email) && phone && phoneRegex.test(phone) && password ) {
    setError("");
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("result", result);
  
        // Make sure the 'user' property exists in the result before accessing it
        if (result?.user) {


          result.user.updateProfile({ displayName: userName })
            .then(async () => {

              
              try{
               
                await firebase.firestore().collection('users').add({
                  user_id: result.user.uid,
                  username: userName,
                  phone: phone
                })
                console.log("Update prfisadadsdle")

                console.log("data");
                history.push('/login');
              }catch(e)
              {
                console.error("Error adding user to Firestore", error);
              }
              
            
              
            })
            .catch((error) => {
              console.error("Error updating user profile", error);
            });
        } else {
          console.error("User property not found in result");
        }
      })
      .catch((error) => {
        console.error("Error creating user", error);
      });
  }
}


  return (
    <div>
     
      <div className="signupParentDiv">
       
        <img width="200px" height="200px" src={Logo} alt='' className='imageolx'></img>
        <h5 style={{color:"red"}} className='errortag'>{error}</h5>
        <form onSubmit={handleSubmit}>


          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            name="name"
           value={userName}
           onChange={(e)=>setUsername(e.target.value)}
          />
          <br />



          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
          />
          <br />




          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <br />




          <label htmlFor="Password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />



          <button>Signup</button>
        </form>
        <span><Link to="/login">Login</Link></span>
        <span><Link to="/">Home</Link></span>
      </div>
    </div>
  );
}
