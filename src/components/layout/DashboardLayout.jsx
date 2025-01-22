import { nav } from "motion/react-m";
import { useState } from "react";
import { LayoutDashboard, BellRing, MailWarning, House, ChevronsRight  } from 'lucide-react';

const DashboardLayout = () => {

    return (
        <div className="flex w-full text-black text-3xl font-semibold">
            {/* <div className="min-h-screen w-1/5 p-5 border-4 border-red-500 bg-white">sidebar</div> */}
            <Sidebar />
            <Content />
        </div>
    );
};

// individual sidebar component code
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(!false);
    const [selected, setSelected] = useState("dashboard");
    const [notifs, setNotifs] = useState(5);

    const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
        return (
            <button
                onClick={() => setSelected(title)}
                className={`relative flex h-10 w-full items-center gap-2 hover:bg-slate-300 hover:text-black rounded-md transition-colors ${selected === title ? 'bg-indigo-100 text-indigo-500' : 'text-slate-500 hover:bg-sky-400'}`}>
                <div className="grid h-full w-10 text-lg place-content-center">
                    <Icon />
                </div>
                {
                    open &&
                    <span className="text-sm font-md">
                        {title}
                    </span>
                }
                {
                    notifs && isOpen && (
                        <div
                            // style={{ transform: 'translateY(-50%)' }}
                            className="badge badge-primary"
                        >
                            {notifs}
                        </div>
                    )
                }
            </button>
        )
    };

    return (
        <nav className={`min-h-screen w-1/5 p-5 border-4 border-red-500 bg-white
        ${isOpen ? 'md:w-1/5 w-36' : 'w-20'}`}>
            <TitleSection isOpen={isOpen} />
            <div className="space-y-1">
                <Option
                    Icon={LayoutDashboard}
                    title="Dashboard"
                    selected={selected}
                    setSelected={setSelected}
                    isOpen={isOpen}
                />
                <Option
                    Icon={House}
                    title="home"
                    selected={selected}
                    setSelected={setSelected}
                    isOpen={isOpen}
                />
                <Option
                    Icon={BellRing}
                    title="Notifications"
                    selected={selected}
                    setSelected={setSelected}
                    isOpen={isOpen}
                    notifs={notifs}
                />
                <Option
                    Icon={MailWarning}
                    title="Complains"
                    selected={selected}
                    setSelected={setSelected}
                    isOpen={isOpen}
                    notifs={2}
                /> 
            </div>
            <ToggleClose isOpen={isOpen} setIsOpen={setIsOpen} />
        </nav>
    );
};

const Content = () => {
    return (
        <div className="flex-1 bg-slate-400">
            content
        </div>
    )
};

const TitleSection = ({ isOpen }) => {
    return (
        <div className="mb-3 border-b border-slate-500 pb-3">
            <div className="flex items-center justify-between hover:bg-slate-300 rounded-md transition-colors p-1">
                <div className="flex items-center gap-2">
                    <img
                        className="md:w-12 w-8"
                        src="/home-icon-silhouette.png" alt="" />
                    {
                        isOpen && (<div>
                            <span className="md:text-xl text-sm font-bold block md:font-semibold text-blue-600">Rent-home</span>
                            <span className="md:text-xs text-[12px] block md:font-bold">Dashboard</span>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
};

const ToggleClose = ({ isOpen, setIsOpen }) => {
    return (
        <button
            onClick={() => setIsOpen((pv) => !pv)}
            className="absolute bottom—0 left—0 right—0 border—t border-slate-300
transition—colors
hover:bg-slate-300"
        >
            <div className="flex items-center p-4">
                <div
                className="grid size-10 place-content-center text-lg"
                ><ChevronsRight 
                className={`transition-transform ${isOpen && 'rotate-180'}`}
                /></div>
                {isOpen && <span className="text-xs font-semibold">Hide</span>}
            </div>
        </button>
    )
};

const Option = ({ Icon, title, selected, setSelected, isOpen, notifs }) => {
    return (
        <button className={`btn relative flex h-10 w-full items-center gap-2 hover:bg-slate-300 rounded-md transition-colors ${selected === title ? 'bg-indigo-100 text-indigo-500' : 'text-slate-500 hover:bg-slate-900'}`}>
            <div className="grid h-full w-10 text-lg place-content-center">
                <Icon />
            </div>
        </button>
    )
};

export default DashboardLayout;
