import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Checkout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  // User info
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [areaType, setAreaType] = useState("inside");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [trxId, setTrxId] = useState("");

  const [errors, setErrors] = useState({});

  const BKASH_NUMBER = "01711-XXXXXX";
  const NAGAD_NUMBER = "01822-XXXXXX";

  const DELIVERY_FEE = areaType === "inside" ? 100 : 150;

  /* =====================
     LOAD CART
  ===================== */
  useEffect(() => {
    if (!user) return;

    const loadCart = async () => {
      try {
        const res = await axiosSecure.get(`/carts?email=${user.email}`);
        setCart(res.data);
      } catch {
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user, axiosSecure]);

  /* =====================
     PRICE
  ===================== */
  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.cartQuantity,
    0
  );

  const totalPrice = subTotal;

  /* =====================
     VALIDATION
  ===================== */
  const validate = () => {
    const newErrors = {};

    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^01\d{9}$/.test(phone))
      newErrors.phone = "Enter valid Bangladeshi number";

    if (!district) newErrors.district = "District is required";
    if (!address) newErrors.address = "Address is required";
    if (!trxId) newErrors.trxId = "Transaction ID is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =====================
     PLACE ORDER
  ===================== */
  const handlePlaceOrder = async () => {
    if (!validate()) return;

    if (cart.length === 0) {
      toast.error("Your cart is empty ❌");
      return;
    }

    setOrderLoading(true);

    // 🔥 FIXED: color & size added
    const orderData = {
      userEmail: user.email,
      phone,
      district,
      areaType,
      address,
      notes,

      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.cartQuantity,
        color: item.selectedColor || null,
        size: item.selectedSize || null,
      })),

      totalQuantity,
      subTotal,
      deliveryFee: DELIVERY_FEE,
      totalPrice,
      paymentMethod,
      trxId,
      status: "Pending",
      orderTime: new Date(),
    };

    console.log("ORDER DATA:", orderData);

    try {
      const res = await axiosSecure.post("/orders", orderData);

      if (res.data.success) {
        setTimeout(() => {
          toast.success("Order placed successfully ✅");
          navigate("/success");
        }, 2000);
      } else {
        setOrderLoading(false);
      }
    } catch (error) {
      setOrderLoading(false);
      toast.error(
        error.response?.data?.message || "Failed to place order ❌"
      );
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading checkout...
      </p>
    );
  }

  const inputClass = (field) =>
    `w-full px-3 py-2 rounded border ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  const paymentBox = (active) =>
    `border rounded p-3 cursor-pointer transition ${
      active
        ? "bg-blue-50 border-blue-500"
        : "border-gray-300 hover:bg-gray-50"
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 bg-white border border-gray-300 rounded-lg p-6 space-y-5">
          <h3 className="text-lg font-semibold">Shipping Details</h3>

          <input
            value={user?.email || ""}
            disabled
            className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100"
          />

          <input
            className={inputClass("phone")}
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className={inputClass("district")}
            placeholder="Type your district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />

          <select
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={areaType}
            onChange={(e) => setAreaType(e.target.value)}
          >
            <option value="inside">Dhaka (Inside) – ৳100</option>
            <option value="outside">Outside Dhaka – ৳150</option>
          </select>

          <textarea
            rows="3"
            className={inputClass("address")}
            placeholder="Full delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <textarea
            rows="2"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Order notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <h3 className="text-lg font-semibold">Payment Method</h3>

          <div
            className={paymentBox(paymentMethod === "bkash")}
            onClick={() => setPaymentMethod("bkash")}
          >
            <p className="font-medium">bKash (Send Money)</p>
            <p className="text-sm mt-1 font-semibold">{BKASH_NUMBER}</p>
          </div>

          <div
            className={paymentBox(paymentMethod === "nagad")}
            onClick={() => setPaymentMethod("nagad")}
          >
            <p className="font-medium">Nagad (Send Money)</p>
            <p className="text-sm mt-1 font-semibold">{NAGAD_NUMBER}</p>
          </div>

          <p className="text-sm text-red-600">
            ⚠️ Delivery fee ৳{DELIVERY_FEE} will be paid on delivery
          </p>

          <input
            className={inputClass("trxId")}
            placeholder="Transaction ID"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
          />
        </div>

        {/* RIGHT */}
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-1">Order Summary</h3>
          <p className="text-sm text-gray-500 mb-3">
            Total Quantity: {totalQuantity}
          </p>

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-sm mb-2 gap-2"
            >
              <span className="truncate max-w-[200px] font-medium">
                {item.name}
                <span className="text-gray-500">
                  {" "}
                  (x{item.cartQuantity})
                </span>
              </span>
              <span className="shrink-0 font-medium">
                ৳ {item.price * item.cartQuantity}
              </span>
            </div>
          ))}

          <hr className="my-3" />

          <div className="flex justify-between font-semibold text-lg mt-2">
            <span>Total</span>
            <span>৳ {totalPrice}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={orderLoading}
            className="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center disabled:opacity-70"
          >
            {orderLoading ? (
              <span className="loading loading-infinity loading-xl"></span>
            ) : (
              "PLACE ORDER"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
