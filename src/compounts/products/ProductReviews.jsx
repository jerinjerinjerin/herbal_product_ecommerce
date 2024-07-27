import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductReviewsComment } from "@/data/data";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import backendDomin from "@/commen/api";
import { setUserDetials } from "@/redux/userSlice";

const ProductReviews = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleShowReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const handleOpen = () => {
    if (user) {
      setOpenForm(true);
    } else {
      navigate("/login");
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${backendDomin}/api/user-detials`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.data.data) {
        dispatch(setUserDetials(response.data.data));
        console.log('response data', response.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (!user && openForm) {
      setOpenForm(false);
    }
  }, [user, openForm]);

  return (
    <div className="product-reviews p-1 bg-slate-800 px-10 py-10 rounded-md bg-opacity-20 border-[2px] border-green-600">
      <div className="flex justify-between py-4">
        <h2 className="text-xl text-gray-400">Product Reviews</h2>

        <Button
          onClick={handleOpen}
          className="bg-transparent border border-green-600 text-white rounded-md hover:bg-green-600"
        >
          {user ? "Add Review" : "Login to add review"}
        </Button>
      </div>

      {ProductReviewsComment.slice(
        0,
        showAllReviews ? ProductReviewsComment.length : 5
      ).map((review, index) => (
        <Review key={index} review={review} />
      ))}

      {ProductReviewsComment.length > 5 && (
        <div className="show-more-button mt-5">
          <Button
            onClick={toggleShowReviews}
            className="bg-transparent py-5 border border-green-600 text-white rounded-md hover:bg-green-600"
          >
            {showAllReviews ? "Show Less Reviews" : "Show More Reviews"}
          </Button>
        </div>
      )}
      {openForm && <ReviewForm onClose={() => setOpenForm(false)}  fetchUserDetails={fetchUserDetails}/>}
    </div>
  );
};

export default ProductReviews;
