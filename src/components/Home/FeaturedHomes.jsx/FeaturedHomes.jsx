const FeaturedHomes = () => {
    return (
        <div className='md:w-full flex md:flex-row flex-col justify-evenly gap-4'>
            {/* simple */}
            <div className="card bg-base-100 md:w-96 shadow-xl">
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
            <div className="card bg-base-100 md:w-96 shadow-xl">
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
            <div className="card bg-base-100 md:w-96 shadow-xl">
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
    );
};

export default FeaturedHomes;