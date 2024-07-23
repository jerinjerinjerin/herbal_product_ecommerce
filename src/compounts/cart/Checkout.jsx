import { Button } from "@/components/ui/button";
import { cartItems } from "@/data/data";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Checkout = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 20,
        },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 50,
      });
    }
  }, [controls, inView]);

  return (
    <div className="container">
      <motion.div
        className="grid lg:grid-cols-2 py-10 gap-5 grid-cols-1 text-white"
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <motion.div
          className="flex flex-col items-center p-4 py-10 bg-slate-900 bg-opacity-40 rounded-lg shadow-lg border border-green-600"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
        >
          <motion.h1 className="text-2xl font-bold mb-4">
            <motion.span className="text-xs">pay </motion.span>$350
          </motion.h1>
          <motion.div className="flex flex-col gap-4 w-full max-w-md">
            <motion.div className="flex flex-col gap-4">
              {cartItems.map((item, index) => (
                <motion.div
                  className="flex flex-row gap-4 items-center border-b border-green-600 pb-2"
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={controls}
                >
                  <h1 className="flex-1">{item.name}</h1>
                  <img
                    src={item.image}
                    alt="checkout images"
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <h1>
                    price: <span>${item.price}</span>
                  </h1>
                </motion.div>
              ))}
            </motion.div>
            <h1 className="mt-4">Shipping charge: $20</h1>
            <h1 className="font-bold">Total due: $350</h1>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center border border-green-600 rounded-lg 
  justify-center bg-gray-900 bg-opacity-40 p-5 md:py-10"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
        >
          <h1 className="text-2xl font-semibold">Pay With Card</h1>
          <div className="flex flex-row gap-2 mt-3">
            <h1 className="text-white">
              Email: <span className="text-slate-200"> Shop@gmail.com</span>
            </h1>
          </div>

          <div className="py-5 w-full max-w-md">
            <h1 className="pb-2 font-semibold">Card information</h1>
            <div className="flex flex-row gap-1 items-center">
              <input
                type="number"
                className="bg-transparent py-2 border pl-3 border-green-600 outline-none rounded-md flex-1"
                placeholder="1234 1234 1234 1234"
              />
              <div className="flex flex-row gap-2">
                <img
                  src="https://logowik.com/content/uploads/images/visa-payment-card1873.jpg"
                  alt="atm"
                  className="w-10 h-8 object-cover rounded-sm"
                />
                <img
                  src="https://www.pngall.com/wp-content/uploads/2016/05/ATM-Card-Download-PNG.png"
                  alt="atm"
                  className="w-10 h-8 object-cover rounded-sm"
                />
                <img
                  src="https://png.pngtree.com/png-clipart/20190904/original/pngtree-blue-cartoon-e-bank-card-png-image_4464565.jpg"
                  alt="atm"
                  className="w-10 h-8 object-cover rounded-sm"
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-2 pt-3">
              <input
                type="text"
                className="bg-transparent py-2 pl-3 border border-green-600 outline-none rounded-md flex-1"
                placeholder="MM/YY"
              />
              <input
                type="text"
                className="bg-transparent py-2 pl-3 mt-2 md:mt-0 border border-green-600 outline-none rounded-md flex-1"
                placeholder="CVC"
              />
            </div>
            <div className="flex flex-col pt-3">
              <h1 className="pb-2 font-semibold">Card holder name</h1>
              <input
                type="text"
                className="bg-transparent py-2 pl-3 border border-green-600 outline-none rounded-md"
                placeholder="Full name on card"
              />
            </div>
            <div className="flex flex-col pt-3">
              <h1 className="pb-2 font-semibold">Country or region</h1>
              <select
                name=""
                id=""
                className="bg-transparent py-2 pl-3 text-slate-400 border border-green-600 outline-none rounded-md"
              >
                <option value="">USA</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-full pt-5">
                <Button className="bg-transparent w-full border border-green-600">
                  Pay Now $350
                </Button>
              </div>
              <p className="text-xl text-center">or</p>
              <div className="w-full flex flex-row items-center gap-3">
                <Button className="bg-transparent w-full border border-green-600">
                  GPay
                  <span>
                    <img
                      src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png"
                      alt="gpay"
                      className="w-5 h-5 rounded-md ml-3"
                    />
                  </span>
                </Button>
                <Button className="bg-transparent w-full border border-green-600">
                  Paytm
                  <span>
                    <img
                      src="https://w7.pngwing.com/pngs/173/994/png-transparent-paytm-social-icons-color-icon.png"
                      alt="paytm"
                      className="w-7 h-5 rounded-md ml-3"
                    />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Checkout;
