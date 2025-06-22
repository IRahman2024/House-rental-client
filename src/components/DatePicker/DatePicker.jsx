/*
Tue Mar 04 2025.toLocaleDateString() => "3/31/2021"
Tue Mar 04 2025.toDateString() => "Wed Mar 31 2021"

*/


import { useContext, useEffect, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const DatePicker = ({ id, houseName, url, owner, rent, type }) => {
    const { user } = useContext(AuthContext);
    // Remove the TypeScript type annotation
    const defaultClassNames = getDefaultClassNames();
    const [selected, setSelected] = useState(null);
    const [userData, setUserData] = useState();
    const [reservedDates, setReservedDates] = useState();
    const [totalRent, setTotalRent] = useState(0);
    const [nightsCount, setNightsCount] = useState(0);
    const [hasOverlap, setHasOverlap] = useState(false);
    const [overlapMessage, setOverlapMessage] = useState("");

    // function convertDate(dateString) {
    //     const [month, day, year] = dateString.split('/').map(Number);
    //     return `${year}, ${month - 1}, ${day}`; // Month is 0-indexed
    // }

    const fetchReservedDates = () => {
        axios.get(`http://localhost:5000/getReservedDates/${id}`)
            .then(res => setReservedDates(res.data))
            .catch(err => console.error("Error fetching reserved dates:", err));
    };

    // Calculate the number of days between two dates (inclusive)
    const calculateDaysDifference = (fromDate, toDate) => {
        if (!fromDate || !toDate) return 0;

        // Clone the dates to avoid modifying the original objects
        const start = new Date(fromDate);
        const end = new Date(toDate);

        // Set hours to noon to avoid DST issues
        start.setHours(12, 0, 0, 0);
        end.setHours(12, 0, 0, 0);

        // Calculate the difference in milliseconds and convert to days
        const diffInTime = end.getTime() - start.getTime();
        const diffInDays = Math.round(diffInTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days

        return diffInDays;
    };

    // Check if a date is within a range
    const isDateInRange = (date, rangeStart, rangeEnd) => {
        return date >= rangeStart && date <= rangeEnd;
    };

    // Check if two date ranges overlap
    const doRangesOverlap = (range1Start, range1End, range2Start, range2End) => {
        return (
            isDateInRange(range1Start, range2Start, range2End) ||
            isDateInRange(range1End, range2Start, range2End) ||
            isDateInRange(range2Start, range1Start, range1End) ||
            isDateInRange(range2End, range1Start, range1End)
        );
    };

    // Check if selected dates overlap with reserved dates
    const checkForOverlaps = () => {
        if (!selected || !selected.from || !selected.to || !reservedDates || reservedDates.length === 0) {
            setHasOverlap(false);
            setOverlapMessage("");
            return false;
        }

        const selectedStart = new Date(selected.from);
        const selectedEnd = new Date(selected.to);
        selectedStart.setHours(0, 0, 0, 0);
        selectedEnd.setHours(0, 0, 0, 0);

        // Convert reserved dates to Date objects
        const reservedRanges = reservedDates.map(date => {
            const fromParts = date.from.split(', ').map(Number);
            const toParts = date.to.split(', ').map(Number);

            const fromDate = new Date(fromParts[0], fromParts[1], fromParts[2]);
            const toDate = new Date(toParts[0], toParts[1], toParts[2]);

            fromDate.setHours(0, 0, 0, 0);
            toDate.setHours(0, 0, 0, 0);

            return { from: fromDate, to: toDate };
        });

        // Check for overlaps with each reserved range
        for (const range of reservedRanges) {
            if (doRangesOverlap(selectedStart, selectedEnd, range.from, range.to)) {
                const conflictStart = new Date(Math.max(selectedStart.getTime(), range.from.getTime()));
                const conflictEnd = new Date(Math.min(selectedEnd.getTime(), range.from.getTime()));

                setHasOverlap(true);
                setOverlapMessage(`Your selection overlaps with already reserved dates. Please choose different dates.`);
                return true;
            }
        }

        setHasOverlap(false);
        setOverlapMessage("");
        return false;
    };

    // Calculate total rent whenever selected dates change
    useEffect(() => {
        if (selected && rent) {
            let days = 0;

            if (selected.from && selected.to) {
                // Range selection
                days = calculateDaysDifference(selected.from, selected.to);
                // Check for overlaps with reserved dates
                checkForOverlaps();
            } else if (selected instanceof Date) {
                // Single day selection
                days = 1;
            } else if (selected.from) {
                // Some versions might store a single selection in from
                days = 1;
            }

            setNightsCount(days);
            setTotalRent(days * rent);
        } else {
            setNightsCount(0);
            setTotalRent(0);
            setHasOverlap(false);
            setOverlapMessage("");
        }
    }, [selected, rent, reservedDates]);

    // this is the format to disable a range of dates
    // disable = {[rangeMatcher, rangeMatcher2]} this attribute is used in DayPicker component to disable a range of dates

    // const rangeMatcher = {
    //     from: new Date(2025, 3, 1),
    //     to: new Date(2025, 3, 13)
    // };

    // const rangeMatcher2 = {
    //     from: new Date(2025, 2, 1),
    //     to: new Date(2025, 2, 13)
    // };

    const handleSchedule = async () => {

        // Don't proceed if there are overlaps
        if (hasOverlap) {
            alert("Cannot make reservation due to conflicts with already reserved dates.");
            return;
        }

        const houseId = id;
        const firstName = userData?.firstName;
        const lastName = userData?.lastName;
        const userId = userData?._id;
        const image = userData?.profilePic;
        const userEmail = user?.email;
        const ownerEmail = owner?.email;
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

        console.log(houseId, houseName, userEmail, firstName, lastName, userId, image, from, to, url, ownerEmail, totalRent, nightsCount, type);
        // console.log(nightsCount);

        axios.post('http://localhost:5000/addReservation', { houseId, houseName, type, userEmail, firstName, lastName, userId, image, from, to, url, ownerEmail, totalRent, nightsCount })
            .then(res => {
                alert('Reservation Successful! Please pay from dashboard to confirm your reservation.');
                setSelected(null);
                setTotalRent(0);
                setNightsCount(0);
                setHasOverlap(false);
                setOverlapMessage("");
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

        axios.get(`http://localhost:5000/getId?email=${user.email}`)
            .then(res => setUserData(res.data))
        // axios.get(`http://localhost:5000/getReservedDates/${id}`)
        //     .then(res => setReservedDates(res.data))
        fetchReservedDates();
    }, [user?.email], handleSchedule);

    // console.log(range);
    // console.log(range);


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

    //     axios.post('http://localhost:5000/addReservation', { houseId, userEmail, firstName, lastName, userId, image, from, to })
    //         .then(res => {
    //             alert('Reservation Successful!');
    //             setSelected(null);
    //         })
    //         .catch(err => console.log(err));
    // }

    // Calculate and display the rental period and total rent
    const getRentalPeriodText = () => {
        if (!selected) return "Pick a day.";

        let daysCount = 0;
        let fromText = "", toText = "";

        if (selected.from && selected.to) {
            fromText = selected.from.toDateString();
            toText = selected.to.toDateString();
            daysCount = calculateDaysDifference(selected.from, selected.to);
        } else if (selected instanceof Date) {
            fromText = toText = selected.toDateString();
            daysCount = 1;
        } else if (selected.from) {
            fromText = toText = selected.from.toDateString();
            daysCount = 1;
        }

        return `Selected: ${fromText} - ${toText} (${daysCount} day${daysCount !== 1 ? 's' : ''})`;
    };


    return (
        <div>
            {/* The button to open modal */}
            <label htmlFor="my_modal_6" className="btn btn-warning btn-outline mt-2">Schedule for days</label>

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
                        // footer={
                        //     selected ? `Selected: ${selected?.from?.toDateString()} - ${selected?.to?.toDateString()}` : "Pick a day."
                        // }
                        footer={getRentalPeriodText()}
                    />

                    {/* Display calculated total rent */}
                    {totalRent > 0 && (
                        <div className="mt-4 text-center">
                            <p className="text-xl font-bold">Total Rent: ${totalRent}</p>
                            <p className="text-sm text-gray-500">
                                (${rent} per night × {nightsCount} night{nightsCount !== 1 ? 's' : ''})
                            </p>
                        </div>
                    )}

                    {/* Display overlap warning */}
                    {hasOverlap && (
                        <div className="mt-4 text-center">
                            <p className="text-xl font-bold text-red-500">Warning!</p>
                            <p className="text-sm text-red-500">{overlapMessage}</p>
                        </div>
                    )}

                    <div className="modal-action">
                        <button
                            onClick={() => {
                                setSelected(null);
                                setTotalRent(0);
                                setNightsCount(0);
                            }}
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