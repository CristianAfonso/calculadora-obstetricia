import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import { displayBar, getZPercent, hospitalGetWeight, hospitalGetTwinsWeight, hospitalGetTriplets, hospitalGetZscore } from "./functions";
import SingleChart from './charts/singleChart';
import TwinsChart from './charts/twinsChart';
import SingleVsTwins from './charts/singleVsTwins';
import Bar from './singleComponent/percentileBar';
import GenreSelector from './singleComponent/genreSelector';
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
        if (amountSelector !== 'triplets') {
            handleClinicChanges(event.target.value);
        }
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
                gregorioReferenceWeight = hospitalGetTriplets(ga, genre, "gregorio");
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
            if (amountSelector !== 'triplets') {
                handleClinicChanges(weight);
            }
        } else {
            setWeight(props.weight);
            handleGregorioChanges(props.weight);
            if (amountSelector !== 'triplets') {
                handleClinicChanges(props.weight);
            }
        }
    }, [props, genre, weight, handleGregorioChanges, handleClinicChanges, amountSelector]);

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
                        <div className='flex-row'>
                            {t('weight')}
                            <input
                                style={{ marginLeft: 5 + "px", maxWidth: 70 + 'px', height: 39 + 'px' }}
                                type='number'
                                placeholder='g'
                                min={0}
                                value={weight}
                                onChange={handleweightChange} />
                            
                            <GenreSelector handleSelectGenre={handleSelectGenre}/>
                            <select name='singlevsmultiple'>
                                <option value='single' onClick={handleSelection}>{t('single')}</option>
                                <option value='twins' onClick={handleSelection}>{t('twins')}</option>
                                <option value='triplets' onClick={handleSelection}>{t('triplets')}</option>
                            </select>
                        </div>
                    </span>
                    <div className='percentile-table-container'>
                        <p style={{ fontStyle: 'italic' }}>{t('own_formula_gregorio')} (p{gregorioCustomPercentile}) ({gregorioWeight}g) ({gregorioCustomZscore}z)</p>
                        <Bar percent={gregorioCustomPercentile} id="percentile-bar-bio-gregorio" />
                    </div>
                    {amountSelector !== 'triplets' &&
                        <div className='percentile-table-container'>
                            <p style={{ fontStyle: 'italic' }}>{t('own_formula_clinic')} (p{clinicCustomPercentile}) ({clinicWeight}g) ({clinicCustomZscore}z)</p>
                            <Bar percent={clinicCustomPercentile} id="percentile-bar-bio-clinic" />
                        </div>}
                </div>
                <div className='bottom-unic'>
                    {amountSelector === "single" && <SingleChart ga={ga} weight={weight} genre={genre} />}
                    {amountSelector === 'twins' && <TwinsChart ga={ga} weight={weight} genre={genre} />}
                    {(amountSelector === 'single' || amountSelector === 'twins') && <SingleVsTwins ga={ga} weight={weight} genre={genre} number={amountSelector} />}
                </div>
            </div>
        </div>
    );
}