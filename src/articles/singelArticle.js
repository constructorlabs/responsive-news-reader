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
    <h1 className="article__title">{title}</h1>
    <img className="article__image" src={urlToImage} alt={description} />

    <div className="article__details">
      <p className="article__description">{description}</p>
      <div className="article__publishedAt">{publishedAt}</div>
      <div className="article__url">
        <a href={url} alt={source.name}>
          Read more...
        </a>
      </div>
      <div className="article__source">
        {author && source.name && source.id ? (
          <h4>
            {author} from {source.name}
          </h4>
        ) : null}
      </div>
    </div>
  </article>
);
