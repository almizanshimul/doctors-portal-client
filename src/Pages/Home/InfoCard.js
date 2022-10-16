import React from 'react';


const InfoCard = ({CardTitle, des, img, bg}) => {
    return (
        <div className={`card lg:card-side shadow-xl p-5 text-white ${bg}`}>
            <figure><img src={img} alt="Album" /></figure>
            <div className="card-body">
                <h2 className="card-title font-bold">{CardTitle}</h2>
                <p>{des}</p>

            </div>
        </div>
    );
};

export default InfoCard;