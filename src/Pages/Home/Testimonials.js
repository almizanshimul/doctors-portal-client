import React from 'react';
import quote from '../../assets/icons/quote.svg'
import Review from './Review'
import people1 from '../../assets/images/people1.png'
import people2 from '../../assets/images/people2.png'
import people3 from '../../assets/images/people3.png'

const Testimonials = () => {
    const Reviews = [
        {
            id: 1,
            name: 'Winson Herry',
            review: '',
            img: people1,
            des: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias, deleniti.',
            state: 'California'
        },
        {
            id: 2,
            name: 'Winson Herry',
            review: '',
            img: people2,
            des: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias, deleniti.',
            state: 'California'
        },
        {
            id: 3,
            name: 'Winson Herry',
            review: '',
            img: people3,
            des: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias, deleniti.',
            state: 'California'
        },
    ]
    return (
        <section className='mx-20'>
            <div className='flex justify-between items-center'>
                <div>
                    <h4 className="text-xl text-primary font-bold">Testimonial</h4>
                    <h2 className='text-3xl'>What Our Patients Says</h2>
                </div>
                <div>
                    <img src={quote} alt="" className='w-24 lg:w-48' />
                </div>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-between my-5'>
                {
                    Reviews.map(review => <Review
                    key={review.id}
                    review={review}
                    ></Review>)
                }
            </div>
        </section>
    );
};

export default Testimonials;