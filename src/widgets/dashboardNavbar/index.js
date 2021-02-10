import React, { Component } from "react";
import {searchIcon } from "../../assets";
import profileImage from "../../assets/images/05D10002-48EC-4D1E-BA3F-8957EC3D2651L0001.jpeg";
import { Link } from "react-router-dom";
import "./dashboardNavbar.css";
import  { searchService } from "../../api/auth";

class DashboardNavBar extends Component {
  state = { searchQuery: "" };

  handleInputChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  handleFormSubmit = async (event) => {
    try {
      const searchResponse = await searchService(this.state.searchQuery);
      console.log(searchResponse.data);
    } catch (error) {}
  };

  render() {
    return (
      <React.Fragment>
        <div className="dashboard-search-profile">
          <div htmlFor="search" className="dashboard-nav-search">
            {searchIcon()}
            <form onSubmit={this.handleFormSubmit}>
              <input
                type="search"
                value={this.state.searchQuery}
                onChange={this.handleInputChange}
              />
            </form>
          </div>

          <div className="dashboard-profile">
            <p>{this.props.user}</p>
            <div className="profile-avatar">
              <img src={profileImage} alt="profile" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { DashboardNavBar };
