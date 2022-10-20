import React, { useEffect } from 'react';
import { useSignInWithGoogle, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location?.state?.from?.pathname || '/'

    useEffect(() => {
        if (user || googleUser) {
            toast('User Successfully Login');
            // console.log(user);
            navigate(from, { replace: true })
        }
    }, [user, googleUser, from, navigate])

    if (loading || googleLoading) {
        return <Loading></Loading>
    }

    if (error || googleError) {
        toast(<span className='text-red-500'>{error?.message || googleError?.message}</span>)
    }

    // Sign in wiht email and password 
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
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
                    <p>New to Doctors Portal <Link to={'/signup'} className='text-primary'>Create New Account</Link></p>
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