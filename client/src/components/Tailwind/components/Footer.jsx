import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24">
      <p className="dark:text-gray-200 text-gray-700 text-center m-20 capitalize">
        © {currentYear} Project by RunwayX
      </p>
    </footer>
  );
};

export default Footer;
