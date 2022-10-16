import React from 'react';

const Review = ({ review }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10 flex lg:justify-evenly">
                <img src={review.img} alt="Shoes" className="rounded-xl" />
                <div>
                    <h2 className="card-title">{review.name}</h2>
                    <p>{review.state}</p>
                </div>
            </figure>
            <div className="card-body items-center text-center">
                <p>{review.des}</p>
            </div>
        </div>
    );
};

export default Review;