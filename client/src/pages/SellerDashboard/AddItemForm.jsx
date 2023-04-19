import React, { useEffect, useRef, useState } from "react";

export default function AddItemForm() {
  const filepickerRef = useRef(null);
  const [postImage, setPostImage] = useState(null);
  const [uploadedPostImages, setUploadedPostImages] = useState([]);

  const uploadPostImage = (e) => {
    const reader = new FileReader();
    // if (e.target.files) {
    //   setUploadedPostImage(e.target.files);
    //   setPostImage(e.target.files);
    //   reader.readAsDataURL(e.target.files);
    // }
    // reader.onload = (readerEvent) => {
    //   setPostImage(readerEvent.target.result);
    // };

    const fileList = e.target.files;
    const imagesArray = Array.from(fileList);
    setUploadedPostImages(imagesArray);
    console.log(imagesArray);
  };

  useEffect(() => {
    if (uploadedPostImages && uploadedPostImages.length > 0) {
      console.log(uploadedPostImages);
    }
  }, [uploadedPostImages]);

  return (
    <div className="additem">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            action="#"
          >
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Add a new item
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required=""
                />
              </div>
              <div className="w-full">
                <label
                  for="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select category</option>
                  <option value="health1">Trending Now</option>
                  <option value="health2">Specials</option>
                  <option value="health3">New Arrivals</option>
                  <option value="health4">Best Sellers</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  for="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label
                  for="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <div
                  style={{
                    cursor: "pointer",
                    // backgroundColor: "#5a5a5a",
                    borderRadius: "8px",
                    color: "#6b7280",
                  }}
                  onClick={() => filepickerRef.current.click()}
                >
                  {uploadedPostImages &&
                    uploadedPostImages.length > 0 &&
                    uploadedPostImages.map((image) => (
                      <img
                        style={{
                          width: "150px",
                          borderRadius: "8px",
                        }}
                        src={postImage}
                        alt="uploadedImage"
                      />
                    ))}
                  {!postImage && (
                    <div className="p-2.5 w-full flex flex-col items-center justify-center py-9 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <svg
                        aria-label="Icon to represent media such as images or videos"
                        className="_8-yf5"
                        color="#6b7280"
                        fill="#6b7280"
                        height="77"
                        role="img"
                        viewBox="0 0 97.6 77.3"
                        width="96"
                      >
                        <path
                          d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                          //   fill="currentColor"
                        ></path>
                        <path
                          d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                          //   fill="currentColor"
                        ></path>
                        <path
                          d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                          //   fill="currentColor"
                        ></path>
                      </svg>
                      <br />
                      <p>Upload images here</p>
                    </div>
                  )}
                  <input
                    style={{ display: "none" }}
                    onChange={uploadPostImage}
                    ref={filepickerRef}
                    type="file"
                    multiple
                    hidden
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mt-4 rounded"
            >
              Add Item
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
