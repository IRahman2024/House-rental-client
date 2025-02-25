import { useContext, useEffect } from 'react';
import Banner from '../Banner/Banner';
import FeaturedHomes from './FeaturedHomes.jsx/FeaturedHomes';
import TestimonialSlide from './Testimonial Slide/TestimonialSlide';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { data } from 'autoprefixer';

const HomePage = () => {

    const { user, role } = useContext(AuthContext);

    // console.log(user);
    console.log(role);

    const copy = document.querySelector('.sliding-cards')?.cloneNode(true);
    document.querySelector('.sliding-cards')?.appendChild(copy);


    return (
        <div>
            {/* Offers */}
            <div>
                <Banner></Banner>
            </div>
            {/* Describe benefits */}

            {/* for tenants */}
            {/* payment protection, easy move-in, direct chat */}
            <section className='md:mx-16 mx-2 my-4'>
                <p className='md:text-8xl text-xl font-macondo font-bold text-center md:border-b-4 border-b-2 border-red-500 w-fit mx-auto px-9 mb-3 rounded-md'>For Tenants</p>
                <div className='flex items-center'>
                    <div>
                        <video
                            src="boy paying secure on laptop.webm"
                            autoPlay
                            loop
                            muted
                            className='w-full md:max-w-lg max-w-52'
                        ></video>
                    </div>
                    <div className='w-3/4 break-words'>
                        <h1 className='md:text-4xl text-xs font-macondo font-semibold mb-3'>Stay safe with protected payments</h1>
                        <p className='md:text-2xl text-xs font-macondo'>When you pay to confirm the booking, your money is safe with us. We send it to the landlord only 48 hours after you move in unless you tell us the place isn't as promised. If you contact us, we'll help you.</p>
                        <br />
                        <p className='md:text-2xl text-xs font-macondo'>Protecting you against risks. Making your move safer.</p>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div>
                        <video
                            src="Man find home from Property App.mp4"
                            autoPlay
                            loop
                            muted
                            className='w-full md:max-w-lg max-w-52'
                        ></video>
                    </div>
                    <div className='w-3/4 break-words'>
                        <h1 className='md:text-4xl text-xs font-macondo font-semibold mb-3'>Get a feel of the place from anywhere</h1>
                        <p className='md:text-2xl text-xs font-macondo'>Tired of trying to fit in viewings around your life? Explore several places at your own pace from the comfort of your couch. Enjoy high-quality photos, videos, floor plans, detailed descriptions, and more.</p>
                        <br />
                        <p className='md:text-2xl text-xs font-macondo'>Say goodbye to in-person viewings; say hello to more free time.</p>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div>
                        <video
                            src="Online Chat.webm"
                            autoPlay
                            loop
                            muted
                            className='w-full md:max-w-lg max-w-52'
                        ></video>
                    </div>
                    <div className='w-3/4 break-words'>
                        <h1 className='md:text-4xl text-xs font-macondo font-semibold mb-3'>Chat and share directly with landlords</h1>
                        <p className='md:text-2xl text-xs font-macondo'>No more calling, texting, emailing, and discussing things with landlords in different places. Get a private page to message the landlord directly. Ask questions, share information, and see it all in the same place.</p>
                        <br />
                        <p className='md:text-2xl text-xs font-macondo'>No chance for misunderstandings. Everyone's always on the same page.</p>
                    </div>
                </div>
            </section>

            {/* for owners */}
            <section className='md:mx-16 mx-2'>
                <p className='md:text-8xl text-xl font-macondo font-bold text-center md:border-b-4 border-b-2 border-red-500 w-fit mx-auto px-9 mb-3 rounded-md'>For Owners</p>
                <div className='flex items-center'>
                    <div>
                        <video
                            src="stress less.mp4"
                            autoPlay
                            loop
                            muted
                            className='w-full md:max-w-lg max-w-52'
                        ></video>
                    </div>
                    <div className='w-3/4 break-words'>
                        <h1 className='md:text-4xl text-xs font-macondo font-semibold mb-3'>Maximize Your Rental Income, Minimize Your Stress</h1>
                        <p className='md:text-2xl text-xs font-macondo brea'>Fill vacancies faster with our platform. Reach verified tenants, streamline communication, and get paid securely without the traditional rental hassles.</p>
                        <br />
                        <p className='md:text-2xl text-xs font-macondo'>Where smart landlords meet reliable tenants.</p>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div>
                        <video
                            src="Marketing Team Meeting.mp4"
                            autoPlay
                            loop
                            muted
                            className='w-full md:max-w-lg max-w-52'
                        ></video>
                    </div>
                    <div className='w-3/4 break-words'>
                        <h1 className='md:text-4xl text-xs font-macondo font-semibold mb-3'>Your Property, Our Advanced Marketing</h1>
                        <p className='md:text-2xl text-xs font-macondo'>Professional listings, targeted tenant matching, and comprehensive screening tools that help you find the right renters quickly and confidently.</p>
                        <br />
                        <p className='md:text-2xl text-xs font-macondo'>Transform listings into lucrative opportunities.</p>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div>
                        <video
                            src="Relaxed automation.mp4"
                            autoPlay
                            loop
                            muted
                            className='w-full md:max-w-lg max-w-52'
                        ></video>
                    </div>
                    <div className='w-3/4 break-words'>
                        <h1 className='md:text-4xl text-xs font-macondo font-semibold mb-3'>Hands-Off Rental Management, Total Control</h1>
                        <p className='md:text-2xl text-xs font-macondo'>Automate tenant communication, payment collection, and property listings. We handle the details so you can focus on growing your real estate portfolio.</p>
                        <br />
                        <p className='md:text-2xl text-xs font-macondo'>Simplify management, amplify your returns.</p>
                    </div>
                </div>
            </section>

            {/* Featured House */}
            <p className="text-3xl font-bold my-6">Here will be some of the most popular houses</p>

            <FeaturedHomes></FeaturedHomes>

            {/* testimonials */}
            <p className="text-3xl font-bold my-6">Here will be some testimonials of customers</p>

            <TestimonialSlide></TestimonialSlide>

            {/* Rent your house now */}
            <p className="text-3xl font-bold my-6">Here we will Ask to join a owner</p>

            <section className='p-16 mb-4 bg-slate-500'>
                <p className="text-center md:text-6xl text-2xl font-bold">It's quick. All online. 100% safe!</p>
                <br />
                <div className='flex md:flex-nowrap md:gap-x-4 flex-wrap my-5'>
                    <div>
                        <p className='text-3xl font-semibold'>1</p>
                        <p className='md:text-2xl text-sm font-semibold font-serif'>Pick a house</p>
                        <p className='md:text-md text-xs'>Explore hundreds of high-quality rooms, studios, and apartments. Save favorites. Get alerts. Finding your dream home could not be easier.</p>
                    </div>
                    <div>
                        <p className='text-3xl font-semibold'>2</p>
                        <p className='md:text-2xl text-sm font-semibold font-serif'>Message the landlord</p>
                        <p className='md:text-md text-xs'>Enjoy an online, private space for all conversations with the landlord. Ask questions, share information, and see how well you both match.</p>
                    </div>
                    <div>
                        <p className='text-3xl font-semibold'>3</p>
                        <p className='md:text-2xl text-sm font-semibold font-serif'>Send a booking request</p>
                        <p className='md:text-md text-xs'>Like a place and want to call it home? Send the landlord a booking request. You’ll know if it’s accepted or not within 48 hours.</p>
                    </div>
                    <div>
                        <p className='text-3xl font-semibold'>4</p>
                        <p className='md:text-2xl text-sm font-semibold font-serif'>Pay, and it’s yours</p>
                        <p className='md:text-md text-xs'>Pay the first month’s rent to confirm your booking. Congratulations, you found your next home. We’ll protect your money until you’ve moved in and checked the place out.</p>
                    </div>
                </div>
                <p className="text-center text-5xl font-bold mt-2">Join Now!</p>
            </section>
        </div>
    );
};

export default HomePage;