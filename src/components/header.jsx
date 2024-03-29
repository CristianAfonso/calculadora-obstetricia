import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import Guide from './userGuide';
function Header(props) {
    const { t } = useTranslation()
    const GlobeIcon = ({ width = 24, height = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 
            0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 
            2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 
            .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 
            1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 
            0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 
            0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 
            13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 
            7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
        </svg>
    )
    const Arrow = ({ width = 10, height = 10 }) => (
        <svg fill="#fff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330" >
            <path id="XMLID_224_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
            l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
            C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>
        </svg>
    )

    return (
        <header>
            <div id="logo-with-bg">
                <div id="logo-container">
                    <div className="pair">
                        <img id="logo-gregorio" className="img-fluid" src="./images/HGUGM.png" alt="HUGM" />
                        <img id="logo-ulpgc" className="img-fluid" src="./images/ulpgcLogo.png" alt="ULPGC" />
                    </div>
                    <h1>{t('service')}</h1>
                </div>
            </div>
            <div id="language-wrapper">
                <div className="dropdown" >
                    <button className="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <GlobeIcon></GlobeIcon>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {props.languages.map(({ code, name, country_code }) => (
                            <li key={code}>
                                <button className="dropdown-item" onClick={() => i18next.changeLanguage(code)}>
                                    <span className={`flag-icon flag-icon-${country_code} mx-2`}></span>
                                    {name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <Guide></Guide>
            </div>
            <a href='#top' id="goUp"><Arrow></Arrow></a>

        </header>
    );
}
export default Header;