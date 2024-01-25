import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const Success = () => {
  const location = useLocation();

  const deleteCartItem = async (cartItemId) => {
    try {
      const response = await axios.delete(`/api/carts/${cartItemId}`);
      console.log(response.data); // Output: "Cart has been deleted..."
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Order Shipped!</h2>
      <p>Thank you for your order. Your order is on its way.</p>
      <p>
        <Link to="/">Click here to go back to the home page</Link>
      </p>
    </div>
  );
};

export default Success;
