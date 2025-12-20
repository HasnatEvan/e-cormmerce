import Image1 from "../../assets/Images/image1.jpg";
import Image2 from "../../assets/Images/image2.jpg";
import Image3 from "../../assets/Images/image3.jpg";
import Image4 from "../../assets/Images/image4.jpg";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-5 gap-2 p-2 sm:p-4">
      {/* Top Row */}
      <div className="col-span-3">
        <img
          src={Image1}
          alt="Banner 1"
          className="w-full h-32 sm:h-52 md:h-72 lg:h-96 rounded-lg shadow-md object-cover"
        />
      </div>
      <div className="col-span-2">
        <img
          src={Image2}
          alt="Banner 2"
          className="w-full h-32 sm:h-52 md:h-72 lg:h-96 rounded-lg shadow-md object-cover"
        />
      </div>

      {/* Bottom Row (2 equal columns) */}
      <div className="col-span-5 grid grid-cols-2 gap-2 ">
        <div>
          <img
            src={Image3}
            alt="Banner 3"
            className="w-full h-24 sm:h-36 md:h-48 lg:h-60 rounded-lg shadow-md object-cover"
          />
        </div>
        <div>
          <img
            src={Image4}
            alt="Banner 4"
            className="w-full h-24 sm:h-36 md:h-48 lg:h-60 rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
