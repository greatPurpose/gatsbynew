import React from 'react';
import { Link } from 'gatsby';

export default function Header() {
  return (
    <div id="logo">
      <Link to="/">
        <h1 id="title">LOGO</h1>
      </Link>
    </div>
  );
}
