import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { displayBar, getZPercent, hospitalGetWeight, hospitalGetZscore } from "./functions";
export default function Lancet(props) {
    const [ga, setGa] = useState((props.weeks) + props.days / 7);
    const [weight, setWeight] = useState("");
    const [gregorioCustomPercentile, setGregorioCustomPercentile] = useState("");
    const [gregorioWeight, setGregorioCustomWeight] = useState("");
    const [gregorioCustomZscore, setGregorioCustomZscore] = useState("");
    const [clinicCustomPercentile, setClinicCustomPercentile] = useState("");
    const [clinicWeight, setClinicWeight] = useState("");
    const [clinicCustomZscore, setClinicCustomZscore] = useState("");
    const [lancetGregorioPercentile, setGregorioPercentile] = useState("");
    const [lancetGregorioWeight, setGregorioWeight] = useState("");
    const [lancetGregorioZscore, setGregorioZscore] = useState("");
    const [talaveraPercentile, setTalaveraPercentile] = useState("");
    const [talaveraWeight, setTalaveraWeight] = useState("");
    const [talaveraZscore, setTalaveraZscore] = useState("");
    const [fuenlabradaPercentile, setFuenlabradaPercentile] = useState("");
    const [fuenlabradaWeight, setFuenlabradaWeight] = useState("");
    const [fuenlabradaZscore, setFuenlabradaZscore] = useState("");
    const [alcazarPercentile, setAlcazarPercentile] = useState("");
    const [alcazarWeight, setAlcazarWeight] = useState("");
    const [alcazarZscore, setAlcazarZscore] = useState("");
    const [genre, setGenre] = useState("");
    const { t } = useTranslation();

    function handleweightChange(event) {
        setWeight(event.target.value);
        handleGregorioChanges(event.target.value);
        handleClinicChanges(event.target.value);
        handleGregorioLancetChanges(event.target.value);
        handleTalaveraLancetChanges(event.target.value);
        handleFuenlabradaLancetChanges(event.target.value);
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
        setGregorioCustomWeight(Math.exp(gregorioReferenceWeight).toFixed(2));
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
    function handleGregorioLancetChanges(weight) {
        const gregorioReferenceWeight = hospitalGetWeight(ga, genre, "gregorio2");
        const gregorioCalculatedZscore = hospitalGetZscore(weight, gregorioReferenceWeight, "gregorio2", genre);
        const gregorioPercent = getZPercent(gregorioCalculatedZscore);
        setGregorioWeight(gregorioReferenceWeight.toFixed(2));
        setGregorioZscore(gregorioCalculatedZscore.toFixed(2));
        setGregorioPercentile(gregorioPercent.toFixed(0));
        displayBar(gregorioPercent.toFixed(0), 'percentile-bar-bio-gregorio-lancet');
    }
    function handleTalaveraLancetChanges(weight) {
        const referenceWeight = hospitalGetWeight(ga, genre, "talavera");
        const calculatedZscore = hospitalGetZscore(weight, referenceWeight, "talavera", genre);
        const percent = getZPercent(calculatedZscore);
        setTalaveraWeight(referenceWeight.toFixed(2));
        setTalaveraZscore(calculatedZscore.toFixed(2));
        setTalaveraPercentile(percent.toFixed(0));
        displayBar(percent.toFixed(0), 'percentile-bar-bio-talavera-lancet');
    }
    function handleFuenlabradaLancetChanges(weight) {
        const referenceWeight = hospitalGetWeight(ga, genre, "fuenlabrada");
        const calculatedZscore = hospitalGetZscore(weight, referenceWeight, "fuenlabrada", genre);
        const percent = getZPercent(calculatedZscore);
        setFuenlabradaWeight(referenceWeight.toFixed(2));
        setFuenlabradaZscore(calculatedZscore.toFixed(2));
        setFuenlabradaPercentile(percent.toFixed(0));
        displayBar(percent.toFixed(0), 'percentile-bar-bio-fuenlabrada-lancet');
    }
    useEffect(() => {
        setGa((props.weeks) + props.days / 7);
        if (!genre) {
            setGenre(props.genre);
        } else {
            props.setGenre(genre);
        }
        if (weight) {
            props.setWeight(weight);
            handleGregorioChanges(weight);
            handleClinicChanges(weight);
            handleGregorioLancetChanges(weight);
            handleTalaveraLancetChanges(weight);
            handleFuenlabradaLancetChanges(weight);
        } else {
            setWeight(props.weight);
            handleGregorioChanges(props.weight);
            handleClinicChanges(props.weight);
            handleGregorioLancetChanges(props.weight);
            handleTalaveraLancetChanges(props.weight);
            handleFuenlabradaLancetChanges(props.weight);
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
                <div className='left-lancet'>
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
                    <div className='percentile-table-container'>
                        <p style={{ fontStyle: 'italic' }}>{t('own_formula_gregorio')} (p{gregorioCustomPercentile}) ({gregorioWeight}g) ({gregorioCustomZscore}z)</p>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-bio-gregorio'>
                                <p>p{gregorioCustomPercentile}</p>
                            </span>
                        </span>
                    </div>
                    <div className='percentile-table-container'>
                        <p style={{ fontStyle: 'italic' }}>{t('own_formula_clinic')} (p{clinicCustomPercentile}) ({clinicWeight}g) ({clinicCustomZscore}z)</p>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-bio-clinic'>
                                <p>p{clinicCustomPercentile}</p>
                            </span>
                        </span>
                    </div>
                    <div className='percentile-table-container'>
                        <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Lancet Gregorio Marañón (p{lancetGregorioPercentile}) ({lancetGregorioWeight}g) ({lancetGregorioZscore}z)</p>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-bio-gregorio-lancet'>
                                <p>p{lancetGregorioPercentile}</p>
                            </span>
                        </span>
                    </div>
                    <div className='percentile-table-container'>
                        <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Lancet Talavera (p{talaveraPercentile}) ({talaveraWeight}g) ({talaveraZscore}z)</p>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-bio-talavera-lancet'>
                                <p>p{talaveraPercentile}</p>
                            </span>
                        </span>
                    </div>
                    <div className='percentile-table-container'>
                        <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Lancet Fuenlabrada (p{fuenlabradaPercentile}) ({fuenlabradaWeight}g) ({fuenlabradaZscore}z)</p>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-bio-fuenlabrada-lancet'>
                                <p>p{fuenlabradaPercentile}</p>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}