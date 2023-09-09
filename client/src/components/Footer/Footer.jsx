import "./Footer.css";
import {
  UilFacebookF,
  UilInstagram,
  UilLinkedin,
  UilTwitter,
  UilWhatsapp,
} from "@iconscout/react-unicons";

export default function Footer() {
  return (
    <div className="footer">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/homepage%2Flogo-white-removebg-preview.png?alt=media&token=07c66137-9a8a-473d-b6af-20b46dff3e9c"
        alt=""
      />
      <div className="footerBottomCont">
        <ul>
          <li>
            <UilFacebookF />
          </li>
          <li>
            <UilInstagram />
          </li>
          <li>
            <UilLinkedin />
          </li>
          <li>
            <UilTwitter />
          </li>
          <li>
            <UilWhatsapp />
          </li>
        </ul>
      </div>
      
    </div>
  );
}
