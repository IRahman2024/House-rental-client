import './style.css'

const TestimonialSlide = () => {

    const testimonials = [
        {
            name: "Emma Carter",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            occupation: "Graphic Designer",
            testimonial: "Found my dream rental in days! The platform is intuitive, and the support team answered every question promptly."
        },
        {
            name: "Carlos Mendez",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            occupation: "Chef",
            testimonial: "Your site made relocating smooth. Loved the high-quality photos and detailed neighborhood guides!"
        },
        {
            name: "Aisha Khan",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            occupation: "Freelance Writer",
            testimonial: "Affordable options and zero hidden fees? Finally, a rental site that prioritizes transparency!"
        },
        {
            name: "Tom Reynolds",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            occupation: "Retired Teacher",
            testimonial: "Secured a pet-friendly home with a backyard effortlessly. The saved-search feature is a game-changer!"
        },
        {
            name: "Priya Sharma",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            occupation: "Software Engineer",
            testimonial: "From virtual tours to quick lease signing, this platform nailed the modern rental experience."
        },
        {
            name: "Jake Nguyen",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            occupation: "Small Business Owner",
            testimonial: "Best customer service I've encountered. They even connected me with local movers—above and beyond!"
        },
        {
            name: "Lena Dubois",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            occupation: "Travel Blogger",
            testimonial: "Short-term rentals with flexible dates? Perfect for my nomadic lifestyle. Bookmarked for future trips!"
        },
        {
            name: "Marcus Lee",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            occupation: "Nurse",
            testimonial: "Verified listings gave me peace of mind. Moved into a clean, safe space close to the hospital."
        },
        {
            name: "Nia Johnson",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            occupation: "Graduate Student",
            testimonial: "Shared housing options saved me money, and the roommate-matching tool was spot-on!"
        },
        {
            name: "Diego Silva",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            occupation: "Event Planner",
            testimonial: "Found a stunning vacation rental for a client's retreat. Your curated 'luxury' filter is brilliant!"
        }
    ];

    return (
        <div>
            <div className="w-full overflow-hidden relative py-8">
                <div className="flex animate-infinite-scroll gap-x-10">
                    {/* Original Items */}
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                            <div className="card-body">
                                <div className="flex gap-x-2 items-center">
                                    <div>
                                        <div className="avatar">
                                            <div className="w-16 rounded-full">
                                                <img src={testimonial.image} alt={testimonial.name} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="card-title text-blue-500">{testimonial.name}</h2>
                                        <p>{testimonial.occupation}</p>
                                    </div>
                                </div>
                                <p>{testimonial.testimonial}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <h1 className="text-6xl font-bold text-center my-2">Our Testimonials</h1>
            <div className="w-full overflow-hidden relative py-8">
                <div className="flex animate-infinite-scroll-2 gap-x-10">
                    {/* Original Items */}
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                            <div className="card-body">
                                <div className="flex gap-x-2 items-center">
                                    <div>
                                        <div className="avatar">
                                            <div className="w-16 rounded-full">
                                                <img src={testimonial.image} alt={testimonial.name} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="card-title text-blue-500">{testimonial.name}</h2>
                                        <p>{testimonial.occupation}</p>
                                    </div>
                                </div>
                                <p>{testimonial.testimonial}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default TestimonialSlide;