import React from 'react';

const ServiceCard = ({cardTitle, cardDes, img}) => {
    return (
        <div className="card shadow-md">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{cardTitle}</h2>
                <p>{cardDes}</p>
            </div>
        </div>
    );
};

export default ServiceCard;