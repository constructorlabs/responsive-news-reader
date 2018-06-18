import React from "react";
import { render } from "react-dom";
import { siteConfig } from "./siteConfig";
import "./styles.css";
import { topHeadlines, categoryFetch, topUkHeadlines } from "./newsApi";
import { Header } from "./componets/header";
import { ArticleList } from "./articles/articleList";

import { mockedData } from "./mockData";

class App extends React.Component {
  state = {
    loading: true,
    data: []
  };
  categoryFetchField;
  componentDidMount() {
    topHeadlines().then(data =>
      this.setState(state => ({
        ...state,
        loading: false,
        data: [...this.state.data, data]
      }))
    );
    setTimeout(() => {
      topUkHeadlines().then(data =>
        this.setState(state => ({
          ...state,
          loading: false,
          data: [data, ...this.state.data]
        }))
      );
    }, 30000);
  }
  // fetchClick(event) {
  //   event.preventDefault();
  //   const ahh = this.categoryFetchField;
  //   console.log({ ahh });

  //   // categoryFetch().then(data =>
  //   //   this.setState(state => ({
  //   //     ...state,
  //   //     loading: false,
  //   //     data: [data, ...this.state.data]
  //   //   }))
  //   // );
  // }

  render() {
    console.log(this.state);
    return (
      <div className="main__layout">
        <Header title={siteConfig.siteTitle} slogan={siteConfig.siteSlogan} />
        {/* <form onClick={e => this.fetchClick(e)}>
          <input type="text" ref={x => (this.categoryFetchField = x)} />
          <button type="submit">Submit me</button>
        </form> */}
        <article className="article__list">
          {this.state.loading
            ? "loading"
            : this.state.data.map((topics, i) => (
                <ArticleList
                  key={i}
                  articles={topics.articles}
                  title={topics.title}
                />
              ))}
        </article>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
