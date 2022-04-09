import { useForm } from 'react-hook-form';
import "./SignIn.scss";
import {Link } from "react-router-dom";
import React,{useState, useEffect} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import { signInUsingEmailAndPassword } from '../services/firebaseAuthService';


const SignIn = () => {
    const navigate = useNavigate();
    const {register, handleSubmit,watch, formState:{errors}} = useForm();
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

    // Sign In 
    const onSubmit = async (data) =>{        
        setLoading(true);
        await signInUsingEmailAndPassword(data.email,data.password);
        setLoading(false);
        
    }

    return (
        <div id = "Sign-In">
          
            <form noValidate className="Form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign In</h2>
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
                    {/* {errors.password && errors.password.type==="minLength" && <span className="Error">At least 4 characters required</span>} */}
                </div>

                
                <input className="Btn-Submit" type="submit" value="SUBMIT" />
                <p style={{textAlign:"center"}}>
                    Don't have an account?<br/> <Link to="/signup">Create New Account</Link> now.
                </p>
            </form>
        </div>
    )
}

export default SignIn;

