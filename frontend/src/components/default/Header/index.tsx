import './style.scss';
import Logo from '../Logo';
import Link from '../../UI/Link';
import LanguageSwitcher from '../../UI/LanguageSwitcher';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserData } from '../../../redux/user/selectors';
import { UserRole } from '../../../enums/UserRole';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: userData } = useSelector(selectUserData);
  const location = useLocation();

  const handleDashboardLink = useMemo(() => {
    return userData?.role ? `/${userData.role.toLowerCase()}-dashboard` : '/';
  }, [userData]);

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
              <li>
                <Link to="/applications" className={isActive('/applications')}>Отклики</Link>
              </li>
              <li>
                <Link to="/specialists" className={isActive('/specialists')}>Специалисты</Link>
              </li>
              <li>
                <Link to="/chat" className={isActive('/chat')}>Чат</Link>
              </li>
              <li>
                <Link to="/favorites" className={isActive('/favorites')}>Избранное</Link>
              </li>
              <li>
                <Link to="/notifications" className={isActive('/notifications')}>Уведомления</Link>
              </li>
              {isAuthenticated ? (
                <>
                  <Link to="/resume" className={isActive('/resume')}>Резюме</Link>
                  <Link to={handleDashboardLink} className={isActive(handleDashboardLink)}>Личный кабинет</Link>
                  <Link to="/logout" className={isActive('/logout')}>Выйти</Link>
                </>
              ) : (
                <Link to="/authorization" className={isActive('/authorization')}>Войти</Link>
              )}
              <LanguageSwitcher className="header__language-switcher" />
              <Link to="/search" className={isActive('/search')}>
                <SearchIcon color="inherit" />
              </Link>
            </ul>
        </div>  
      </div>
    </div>
  );
}

export default Header;
