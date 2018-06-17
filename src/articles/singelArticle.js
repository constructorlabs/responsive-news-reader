import React from "react";

export const SingleArticle = ({
  author,
  title,
  description,
  publishedAt,
  source,
  url,
  urlToImage
}) => (
  <article className="article">
    <h1 className="article_title">{title}</h1>
    <img className="article_image" src={urlToImage} alt="" />
    <p className="article__description">{description}</p>
    <div className="article__publishedAt">{publishedAt}</div>
    <div className="article__url">{url}</div>
    <div className="article__source">
      {author}
      {source.id}
      {source.name}
    </div>
  </article>
);
