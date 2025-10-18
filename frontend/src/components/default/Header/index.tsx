import './style.scss';
import Logo from '../Logo';
import Link from '../../UI/Link';
import LanguageSwitcher from '../../UI/LanguageSwitcher';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../../redux/user/selectors';
import { useLocation } from 'react-router-dom';

function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <div className="header">
      <div className="container">
        <div className="header__container">
          <Logo />
            <ul className="header_nav">
              <li>
                <Link to="/vacancies" className={`link ${isActive('/vacancies')}`}>Вакансии</Link>
              </li>
              <li className={isAuthenticated ? 'visible' : 'hidden'}>
                <Link to="/chat" className={isActive('/chat')}>Чат</Link>
              </li>
              <li className={isAuthenticated ? 'visible' : 'hidden'}>
                <Link to="/notifications" className={isActive('/notifications')}>Уведомления</Link>
              </li>
              <li className={isAuthenticated ? 'visible' : 'hidden'}>
                <Link to="/lk" className={isActive('/auth-proccess')}>Личный кабинет</Link>
              </li>
              <li className={isAuthenticated ? 'visible' : 'hidden'}>
                <Link to="/lk/logout" className={isActive('/logout')}>Выйти</Link>
              </li>
              <li className={!isAuthenticated ? 'visible' : 'hidden'}>
                <Link to="/authorization" className={isActive('/authorization')}>Войти</Link>
              </li>
              <li>
                <LanguageSwitcher className="header__language-switcher" />
              </li>
            </ul>
        </div>  
      </div>
    </div>
  );
}

export default Header;
