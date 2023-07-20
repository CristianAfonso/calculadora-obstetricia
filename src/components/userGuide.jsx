import { useTranslation } from "react-i18next";
import NavGuide from "./userGuideComponents/navGuide";
import LangGuide from "./userGuideComponents/languageGuide";
import DatationGuide from "./userGuideComponents/datationGuide";
import BiometricGuide from "./userGuideComponents/biometricGuide";
import HemodynamicGuide from "./userGuideComponents/hemodynamicGuide";
import BonesGuide from "./userGuideComponents/bonesGuide";
import LancetGuide from "./userGuideComponents/lancetGuide";
import { useState } from "react";
export default function Guide() {
    const { t } = useTranslation();
    const [displayElement, setDisplayed] = useState("");
    return (
        <div id="userGuideContainer">
            <button className="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#userGuideContent" aria-expanded="false" aria-controls="userGuideContent">
                {t('guide_title')}
            </button>
            <div id="userGuideContent" className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <div id="topBar">
                    <span>{t('guide_title_span')}</span>
                    <button id="closeButton" type="button" data-bs-toggle="collapse" data-bs-target="#userGuideContent" aria-expanded="false" aria-controls="userGuideContent">
                        x
                    </button>
                </div>
                <div id="userGuide">
                    <h3>{t('welcome_message')}</h3>
                    <p>{t('guide_presentation')}</p>
                    <ul id="navBarGuide">
                        <button onClick={() => {displayElement === 'language' ? setDisplayed("") :  setDisplayed('language')}}>{t('language')}</button>
                            {displayElement === 'language' && <LangGuide></LangGuide>}
                        <button onClick={() => {displayElement === 'navGuide' ? setDisplayed("") : setDisplayed('navGuide')}}>{t('nav')}</button>
                            {displayElement === 'navGuide' && <NavGuide></NavGuide>}
                        <button onClick={() => {displayElement === 'datationGuide' ? setDisplayed("") : setDisplayed("datationGuide")}}>{t('datation')}</button>
                            {displayElement === 'datationGuide' && <DatationGuide></DatationGuide>} 
                        <button onClick={() => {displayElement === 'biometricGuide' ? setDisplayed("") : setDisplayed("biometricGuide")}}>{t('biometric')}</button>
                            {displayElement === 'biometricGuide' && <BiometricGuide></BiometricGuide>}
                        <button onClick={() => {displayElement === 'hemodinamicGuide' ? setDisplayed("") : setDisplayed("hemodinamicGuide")}}>{t('hemodynamic')}</button>
                            {displayElement === 'hemodinamicGuide' && <HemodynamicGuide></HemodynamicGuide>}
                        <button onClick={() => {displayElement === 'bonesGuide' ? setDisplayed("") : setDisplayed("bonesGuide")}}>{t('bones')}</button>
                            {displayElement === 'bonesGuide' && <BonesGuide></BonesGuide>}
                        <button onClick={() => {displayElement === 'lancetGuide' ? setDisplayed("") : setDisplayed("lancetGuide")}}>{t('lancet')}</button>
                            {displayElement === 'lancetGuide' && <LancetGuide></LancetGuide>}
                        <button onClick={() => {displayElement === 'unicvsmultiGuide' ?setDisplayed("") : setDisplayed("unicvsmultiGuide")}}>{t('unicvsmulti')}</button>
                            {displayElement === 'unicvsmultiGuide' && <NavGuide></NavGuide>}
                    </ul>
                </div>
            </div>
        </div>
    )
}