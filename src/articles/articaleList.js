import React from "react";

import { SingleArticle } from "./singelArticle";

export const ArticleList = ({ allArticles }) =>
  allArticles.map(data => <SingleArticle {...data} />);
