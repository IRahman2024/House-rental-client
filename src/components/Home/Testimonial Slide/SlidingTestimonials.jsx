import { useEffect } from 'react';
import './style.css';

const SlidingTestimonials = () => {

    useEffect(() => {
        const cards = document.querySelectorAll('.test-card');
        const target = document.querySelector('.sliding-cards');
        
        cards.forEach((card) => {
            const clone = card.cloneNode(true);
            target.appendChild(clone);
        })
        
    }, [])

    return (
        <section className='parent-slide'>
            <div className='bg-slate-400 p-5 gap-x-5 overflow-hidden space-x-7 sliding-cards'>
                <div className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                    <div className="card-body">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title text-blue-500">Emma Carter</h2>
                                <p>Graphic Designer</p>
                            </div>
                        </div>
                        <p>Found my dream rental in days! The platform is intuitive, and the support team answered every question promptly.</p>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                    <div className="card-body">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title text-blue-500">Carlos Mendez</h2>
                                <p>Chef</p>
                            </div>
                        </div>
                        <p>Your site made relocating smooth. Loved the high-quality photos and detailed neighborhood guides!</p>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                    <div className="card-body">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title text-blue-500">Aisha Khan</h2>
                                <p>Freelance Writer</p>
                            </div>
                        </div>
                        <p>Affordable options and zero hidden fees? Finally, a rental site that prioritizes transparency!</p>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                    <div className="card-body">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title text-blue-500">Tom Reynolds</h2>
                                <p>Retired Teacher</p>
                            </div>
                        </div>
                        <p>Secured a pet-friendly home with a backyard effortlessly. The saved-search feature is a game-changer!</p>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                    <div className="card-body">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title text-blue-500">Priya Sharma</h2>
                                <p>Software Engineer</p>
                            </div>
                        </div>
                        <p>From virtual tours to quick lease signing, this platform nailed the modern rental experience.</p>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                    <div className="card-body">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title text-blue-500">Jake Nguyen</h2>
                                <p>Small Business Owner</p>
                            </div>
                        </div>
                        <p>Best customer service I’ve encountered. They even connected me with local movers—above and beyond!</p>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                    <div className="card-body">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title text-blue-500">Lena Dubois</h2>
                                <p>Travel Blogger</p>
                            </div>
                        </div>
                        <p>Short-term rentals with flexible dates? Perfect for my nomadic lifestyle. Bookmarked for future trips!</p>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                    <div className="card-body">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title text-blue-500">Marcus Lee</h2>
                                <p>Nurse</p>
                            </div>
                        </div>
                        <p>Verified listings gave me peace of mind. Moved into a clean, safe space close to the hospital.</p>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                    <div className="card-body">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title text-blue-500">Nia Johnson</h2>
                                <p>Graduate Student</p>
                            </div>
                        </div>
                        <p>Shared housing options saved me money, and the roommate-matching tool was spot-on!</p>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl shrink-0 test-card">
                    <div className="card-body">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title text-blue-500">Diego Silva</h2>
                                <p>Event Planner</p>
                            </div>
                        </div>
                        <p>Found a stunning vacation rental for a client’s retreat. Your curated ‘luxury’ filter is brilliant!</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SlidingTestimonials;