import React from "react";

import { SingleArticle } from "./singelArticle";

export const ArticleList = ({ allArticles, title }) => (
  <div className="article__list">
    <h1 className="articleList__title"> {title} </h1>
    {allArticles.map((data, i) => <SingleArticle key={i} {...data} />)}
  </div>
);
