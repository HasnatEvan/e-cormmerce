import BannerImage from "../../assets/Banner/BannerImage.jpg";

const Banner2 = () => {
  return (
   <div className="w-full my-6 px-4">
      <img
        src={BannerImage}
        alt="Banner"
        className="
          w-full 
          h-[180px] 
          sm:h-[260px] 
          md:h-[360px] 
          lg:h-[480px] 
          xl:h-[560px]
          object-cover 
          rounded-xl 
          shadow-md
        "
      />
    </div>
  );
};

export default Banner2;
