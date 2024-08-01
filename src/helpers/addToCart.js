import backendDomin from "@/commen/api";
import axios from "axios";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
        const response = await axios.post(
            `${backendDomin}/api/addtocart`,
            { productId: id },
            { withCredentials: true }
        );

        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }

        return response;
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "An error occurred");
    }

    
};

export default addToCart;
