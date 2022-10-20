import React from 'react';
import { useSignInWithGoogle, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';


const Login = () => {
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const { register, handleSubmit, formState: { errors }, } = useForm();

    // Google signin User check 
    if (guser) {
        console.log(guser);
    }


    // Sign in wiht email and password 
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    }
    if (user) {
        console.log(user);
    }

    if (loading || gloading) {
        return <Loading></Loading>
    }

    if (error || gerror) {
        toast(<span className='text-red-500'>{error?.message || gerror?.message}</span>)
    }
    return (
        <section className=' flex justify-center items-center min-h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-3xl">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Label  */}
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        {/* Emial inpust field  */}
                        <input type="email" placeholder="Email" className="input input-bordered w-full " {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Please provide a valid email'
                            }
                        })} />
                        {/* Validation message  */}
                        <label className="label">
                            {
                                errors.email?.type === 'required' &&
                                <span className="label-text-alt text-red-500">{errors.email.message}</span>
                            }
                            {
                                errors.email?.type === 'pattern' &&
                                <span className="label-text-alt text-red-500">{errors.email.message}</span>
                            }
                        </label>

                        {/* Password Field, label and validation message   */}
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="input input-bordered w-full  " {...register("password", {
                            required: {
                                value: true,
                                message: 'Password is Required'
                            },
                            pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
                            }
                        })} />
                        {/* Validation message  */}
                        <label className="label">
                            {
                                errors.password?.type === 'required' &&
                                <span className="label-text-alt text-red-500">{errors.password.message}</span>
                            }
                            {
                                errors.password?.type === 'pattern' &&
                                <span className="label-text-alt text-red-500">{errors.password.message}</span>
                            }
                        </label>
                        <input type="submit" value="Login" className="btn w-full mt-5" />
                    </form>
                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline w-full "
                    >Continue with Google</button>
                </div>
            </div>
        </section>
    );
};

export default Login;