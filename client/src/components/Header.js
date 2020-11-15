import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

export default function Header() {
  return (
    <header className="headerContainer">
      <Link to="/">Home</Link>
      <nav>
        <ul className="pageLinks">
          <li>
            <Link to="/find">Find Stock</Link>
          </li>
          <li>
            <Link to="/filter">Filter Stocks</Link>
          </li>
          <li>
            <Link to="/add">Add Stock</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
