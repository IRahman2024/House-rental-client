import { useLoaderData } from 'react-router-dom';

const Details = () => {
  const { ac, bathrooms, bedrooms, houseName, descriptions, garage, garden, houseFront, houseImages, houseType, location, rent, security, size, toilets, windows, swimmingPool } = useLoaderData();
  // const data = useLoaderData();
  houseImages?.map(img => console.log(img))

  // console.log(data);
  

  // const { ac, bathrooms, bedrooms, descriptions, garage, garden, houseFront, houseImages, houseType, location, owner{}, rent, security, size, toilets, windows, swimmingPool} 

  return (
    <div>
      <div>
        <div className="carousel w-full">
          {
            houseImages?.map((img, idx) => {
              <div key={idx} id={`item${idx+1}`} className="carousel-item w-full">
                <img
                  src={img}
                  className="w-full" />
              </div>
            })
          }
          {/* <div id="item4" className="carousel-item w-full">
            <img
              src={houseImages[0]} />
          </div> */}
        </div>
        <div className="flex w-full justify-center gap-2 py-2">
          {
            houseImages?.map((idx) =>{
              <a key={idx} href={`#item${idx+1}`} className="btn btn-xs">{idx+1}</a>
            })
          }
        </div>
      </div>
      <div className='ml-5 text-xl'>
        <p>House Name : {houseName}</p>
        <p>Address : {location}</p>
        <p>Rent : {rent} BDT/Day</p>
        <p>Ac : {ac}</p>
        <p>Garden : {garden}</p>
        <p>Garage : {garage}</p>
        <p>Security : {security}</p>
        <p>SwimmingPool : {swimmingPool}</p>
        <p>Security : {security}</p>
        <p>Size : {size} sq. ft.</p>
        <p>BedRoom : {bedrooms}</p>
        <p>Bathrooms : {bathrooms}</p>
        <p>Toilets : {toilets}</p>
        <p>Windows : {windows}</p>
      </div>
    </div>
  );
};

export default Details;