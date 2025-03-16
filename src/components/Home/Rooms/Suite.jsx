import { useEffect, useState } from "react";
import { lineSpinner } from 'ldrs';
import { Link } from "react-router-dom";
import DatePicker from "../../DatePicker/DatePicker";

const Suite = () => {
    const [suites, setSuites] = useState([]);
    const [loader, setLoader] = useState(false);
    lineSpinner.register();

    useEffect(() => {
        setLoader(true);
        fetch('http://localhost:3000/allSuites')
            .then(res => res.json())
            .then(data => {
                setSuites(data)
                setLoader(false)
            })
    }, [])

    const handleScheDule = (id) => {
        console.log(id);

    }

    console.log(suites);

    return (
        <div className='grid m-6 md:grid-cols-3 justify-center gap-6'>
            {
                (loader) && <div className="fixed z-20 flex size-full items-center justify-center bg-white opacity-55">
                    <l-line-spinner
                        size="121"
                        stroke="6"
                        speed="1"
                        color="black"
                    ></l-line-spinner>
                </div>
            }
            {
                suites?.map((house, idx) => {
                    return (
                        <div key={idx}
                            className="relative card bg-base-100 md:w-full w-64 shadow-xl">
                            <figure>
                                <div className="absolute top-4 right-4 badge badge-error h-10 font-semibold">
                                    {house?.rent} BDT/day
                                </div>
                                <img
                                    src={house?.houseFront}
                                    alt="Apartment" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{house?.houseName}</h2>
                                <p className="truncate">{house?.description}</p>
                                <div className="card-actions justify-end">
                                    <Link
                                        to={`/details/${house?._id}/${house?.ownerId}`}
                                        className="btn btn-primary">Details</Link>
                                    <button
                                        onClick={() => handleScheDule(house?._id)}
                                        className="btn btn-outline btn-warning">Schedule For Rent</button>
                                        {/* <DatePicker></DatePicker> */}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Suite;