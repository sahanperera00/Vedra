import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/ayurvita-b6e56.appspot.com/o/ayurvitalogoW.png?alt=media&token=5cd51f59-8e78-4646-a16a-7a54c84939dd"
        alt=""
      />
      <div className="footerBottomCont">
        <ul>
          <li>TRENDING NOW</li>
          <li>NEW ARRIVALS</li>
          <li>SPECIALS</li>
          <li>BEST SELLERS</li>
        </ul>
      </div>
      {/* <span>
        Copyright ©2023 All rights reserved | This template is made with by
        Colorlib.com
      </span> */}
      <span>
        ayurvita.com © Copyright 1997-2023 ayurvita, LLC. All rights reserved.
        ayurvita® is a registered trademark of ayurvita, LLC. Trusted Brands.
        Healthy Rewards. and the ayurvita.com Trusted Brands. Healthy Rewards.
        Logo are trademarks of ayurvita, LLC. *Disclaimer: Statements made, or
        products sold through this website, have not been evaluated by the
        United States Food and Drug Administration. They are not intended to
        diagnose, treat, cure or prevent any disease
      </span>
    </div>
  );
}
