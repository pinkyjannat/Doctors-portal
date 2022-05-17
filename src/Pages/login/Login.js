import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from '../shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';



const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      let signInError;
      const navigate =useNavigate();
      const location =useLocation();
      let from = location.state?.from?.pathname || "/";

    useEffect(() =>{
        if(user || gUser){
            navigate (from,{replace:true});
        }
    },[user,gUser,from,navigate])

      if(loading || gLoading){
       return <Loading></Loading>
      }

      if( error || gError){
          signInError=<p className="text-red-500">{error?.message || gError?.message}</p>
      }
    if (gUser || user) {
       navigate(from,{replace:true});
    }
    const onSubmit = data => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password);
    }
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">LOGIN</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                               
                            </label>
                            <input 
                            type="email" 
                            placeholder="your email" 
                            className="input input-bordered w-full max-w-xs" 
                            {...register("email", {
                                required:{
                                  value:true,
                                  message:"email is required",
                                },
                                pattern: {
                                  value: /[a-z0-9]+\.[a-z]{2,3}/,
                                  message: 'please provide a valid email' 
                                }
                              })} 
                            />
                            <label className="label">
                              {errors.email?.type === 'required' &&  <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                              {errors.email?.type === 'pattern' &&  <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">password</span>
                            </label>
                            <input 
                            type="password" 
                            placeholder="your password" 
                            className="input input-bordered w-full max-w-xs" 
                            {...register("password", {
                                required:{
                                  value:true,
                                  message:"password is required",
                                },
                                minLength: {
                                  value: 6,
                                  message: 'must be 6 character or longer' 
                                }
                              })} 
                            />
                            <label className="label">
                              {errors.password?.type === 'required' &&  <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                              {errors.password?.type === 'minLength' &&  <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                
                            </label>
                        </div>
                        {signInError}
                        <input className='btn w-full max-w-xs' type="submit" value="Login" />
                    </form>
                    <p>New to Doctors portal <Link className="text-primary" to ='/signup'>create a new account</Link></p>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} 
                    className="btn btn-outline">
                    Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;