import MyLineChart from "./LineChart";

const Charts = () => {
    return (
        <div className="m-4 w-1/2">
            <div>
                <p className="text-4xl font-bold mb-5">Annual Income</p>
            </div>
            <MyLineChart></MyLineChart>
        </div>
    );
};

export default Charts;