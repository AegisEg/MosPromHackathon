import React from 'react';
import './style.scss';
import Logo from '../Logo';
import Link from '../../UI/Link';
import Button, { ButtonType } from '../../UI/Button';
import LanguageSwitcher from '../../UI/LanguageSwitcher';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="container">
        <div className="header__left">
          <Logo />
            <ul className="header_nav">
              <li>
                <Link to="/vacancies">Вакансии</Link>
              </li>
              <li>
                <Link to="/applications">Отклики</Link>
              </li>
              <li>
                <Link to="/specialists">Специалисты</Link>
              </li>
            </ul>
        </div>  
        <div className="header__right">
          <div className="header__right_buttons-search">
            <Link to="/search">
              <SearchIcon color="inherit" />
              Поиск
            </Link>
            <LanguageSwitcher className="header__language-switcher" />
          </div>
          <div className="header__right_buttons-icons">
            <Link to="/chat">
              <ChatBubbleOutlineOutlinedIcon />
            </Link>
            <Link to="/favorites">
              <StarBorderOutlinedIcon />
            </Link>
            <Link to="/notifications">
              <NotificationsOutlinedIcon />
            </Link>
          </div>
          <div className="header__right_buttons-auth">
            <Button onClick={() => navigate('/resume')} variant={ButtonType.GRAY}>Резюме</Button>
            <Button onClick={() => navigate('/authorization')}>Войти</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
