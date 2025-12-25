import { FaTshirt, FaTruck, FaUndo, FaHeadset } from "react-icons/fa";
import img1 from "../../assets/About/why_choose_img.jpg";

const Section3 = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">

      {/* LEFT CONTENT */}
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10">
          Why We Are The{" "}
          <span className="relative">
            Best
            <span className="absolute -bottom-1 left-0 w-full h-3 bg-blue-300 rounded-full -z-10"></span>
          </span>
        </h2>

        {/* CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

          {[
            { icon: <FaTshirt />, title: "Quality Products" },
            { icon: <FaTruck />, title: "Fast Delivery" },
            { icon: <FaUndo />, title: "Return Policy" },
            { icon: <FaHeadset />, title: "24/7 Service" },
          ].map((item, idx) => (
            <div key={idx} className="relative">

              {/* Blue curved side line */}
              <div className="absolute -left-2 top-0 bottom-0 border-l-4 border-blue-500 rounded-t-full rounded-b-full hidden sm:block"></div>

              {/* Blue icon circle */}
              <div className="absolute -left-7 sm:-left-8 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-3 sm:p-4 rounded-full text-lg sm:text-xl shadow-md">
                {item.icon}
              </div>

              {/* Main Card */}
              <div className="bg-white shadow-md rounded-2xl pl-10 sm:pl-12 pr-4 sm:pr-6 py-5 sm:py-6">
                <h3 className="text-base sm:text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed">
                  Objectively pontificate quality models before intuitive information.
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* RIGHT IMAGE AREA */}
      <div className="w-full flex justify-center lg:justify-end">
        <img
          src={img1}
          alt="why choose us"
          className="rounded-2xl object-cover w-full sm:w-[90%] md:w-[80%] lg:w-full h-52 sm:h-64 md:h-72 lg:h-[420px]"
        />
      </div>

    </div>
  );
};

export default Section3;
