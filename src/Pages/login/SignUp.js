import React from 'react';
import { useCreateUserWithEmailAndPassword,  useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from '../shared/Loading';
import useToken from '../../hooks/useToken';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [updateProfile, updating, updateError] = useUpdateProfile(auth);
      const[token]=useToken(gUser||user)
      const navigate =useNavigate()

      let signInError;
      if(loading || gLoading || updating){
       return <Loading></Loading>
      }

      if( error || gError || updateError){
          signInError=<p className="text-red-500">{error?.message || gError?.message || updateError?.message}</p>
      }
    if (token) {
        navigate('/appointment')
    }
    const onSubmit = async data => {
        console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({displayName:data.name});
        console.log('update done');
        // navigate('/appointment')
    }
    return (
        <div className='flex h-screen justify-center items-center'>
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-center text-2xl font-bold">SIGN UP</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                           
                        </label>
                        <input 
                        type="text" 
                        placeholder="please enter your name" 
                        className="input input-bordered w-full max-w-xs" 
                        {...register("name", {
                            required:{
                              value:true,
                              message:"name is required",
                            },
                           
                          })} 
                        />
                        <label className="label">
                          {errors.name?.type === 'required' &&  <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>
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
                    <input className='btn w-full max-w-xs' type="submit" value="Sign Up" />
                </form>
                <p>Already have an account? <Link className="text-primary" to ='/login'>please login</Link></p>
                <div className="divider">OR</div>
                <button onClick={() => signInWithGoogle()} 
                className="btn btn-outline">
                Continue With Google</button>
            </div>
        </div>
    </div>
    );
};

export default SignUp;