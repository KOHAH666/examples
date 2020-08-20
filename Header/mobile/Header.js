/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import { mainRoutes } from 'routes';
import logo from 'assets/images/pik-logo-black.svg';
import LogOut from 'shared/components/LogOut/containers/LogOutContainer';

import s from './Header.pcss';


@withRouter
class Header extends Component {
  static propTypes = {
    openSidebar: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired,
  };

  goToSearchPage = () => {
    this.props.history.push(mainRoutes.search);
  }

  render() {
    const { openSidebar } = this.props;

    return (
      <header id="main-header" className={s.wrapper}>
        <div className={s.burger} onClick={openSidebar}>
          <div className={s.burgerIcon} />
        </div>
        <NavLink className={s.logoContainer} to="/">
          <img
            className={s.logo}
            src={logo}
            alt="База знаний"
          />
        </NavLink>
        <div className={s.search} onClick={this.goToSearchPage}>
          <div className={s.searchIcon} />
        </div>
        {/* uncomment for mobile notification, else remove */}
        {/* {userRights !== null && userRights.canRead &&
          <div
            className={s.notice}
          >
            <NoticeHeaderIcon />
          </div>
        } */}
        <LogOut />
      </header>
    );
  }
}

export default Header;
