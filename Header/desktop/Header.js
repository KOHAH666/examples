/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { Badge, Tabs } from 'antd';

import logo from 'assets/images/pik-logo-black.svg';
import NoticeHeaderIcon from 'shared/components/Notice/NoticeHeaderIcon';
import QuestionModal from 'shared/components/QuestionModal/QuestionModal';
import Tooltip from 'shared/components/Tooltip';
import Search from 'shared/components/Search/Search';
import LogOut from 'shared/components/LogOut/containers/LogOutContainer';

import s from './Header.pcss';


const TabPane = Tabs.TabPane;

class Header extends Component {
  static propTypes = {
    userRights: PropTypes.shape().isRequired,
    unAnsweredAgreementCount: PropTypes.number.isRequired,
    isFavoritePage: PropTypes.bool.isRequired,
    activeLink: PropTypes.string,
    isQuestionModalVisible: PropTypes.bool.isRequired,
    changeTab: PropTypes.func.isRequired,
    onFavoriteClick: PropTypes.func.isRequired,
    // onStatisticClick: PropTypes.func.isRequired,
    setQuestionModalVisiblity: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeLink: null,
  };

  componentDidMount() {
    // hack for ant tab-ink-bar
    // need update position after mount component
    setTimeout(() => this.forceUpdate(), 1000);
  }

  renderAgreementTab = () => (
    <div className={s.agreementTab}>
      <Badge count={this.props.unAnsweredAgreementCount}>
        <div>Согласование</div>
      </Badge>
    </div>
  );

  render() {
    const { isFavoritePage, userRights, activeLink, changeTab,
      onFavoriteClick, isQuestionModalVisible,
      setQuestionModalVisiblity } = this.props;
    const hasGrants = userRights !== null;
    const { showReadTab, showApproveTab, showControlTab, showEditTab, showExpertTab } = userRights || {};
    const isReader = showReadTab && !(showApproveTab || showControlTab) && !showEditTab && !showExpertTab;

    return (
      <header className={s.wrapper}>
        <NavLink className={s.logoContainer} to="/">
          <img
            className={s.logo}
            src={logo}
            alt="База знаний"
          />
          <div className={s.logoLabel}>ПИК-Стандарт</div>
        </NavLink>
        {hasGrants &&
          <div className={s.mainContainer}>
            {!isReader &&
              <Tabs activeKey={activeLink} onTabClick={changeTab}>
                {showReadTab && <TabPane tab="Чтение" key="main" />}
                {showControlTab && <TabPane tab="Контроль" key="control" />}
                {showExpertTab && <TabPane tab="Экспертиза" key="expert" />}
                {showApproveTab &&
                  <TabPane tab={this.renderAgreementTab()} key="approvement" />
                }
                {showEditTab &&
                  <TabPane tab="Редактирование" key="editing" />
                }
              </Tabs>
            }
            {(showReadTab || showEditTab) &&
              <Search isReader={isReader} />
            }
          </div>
        }
        <div className={s.buttons}>
          <div
            className={s.question}
            onClick={() => setQuestionModalVisiblity(true)}
          >
            <Tooltip position="bottom" tip="Задать вопрос">
              <div className={s.questionIcon} />
            </Tooltip>
          </div>
          {showReadTab &&
            <div
              className={`${s.favorite} ${!isFavoritePage ? s.isNotFavoritePage : ''}`}
              onClick={onFavoriteClick}
            >
              <Tooltip position="bottom" tip="Избранное">
                <div className={s.favoriteIcon} />
              </Tooltip>
            </div>
          }
          <div
            className={s.notice}
          >
            <NoticeHeaderIcon />
          </div>
          {/* showReadTab &&
            <div
              className={s.statistic}
              onClick={onStatisticClick}
            >
              <Tooltip position="bottom" tip="Статистика">
                <div className={s.statisticIcon} />
              </Tooltip>
            </div>
          */}
          <Tooltip position="bottom" tip="Профиль">
            <LogOut />
          </Tooltip>
        </div>
        <QuestionModal
          isVisible={isQuestionModalVisible}
          onCancel={() => setQuestionModalVisiblity(false)}
        />
      </header>
    );
  }
}


export default Header;
