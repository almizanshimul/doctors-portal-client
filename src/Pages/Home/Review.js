import React from 'react';

const Review = ({ review }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10 flex" style={{justifyContent: 'space-evenly'}}>
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