import { useLoaderData } from 'react-router-dom';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { AirVent, BedDouble, Cctv, Grid2x2, PillBottle, Ruler, ShowerHead, Toilet, WavesLadder } from 'lucide-react';
import { GiHomeGarage } from 'react-icons/gi';
import { MdBeachAccess } from 'react-icons/md';
import { PiSecurityCameraLight } from 'react-icons/pi';
import VirtualTour from './VirtualTour';
import Map from './Map';
import VideoPlayer from './VideoPlayer';
import Review from './Review';
import Complain from './Complain';
import DatePicker from '../../components/DatePicker/DatePicker';

const Details = () => {
  const { ac, bathrooms, bedrooms, houseName, description, garage, garden, houseFront, houseImages, houseType, location, rent, security, size, toilets, windows, swimmingPool, _id, owner } = useLoaderData();
  const data = useLoaderData();

  const images = houseImages?.map((img) => ({ src: img }))
  // console.log(owner);


  console.log(data);


  // const { ac, bathrooms, bedrooms, description, garage, garden, houseFront, houseImages, houseType, location, owner{}, rent, security, size, toilets, windows, swimmingPool} 

  /*
  bathroom, bedrooms, ac, toilets, windows, size, type
  garden, garage, swimmingPool, security,
  */

  return (
    <div className='mx-10 md:mx-20'>
      {/* intro */}
      <div className="my-11 md:flex justify-between">
        <div>
          <p className='text-xl md:text-4xl font-bold'>{houseName}</p>
          <p className='text-xl md:text-2xl font-semibold italic'>{houseType}</p>
          <DatePicker id={_id}></DatePicker>
        </div>
        <div>
          <p className='text-xl md:text-4xl font-bold'>Rent: {rent} BDT/Day</p>
          <button className="btn btn-outline btn-error btn-wide btn-sm mt-2">
            Add to wishlist
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg></button>
        </div>
      </div>
      {/* carousel */}
      <div className=''>
        <Carousel images={images} style={{ height: 500, width: '85vw' }}></Carousel>
      </div>
      {/* information */}
      <div className='md:flex md:gap-x-4 w-full mt-6'>
        {/* left portion */}
        <div className='md:w-[75%]'>
          {/* property details */}
          <div>
            <p className='text-center text-xl md:text-3xl font-bold mb-4'>Description</p>
            <p className=''>{description}</p>
            <hr className='my-4' />
            {/* property details */}
            <p className='text-center text-xl md:text-3xl font-bold my-9'>Property Details</p>
            <div className='md:flex md:gap-x-6'>
              <div className='md:w-1/2'>
                <div className='flex justify-between'>
                  <div className='flex gap-x-4'>
                    <Ruler />
                    <p>Size</p>
                  </div>
                  <p>{size} Sq. Ft.</p>
                </div>
                <hr className='my-3' />
                <div className='flex justify-between'>
                  <div className='flex gap-x-4'>
                    <p>Type</p>
                  </div>
                  <p>{houseType}</p>
                </div>
                <hr className='my-3' />
                <div className='flex justify-between'>
                  <div className='flex gap-x-4'>
                    <BedDouble />
                    <p>Bedrooms</p>
                  </div>
                  <p>{bedrooms}</p>
                </div>
                <hr className='my-3' />
                <div className='flex justify-between'>
                  <div className='flex gap-x-4'>
                    <ShowerHead />
                    <p>Bathrooms</p>
                  </div>
                  <p>{bathrooms}</p>
                </div>
              </div>
              <div className='md:w-1/2'>
                <div className='flex justify-between'>
                  <div className='flex gap-x-4'>
                    <Toilet />
                    <p>Toilets</p>
                  </div>
                  <p>{toilets}</p>
                </div>
                <hr className='my-3' />
                <div className='flex justify-between'>
                  <div className='flex gap-x-4'>
                    <AirVent />
                    <p>Air Conditioner</p>
                  </div>
                  <p>{ac}</p>
                </div>
                <hr className='my-3' />
                <div className='flex justify-between'>
                  <div className='flex gap-x-4'>
                    <Grid2x2 />
                    <p>Windows</p>
                  </div>
                  <p>{windows}</p>
                </div>
                <hr className='my-3' />
              </div>
            </div>
            <hr className='my-6' />
            <p className='text-center text-xl md:text-3xl font-bold my-9'>Outdoor Features</p>
            <div className='md:flex gap-x-6'>
              <div className='md:w-1/2'>
                <div className='flex justify-between'>
                  <div className='flex gap-x-4'>
                    <GiHomeGarage />
                    <p>Garage</p>
                  </div>
                  <p>{garage}</p>
                </div>
                <hr className='my-3' />
                <div className='flex justify-between'>
                  <div className='flex gap-x-4'>
                    <MdBeachAccess />
                    <p>Garden</p>
                  </div>
                  <p>{garden}</p>
                </div>
                <hr className='my-3' />
                <div className='flex justify-between'>
                  <div className='flex gap-x-4'>
                    <Cctv />
                    <p>Security</p>
                  </div>
                  <p>{security}</p>
                </div>
                <hr className='my-3' />
              </div>
              <div className='md:w-1/2'>
                <div className='flex justify-between'>
                  <div className='flex gap-x-4'>
                    <WavesLadder />
                    <p>Swimming Pool</p>
                  </div>
                  <p>{swimmingPool}</p>
                </div>
                <hr className='my-3' />
              </div>
            </div>
          </div>
          {/* video */}
          <div className='my-4'>
            <p className='text-center text-xl md:text-3xl font-bold mb-3'>Video</p>
            <VideoPlayer></VideoPlayer>
          </div>
          {/* maps */}
          <div className='my-4'>
            <p className='text-center text-xl md:text-3xl font-bold mb-3'>Location</p>
            <div className='border-2'>
              <Map></Map>
            </div>
          </div>
          {/* virtual tour */}
          <div className='my-4'>
            <p className="text-center text-xl md:text-3xl font-bold mb-3">360 Virtual Tour</p>
            <VirtualTour></VirtualTour>
          </div>
          {/* review option */}
          <div>
            <p className='text-center text-xl md:text-3xl font-bold mb-3'>Reviews</p>
            <Review id={_id} houseName={houseName} url={window.location.pathname}></Review>
          </div>
        </div>
        {/* right portion */}
        <div>
          {/* profile */}
          <div className='border-2 border-gray-300 p-4 rounded-xl'>
            {/* owner info */}
            <div className='flex gap-x-4 items-center'>
              {/* pic */}
              <img
                className='size-32 rounded-xl'
                src={owner?.profilePic} alt="" />
              <div className='gap-y-2'>
                <p>{houseName}</p>
                <p className="text-xl">{owner?.firstName} {owner?.lastName}</p>
                <p>{location}</p>
              </div>
            </div>
            {/* contact info */}
            <div>
              <div className="border-t-2 mt-3">
                <div className="flex justify-between py-4">
                  <p>Email: </p>
                  <p>{owner?.email}</p>
                </div>
              </div>
              <div className="border-t-2">
                <div className="flex justify-between py-4">
                  <p>Phone: </p>
                  <p>+2224445557</p>
                </div>
              </div>
              <div className="border-t-2">
                <div className="flex justify-between py-4">
                  <p>Office: </p>
                  <p>+3336669991</p>
                </div>
              </div>
              <div className="border-t-2">
                <div className="flex justify-between pt-4">
                  <p>Whatsapp: </p>
                  <p>3336669991</p>
                </div>
              </div>
            </div>
          </div>
          {/* add complain */}
          <div>
            <Complain id={_id} houseName={houseName} url={window.location.pathname}></Complain>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;