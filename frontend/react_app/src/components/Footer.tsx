import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed-bottom mt-5 py-3 bg-dark text-light text-center">
      <p>
        Anup Nagdeve <i className="bi bi-suit-heart-fill text-danger"></i> |{" "}
        <a
          href="https://github.com/AnupN29/budget_buddy"
          target="_blank"
          rel="noopener noreferrer"
          className="link-success link-underline link-underline-opacity-0"
        >
          GitHub <i className="bi bi-github"></i>
        </a>
      </p>
    </footer>
  );
};

export default Footer;
