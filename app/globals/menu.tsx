"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Menu() {
  const [burgerOn, setBurgerOn] = useState(false);

  const toggleBurger = () => {
    setBurgerOn((prev) => !prev);
  };

  return (
    <>
            <button
        type="button"
        className={`mobile-nav-toggle
                                   ${burgerOn ? "burger-off" : "burger-on"}
                                   `}
        aria-controls="primary-navigation"
        aria-haspopup="true"
        aria-expanded={burgerOn ? "true" : "false"}
        aria-label={burgerOn ? "Close menu" : "Open menu"}
        onClick={toggleBurger}
      >
        <span className="sr-only">Menu</span>
      </button>
      <nav aria-label="Główna nawigacja">
        <ul
          id="primary-navigation"
                    className={`flex 
                              primary-navigation
                              ${burgerOn ? "show-nav" : "hide-nav"}
                              `}
        >
          <li>
            <Link className="m-3" href="/">
              Start
            </Link>
          </li>
          <li>
            <Link className="m-3" href="/offer">
              Offer
            </Link>
          </li>
          <li>
            <Link className="m-3" href="/projects">
              Projects
            </Link>
          </li>
          <li>
            <Link className="m-3" href="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link className="m-3" href="/team">
              Team
            </Link>
          </li>
          <li>
            <Link className="m-3" href="/contact">
              Contact us
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
