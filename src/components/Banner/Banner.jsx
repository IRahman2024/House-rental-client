import './style.css';

const Banner = () => {
    return (
        <div
            className="hero min-h-screen rounded-3xl mb-5"
            style={{
                backgroundImage: "url(/banner-image-1.jpg)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md text-white">
                    <h1 className="mb-5 md:text-5xl text-3xl font-bold">Hello there</h1>
                    <p className="mb-5 md:text-2xl text-sm">
                        Welcome to your favorite destination <br /> to find home
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;