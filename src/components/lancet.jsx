import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { displayBar, getZPercent, EFW_Hadlock2Weight, EFW_Hadlock2Age, EFW_Hadlock3Weight, EFW_Hadlock3Age, hospitalGetWeight, hospitalGetZscore } from "./functions";
export default function Lancet(props) {
    const [ga, setGa] = useState((props.weeks) + props.days / 7);
    const [weight, setWeight] = useState("");
    const [gregorioCustomPercentile, setGregorioCustomPercentile] = useState("");
    const [gregorioWeight, setGregorioWeight] = useState("");
    const [gregorioCustomZscore, setGregorioCustomZscore] = useState("");
    const [clinicCustomPercentile, setClinicCustomPercentile] = useState("");
    const [clinicWeight, setClinicWeight] = useState("");
    const [clinicCustomZscore, setClinicCustomZscore] = useState("");
    const [genre, setGenre] = useState("male");
    const { t } = useTranslation();

    function handleweightChange(event) {
        setWeight(event.target.value);
        handleGregorioChanges(event.target.value);
        handleClinicChanges(event.target.value);
    }
    function handleSelectGenre(event) {
        setGenre(event.target.value);
        if (event.target.value === t('male')) {
            document.getElementById("female-selector").className = 'genreSelector';
            document.getElementById("male-selector").className = 'genreSelector focus';
        } else if (event.target.value === t('female')) {
            document.getElementById("male-selector").className = 'genreSelector';
            document.getElementById("female-selector").className = 'genreSelector focus';
        }
    }
    function handleGregorioChanges(weight) {
        const gregorioReferenceWeight = hospitalGetWeight(ga, genre, "gregorio");
        const gregorioCalculatedZscore = hospitalGetZscore(weight, gregorioReferenceWeight, "gregorio");
        const gregorioPercent = getZPercent(gregorioCalculatedZscore);
        setGregorioWeight(Math.exp(gregorioReferenceWeight).toFixed(2));
        setGregorioCustomZscore(gregorioCalculatedZscore.toFixed(2));
        setGregorioCustomPercentile(gregorioPercent.toFixed(0));
        displayBar(gregorioPercent.toFixed(0), 'percentile-bar-bio-gregorio');
    }
    function handleClinicChanges(weight) {
        const clinicReferenceWeight = hospitalGetWeight(ga, genre, "clinic");
        const clinicCalculatedZscore = hospitalGetZscore(weight, clinicReferenceWeight, "clinic");
        const clinicPercent = getZPercent(clinicCalculatedZscore);
        setClinicWeight(clinicReferenceWeight.toFixed(2));
        setClinicCustomZscore(clinicCalculatedZscore.toFixed(2));
        setClinicCustomPercentile(clinicPercent.toFixed(0));
        displayBar(clinicPercent.toFixed(0), 'percentile-bar-bio-clinic');
    }
    useEffect(() => {
        setGa((props.weeks) + props.days / 7);
        if (weight) {
            props.setWeight(weight);
        } else {
            setWeight(props.weight);
            handleGregorioChanges(props.weight);
            handleClinicChanges(props.weight);
        }
    });

    return (
        <div className="service-container">
            <div className='title-container'>
                <h3>{t('lancet')}</h3>
                <div className='weeksAndDays'>
                    <p>{t('weeks')}: {props.weeks}</p>
                    <p>{t('days')}: {props.days}</p>
                </div>
            </div>
            <div className='service-content'>
                <div className=''>
                    <span>
                        {t('weight')}
                        <input
                            style={{ marginLeft: 5 + "px", maxWidth: 70 + 'px', height: 39 + 'px' }}
                            type='number'
                            placeholder='g'
                            min={0}
                            value={weight}
                            onChange={handleweightChange} />
                        <button className="genreSelector" id="male-selector" onClick={handleSelectGenre} value="male">{t('male')}</button>
                        <button className="genreSelector" id="female-selector" onClick={handleSelectGenre} value="female">{t('female')}</button>
                    </span>
                    <tr className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-bio-gregorio'>
                                <p>p{gregorioCustomPercentile}</p>
                            </span>
                        </span>
                    </tr>
                    <tr className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-bio-clinic'>
                                <p>p{clinicCustomPercentile}</p>
                            </span>
                        </span>
                    </tr>

                </div>
            </div>
        </div>
    );
    }