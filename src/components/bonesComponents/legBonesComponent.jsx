import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Bar from '../singleComponent/percentileBar.jsx';
import Scores from '../singleComponent/scores.jsx';
import Pair from '../singleComponent/pair.jsx';
import { getFemurZscore, getTibiaZscore, getFibulaZscore, getFootZscore, displayBar, getZPercent } from "../functions.js";

export default function LegBones(props) {
    const [ga, setGa] = useState(props.ga);
    const [femurValue, setFemurValue] = useState("");
    const [femurZscore, setFemurZscore] = useState("");
    const [femurPercent, setFemurPercent] = useState("");
    const [tibiaValue, setTibiaValue] = useState("");
    const [tibiaZscore, setTibiaZscore] = useState("");
    const [tibiaPercent, setTibiaPercent] = useState("");
    const [fibulaValue, setFibulaValue] = useState("");
    const [fibulaZscore, setFibulaZscore] = useState("");
    const [fibulaPercent, setFibulaPercent] = useState("");
    const [footValue, setFootValue] = useState("");
    const [footZscore, setFootZscore] = useState("");
    const [footPercent, setFootPercent] = useState("");
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
    }, [props])
    return (
        <div id="leg-bones">
            <div className='bones-single'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('femur_help')} title={t('femur_title')} measure={t('mm')} min={0} max={999} value={femurValue} onChange={handleFemurChange} />
                        <Scores zscore={femurZscore} percent={femurPercent} />
                    </div>
                </div>
                <Bar percent={femurPercent} id="bones-femur" />
            </div>
            <div className='bones-single'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('tibia_help')} title={t('tibia_title')} measure={t('mm')} min={0} max={999} value={tibiaValue} onChange={handleTibiaChange} />
                        <Scores zscore={tibiaZscore} percent={tibiaPercent} />
                    </div>
                </div>
                <Bar percent={tibiaPercent} id="bones-tibia" />
            </div>
            <div className='bones-single'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('fibula_help')} title={t('fibula_title')} measure={t('mm')} min={0} max={999} value={fibulaValue} onChange={handleFibulaChange} />
                        <Scores zscore={fibulaZscore} percent={fibulaPercent} />
                    </div>
                </div>
                <Bar percent={fibulaPercent} id="bones-fibula" />
            </div>
            <div className='bones-single'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('foot_help')} title={t('foot_title')} measure={t('mm')} min={0} max={999} value={footValue} onChange={handleFootChange} />
                        <Scores zscore={footZscore} percent={footPercent} />
                    </div>
                </div>
                <Bar percent={footPercent} id="bones-foot" />
            </div>

        </div>
    )
}