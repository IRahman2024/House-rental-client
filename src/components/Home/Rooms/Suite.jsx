const Suite = () => {

    return (
        <div className='grid md:grid-cols-3 m-7 gap-6 justify-center'>
            {
                Array(12).fill().map((_, idx) => {
                    return (
                        <div
                            key={idx}
                            className="card bg-base-100 md:w-full w-64 shadow-xl">
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
                    )
                })
            }
            {/* <div className="card bg-base-100 md:w-96 w-64 shadow-xl">
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
            </div> */}
        </div>
    );
};

export default Suite;