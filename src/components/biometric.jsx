import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import BiometricDataInput from './biometricHemodynamicStudioComponents/biometricDataInput';
import BiometricFormulaDisplay from './biometricHemodynamicStudioComponents/biometricFormulaDisplayer';
import HemodinamicStudio from './biometricHemodynamicStudioComponents/hemodinamicStudio';
export default function Biometric(props) {
    const [dbp, setDBP] = useState("");
    const [cc, setCC] = useState("");
    const [ca, setCA] = useState("");
    const [lf, setLF] = useState("");
    const [weeks, setWeeks] = useState(props.weeks);
    const [days, setDays] = useState(props.days);
    const [ua, setUA] = useState(props.ua);
    const [mca, setMCA] = useState(props.mca);
    const [arterialRatio, setArterialRatio] = useState("");
    const [customWeight, setCustomWeight] = useState("");
    const [genre, setGenre] = useState(props.genre);

    /*
    const [handler, setHandler] = useState("");
    const [hadlock2Weight, setHL2Weight] = useState("");
    const [hadlock2Weeks, setHL2Weeks] = useState("");
    const [hadlock2Days, setHL2Days] = useState("");
    const [hadlock3Weight, setHL3Weight] = useState("");
    const [hadlock3Weeks, setHL3Weeks] = useState("");
    const [hadlock3Days, setHL3Days] = useState("");
    const [gregorioCustomPercentile, setGregorioCustomPercentile] = useState("");
    const [gregorioCustomWeight, setGregorioCustomWeight] = useState("");
    const [gregorioCustomZscore, setGregorioCustomZscore] = useState("");
    const [clinicCustomPercentile, setClinicCustomPercentile] = useState("");
    const [clinicCustomWeight, setClinicCustomWeight] = useState("");
    const [clinicCustomZscore, setClinicCustomZscore] = useState("");
    */
    const { t } = useTranslation();

    useEffect(() => {
        if (ua) {
            props.setUA(ua);
        } else {
            setUA(props.ua);
        }
        if (mca) {
            props.setMCA(mca)
        } else {
            setMCA(props.mca);
        }
        if (customWeight) {
            props.setWeight(customWeight);
        } else {
            setCustomWeight(props.weight);
        }
        setGenre(props.genre);
        setArterialRatio((props.mca / props.ua).toFixed(2))
        setWeeks(props.weeks);
        setDays(props.days);
    });

    return (
        <div className="service-container">
            <div className='title-container'>
                <h1>{t('biometric')}</h1>
                <div className='weeksAndDays'>
                    <h3>{t('weeks')}: {props.weeks}</h3>
                    <h3>{t('days')}: {props.days}</h3>
                </div>
            </div>
            <h2>{t('Biometric_title')}</h2>
            <div className='service-content'>
                <div id='biometric-container'>
                    <BiometricDataInput cc={setCC} dbp={setDBP} lf={setLF}
                        ca={setCA} weeks={weeks} days={days} />
                    <BiometricFormulaDisplay cc={cc} dbp={dbp} lf={lf} ca={ca}
                        setCustomWeight={setCustomWeight} customWeight={customWeight}
                        weeks={weeks} days={days} genre={genre} setGenre={props.setGenre} />
                </div>
            </div>
            <h2>{t('Hemodinamic_title')}</h2>
            <HemodinamicStudio setMCA={setMCA} setUA={setUA} weeks={weeks} days={days} ua={ua} mca={mca} />
        </div>
    );
}