import "./login.scss"
import {useContext, useState } from "react"
import {  signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../../firebase"
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"

const Login = () => {
  const [error, setError] = useState(false) 
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("")  
  const navitage = useNavigate();
  const {dispatch}= useContext(AuthContext)
 
 
  const handleLogin=(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    dispatch({type: "LOGIN",payload: user})
    navitage("/")
    // ...
  })
  .catch((error) => {
   setError(true);
    // ..
  });
  }
  return (
    <div className="login">
      <form onSubmit={handleLogin} >
        <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <button type="submit">Login</button>
        {error &&<span>Email hoặc mật khẩu chưa đúng!</span>}
      </form>
    </div>
  )
}

export default Login