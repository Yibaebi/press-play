import React from "react";
import { primaryLogo, searchIcon } from "../../assets";
import { Link } from "react-router-dom";
import "./dashboardNavbar.css";
import { searchService } from "../../api/auth";

class DashboardNavBar extends React.Component {
  state = { searchQuery: "", searchError: false };

  handleInputChange = (event) => {
    if (event.target.value.trim() === "") {
      this.setState({
        searchError: true,
      });
      setTimeout(() => {
        this.setState({
          searchError: false,
        });
      }, 4000);
    }

    this.setState({
      searchQuery: event.target.value,
    });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    this.props.showSearchResults(this.state.searchQuery);
  };

  render() {
    return (
      <React.Fragment>
        <div className="logo-container">
          <Link to="/dashboard/discover">
            <img
              src={primaryLogo}
              className="pressplay-logo"
              alt="pressplay logo"
            />
          </Link>
        </div>
        <div className="dashboard-search-profile">
          <div htmlFor="search" className="dashboard-nav-search">
            {searchIcon()}
            <form onSubmit={(e) => this.handleFormSubmit(e)}>
              <input
                type="search"
                value={this.state.searchQuery}
                onChange={this.handleInputChange}
                placeholder="find your favourite podcasts"
              />
              {this.state.searchError && (
                <p className="search-error">
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
                  {this.state.emptyResults
                    ? "No podcast matched your query."
                    : "Empty search query."}
                </p>
              )}
            </form>
          </div>

          {this.props.user && (
            <div className="dashboard-profile">
              <p>{this.props.user}</p>
              <div className="profile-avatar">
                <img src={this.props.userAvatar} alt="" />
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export { DashboardNavBar };
