import './style.scss';
import Logo from '../Logo';
import Link from '../../UI/Link';
import LanguageSwitcher from '../../UI/LanguageSwitcher';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserData } from '../../../redux/user/selectors';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: userData } = useSelector(selectUserData);
  console.log(userData);
  const location = useLocation();

  const handleDashboardLink = useMemo(() => {
    if (userData?.role) {
      // Преобразуем job_seeker -> job-seeker для URL
      const roleUrl = userData.role.toLowerCase().replace(/_/g, '-');
      return `/${roleUrl}-dashboard`;
    }
    return '/';
  }, [userData?.role]);

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
                <Link to="/applications" className={isActive('/applications')}>Отклики</Link>
              </li>
              <li className={isAuthenticated ? 'visible' : 'hidden'}>
                <Link to="/chat" className={isActive('/chat')}>Чат</Link>
              </li>
              <li className={isAuthenticated ? 'visible' : 'hidden'}>
                <Link to="/favorites" className={isActive('/favorites')}>Избранное</Link>
              </li>
              <li className={isAuthenticated ? 'visible' : 'hidden'}>
                <Link to="/notifications" className={isActive('/notifications')}>Уведомления</Link>
              </li>
              <li className={isAuthenticated ? 'visible' : 'hidden'}>
                <Link to="/resume" className={isActive('/resume')}>Резюме</Link>
              </li>
              <li className={isAuthenticated ? 'visible' : 'hidden'}>
                <Link to={handleDashboardLink} className={isActive(handleDashboardLink)}>Личный кабинет</Link>
              </li>
              <li className={isAuthenticated ? 'visible' : 'hidden'}>
                <Link to="/logout" className={isActive('/logout')}>Выйти</Link>
              </li>
              <li className={!isAuthenticated ? 'visible' : 'hidden'}>
                <Link to="/authorization" className={isActive('/authorization')}>Войти</Link>
              </li>
              <li>
                <LanguageSwitcher className="header__language-switcher" />
              </li>
              <li>
                <Link to="/search" className={isActive('/search')}>
                  <SearchIcon color="inherit" style={{ fontSize: '30px' }} />
                </Link>
              </li>
            </ul>
        </div>  
      </div>
    </div>
  );
}

export default Header;
