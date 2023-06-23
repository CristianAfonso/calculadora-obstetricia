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
    const [ga, setGa] = useState((props.weeks) + props.days / 7);
    /*
    const [handler, setHandler] = useState("");
    const [hadlock2Weight, setHL2Weight] = useState("");
    const [hadlock2Weeks, setHL2Weeks] = useState("");
    const [hadlock2Days, setHL2Days] = useState("");
    const [hadlock3Weight, setHL3Weight] = useState("");
    const [hadlock3Weeks, setHL3Weeks] = useState("");
    const [hadlock3Days, setHL3Days] = useState("");
    const [customWeight, setCustomWeight] = useState("");
    const [gregorioCustomPercentile, setGregorioCustomPercentile] = useState("");
    const [gregorioCustomWeight, setGregorioCustomWeight] = useState("");
    const [gregorioCustomZscore, setGregorioCustomZscore] = useState("");
    const [clinicCustomPercentile, setClinicCustomPercentile] = useState("");
    const [clinicCustomWeight, setClinicCustomWeight] = useState("");
    const [clinicCustomZscore, setClinicCustomZscore] = useState("");
    const [genre, setGenre] = useState("male");
    */
    const { t } = useTranslation();

    useEffect(() => {
        setGa((props.weeks) + props.days / 7);
        setWeeks(props.weeks);
        setDays(props.days);
    });

    return (
        <div className="service-container">
            <div className='title-container'>
                <h3>{t('biometric')}</h3>
                <div className='weeksAndDays'>
                    <p>{t('weeks')}: {props.weeks}</p>
                    <p>{t('days')}: {props.days}</p>
                </div>
            </div>
            <h2>{t('Biometric_title')}</h2>
            <div className='service-content'>
                <div id='biometric-container'>
                    <BiometricDataInput cc={setCC} dbp={setDBP} lf={setLF} ca={setCA} weeks={weeks} days={days} />
                    <BiometricFormulaDisplay cc={cc} dbp={dbp} lf={lf} ca={ca} weeks={weeks} days={days} />
                </div>
            </div>
            <h2>{t('Hemodinamic_title')}</h2>
            <HemodinamicStudio weeks={weeks} days={days}/>
        </div>
    );
}