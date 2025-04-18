import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const Transactions = () => {
    const { user } = useContext(AuthContext);
    // const [datas, setDatas] = useState();
    const [reservations, setReservations] = useState();
    const [transactions, setTransactions] = useState();
    const [refetch, setRefetch] = useState(prev => !prev);
    console.log(transactions);
    

    function convertDateString(dateString) {
        if (!dateString) return "Invalid Date";

        const [year, month, day] = dateString.split(', ').map(Number);
        const date = new Date(year, month, day); // Fix month indexing

        if (isNaN(date.getTime())) {
            console.error("Invalid Date:", dateString);
            return "Invalid Date";
        }

        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }

    const handlePayment = (id) => {
        axios.post(`http://localhost:3000/myPayment/${id}`)
            .then((res) => {
    
                // Open the payment URL in a new tab
                const newTab = window.open(res.data.url, '_blank');
    
                // Check periodically if the new tab is closed
                const checkTabClosed = setInterval(() => {
                    if (newTab.closed) {
                        clearInterval(checkTabClosed);
                        
                        // Execute the next block after the tab is closed
                        setRefetch(!refetch);
                        alert(`Payment successful!`);
                        // console.log(res);
                    }
                }, 1000); // Check every second
            })
            .catch(err => console.error("Error in payment process:", err));
    };
    

    useEffect(() => {
        if (!user?.email) return; // Ensure email exists before fetching

        axios.get(`http://localhost:3000/getDues/${user?.email}`)
            .then(res => {
                // setDatas(res.data);
                const convertedDatas = res.data.map(data => ({
                    ...data,
                    from: convertDateString(data.from),
                    to: convertDateString(data.to),
                }));
                setReservations(convertedDatas);
            })
            .catch(err => console.error("Error fetching data:", err));

        axios.get(`http://localhost:3000/transactions/${user?.email}`)
            .then(res => {
                // setDatas(res.data);
                const convertedDatas = res.data.map(data => ({
                    ...data,
                    from: convertDateString(data.paymentData.from),
                    to: convertDateString(data.paymentData.to),
                }));
                setTransactions(convertedDatas);
            })
            .catch(err => console.error("Error fetching data:", err));
    }, [user?.email, refetch]);

    // console.log(reservations);

    return (
        <div className="m-4 w-full">
            {/* this is payment section */}
            {/* list of dues */}
            <div className="w-full">
                <p className="font-bold text-3xl">Payment Due</p>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full mt-4">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>HouseName</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Stays</th>
                                <th>Total Rent</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reservations?.map((reservation, idx) => (
                                    <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td>{reservation?.houseName}</td>
                                        <td>{reservation?.from}</td>
                                        <td>{reservation?.to}</td>
                                        <td>{reservation?.nightsCount}</td>
                                        <td>{reservation?.totalRent} BDT</td>
                                        <td>
                                            <button
                                                onClick={() => handlePayment(reservation?._id)}
                                                className="btn btn-sm btn-success"
                                            >
                                                Pay
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* list of Transaction */}
            <div className="w-full">
            <p className="font-bold text-3xl">Transaction History</p>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full mt-4">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>HouseName</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Paid on</th>
                                <th>Transaction Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactions?.map((transactions, idx) => (
                                    <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td>{transactions?.paymentData?.houseName}</td>
                                        <td>{transactions?.from}</td>
                                        <td>{transactions?.to}</td>
                                        <td>{transactions?.data?.payment_date}</td>
                                        <td>{transactions?.data?.tran_id}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;