import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import { displayBar, getZPercent, hospitalGetWeight, hospitalGetZscore } from "./functions";
import Bar from './singleComponent/percentileBar';
import GenreSelector from './singleComponent/genreSelector';
import LancetChart from './charts/lancetChart';
export default function Lancet(props) {
    const [ga, setGa] = useState((props.weeks) + props.days / 7);
    const [weight, setWeight] = useState(props.weight);
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
    const [genre, setGenre] = useState(props.genre);
    const { t } = useTranslation();

    function handleweightChange(event) {
        setWeight(event.target.value);
        props.setWeight(event.target.value);
        handleGregorioChanges(event.target.value);
        handleClinicChanges(event.target.value);
        handleGregorioLancetChanges(event.target.value);
        handleTalaveraLancetChanges(event.target.value);
        handleFuenlabradaLancetChanges(event.target.value);
    }
    function handleSelectGenre(event) {
        setGenre(event.target.value);
        props.setGenre(event.target.value);
        if (event.target.value === t('male')) {
            document.getElementById("female-selector").className = 'genreSelector';
            document.getElementById("male-selector").className = 'genreSelector focus';
        } else if (event.target.value === t('female')) {
            document.getElementById("male-selector").className = 'genreSelector';
            document.getElementById("female-selector").className = 'genreSelector focus';
        }
    }
    const handleGregorioChanges = useCallback((weight) => {
        const gregorioReferenceWeight = hospitalGetWeight(ga, genre, "gregorio");
        const gregorioCalculatedZscore = hospitalGetZscore(weight, gregorioReferenceWeight, "gregorio");
        const gregorioPercent = getZPercent(gregorioCalculatedZscore);
        setGregorioCustomWeight(Math.exp(gregorioReferenceWeight).toFixed(2));
        setGregorioCustomZscore(gregorioCalculatedZscore.toFixed(2));
        setGregorioCustomPercentile(gregorioPercent.toFixed(0));
        displayBar(gregorioPercent.toFixed(0), 'percentile-bar-bio-gregorio');
    }, [ga, genre])
    const handleClinicChanges = useCallback((weight) => {
        const clinicReferenceWeight = hospitalGetWeight(ga, genre, "clinic");
        const clinicCalculatedZscore = hospitalGetZscore(weight, clinicReferenceWeight, "clinic");
        const clinicPercent = getZPercent(clinicCalculatedZscore);
        setClinicWeight(clinicReferenceWeight.toFixed(2));
        setClinicCustomZscore(clinicCalculatedZscore.toFixed(2));
        setClinicCustomPercentile(clinicPercent.toFixed(0));
        displayBar(clinicPercent.toFixed(0), 'percentile-bar-bio-clinic');
    }, [ga, genre])
    const handleGregorioLancetChanges = useCallback((weight) => {
        const gregorioReferenceWeight = hospitalGetWeight(ga, genre, "gregorio2");
        const gregorioCalculatedZscore = hospitalGetZscore(weight, gregorioReferenceWeight, "gregorio2", genre);
        const gregorioPercent = getZPercent(gregorioCalculatedZscore);
        setGregorioWeight(gregorioReferenceWeight.toFixed(2));
        setGregorioZscore(gregorioCalculatedZscore.toFixed(2));
        setGregorioPercentile(gregorioPercent.toFixed(0));
        displayBar(gregorioPercent.toFixed(0), 'percentile-bar-bio-gregorio-lancet');
    }, [ga, genre])
    const handleTalaveraLancetChanges = useCallback((weight) => {
        const referenceWeight = hospitalGetWeight(ga, genre, "talavera");
        const calculatedZscore = hospitalGetZscore(weight, referenceWeight, "talavera", genre);
        const percent = getZPercent(calculatedZscore);
        setTalaveraWeight(referenceWeight.toFixed(2));
        setTalaveraZscore(calculatedZscore.toFixed(2));
        setTalaveraPercentile(percent.toFixed(0));
        displayBar(percent.toFixed(0), 'percentile-bar-bio-talavera-lancet');
    }, [ga, genre])
    const handleFuenlabradaLancetChanges = useCallback((weight) => {
        const referenceWeight = hospitalGetWeight(ga, genre, "fuenlabrada");
        const calculatedZscore = hospitalGetZscore(weight, referenceWeight, "fuenlabrada", genre);
        const percent = getZPercent(calculatedZscore);
        setFuenlabradaWeight(referenceWeight.toFixed(2));
        setFuenlabradaZscore(calculatedZscore.toFixed(2));
        setFuenlabradaPercentile(percent.toFixed(0));
        displayBar(percent.toFixed(0), 'percentile-bar-bio-fuenlabrada-lancet');
    }, [ga, genre])
    useEffect(() => {
        setGa((props.weeks) + props.days / 7);
        if(props.weight){
            handleGregorioChanges(weight);
            handleClinicChanges(weight);
            handleGregorioLancetChanges(weight);
            handleTalaveraLancetChanges(weight);
            handleFuenlabradaLancetChanges(weight);
        }
    }, [props, genre, weight, handleGregorioChanges, handleClinicChanges, handleGregorioLancetChanges, handleTalaveraLancetChanges, handleFuenlabradaLancetChanges]);

    return (
        <div className="service-container">
            <div className='title-container'>
                <h1>{t('lancet')}</h1>
                <div className='weeksAndDays'>
                    <h3>{t('weeks')}: {props.weeks}</h3>
                    <h3>{t('days')}: {props.days}</h3>
                </div>
            </div>
            <div className='service-content'>
                <div id='lancet'>
                    <div className='left-lancet'>
                        <div class="flex-row">
                            {t('weight')}
                            <input
                                style={{ marginLeft: 5 + "px", maxWidth: 70 + 'px', height: 39 + 'px' }}
                                type='number'
                                placeholder='g'
                                min={250}
                                max={6000}
                                value={weight}
                                onChange={handleweightChange} />
                                <GenreSelector handleSelectGenre={handleSelectGenre}/>
                            
                        </div>
                        <div className='percentile-table-container'>
                            <p style={{ fontStyle: 'italic' }}>{t('own_formula_gregorio')} (p{gregorioCustomPercentile}) ({gregorioWeight}g) ({gregorioCustomZscore}z)</p>
                            <Bar percent={gregorioCustomPercentile} id="percentile-bar-bio-gregorio" />
                        </div>
                        <div className='percentile-table-container'>
                            <p style={{ fontStyle: 'italic' }}>{t('own_formula_clinic')} (p{clinicCustomPercentile}) ({clinicWeight}g) ({clinicCustomZscore}z)</p>
                            <Bar percent={clinicCustomPercentile} id="percentile-bar-bio-clinic" />
                        </div>
                        <div className='percentile-table-container'>
                            <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{t('gregorio_lancet')} (p{lancetGregorioPercentile}) ({lancetGregorioWeight}g) ({lancetGregorioZscore}z)</p>
                            <Bar percent={lancetGregorioPercentile} id="percentile-bar-bio-gregorio-lancet" />
                        </div>
                        <div className='percentile-table-container'>
                            <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{t('talavera_lancet')} (p{talaveraPercentile}) ({talaveraWeight}g) ({talaveraZscore}z)</p>
                            <Bar percent={talaveraPercentile} id="percentile-bar-bio-talavera-lancet" />
                        </div>
                        <div className='percentile-table-container'>
                            <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{t('fuenlabrada_lancet')} (p{fuenlabradaPercentile}) ({fuenlabradaWeight}g) ({fuenlabradaZscore}z)</p>
                            <Bar percent={fuenlabradaPercentile} id="percentile-bar-bio-fuenlabrada-lancet" />
                        </div>
                    </div>
                    <div id="right-lancet">
                        <LancetChart ga={ga} weight={weight} genre={genre} />
                    </div>
                </div>
            </div>
        </div>
    );
}