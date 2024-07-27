import React, { useEffect, useState } from 'react';
import { CgClose } from "react-icons/cg";
import { Button } from '@/components/ui/button';
import { motion, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import backendDomin from '@/commen/api';

const ReviewForm = ({ onClose, userId,name, profilePic, fetchReviews }) => {
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    rating: '',
    title: '',
    comment: '',
    userId:userId,
    name:name,
    profilePic:profilePic,
    productId: id,
  });

  useEffect(() => {
    
  }, [user]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } });
  }, [controls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.rating.trim()) {
      newErrors.rating = 'Rating is required';
      isValid = false;
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    if (!formData.comment.trim()) {
      newErrors.comment = 'Comment is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${backendDomin}/api/product-review`, formData, {
        withCredentials: 'include',
      });
      if (response) {
        toast.success(response.data.message);
        onClose();
        fetchReviews();
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Failed to submit review. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className='fixed inset-0 bg-slate-900 bg-opacity-75 z-[100] flex items-center justify-center'
      initial={{ opacity: 0, y: -50 }}
      animate={controls}
    >
      <div className="bg-black rounded-md p-6 shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center py-5">
          <h1 className="text-xl text-white">Add Review</h1>
          <CgClose size={20} onClick={onClose} className='w-6 h-6 text-red-500 hover:text-red-800 cursor-pointer' />
        </div>
        <form className='text-white' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="rating">Rating</label>
            <select
              className={`border w-full p-2 outline-none rounded ${errors.rating ? 'border-red-600' : 'border-green-600'} bg-transparent text-white`}
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option className='bg-black text-white' value="" disabled>Select Rating</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option className='bg-black text-white' key={rating} value={rating}>{rating}</option>
              ))}
            </select>
            {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="title">Title</label>
            <input
              className={`w-full border p-2 outline-none rounded ${errors.title ? 'border-red-600' : 'border-green-600'} bg-transparent text-white`}
              type="text"
              id="title"
              placeholder='Enter title'
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="comment">Comment</label>
            <textarea
              className={`border w-full p-2 outline-none rounded ${errors.comment ? 'border-red-600' : 'border-green-600'} bg-transparent text-white`}
              id="comment"
              name="comment"
              placeholder='Enter Comment'
              rows="4"
              value={formData.comment}
              onChange={handleChange}
            ></textarea>
            {errors.comment && <p className="text-red-600 text-sm mt-1">{errors.comment}</p>}
          </div>
          <div className="flex justify-end gap-5">
            <Button
              type="button"
              onClick={onClose}
              className="bg-transparent border border-green-600 hover:bg-red-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`bg-transparent border border-green-600 ${isSubmitting ? 'bg-green-600' : 'hover:bg-green-600'}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ReviewForm;
