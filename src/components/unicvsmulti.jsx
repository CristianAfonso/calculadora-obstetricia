import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import { displayBar, getZPercent, hospitalGetWeight,hospitalGetTwinsWeight, hospitalGetZscore } from "./functions";
import SingleChart from './charts/singleChart';
import TwinsChart from './charts/twinsChart';
import TripletsChart from './charts/tripletsChart';
export default function Unicvsmulti(props) {
    const [ga, setGa] = useState((props.weeks) + props.days / 7);
    const [weight, setWeight] = useState("");
    const [gregorioCustomPercentile, setGregorioCustomPercentile] = useState("");
    const [gregorioWeight, setGregorioCustomWeight] = useState("");
    const [gregorioCustomZscore, setGregorioCustomZscore] = useState("");
    const [clinicCustomPercentile, setClinicCustomPercentile] = useState("");
    const [clinicWeight, setClinicWeight] = useState("");
    const [clinicCustomZscore, setClinicCustomZscore] = useState("");
    const [genre, setGenre] = useState("");
    const [amountSelector, setAmountSelector] = useState("single");
    const { t } = useTranslation();

    function handleweightChange(event) {
        setWeight(event.target.value);
        handleGregorioChanges(event.target.value);
        handleClinicChanges(event.target.value);
    }
    function handleSelection(event) {
        setAmountSelector(event.target.value);
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
    const handleGregorioChanges = useCallback((weight) => {
        let gregorioReferenceWeight = 0;
        switch (amountSelector) {
            case 'single':
                gregorioReferenceWeight = hospitalGetWeight(ga, genre, "gregorio");
                break;
            case 'twins':
                gregorioReferenceWeight = hospitalGetTwinsWeight(ga, genre, "gregorio");
                break;
            case 'triplets':
                gregorioReferenceWeight = hospitalGetWeight(ga, genre, "gregorio");
                break;
            default:
                gregorioReferenceWeight = hospitalGetWeight(ga, genre, "gregorio");
                break;
        }
        const gregorioCalculatedZscore = hospitalGetZscore(weight, gregorioReferenceWeight, "gregorio");
        const gregorioPercent = getZPercent(gregorioCalculatedZscore);
        setGregorioCustomWeight(Math.exp(gregorioReferenceWeight).toFixed(2));
        setGregorioCustomZscore(gregorioCalculatedZscore.toFixed(2));
        setGregorioCustomPercentile(gregorioPercent.toFixed(0));
        displayBar(gregorioPercent.toFixed(0), 'percentile-bar-bio-gregorio');
    }, [ga, genre, amountSelector])
    const handleClinicChanges = useCallback((weight) => {
        let clinicReferenceWeight = 0;
        switch (amountSelector) {
            case 'single':
                clinicReferenceWeight = hospitalGetWeight(ga, genre, "clinic");
                break;
            case 'twins':
                clinicReferenceWeight = hospitalGetTwinsWeight(ga, genre, "clinic");
                break;
            case 'triplets':
                clinicReferenceWeight = hospitalGetWeight(ga, genre, "clinic");
                break;
            default:
                clinicReferenceWeight = hospitalGetWeight(ga, genre, "clinic");
                break;
        }
        const clinicCalculatedZscore = hospitalGetZscore(weight, clinicReferenceWeight, "clinic");
        const clinicPercent = getZPercent(clinicCalculatedZscore);
        setClinicWeight(clinicReferenceWeight.toFixed(2));
        setClinicCustomZscore(clinicCalculatedZscore.toFixed(2));
        setClinicCustomPercentile(clinicPercent.toFixed(0));
        displayBar(clinicPercent.toFixed(0), 'percentile-bar-bio-clinic');
    }, [ga, genre, amountSelector])
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
        } else {
            setWeight(props.weight);
            handleGregorioChanges(props.weight);
            handleClinicChanges(props.weight);
        }
    }, [props, genre, weight, handleGregorioChanges, handleClinicChanges]);

    return (
        <div className="service-container">
            <div className='title-container'>
                <h1>{t('unicvsmulti')}</h1>
                <div className='weeksAndDays'>
                    <h3>{t('weeks')}: {props.weeks}</h3>
                    <h3>{t('days')}: {props.days}</h3>
                </div>
            </div>
            <div id='unic-content'>
                <div className='top-unic'>
                    <span>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {t('weight')}
                            <input
                                style={{ marginLeft: 5 + "px", maxWidth: 70 + 'px', height: 39 + 'px' }}
                                type='number'
                                placeholder='g'
                                min={0}
                                value={weight}
                                onChange={handleweightChange} />
                            <div>
                                <button className="genreSelector" id="male-selector" onClick={handleSelectGenre} value="male">{t('male')}</button>
                                <button className="genreSelector" id="female-selector" onClick={handleSelectGenre} value="female">{t('female')}</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p><input type='radio' value='single' name='singlevsmultiple' defaultChecked={true} onClick={handleSelection} />{t('single')}</p>
                                <p><input type='radio' value='twins' name='singlevsmultiple' onClick={handleSelection} />{t('twins')}</p>
                                <p><input type='radio' value='triplets' name='singlevsmultiple' onClick={handleSelection} />{t('triplets')}</p>
                            </div>
                        </div>
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
                </div>
                <div className='bottom-unic'>
                    {amountSelector === "single" && <SingleChart ga={ga} weight={weight} />}
                    {amountSelector === 'twins' && <TwinsChart ga={ga} weight={weight} />}
                    {amountSelector === 'triplets' &&  <TripletsChart ga={ga} weight={weight} />}
                </div>
            </div>
        </div>
    );
}