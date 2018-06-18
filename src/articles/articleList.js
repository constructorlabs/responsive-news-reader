import React from "react";

import { SingleArticle } from "./singleArticle";

export const ArticleList = ({ articles, title }) => (
  <React.Fragment>
    <h1 className="articleList__title"> {title} </h1>
    {articles.map((data, i) => <SingleArticle key={i} {...data} />)}
  </React.Fragment>
);
