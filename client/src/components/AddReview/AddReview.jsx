import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function AddReview({ itemId }) {
  //   const { itemId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [star, setStar] = useState();
  const [reviewers, setReviewers] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please rate this item");
      return;
    }

    if (comment === "") {
      alert("Please leave a comment");
      return;
    }

    if (rating > 5 || rating < 1) {
      alert("Please rate this item between 1 and 5");
      return;
    }

    try {
      await axios.post(`http://localhost:8081/items/review/${itemId}`, {
        rate: rating,
        comment,
      });
      alert("Review added");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const getStar = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/items/${itemId && itemId}`
        );
        const avg = res.data.star.total / res.data.reviewers.length;
        setStar(avg.toFixed(1));
        setReviewers(res.data.reviewers.length);
      } catch (err) {
        console.log(err);
      }
    };
    getStar();
  }, [itemId]);

  return (
    <div className="flex flex-row">
      <div className="w-full  px-2 mb-4 md:mb-0">
        <div className="py-8 px-12 h-full bg-white rounded-3xl flex flex-row justify-between">
          <div className="w-[75%]">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="w-[20%]">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Rate this item
            </label>
            <div className="flex mb-3">
              <input
                type="number"
                name="rating"
                id="rating"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Rate"
                min="1"
                max="5"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center m t-9 justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
