import React, { Suspense, useState, useEffect, useRef } from 'react';
import './style.scss';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Loader from '../Loader/';
import Header from '../Header/';
import Footer from '../Footer/';
import NotFound from '../NotFound/';
import ProtectedRoute from '../ProtectedRoute';
import { AuthorizationProxy } from '../AuthorizationProxy';
import { CompanyVacancies } from '../../../pages/CompanyVacancies';

const MainPage = React.lazy(() => import('../../../pages/Main/'));
const ResumePage = React.lazy(() => import('../../../pages/Resume/'));
const ResumeEditPage = React.lazy(() => import('../../../pages/ResumeEdit/'));
const ResumeCreatePage = React.lazy(() => import('../../../pages/ResumeCreate/'));
const UIPage = React.lazy(() => import('../../../pages/UI/'));
const AuthorizationPage = React.lazy(() => import('../../../pages/Authorization/'));
const RegistrationPage = React.lazy(() => import('../../../pages/Registration/'));
const ChatPage = React.lazy(() => import('../../../pages/Chat/'));
const VacanciesPage = React.lazy(() => import('../../../pages/Vacancies/'));
const InternshipsPage = React.lazy(() => import('../../../pages/Internships/'));
const PersonalCabinet = React.lazy(() => import('../../../pages/PersonalCabinet/'));
const LogoutPage = React.lazy(() => import('../../../pages/Logout/'));
const CreateVacancyPage = React.lazy(() => import('../../../pages/CreateVacancy/'));
const EditVacancyPage = React.lazy(() => import('../../../pages/EditVacancy/'));
const VacancyDetailPage = React.lazy(() => import('../../../pages/VacancyDetail/'));
const CalendarPage = React.lazy(() => import('../../../pages/Calendar/'));

function renderFallback() {
  return <Loader />;
}

function AppRoutes() {
  const location = useLocation();
  const showHeaderAndFooter = !['/authorization', '/registration'].includes(location.pathname);
  const footerRef = useRef<HTMLElement>(null);

  // Состояние для кнопки "Вверх"
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Здесь мне нужно получить сколько пикселей футера в высоту видно на экране
  const [heightVisibleFooter, setHeightVisibleFooter] = useState(0);

  useEffect(() => {
    function updateFooterVisibility() {
      if (!footerRef.current) {
        setHeightVisibleFooter(0);
        return;
      }
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const buttonDefaultBottom = 40;
      const minGap = 20;
      let visibleFooter = 0;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, windowHeight);
        visibleFooter = Math.max(0, visibleBottom - visibleTop);
      }
      setHeightVisibleFooter(visibleFooter + buttonDefaultBottom + minGap);
    }

    updateFooterVisibility();
    window.addEventListener('scroll', updateFooterVisibility, { passive: true });
    window.addEventListener('resize', updateFooterVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateFooterVisibility);
      window.removeEventListener('resize', updateFooterVisibility);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Показываем кнопку, если прокрутили больше 150px
      setShowScrollTop(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {showHeaderAndFooter && <Header />}
      <div className="route_container">
        <Routes>
          <Route path="/" element={
            <Suspense fallback={renderFallback()}>
              <MainPage />
            </Suspense>
          } />
          <Route path="/lk/resume" element={
            <Suspense fallback={renderFallback()}>
              <ProtectedRoute>
                <ResumePage />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/lk/resume/edit/:id" element={
            <Suspense fallback={renderFallback()}>
              <ProtectedRoute>
                <ResumeEditPage />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/lk/resume/create" element={
            <Suspense fallback={renderFallback()}>
              <ProtectedRoute>
                <ResumeCreatePage />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/authorization" element={
            <Suspense fallback={renderFallback()}>
              <AuthorizationPage />
            </Suspense>
          } />
          <Route path="/registration" element={
            <Suspense fallback={renderFallback()}>
              <RegistrationPage />
            </Suspense>
          } />
          <Route path="/ui" element={
            <Suspense fallback={renderFallback()}>
              <UIPage />
            </Suspense>
          } />
          <Route path="/chat" element={
            <Suspense fallback={renderFallback()}>
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/vacancies" element={
            <Suspense fallback={renderFallback()}>
              <VacanciesPage />
            </Suspense>
          } />
          <Route path="/internships" element={
            <Suspense fallback={renderFallback()}>
              <InternshipsPage />
            </Suspense>
          } />
          <Route path="/auth-proccess" element={
            <Suspense fallback={renderFallback()}>
                <ProtectedRoute>
                    <AuthorizationProxy />
                </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/lk" element={
            <Suspense fallback={renderFallback()}>
              <ProtectedRoute>
                <PersonalCabinet />
              </ProtectedRoute>
            </Suspense>
          } />
            <Route path="/lk/vacancies" element={
                <Suspense fallback={renderFallback()}>
                    <ProtectedRoute>
                        <CompanyVacancies />
                    </ProtectedRoute>
                </Suspense>
            } />
            <Route path="/lk/vacancies/create" element={
                <Suspense fallback={renderFallback()}>
                    <ProtectedRoute>
                        <CreateVacancyPage />
                    </ProtectedRoute>
                </Suspense>
            } />
            <Route path="/lk/vacancies/edit/:id" element={
                <Suspense fallback={renderFallback()}>
                    <ProtectedRoute>
                        <EditVacancyPage />
                    </ProtectedRoute>
                </Suspense>
            } />
            <Route path="/lk/vacancies/:id" element={
                <Suspense fallback={renderFallback()}>
                    <ProtectedRoute>
                        <VacancyDetailPage />
                    </ProtectedRoute>
                </Suspense>
            } />
            <Route path="/resume/:id" element={
                <Suspense fallback={renderFallback()}>
                    <ProtectedRoute>
                        <ResumePage />
                    </ProtectedRoute>
                </Suspense>
            } />
          <Route path="/logout" element={
            <Suspense fallback={renderFallback()}>
              <ProtectedRoute>
                <LogoutPage />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/calendar" element={
            <Suspense fallback={renderFallback()}>
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
      {showHeaderAndFooter && <Footer ref={footerRef} />}
      
      {/* Кнопка "Вверх" */}
      {showScrollTop && (
        <button 
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Вернуться наверх"
          style={{ bottom: `${heightVisibleFooter}px` }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 19V5M12 5L5 12M12 5L19 12" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  );
}

function WebRouter() {
  return (
    <Router basename={'/'}>
      <AppRoutes />
    </Router>
  );
}

export default WebRouter;
