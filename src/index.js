import React from "react";
import { render } from "react-dom";
import { siteConfig } from "./siteConfig";
import "./styles.css";
import { topHeadlines } from "./newsApi";
import { Header } from "./componets/header";
import { ArticleList } from "./articles/articaleList";

import { data } from "./mockData";
import { realpathSync } from "fs";

class App extends React.Component {
  state = {
    loading: false,
    data
  };
  // componentDidMount() {
  //   topHeadlines.then(data =>
  //     this.setState(state => ({
  //       ...state,
  //       loading: false,
  //       ...data
  //     }))
  //   );
  // }
  render() {
    console.log();
    return (
      <React.Fragment>
        <Header title={siteConfig.siteTitle} slogan={siteConfig.siteSlogan} />
        {this.state.loading ? (
          "loading"
        ) : (
          <ArticleList allArticles={this.state.data} />
        )}
      </React.Fragment>
    );
  }
}

render(<App className="main__layout" />, document.getElementById("root"));
