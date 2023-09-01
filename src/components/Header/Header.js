"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";
import Cookie from "js-cookie";

import { LIGHT_COLORS, DARK_COLORS } from "@/constants";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";
    // Change the state variable, for the sun/moon icon
    setTheme(nextTheme);

    // Update the cookie, for the user's next visit
    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    // Update the DOM to present the new colors
    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

    // Edit the data-attribute, so that we can apply CSS conditionally based on the theme
    root.setAttribute("data-color-theme", nextTheme);

    // Swap out the actual colors on the <html> tag
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <a href="/rss.xml" className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </a>
        <button className={styles.action} onClick={handleClick}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
