import { Button } from "../../../components";
import React from "react";
import "./landingPage.css";
import { NavLink } from "react-router-dom";
import {
  ladyPic,
  landingHero,
  landingMission,
  search1,
  search10,
  search2,
  search3,
  search4,
  search5,
  search6,
  search7,
  search8,
  search9,
  searchIcon,
  footerLogoIcon,
  pattern1SVGLanding,
  pattern3SVGLanding,
  pattern2SVGLanding,
  dotSVGLanding,
} from "../../../assets";
import { LandingNavbar } from "../../../widgets";

function LandingPage() {
  return (
    <React.Fragment>
      <LandingNavbar />
      <main>
        <section className="landing-page container-red">
          <aside className="landing-page hero-description">
            <h1>Just Press Play</h1>
            <p>
              Upload and listen to your favourite podcasts in one place. Join
              our amazing world and share
            </p>
            <Button label="Get started" className="landing-page hero-button" />
          </aside>
          <aside className="landing-page hero-image">
            <div className="hero-image svgs"></div>
            {pattern1SVGLanding()}
            {pattern2SVGLanding()}
            {pattern3SVGLanding()}
            {dotSVGLanding()}
            <img src={landingHero} alt="landing hero" />
          </aside>
        </section>
        <section className="landing-page container-white">
          <aside className="landing-page mission-image">
            <img src={landingMission} alt="landing hero" />
          </aside>
          <aside className="landing-page mission-description">
            <p>
              Press Play gives podcast creators an opportunity to share their
              voice with their listeners.
            </p>
            <p>
              We’re passionate about your expressive side and our unique podcast
              features was built just for that! We are wholly committed to
              giving people a voice.
            </p>
          </aside>
        </section>
        <section id="landing-services" className="landing-page container-red">
          <div className="service-1">
            <svg
              width="52"
              height="50"
              viewBox="0 0 52 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M28.6692 28.9833V49.9993H22.4416V28.9833C20.3959 27.8796 19.0062 25.7215 19.0062 23.2393C19.0062 19.6347 21.9387 16.7117 25.5554 16.7117C29.1717 16.7117 32.1046 19.6347 32.1046 23.2393C32.1046 25.7215 30.7149 27.8796 28.6692 28.9833ZM16.3549 4.62881C17.5678 4.0326 18.0649 2.56862 17.4668 1.36087C16.8686 0.152706 15.4011 -0.343579 14.1891 0.252212C9.23921 2.68596 5.38956 6.71221 2.95706 11.4532C1.16014 14.9546 0.13565 18.8507 0.0121123 22.7824C-0.112258 26.7473 0.67223 30.7524 2.4966 34.4387C4.74317 38.9799 8.55205 43.019 14.1595 45.8785C15.3612 46.4909 16.8337 46.0153 17.4476 44.8175C18.062 43.6197 17.5853 42.1524 16.3836 41.5405C11.7927 39.2 8.69431 35.9329 6.88616 32.2806C5.42783 29.3324 4.80057 26.1208 4.9004 22.9358C5.00147 19.7197 5.83879 16.5334 7.30877 13.6702C9.27706 9.83462 12.3784 6.58327 16.3549 4.62881ZM36.9217 0.251797C35.7097 -0.344408 34.2418 0.152292 33.6436 1.36046C33.0455 2.56862 33.543 4.0326 34.7559 4.62839C38.7328 6.58327 41.8342 9.8342 43.8016 13.6702C45.2712 16.533 46.1089 19.7193 46.2096 22.9358C46.3094 26.1208 45.6821 29.3324 44.2242 32.2806C42.4161 35.9329 39.3176 39.2 34.7268 41.5405C33.5251 42.1529 33.0488 43.6202 33.6627 44.8175C34.2767 46.0153 35.7492 46.4905 36.9509 45.8785C42.5579 43.0194 46.3672 38.9799 48.6138 34.4387C50.4382 30.7524 51.2226 26.7473 51.0983 22.7824C50.9747 18.8507 49.9502 14.9546 48.1537 11.4532C45.7208 6.71221 41.8716 2.68596 36.9217 0.251797ZM34.4368 10.9889C33.5238 10.3334 32.2506 10.5403 31.593 11.4503C30.9358 12.3604 31.1429 13.6295 32.0559 14.285C32.424 14.5491 32.7851 14.8456 33.1391 15.1698C35.2068 17.0699 36.433 19.6036 36.6905 22.2845C36.9509 24.9893 36.2283 27.8555 34.3952 30.3909C34.0841 30.8216 33.7256 31.2582 33.32 31.6969C32.5567 32.5228 32.6096 33.8105 33.4394 34.5709C34.2688 35.3313 35.5603 35.2778 36.3232 34.4519C36.814 33.9217 37.2741 33.357 37.7021 32.7637C40.1404 29.3892 41.0987 25.5495 40.7477 21.9022C40.395 18.2317 38.7216 14.7676 35.9027 12.1767C35.4593 11.7692 34.9705 11.3728 34.4368 10.9889ZM19.0545 14.2863C19.9675 13.6308 20.175 12.3617 19.5174 11.4516C18.8598 10.5415 17.5866 10.3346 16.6735 10.9897C16.1395 11.3736 15.6511 11.77 15.2077 12.1772C12.3884 14.7684 10.715 18.2321 10.3623 21.9026C10.0112 25.5495 10.9696 29.3904 13.4083 32.7649C13.8372 33.3578 14.2968 33.9221 14.7872 34.4524C15.5501 35.2782 16.8416 35.3317 17.6706 34.5713C18.5008 33.811 18.5537 32.5236 17.7904 31.6973C17.3848 31.2582 17.0263 30.8221 16.7151 30.3913C14.8824 27.8559 14.1595 24.9902 14.4199 22.2853C14.6774 19.6048 15.9036 17.0708 17.9713 15.1706C18.3257 14.8468 18.6868 14.5504 19.0545 14.2863Z"
                fill="white"
              />
            </svg>
            <h2>Free hosting and Distribution</h2>
            <p>
              100% Free hosting and distribution to a wide range of listeners
            </p>
          </div>
          <div className="service-2">
            <svg
              width="35"
              height="50"
              viewBox="0 0 35 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.8308 23.2381C34.8308 21.932 33.7728 20.8781 32.4707 20.8781C31.1646 20.8781 30.1107 21.936 30.1107 23.2381C30.1107 27.889 28.9958 31.7301 26.7375 34.2936C24.6908 36.613 21.5984 37.9517 17.4195 37.9517C13.2406 37.9517 10.1482 36.617 8.10144 34.2977C5.83907 31.7342 4.72823 27.8931 4.72823 23.2381C4.72823 21.932 3.67029 20.8781 2.3682 20.8781C1.06205 20.8781 0.00817871 21.936 0.00817871 23.2381C0.00817871 29.0365 1.50964 33.9518 4.5614 37.4146C6.8075 39.9618 9.83484 41.687 13.6475 42.3584V46.2321H7.86137C6.82784 46.2321 5.98149 47.0785 5.98149 48.112V49.9959H28.8656V48.112C28.8656 47.0785 28.0192 46.2321 26.9857 46.2321H21.1874V42.3584C25 41.6829 28.0233 39.9618 30.2735 37.4105C33.3252 33.9518 34.8308 29.0365 34.8308 23.2381ZM17.4154 0C22.2331 0 26.1719 3.94287 26.1719 8.75651V8.98438H21.4641V14.563H26.176V17.4032H21.4641V22.9818H26.176V24.9878C26.176 29.8055 22.2331 33.7443 17.4195 33.7443C12.6018 33.7443 8.66296 29.8014 8.66296 24.9878V22.9818H13.3749V17.4032H8.6589V14.563H13.3708V8.98438H8.6589V8.75651C8.6589 3.94287 12.5977 0 17.4154 0Z"
                fill="white"
              />
            </svg>
            <h2>Easy-to-use podcast features</h2>
            <p>
              User-friendly and engaging podcast interface features that
              podcasters and listeners love
            </p>
          </div>
          <div className="service-3">
            <svg
              width="101"
              height="50"
              viewBox="0 0 101 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.9821 12.9442C39.9821 11.7868 40.9195 10.8494 42.0769 10.8494C43.2344 10.8494 44.1718 11.7868 44.1718 12.9442V37.0721C44.1718 38.2295 43.2344 39.1669 42.0769 39.1669C40.9195 39.1669 39.9821 38.2295 39.9821 37.0721V12.9442ZM60.181 12.9442C60.181 11.7868 59.2436 10.8494 58.0861 10.8494C56.9286 10.8494 55.9912 11.7868 55.9912 12.9442V37.0721C55.9912 38.2295 56.9286 39.1669 58.0861 39.1669C59.2436 39.1669 60.181 38.2295 60.181 37.0721V12.9442ZM100.163 7.71112C100.163 6.55364 99.2338 5.62439 98.1008 5.62439C96.9596 5.62439 96.0385 6.55364 96.0385 7.71112V42.297C96.0385 43.4545 96.9677 44.3838 98.1008 44.3838C99.2419 44.3838 100.163 43.4545 100.163 42.297V7.71112ZM92.1992 2.09488C92.1992 0.937398 91.2618 0 90.1043 0C88.9469 0 88.0095 0.937398 88.0095 2.09488V47.9051C88.0095 49.0626 88.9469 50 90.1043 50C91.2618 50 92.1992 49.0626 92.1992 47.9051V2.09488ZM68.1855 17.6557C68.1855 16.4982 67.2481 15.5608 66.0906 15.5608C64.9332 15.5608 63.9958 16.4982 63.9958 17.6557V32.3443C63.9958 33.5018 64.9332 34.4392 66.0906 34.4392C67.2481 34.4392 68.1855 33.5018 68.1855 32.3443V17.6557ZM76.1819 12.9442C76.1819 11.7868 75.2445 10.8494 74.0871 10.8494C72.9296 10.8494 71.9922 11.7868 71.9922 12.9442V37.0721C71.9922 38.2295 72.9296 39.1669 74.0871 39.1669C75.2445 39.1669 76.1819 38.2295 76.1819 37.0721V12.9442ZM84.162 7.71112C84.162 6.55364 83.2328 5.62439 82.0998 5.62439C80.9586 5.62439 80.0375 6.55364 80.0375 7.71112V42.297C80.0375 43.4545 80.9667 44.3838 82.0998 44.3838C83.241 44.3838 84.162 43.4545 84.162 42.297V7.71112ZM0 7.71112C0 6.56179 0.929247 5.62439 2.06228 5.62439C3.20346 5.62439 4.12455 6.55364 4.12455 7.71112V42.297C4.12455 43.4545 3.1953 44.3838 2.06228 44.3838C0.921096 44.3838 0 43.4464 0 42.297V7.71112ZM7.97196 2.09488C7.97196 0.937398 8.90936 0 10.0668 0C11.2243 0 12.1617 0.937398 12.1617 2.09488V47.9051C12.1617 49.0626 11.2243 50 10.0668 50C8.90936 50 7.97196 49.0626 7.97196 47.9051V2.09488ZM31.9775 17.6557C31.9775 16.4982 32.9149 15.5608 34.0724 15.5608C35.2299 15.5608 36.1673 16.4982 36.1673 17.6557V32.3443C36.1673 33.5018 35.2299 34.4392 34.0724 34.4392C32.9149 34.4392 31.9775 33.5018 31.9775 32.3443V17.6557ZM23.9811 12.9442C23.9811 11.7868 24.9185 10.8494 26.076 10.8494C27.2335 10.8494 28.1709 11.7868 28.1709 12.9442V37.0721C28.1709 38.2295 27.2335 39.1669 26.076 39.1669C24.9185 39.1669 23.9811 38.2295 23.9811 37.0721V12.9442ZM16.001 7.71112C16.001 6.55364 16.9302 5.62439 18.0633 5.62439C19.2044 5.62439 20.1255 6.55364 20.1255 7.71112V42.297C20.1255 43.4545 19.1963 44.3838 18.0633 44.3838C16.9221 44.3838 16.001 43.4545 16.001 42.297V7.71112ZM48.0111 7.71112C48.0111 6.55364 48.9403 5.62439 50.0734 5.62439C51.2145 5.62439 52.1356 6.55364 52.1356 7.71112V42.297C52.1356 43.4545 51.2064 44.3838 50.0734 44.3838C48.9322 44.3838 48.0111 43.4545 48.0111 42.297V7.71112Z"
                fill="white"
              />
            </svg>

            <h2>A wide range of options to choose from</h2>
            <p>Thousands of free and engaging podcasts topics to choose from</p>
          </div>
        </section>
        <section className="landing-page container-white" id="search">
          <aside className="landing-page search-container">
            <div></div>
            <h1>The most engaging podcast topics to choose from</h1>
            <div htmlFor="search" className="landing-nav-search ">
              {searchIcon()}
              <input type="search" placeholder="Search for podcasts" />
            </div>
            <div className="search-images">
              <img src={search1} alt="" />
              <img src={search2} alt="" />
              <img src={search3} alt="" />
              <img src={search4} alt="" />
              <img src={search5} alt="" />
              <img src={search6} alt="" />
              <img src={search7} alt="" />
              <img src={search8} alt="" />
              <img src={search9} alt="" />
              <img src={search10} alt="" />
            </div>
          </aside>
        </section>
        <section className="landing-page container-metal feedback">
          <aside className="landing-page feedback-description">
            <h2>Real Stories from Real Podcasters &#38; Listeners</h2>
            <p>Get inspired by these stories.</p>
          </aside>

          <div className="landing-cards card3">
            <blockquote>
              <i className="fas fa-quote-left"></i>
              Press Play is one of the best Podcast site I have come across.
              It’s so flexible, well organised and informative
            </blockquote>
            <h4>Elliot Yibaebi</h4>
            <p>President, NDU</p>
          </div>
          <div className="landing-cards card2">
            <blockquote>
              <i class="fas fa-quote-left"></i>
              This Is incredible! It’s a pretty neat service and it is well
              convenient.
            </blockquote>

            <h4>Yvonne Ogwulu</h4>
            <p>CEO, Tech Girl Magic</p>
          </div>
          <div className="landing-cards card1">
            <blockquote>
              <i class="fas fa-quote-left"></i>
              Just found a new way to upload podcasts, Thanks Press play.
            </blockquote>
            <h4>Yemi Harry</h4>
            <p>Back-end Developer, Genesys</p>
          </div>
        </section>
        <section className="landing-page container-white make-podcast">
          <aside className="landing-page mission-description ">
            <h4>Ready to make your own podcasts?</h4>
            <p>Join the PressPlay Community</p>
            <Button
              label="Get started"
              className="landing-page podcast-button "
            />
          </aside>
          <aside className="landing-page mission-image">
            <img src={ladyPic} alt="landing hero" />
          </aside>
        </section>
      </main>
      <footer className="landing-page container-metal landing-footer">
        <div className="footer-links-container">
          {footerLogoIcon()}
          <aside className="footer-links">
            <div>
              <h4>Company</h4>
              <NavLink to="#">About Us</NavLink>
              <NavLink to="#">Blog</NavLink>
              <NavLink to="#">Careers</NavLink>
              <NavLink to="#">Contact Us</NavLink>
            </div>
            <div>
              <h4>Support</h4>
              <NavLink to="#">Help Center</NavLink>
              <NavLink to="#">Safety Center</NavLink>
              <NavLink to="#">Community Guidelines</NavLink>
            </div>
            <div>
              <h4>Legal</h4>
              <NavLink to="#">Cookies Policy</NavLink>
              <NavLink to="#">Privacy Policy</NavLink>
              <NavLink to="#">Terms and Conditios</NavLink>
              <NavLink to="#"></NavLink>
            </div>
          </aside>
        </div>
      </footer>
    </React.Fragment>
  );
}

export { LandingPage };
