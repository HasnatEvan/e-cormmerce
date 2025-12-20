import BannerImage from "../../assets/Banner/Banner.png";

const Banner2 = () => {
  return (
    /* OUTER → Reduced width black background */
    <div className="bg-black max-w-[1400px] mx-auto">
      
      {/* INNER → Center content */}
      <div
        className="
          max-w-[1200px] mx-auto
          px-4 sm:px-6 md:px-14
          py-6
          flex flex-col md:flex-row
          items-center gap-6
        "
      >
        {/* Left Section */}
        <div className="flex flex-col text-white md:w-1/2 space-y-4 text-center md:text-left items-center md:items-start">
          <p className="text-green-500 font-semibold text-sm sm:text-base">
            Categories
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Enhance Your <br /> Music Experience
          </h2>

          {/* Countdown Timer */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
            {["23", "05", "59", "35"].map((val, idx) => (
              <div
                key={idx}
                className="
                  flex flex-col items-center justify-center
                  bg-white text-black
                  w-14 h-14 sm:w-16 sm:h-16
                  rounded-full font-bold
                "
              >
                <span className="text-sm sm:text-base">{val}</span>
                <span className="text-[10px] sm:text-xs">
                  {["Hours","Days","Minutes","Seconds"][idx]}
                </span>
              </div>
            ))}
          </div>

          {/* Button */}
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded text-sm sm:text-base">
            Buy Now!
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src={BannerImage}
            alt="Banner Product"
            className="
              w-full
              max-w-xs sm:max-w-sm md:max-w-md
              rounded-lg
              drop-shadow-[0_10px_25px_rgba(255,255,255,0.5)]
            "
          />
        </div>
      </div>
    </div>
  );
};

export default Banner2;
