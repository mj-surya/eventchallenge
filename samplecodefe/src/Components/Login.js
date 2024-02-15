import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();


    const login = (event)=>{
        event.preventDefault();
        axios.post("http://localhost:5103/api/User/login",{
            email: username,
            password:password
        }).then( async(myData)=>{
          toast.success("Login Successfull...");
            var token = await myData.data.token;
            var role = await myData.data.role;
            await localStorage.setItem("token",token);
            await localStorage.setItem("role",role);
            await localStorage.setItem("id",myData.data.email);
            await localStorage.setItem("name",myData.data.name);
            setTimeout(function(){
              window.location.reload();
            },5000);
            navigate("/Home");
        })
        .catch((err)=>{
            toast.error(err.response.data);
        })        
    }


    return(
        <div class="addbook">
            <form onSubmit={login}>
              <div class="form">
                  <div class="title">Welcome Back</div>
                  <div class="subtitle">Login to your account</div>
                  <div class="input-container ic2">
                    <input id="email" class="input" required type="email" placeholder="Email" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                  </div>
                  <div class="input-container ic2">
                    <input id="password" class="input" required type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                  </div>
                  <button type="submit" class="submit">Login</button>
                  <div class="text-center choice fs-6">
         or <Link to="/Register" class="choice">Sign up</Link>
        </div>
              </div>
            </form>
            
          </div>
    );
}
export default Login;