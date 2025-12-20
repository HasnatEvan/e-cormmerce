import { FaShieldAlt, FaTruck, FaUndo, FaLock } from "react-icons/fa";

const Section1 = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-blue-500 text-3xl" />,
      title: "Official Warranty",
      desc: "1 Year Brand Warranty",
      bgColor: "bg-blue-50",
    },
    {
      icon: <FaTruck className="text-green-500 text-3xl" />,
      title: "Fast Delivery",
      desc: "Get your order in 48 hours",
      bgColor: "bg-green-50",
    },
    {
      icon: <FaUndo className="text-yellow-500 text-3xl" />,
      title: "Easy Return",
      desc: "7 Days Return Policy",
      bgColor: "bg-yellow-50",
    },
    {
      icon: <FaLock className="text-purple-500 text-3xl" />,
      title: "Secure Payment",
      desc: "SSL Secured Checkout",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="py-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 ${item.bgColor} rounded-xl`}
          >
            <div className="bg-white p-3 rounded-full shadow flex-shrink-0">
              {item.icon}
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                {item.title}
              </h4>
              <p className="text-gray-500 text-xs sm:text-sm">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section1;
