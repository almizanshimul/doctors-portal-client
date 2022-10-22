import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const { data: services, isLoading } = useQuery('services', () =>
        fetch('http://localhost:4500/services-name')
            .then(res => res.json())
    )


    /**
     * 3 ways to store images
     * 1. third party storage (Free open public storage is ok for practice)
     * 2. Your own storage in your own server (file system) 
     * 3. Database: MongoDB
     * 
     * YUP : to validate file : 
    */


    const imageStorageKey = '8d24c83bdbdf20b6fa5e811fff81c977'
    const onSubmit = async data => {
        // console.log(data);
        const image = data.image[0]

        const formData = new FormData()
        formData.append('image', image)

        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const imgurl = result.data.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: imgurl
                    }
                    // send to your database
                    fetch('http://localhost:4500/doctor', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('Doctor Added Successfully')
                                reset();
                            }
                            else {
                                toast.error('Failed to add the doctor')
                            }
                        })
                }
                else {
                    toast.error('Image upload field')
                }
            })

    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-3xl text-center">Doctor</h2>
            <div className='w-6/12 mx-auto'>
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

                    {/* Specialty field Label  */}
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register("specialty")} className="select select-bordered w-full">
                        {
                            services.map(service => <option key={service._id} value={service.name}>{service.name}</option>)
                        }
                    </select>


                    {/* File Upload field Label  */}
                    <label className="label">
                        <span className="label-text">Please enter your profile photo</span>
                    </label>
                    {/* File Upload Input field  */}
                    <input type="file" className="input w-full " {...register("image", {
                        required: {
                            value: true,
                            message: 'Profile picture is Required'
                        }
                    })} />
                    {/* Validation message  */}
                    <label className="label">
                        {
                            errors.image?.type === 'required' &&
                            <span className="label-text-alt text-red-500">{errors.image.message}</span>
                        }
                    </label>

                    <input type="submit" value="Add Doctor" className="btn w-full mt-5" />
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;