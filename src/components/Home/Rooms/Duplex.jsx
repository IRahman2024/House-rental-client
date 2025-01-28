const Duplex = () => {
    return (
        <div className="grid m-6 md:grid-cols-3 justify-center gap-6">
            {
                Array.from({ length: 12 }).map((_, idx) => {
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
        </div>
    );
};

export default Duplex;