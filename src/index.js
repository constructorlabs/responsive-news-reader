import React from "react";
import { render } from "react-dom";
import { siteConfig } from "./siteConfig";
import "./styles.css";
import { topHeadlines } from "./newsApi";
import { Header } from "./componets/header";
import { ArticleList } from "./articles/articaleList";

import { mockedData } from "./mockData";

class App extends React.Component {
  state = {
    loading: true,
    data: [mockedData]
  };
  componentDidMount() {
    topHeadlines.then(data =>
      this.setState(state => ({
        ...state,
        loading: false,
        data: [...this.state.data, data]
      }))
    );

    // this.setState(state => ({
    //   ...state,
    //   loading: false,
    //   data: [mockedData, mockedData, mockedData, mockedData]
    // }));
  }
  render() {
    console.log(this.state);
    return (
      <div className="main__layout">
        <Header title={siteConfig.siteTitle} slogan={siteConfig.siteSlogan} />
        {this.state.loading
          ? "loading"
          : this.state.data.map((topics, i) => (
              <ArticleList
                key={i}
                allArticles={topics.articles}
                title={topics.title}
              />
            ))}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
