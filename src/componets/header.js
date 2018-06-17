import React from "react";

export const Header = ({ title, slogan }) => (
  <header className="header">
    <h1 className="header__title">{title}</h1>
    <h2 className="header__slogan">{slogan}</h2>
  </header>
);
