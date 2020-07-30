import React from "react";

import { Switch, Route, Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

import UserDetails from "./UserDetails";
import requireAuth from "./requireAuth";
import { config } from "../utils";

class Dashboard extends React.PureComponent {
  state = {
    data: [],
    per: 6,
    page: 1,
    total_pages: 1,
  };

  loadUser = () => {
    const { per, page, data } = this.state;
    const url = `${config.API_URL}/users?per_page=${per}&page=${page}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          data: [...data, ...json.data],
          scrolling: false,
          total_pages: json.total_pages,
        })
      );
  };
  componentWillMount() {
    if (this.state.page <= this.state.total_pages) {
      this.loadUser();
      this.scrollListener = window.addEventListener("scroll", (e) => {
        this.handleScroll(e);
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", (e) => {
      this.handleScroll(e);
    });
  }
  loadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
        scrolling: true,
      }),
      this.loadUser
    );
  };

  handleScroll = () => {
    var lastLi = document.querySelector("ul.container > li:last-child");
    var lastLiOffset = lastLi ? lastLi.offsetTop + lastLi.clientHeight : "";
    var pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset >= lastLiOffset) {
      this.loadMore();
    }
  };

  render() {
    return (
      <div>
        <ul className="user-info container">
          {this.state.data.map((item) => {
            return (
              <li className="user-list" key={item.id}>
                <Link className="link-style" to={`/user/${item.id}`}>
                  <h4 className="heading">
                    {item.first_name} {item.last_name}
                  </h4>
                  <LazyLoad height={200}>
                    <img
                      src={item.avatar}
                      alt={`${item.first_name} ${item.last_name}`}
                    />
                  </LazyLoad>
                </Link>
              </li>
            );
          })}
        </ul>
        <Switch>
          <Route path={`/user/:userId`} component={UserDetails}></Route>
        </Switch>
      </div>
    );
  }
}

export default requireAuth(Dashboard);
