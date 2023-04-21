import StarRatings from "react-star-ratings";
import { format } from "timeago.js";

export default function Reviews({ reviews }) {
  const profileimg =
    "https://firebasestorage.googleapis.com/v0/b/surge-internship-march-2023.appspot.com/o/noprofile.png?alt=media&token=739a8587-3eb9-4d38-9e44-d887d2bf54e3";

  return (
    <div>
      <section className="bg-blueGray-100 rounded-t-10xl overflow-hidden">
        <div className="container mx-auto mb-[150px]">
          <h2 className="mb-14 text-3xl">Reviews</h2>
          {reviews && reviews.total && reviews.reviewers.length > 0 ? (
            reviews.reviewers.map((review) => (
              <div className="mb-8 shadow-md rounded-lg overflow-hidden">
                <div className=" md:px-16 bg-white md:py-6 flex flex-wrap items-center">
                  <img
                    className="w-10 mr-6 rounded-full"
                    src={profileimg}
                    alt=""
                  />
                  <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                    Vedra customer
                  </h4>
                  <div className="w-full md:w-px h-2 md:h-8 mx-8 md:bg-gray-200"></div>
                  <span className="mr-4 text-xl font-heading font-medium">
                    {review.rate}.0
                  </span>
                  <div className="inline-flex">
                    <StarRatings
                      starDimension="24px"
                      starSpacing="0px"
                      rating={review.rate}
                      starRatedColor="#feb400"
                      numberOfStars={5}
                      name="rating"
                    />
                  </div>
                </div>
                <div className="px-4 overflow-hidden pb-8 md:px-16 bg-white">
                  <div className="flex flex-wrap">
                    <div className="w-full text-left">
                      <p className=" text-sm text-gray-400 mb-3">
                        Added {format(review.createdAt)}
                      </p>
                    </div>
                    <div className="w-full">
                      <p className=" text-darkBlueGray-400 leading-loose">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-semibold">No Reviews</h1>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
