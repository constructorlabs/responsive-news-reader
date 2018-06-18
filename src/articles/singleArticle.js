import React from "react";
import { distanceInWordsToNow } from "date-fns";
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
      <div className="article__publishedAt">
        Posted
        {" " + distanceInWordsToNow(publishedAt)} ago
      </div>
      <div className="article__url">
        <a href={url} target="_blank">
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
