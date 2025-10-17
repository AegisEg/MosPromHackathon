import React, { Suspense } from 'react';
import './style.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../Loader/';
import Header from '../Header/';
import Footer from '../Footer/';
import NotFound from '../NotFound/';
import ProtectedRoute from '../ProtectedRoute';

function WebRouter() {
  function renderFallback() {
    return (
       <Loader />
    );
  }

  const MainPage = React.lazy(() => import('../../../pages/Main/'));
  
  const ResumePage = React.lazy(() => import('../../../pages/Resume/'));

  const ResumeEditPage = React.lazy(() => import('../../../pages/ResumeEdit/'));

  const UIPage = React.lazy(() => import('../../../pages/UI/'));

  const AuthorizationPage = React.lazy(() => import('../../../pages/Authorization/'));

  const RegistrationPage = React.lazy(() => import('../../../pages/Registration/'));

  const ChatPage = React.lazy(() => import('../../../pages/Chat/'));

  const VacanciesPage = React.lazy(() => import('../../../pages/Vacancies/'));

  const InternshipsPage = React.lazy(() => import('../../../pages/Internships/'));

  return (
      <Router basename={'/'}>
        <Header />
        <div className="route_container">
          <div className="main">
            <div className="container">
              <Routes>
                <Route path="/" element={
                  <Suspense fallback={renderFallback()}>
                    <MainPage />
                  </Suspense>
                } />
                <Route path="/resume" element={
                  <Suspense fallback={renderFallback()}>
                    <ResumePage />
                  </Suspense>
                } />
                <Route path="/resume/edit" element={
                  <Suspense fallback={renderFallback()}>
                    <ResumeEditPage />
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
                    <ChatPage />
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
                <Route path="/protected" element={
                  <Suspense fallback={renderFallback()}>
                    <ProtectedRoute>
                      <div>Protected content</div>
                    </ProtectedRoute>
                  </Suspense>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </Router>
  );
}

export default WebRouter;
