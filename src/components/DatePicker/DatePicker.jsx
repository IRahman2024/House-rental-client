/*
Tue Mar 04 2025.toLocaleDateString() => "3/31/2021"
Tue Mar 04 2025.toDateString() => "Wed Mar 31 2021"

*/


import { useContext, useEffect, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const DatePicker = ({ id }) => {
    const { user } = useContext(AuthContext);
    // Remove the TypeScript type annotation
    const defaultClassNames = getDefaultClassNames();
    const [selected, setSelected] = useState(null);
    const [userData, setUserData] = useState();
    const [reservedDates, setReservedDates] = useState();

    // function convertDate(dateString) {
    //     const [month, day, year] = dateString.split('/').map(Number);
    //     return `${year}, ${month - 1}, ${day}`; // Month is 0-indexed
    // }

    const fetchReservedDates = () => {
        axios.get(`http://localhost:3000/getReservedDates/${id}`)
            .then(res => setReservedDates(res.data))
            .catch(err => console.error("Error fetching reserved dates:", err));
    };

    // const rangeMatcher = {
    //     from: new Date(2025, 3, 1),
    //     to: new Date(2025, 3, 13)
    // };

    // const rangeMatcher2 = {
    //     from: new Date(2025, 2, 1),
    //     to: new Date(2025, 2, 13)
    // };

    const handleSchedule = async () => {
        const houseId = id;
        const firstName = userData?.firstName;
        const lastName = userData?.lastName;
        const userId = userData?._id;
        const image = userData?.profilePic;
        const userEmail = user?.email;
        // const { from, to } = selected;
        // const from = convertDate(selected?.from.toLocaleDateString());
        // const to = convertDate(selected?.to.toLocaleDateString());

        let from, to;

        if (selected?.from && selected?.to) {
            // User selected a range
            from = `${selected.from.getFullYear()}, ${selected.from.getMonth()}, ${selected.from.getDate()}`;
            to = `${selected.to.getFullYear()}, ${selected.to.getMonth()}, ${selected.to.getDate()}`;
        } else if (selected instanceof Date) {
            // User selected a single date
            from = to = `${selected.getFullYear()}, ${selected.getMonth()}, ${selected.getDate()}`;
        } else if (selected?.from) {
            // Edge case: Some versions of DayPicker might store a single selection in `from`
            from = to = `${selected.from.getFullYear()}, ${selected.from.getMonth()}, ${selected.from.getDate()}`;
        } else {
            alert("Invalid date selection.");
            return;
        }

        // console.log(houseId, userEmail, firstName, lastName, userId, image, from, to);

        axios.post('http://localhost:3000/addReservation', { houseId, userEmail, firstName, lastName, userId, image, from, to })
            .then(res => {
                alert('Reservation Successful!');
                setSelected(null);
                fetchReservedDates();
            })
            .catch(err => console.log(err));
    }

    const range = reservedDates?.map(date => {
        const fromParts = date.from.split(', ').map(Number);
        const toParts = date.to.split(', ').map(Number);

        return {
            from: new Date(fromParts[0], fromParts[1], fromParts[2]), // Month is zero-based
            to: new Date(toParts[0], toParts[1], toParts[2])  // Month is zero-based
        };
    });

    useEffect(() => {
        if (!user?.email) return;
        console.log('hit');

        axios.get(`http://localhost:3000/getId?email=${user.email}`)
            .then(res => setUserData(res.data))
        // axios.get(`http://localhost:3000/getReservedDates/${id}`)
        //     .then(res => setReservedDates(res.data))
        fetchReservedDates();
    }, [user?.email], handleSchedule);

    // console.log(range);
    console.log(range);


    // const handleSchedule = async () => {
    //     const houseId = id;
    //     const firstName = userData?.firstName;
    //     const lastName = userData?.lastName;
    //     const userId = userData?._id;
    //     const image = userData?.profilePic;
    //     // const { from, to } = selected;
    //     const from = convertDate(selected?.from.toLocaleDateString());
    //     const to = convertDate(selected?.to.toLocaleDateString());
    //     const userEmail = user?.email;
    //     // console.log(houseId, userEmail, firstName, lastName, userId, image, from, to);

    //     axios.post('http://localhost:3000/addReservation', { houseId, userEmail, firstName, lastName, userId, image, from, to })
    //         .then(res => {
    //             alert('Reservation Successful!');
    //             setSelected(null);
    //         })
    //         .catch(err => console.log(err));
    // }


    return (
        <div>
            {/* The button to open modal */}
            <label htmlFor="my_modal_6" className="btn">open modal</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <p className="text-2xl font-semibold mb-2 text-center">Select dates for your stay</p>
                    <DayPicker
                        mode="range"
                        disabled={[...(range || [])]}
                        animate max={30} min={1}
                        selected={selected}
                        onSelect={setSelected}
                        classNames={{
                            today: `border-amber-500`, // Add a border to today's date
                            selected: `bg-amber-500 border-amber-500 text-white`, // Highlight the selected day
                            root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
                            chevron: `${defaultClassNames.chevron} fill-amber-500` // Change the color of the chevron
                        }}
                        footer={
                            selected ? `Selected: ${selected?.from?.toDateString()} - ${selected?.to?.toDateString()}` : "Pick a day."
                        }
                    />

                    <div className="modal-action">
                        <button
                            onClick={() => setSelected(null)}
                            className="btn btn-error">Reset</button>
                        <label
                            onClick={() => handleSchedule()}
                            htmlFor="my_modal_6"
                            className="btn btn-success">Done</label>
                        <label htmlFor="my_modal_6" className="btn">Close!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatePicker;