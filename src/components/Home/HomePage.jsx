import React from 'react';
import Banner from '../Banner/Banner';

const HomePage = () => {
    return (
        <div className="mx-28">
            {/* Offers */}
            <div>
                <Banner></Banner>
            </div>
            {/* Describe beneits */}
            <p className="text-3xl font-bold my-6">Here will be discussing benefits of renters why they should choose this</p>
            {/* Featured House */}
            <p className="text-3xl font-bold my-6">Here will be some of the most popular houses</p>
            {/* different house */}
            <div className='w-full flex justify-evenly gap-4'>
                {/* simple */}
                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="/simple-1.jpeg"
                            alt="simple rooms" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Simple House demo</h2>
                        <p>Demo description</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Details</button>
                            <button className="btn btn-outline btn-warning">Schedule For Rent</button>
                        </div>
                    </div>
                </div>
                {/* suite */}
                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="/suite-1.jpeg"
                            alt="Suite" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Demo Suite</h2>
                        <p>Demo description</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Details</button>
                            <button className="btn btn-outline btn-warning">Schedule For Rent</button>
                        </div>
                    </div>
                </div>
                {/* duplex */}
                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="/duplex-1.jpeg"
                            alt="duplex" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Demo Duplex</h2>
                        <p>Demo description</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Details</button>
                            <button className="btn btn-outline btn-warning">Schedule For Rent</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* testimonials */}
            <p className="text-3xl font-bold my-6">Here will be some testimonials of customers</p>
            {/* Rent your house now */}
            <p className="text-3xl font-bold my-6">Here we will Ask to join a owner</p>
        </div>
    );
};

export default HomePage;