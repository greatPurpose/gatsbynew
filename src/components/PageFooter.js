import React from 'react'
import { Link } from "gatsby"

export default function PageFooter() {
  return (
    <div id="footer">
      <ul className="copyright">
        <li>&copy; All Rights Reserved</li>
        <li>
          <Link to={'/terms-of-use/'}>
            Terms of Use
          </Link>
        </li>
        <li>
          <Link to={'/privacy-policy/'}>
            Privacy Policy
          </Link>
        </li>
      </ul>
    </div>
  );
}
