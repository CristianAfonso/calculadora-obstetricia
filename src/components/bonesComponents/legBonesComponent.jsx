import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getFemurZscore, getTibiaZscore, getFibulaZscore, getFootZscore, displayBar, getZPercent } from "../functions.js";
export default function LegBones(props) {
    const [ga, setGa] = useState(props.ga);
    const [femurValue,    setFemurValue] = useState("");
    const [femurZscore,   setFemurZscore] = useState("");
    const [femurPercent,  setFemurPercent] = useState("");
    const [tibiaValue,   setTibiaValue] = useState("");
    const [tibiaZscore,  setTibiaZscore] = useState("");
    const [tibiaPercent, setTibiaPercent] = useState("");
    const [fibulaValue,     setFibulaValue] = useState("");
    const [fibulaZscore,    setFibulaZscore] = useState("");
    const [fibulaPercent,   setFibulaPercent] = useState("");
    const [footValue,     setFootValue] = useState("");
    const [footZscore,    setFootZscore] = useState("");
    const [footPercent,   setFootPercent] = useState("");
    const { t } = useTranslation();

    function handleFemurChange(event) {
        setFemurValue(event.target.value);
        const femurZ = getFemurZscore(ga, event.target.value).toFixed(2);
        const femurP = getZPercent(femurZ).toFixed(0);
        setFemurZscore(femurZ);
        setFemurPercent(femurP);
        displayBar(femurP, 'bones-femur');
    }
    function handleTibiaChange(event) {
        setTibiaValue(event.target.value);
        const tibiaZ = getTibiaZscore(ga, event.target.value).toFixed(2);
        const tibiaP = getZPercent(tibiaZ).toFixed(0);
        setTibiaZscore(tibiaZ);
        setTibiaPercent(tibiaP);
        displayBar(tibiaP, 'bones-tibia');
    }
    function handleFibulaChange(event) {
        setFibulaValue(event.target.value);
        const fibulaZ = getFibulaZscore(ga, event.target.value).toFixed(2);
        const fibulaP = getZPercent(fibulaZ).toFixed(0);
        setFibulaZscore(fibulaZ);
        setFibulaPercent(fibulaP);
        displayBar(fibulaP, 'bones-fibula');
    }
    function handleFootChange(event) {
        setFootValue(event.target.value);
        const footZ = getFootZscore(ga, event.target.value).toFixed(2);
        const footP = getZPercent(footZ).toFixed(0);
        setFootZscore(footZ);
        setFootPercent(footP);
        displayBar(footP, 'bones-foot');
    }
    useEffect(() => {
        setGa(props.ga);
    })
    return (
        <div id="leg-bones">
            <div className='bones-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('femur_help')}>{t('femur_title')}:</span>
                        <input
                            type='number'
                            placeholder='mm'
                            min={0}
                            value={femurValue}
                            onChange={handleFemurChange} />
                        <div className="scores">
                            <span id="femur-zscore">{femurZscore}z</span>
                            <span id="femur-percent">{femurPercent}p</span>
                        </div>
                    </div>
                </div>
                <div className='bones-bar percentile-table-container'>
                    <span className='meter percentile-bar-container'>
                        <span className='percentile-bar-content' id='bones-femur'>
                            <p>{femurPercent}p</p>
                        </span>
                    </span>
                </div>
            </div>
            <div className='bones-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('tibia_help')}>{t('tibia_title')}:</span>
                        <input
                            type='number'
                            placeholder='mm'
                            min={0}
                            value={tibiaValue}
                            onChange={handleTibiaChange} />
                        <div className="scores">
                            <span id="tibia-zscore">{tibiaZscore}z</span>
                            <span id="tibia-percent">{tibiaPercent}p</span>
                        </div>
                    </div>
                </div>
                <div className='bones-bar percentile-table-container'>
                    <span className='meter percentile-bar-container'>
                        <span className='percentile-bar-content' id='bones-tibia'>
                            <p>{tibiaPercent}p</p>
                        </span>
                    </span>
                </div>
            </div>
            <div className='bones-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('fibula_help')}>{t('fibula_title')}:</span>
                        <input
                            type='number'
                            placeholder='mm'
                            min={0}
                            value={fibulaValue}
                            onChange={handleFibulaChange} />
                        <div className="scores">
                            <span id="fibula-zscore">{fibulaZscore}z</span>
                            <span id="fibula-percent">{fibulaPercent}p</span>
                        </div>
                    </div>
                </div>
                <div className='bones-bar percentile-table-container'>
                    <span className='meter percentile-bar-container'>
                        <span className='percentile-bar-content' id='bones-fibula'>
                            <p>{fibulaPercent}p</p>
                        </span>
                    </span>
                </div>
            </div>
            <div className='bones-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('foot_help')}>{t('foot_title')}:</span>
                        <input
                            type='number'
                            placeholder='mm'
                            min={0}
                            value={footValue}
                            onChange={handleFootChange} />
                        <div className="scores">
                            <span id="foot-zscore">{footZscore}z</span>
                            <span id="foot-percent">{footPercent}p</span>
                        </div>
                    </div>
                </div>
                <div className='bones-bar percentile-table-container'>
                    <span className='meter percentile-bar-container'>
                        <span className='percentile-bar-content' id='bones-foot'>
                            <p>{footPercent}p</p>
                        </span>
                    </span>
                </div>
            </div>

        </div>
    )
}