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
        src="https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/W.png?alt=media&token=87a8af90-8889-4e84-9553-bc22b39b1d62"
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
      <span>
        Vedra.com © Copyright 1997-2023 Vedra, LLC. All rights reserved. Vedra®
        is a registered trademark of Vedra, LLC. Trusted Brands. Healthy
        Rewards. and the Vedra.com Trusted Brands. Healthy Rewards. Logo are
        trademarks of Vedra, LLC. *Disclaimer: Statements made, or products sold
        through this website, have not been evaluated by the United States Food
        and Drug Administration. They are not intended to diagnose, treat, cure
        or prevent any disease
      </span>
    </div>
  );
}
