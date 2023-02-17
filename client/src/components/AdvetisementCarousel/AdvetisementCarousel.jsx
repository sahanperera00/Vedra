import "./AdvetisementCarousel.css";
import { Carousel } from "react-carousel-minimal";

export default function AdvetisementCarousel() {
  const data = [
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/banner1.jpg?alt=media&token=d5816f5b-05a4-498a-9826-e9009b4c4bb0",
      caption: "Image 1",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/banner2.jpg?alt=media&token=3e0b48e3-42c5-423a-88b4-8e3d7f7a9a64",
      caption: "Image 2",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/banner3.jpg?alt=media&token=c881b35d-f00f-430d-9a7f-314b3f83a319",
      caption: "Image 3",
    },
  ];

  return (
    <div className="advetisementCarousel">
      <Carousel
        data={data}
        time={3000}
        width="100%"
        slideNumber={false}
        captionPosition="none"
        automatic={true}
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        slideImageFit="cover"
        thumbnails={false}
        thumbnailWidth="100px"
        style={{
          textAlign: "center",
          maxWidth: "100%",
        }}
      ></Carousel>
    </div>
  );
}
