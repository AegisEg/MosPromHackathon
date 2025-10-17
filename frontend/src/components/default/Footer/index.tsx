import React from 'react';
import './style.scss';
import Logo from '../Logo';

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer_wrapper">
          <div className="footer_wrapper_item">
            <div className="footer_wrapper_item-block">
              <div className="footer_wrapper_item-block_title">
                <Logo type="white" />
              </div>
              <div className="footer_wrapper_item-block_content">
                <p>© 2025 Technopolis. All rights reserved.</p>
              </div>
            </div>
            <div className="footer_wrapper_item-block">
              <div className="footer_wrapper_item-block_title">
                <h3>ПОДПИШИСЬ</h3>
              </div>
              <div className="footer_wrapper_item-block_content">
                <div className="footer_wrapper_item-block_social">
                  <a href="http://www.technopolis.ru/">
                    <svg width="33" height="29" viewBox="0 0 33 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_96_2839)">
                      <g clip-path="url(#clip1_96_2839)">
                      <path d="M3.51177 11.9881C11.5965 8.46617 16.9875 6.14334 19.6849 5.02334C27.3857 1.8177 28.9856 1.2624 30.0304 1.24358C30.2581 1.23982 30.772 1.29629 31.1033 1.56546C31.3251 1.7578 31.4662 2.02664 31.4986 2.3184C31.5362 2.53299 31.5814 3.02429 31.5456 3.41017C31.1278 7.79605 29.3226 18.4351 28.4021 23.3481C28.0144 25.4262 27.2482 26.1226 26.5085 26.1904C24.8972 26.3391 23.6755 25.1269 22.1151 24.1048C19.6736 22.5048 18.2939 21.5071 15.9259 19.9466C13.1871 18.1415 14.9621 17.1513 16.5226 15.5306C16.9311 15.1052 24.0275 8.65064 24.1649 8.06523C24.1838 7.9937 24.1988 7.72076 24.0351 7.57582C23.8732 7.43087 23.6341 7.4817 23.4609 7.51934C23.2162 7.57582 19.3179 10.1546 11.764 15.2521C10.6572 16.0125 9.65577 16.3815 8.756 16.3626C7.76588 16.3419 5.86094 15.8036 4.44541 15.3424C2.708 14.7777 1.32824 14.4803 1.44871 13.5203C1.51082 13.0215 2.19788 12.5113 3.51177 11.9881Z" fill="white"/>
                      </g>
                      </g>
                      <defs>
                      <clipPath id="clip0_96_2839">
                      <rect width="32" height="28.23" fill="white" transform="translate(0.5 0.305054)"/>
                      </clipPath>
                      <clipPath id="clip1_96_2839">
                      <rect width="32" height="28.23" fill="white" transform="translate(0.5 0.305054)"/>
                      </clipPath>
                      </defs>
                    </svg>
                  </a>

                  <a href="http://www.technopolis.ru/">
                    <svg width="33" height="31" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_96_2844)">
                      <g clip-path="url(#clip1_96_2844)">
                      <path d="M27.1324 4.52819C25.3792 2.77661 22.5514 2.77661 16.8655 2.77661H15.8651C10.2061 2.77661 7.37663 2.77661 5.59811 4.52819C3.84653 6.27977 3.84653 9.10924 3.84653 14.7935V15.7956C3.84653 21.4545 3.84653 24.284 5.59811 26.0608C7.35137 27.8141 10.1792 27.8141 15.8651 27.8141H16.8655C22.5244 27.8141 25.3539 27.8141 27.1324 26.0625C28.884 24.3092 28.884 21.4798 28.884 15.7956V14.7935C28.884 9.13451 28.884 6.30503 27.1324 4.52819ZM21.8238 20.8027C21.1973 18.8255 19.5956 17.2979 17.5173 17.0722V20.8027H17.1905C11.4811 20.8027 8.22547 16.897 8.10084 10.3876H10.9556C11.0566 15.1707 13.1585 17.1985 14.836 17.5977V10.3876H17.5408V14.5189C19.1914 14.3438 20.9211 12.4642 21.4971 10.3876H24.2002C23.7505 12.9408 21.8726 14.8187 20.5455 15.5951C21.5906 16.1121 22.5133 16.8464 23.2516 17.7489C23.99 18.6513 24.527 19.7011 24.8267 20.828L21.8238 20.8027Z" fill="white"/>
                      </g>
                      </g>
                      <defs>
                      <clipPath id="clip0_96_2844">
                      <rect width="32" height="30.31" fill="white" transform="translate(0.5 0.265015)"/>
                      </clipPath>
                      <clipPath id="clip1_96_2844">
                      <rect width="32" height="30.31" fill="white" transform="translate(0.5 0.265015)"/>
                      </clipPath>
                      </defs>
                    </svg>
                  </a>

                  <a href="http://www.technopolis.ru/">
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_96_2851)">
                      <g clip-path="url(#clip1_96_2851)">
                      <path d="M31.1943 0.420044C30.1562 0.420044 29.1181 0.420044 28.0692 0.420044H1.66656C0.928094 0.420044 0.5 0.85884 0.5 1.608V20.6903C0.5 21.493 0.895987 21.8889 1.70936 21.8889H31.205C31.5368 21.8889 31.9221 21.8568 32.2003 21.5786C32.4786 21.3003 32.5107 20.915 32.5107 20.5726V1.74713C32.5 0.848138 32.0826 0.420044 31.1943 0.420044ZM12.2084 10.7371L2.58696 18.6568V3.54513L12.2191 10.7371H12.2084ZM16.4893 11.3471L4.68462 2.53911H28.294L16.4893 11.3471ZM6.23646 18.3465C8.79432 16.2488 11.3415 14.1511 13.9314 12.0214C14.3488 12.3532 14.7662 12.6635 15.1943 12.9739L15.7294 13.3699C16.3074 13.798 16.6819 13.798 17.2706 13.3699L17.8271 12.9525C18.2338 12.6528 18.6298 12.3532 19.0579 12.0214C20.5348 13.2414 22.0117 14.4615 23.4886 15.6709L28.5294 19.8127H4.45987L6.22575 18.3572L6.23646 18.3465ZM30.3809 3.55583V18.6354L20.7595 10.7371L30.3809 3.55583Z" fill="white"/>
                      </g>
                      </g>
                      <defs>
                      <clipPath id="clip0_96_2851">
                      <rect width="32" height="32" fill="white" transform="translate(0.5 0.420044)"/>
                      </clipPath>
                      <clipPath id="clip1_96_2851">
                      <rect width="32" height="21.4689" fill="white" transform="translate(0.5 0.420044)"/>
                      </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer_wrapper_item">
            <div className="footer_wrapper_item-block">
              <div className="footer_wrapper_item-block_title">
                <h3>Меню</h3>
              </div>
              <div className="footer_wrapper_item-block_content">
                <ul className="footer_wrapper_item-block_list">
                  <li><a href="/oecz">ОЭЗ</a></li>
                  <li><a href="/login">Личный кабинет</a></li>
                  <li><a href="/rent">Аренда</a></li>
                  <li><a href="/contacts">Контакты</a></li>
                  <li><a href="/events">Мероприятия</a></li>
                  <li><a href="/faq">FAQ</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer_wrapper_item">
            <div className="footer_wrapper_item-block">
              <div className="footer_wrapper_item-block_title">
                <h3>Контакты</h3>
              </div>
              <div className="footer_wrapper_item-block_content">
                <a href="mailto:office@technomoscow.ru">office@technomoscow.ru</a>
                <a href="tel:+74956470818">+7 495 647 08 18</a>
                <a href="https://yandex.ru/maps/-/CLVneOIp">109316 г. Москва, Волгоградский проспект, д. 42</a>
              </div>
            </div>
            <div className="footer_wrapper_item-block">
              <div className="footer_wrapper_item-block_title">
                <h3>Контакты для СМИ</h3>
              </div>
              <div className="footer_wrapper_item-block_content">
                <a href="tel:+749564708181209">+7 495 647 08 18 (доб. 1209)</a>
                <a href="mailto:pr@technomoscow.ru">pr@technomoscow.ru</a>
              </div>
            </div>
          </div>
          <div className="footer_wrapper_item">
            <div className="footer_wrapper_item-block">
              <div className="footer_wrapper_item-block_content">
                <ul className="footer_wrapper_item-block_list">
                  <li className='underline'><a href="/privacy">Политика конфиденциальности</a></li>
                  <li className='underline'><a href="/disclosure">Раскрытие информации</a></li>
                  <li className='underline'><a href="/anti-corruption">Противодействие коррупции</a></li>
                  <li className='underline'><a href="/anti-terrorism">Антитеррористическая деятельность</a></li>
                  <li className='underline'><a href="/purchases">Закупки</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
