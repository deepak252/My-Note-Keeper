import React,{useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import "./SignUp.scss";
import {signUpUsingEmailAndPassword} from '../services/firebaseAuthService';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import {Link} from "react-router-dom";
const SignUp = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, watch, formState:{errors}} = useForm();
    const [user,loadingAuthState, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(false);

    

    useEffect(() => {
        setLoading(true);  
        console.log("Current user = ",user);
        console.log("Loading = ", loadingAuthState);
        if (loadingAuthState) return;
        if (user){
            console.log("User is signed in");
            return navigate("/");
        }
        setLoading(false);  
    }, [user, loadingAuthState]);

    // Create new account
    const onSubmit = async (data) =>{
        console.log(data);
        const {name, email, password}  = data;
        // await signupUsingEmailAndPassword(name.trim(), email, password);
        await signUpUsingEmailAndPassword({name,email,password});
    }


    return (
        <div id = "Sign-Up">
            <form noValidate className="Form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign Up</h2>
                <div className="Field">
                    <label htmlFor="Name">Name</label>
                    <input 
                        id="Name"
                        type="text" 
                        placeholder="Enter name"
                        {
                            ...register("name",{
                                required : true,
                                pattern : /^[a-zA-Z ]{2,30}$/,
                                validate : ()=>{
                                    if(watch("name").trim().length===0){
                                        return false;
                                    }
                                }
                            })
                        }
                    />
                    {errors.name && errors.name.type==="required" && <span className="Error">Name can't be empty</span>}
                    {errors.name && errors.name.type==="validate" && <span className="Error">Invalid name</span>}
                    {errors.name && errors.name.type==="pattern" && <span className="Error">Invalid name</span>}
                
                </div>
                <div className="Field">
                    <label htmlFor="Email">Email</label>
                    <input 
                        id="Email"
                        type="email" 
                        placeholder="Enter e-mail"
                        {
                            ...register("email",{
                                required : true,
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })
                        }
                        
                    />
                    {errors.email && errors.email.type==="required" && <span className="Error">Email can't be empty</span>}
                    {errors.email && errors.email.type==="pattern" && <span className="Error">Invalid email</span>}
                
                </div>
                <div className="Field">
                    <label htmlFor="Password">Password</label>
                    <input 
                        id="Password"
                        type="password" 
                        placeholder="Enter password"
                        {
                            ...register("password",{
                                required : true,
                                minLength: 4,
                                
                            })
                    
                        }
                        
                    />
                    {errors.password && errors.password.type==="required" && <span className="Error">Password can't be empty</span>}
                    {errors.password && errors.password.type==="minLength" && <span className="Error">At least 4 characters required</span>}
                </div>
                <div className="Field">
                    <label htmlFor="Confirm-Password">Confirm Password</label>
                    <input 
                        id="Confirm-Password"
                        type="password" 
                        placeholder="Enter confirm password"
                        {
                            ...register("confirmPassword",{
                                // required : true,
                                validate:()=>{
                                    if(watch("password")!=watch("confirmPassword")){
                                        return false;                                        
                                    }
                                }
                            })
                    
                        }
                        
                    />
                    {errors.confirmPassword && errors.confirmPassword.type==="validate" && <span className="Error">Password not match</span>}
                </div>
                {/* <button onClick={()=>{console.log(auth.currentUser)}}>CURRENT USER</button> */}
                <input className="Btn-Submit" type="submit" value="SUBMIT" />
                <p style={{textAlign:"center"}}>
                    Already have an account?<br/>  <Link to="/signin">Log In</Link> now.
                </p>
            </form>
        </div>
    )
}

export default SignUp;

