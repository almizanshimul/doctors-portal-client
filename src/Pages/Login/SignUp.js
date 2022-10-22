import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [token] = useToken(user || googleUser)
    const location = useLocation();
    let from = location?.state?.from?.pathname || '/'
    const navigate = useNavigate();


    useEffect(() => {
        if (token) {
            toast('Successfully Register Doctors portal');
            navigate(from, { replace: true })
        }
    }, [token, from, navigate])

    if (loading || googleLoading || updating) {
        return <Loading></Loading>
    }

    if (error || googleError || updateError) {
        toast(<span className='text-red-500'>{error?.message || googleError?.message || updateError?.message}</span>)
    }

    // Sign in with email and password 
    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name });
    }


    return (
        <section className=' flex justify-center items-center min-h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-3xl">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name field Label  */}
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        {/* Name Input field  */}
                        <input type="text" placeholder="Full Name" className="input input-bordered w-full " {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })} />
                        {/* Validation message  */}
                        <label className="label">
                            {
                                errors.name?.type === 'required' &&
                                <span className="label-text-alt text-red-500">{errors.name.message}</span>
                            }
                        </label>
                        {/* Email Label  */}
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        {/* Email input field  */}
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
                        <input type="submit" value="Register" className="btn w-full mt-5" />
                    </form>
                    <p>Already an Account? <Link to={'/login'} className='text-primary'>Please Login</Link></p>
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

export default SignUp;