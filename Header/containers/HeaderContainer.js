/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mainRoutes, tabRoutes } from 'routes';
import { getUserRights, getUnAnsweredAgreementCount, checkIsMobile,
  toggleSidebar, setUnAnsweredAgreementCountThunk } from 'Root/redux/root.redux';

import HeaderDesktop from '../desktop/Header';
import HeaderMobile from '../mobile/Header';


@withRouter
@connect(
  state => ({
    userRights: getUserRights(state),
    unAnsweredAgreementCount: getUnAnsweredAgreementCount(state),
    isMobile: checkIsMobile(state),
  }),
  { setUnAnsweredAgreementCountThunk, toggleSidebar },
)
class Header extends Component {
  static propTypes = {
    userRights: PropTypes.shape().isRequired,
    unAnsweredAgreementCount: PropTypes.number,
    setUnAnsweredAgreementCountThunk: PropTypes.func.isRequired,
    match: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
    isMobile: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
  };

  static defaultProps = {
    unAnsweredAgreementCount: 0,
  };

  state = {
    activeLink: null,
    isQuestionModalVisible: false,
    agreementCount: 0,
  };

  // activeLink в стейте, т.к. на продакшене бордер активной вкладки
  // после хард-рефреша сдвигается влево, если руководствоваться только match.params.page
  componentDidMount = () => {
    this.updateUnansweredAgreementCount();
    this.agreementCountUpdater = setInterval(this.updateUnansweredAgreementCount, 30000);
    this.setState({ activeLink: this.props.match.params.page });
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.activeLink !== nextProps.match.params.page) {
      this.setState({ activeLink: nextProps.match.params.page });
    }
  }

  componentWillUnmount() {
    clearInterval(this.agreementCountUpdater);
  }

  updateUnansweredAgreementCount = this.props.setUnAnsweredAgreementCountThunk;

  onFavoriteClick = () => this.props.history.push(mainRoutes.favorite);
  onStatisticClick = () => this.props.history.push(mainRoutes.statistic);

  changeTab = tab => this.props.history.push(tabRoutes[tab]);

  setQuestionModalVisiblity = (isQuestionModalVisible) => {
    this.setState({ isQuestionModalVisible });
  };

  render() {
    const { location, userRights, unAnsweredAgreementCount, isMobile } = this.props;
    const { isQuestionModalVisible, activeLink } = this.state;
    const isFavoritePage = location.pathname.indexOf('favorite') !== -1;
    return (
      isMobile
        ? <HeaderMobile
          userRights={userRights}
          openSidebar={() => this.props.toggleSidebar(true)}
        />
        : <HeaderDesktop
          unAnsweredAgreementCount={unAnsweredAgreementCount}
          isFavoritePage={isFavoritePage}
          userRights={userRights}
          activeLink={activeLink}
          isQuestionModalVisible={isQuestionModalVisible}
          changeTab={this.changeTab}
          onFavoriteClick={this.onFavoriteClick}
          onStatisticClick={this.onStatisticClick}
          setQuestionModalVisiblity={this.setQuestionModalVisiblity}
        />
    );
  }
}


export default Header;
