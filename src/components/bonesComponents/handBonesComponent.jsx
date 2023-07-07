import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getHumerusZscore, getUlnaZscore, getRadiusZscore, displayBar, getZPercent } from "../functions.js";
export default function HandBones(props) {
    const [ga, setGa] = useState(props.ga);
    const [humerusValue, setHumerusValue] = useState("");
    const [humerusZscore, setHumerusZscore] = useState("");
    const [humerusPercent, setHumerusPercent] = useState("");
    const [ulnaValue, setUlnaValue] = useState("");
    const [ulnaZscore, setUlnaZscore] = useState("");
    const [ulnaPercent, setUlnaPercent] = useState("");
    const [radiusValue, setRadiusValue] = useState("");
    const [radiusZscore, setRadiusZscore] = useState("");
    const [radiusPercent, setRadiusPercent] = useState("");
    const { t } = useTranslation();

    function handleHumerusChange(event) {
        setHumerusValue(event.target.value);
        const humerusZ = getHumerusZscore(ga, event.target.value).toFixed(2);
        const humerusP = getZPercent(humerusZ).toFixed(0);
        setHumerusZscore(humerusZ);
        setHumerusPercent(humerusP);
        displayBar(humerusP, 'bones-humerus');
    }
    function handleUlnaChange(event) {
        setUlnaValue(event.target.value);
        const ulnaZ = getUlnaZscore(ga, event.target.value).toFixed(2);
        const ulnaP = getZPercent(ulnaZ).toFixed(0);
        setUlnaZscore(ulnaZ);
        setUlnaPercent(ulnaP);
        displayBar(ulnaP, 'bones-ulna');
    }
    function handleRadiusChange(event) {
        setRadiusValue(event.target.value);
        const radiusZ = getRadiusZscore(ga, event.target.value).toFixed(2);
        const radiusP = getZPercent(radiusZ).toFixed(0);
        setRadiusZscore(radiusZ);
        setRadiusPercent(radiusP);
        displayBar(radiusP, 'bones-radius');
    }
    useEffect(() => {
        setGa(props.ga);
    }, [props])
    return (
        <div id="hand-bones">
            <div className='bones-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('humerus_help')}>{t('humerus_title')}:</span>
                        <input
                            type='number'
                            placeholder='mm'
                            min={0}
                            value={humerusValue}
                            onChange={handleHumerusChange} />
                        <div className="scores">
                            <span id="humerus-zscore">{humerusZscore}z</span>
                            <span id="humerus-percent">{humerusPercent}p</span>
                        </div>
                    </div>
                </div>
                <div className='bones-bar percentile-table-container'>
                    <span className='meter percentile-bar-container'>
                        <span className='percentile-bar-content' id='bones-humerus'>
                            <p>{humerusPercent}p</p>
                        </span>
                    </span>
                </div>
            </div>
            <div className='bones-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('ulna_help')}>{t('ulna_title')}:</span>
                        <input
                            type='number'
                            placeholder='mm'
                            min={0}
                            value={ulnaValue}
                            onChange={handleUlnaChange} />
                        <div className="scores">
                            <span id="ulna-zscore">{ulnaZscore}z</span>
                            <span id="ulna-percent">{ulnaPercent}p</span>
                        </div>
                    </div>
                </div>
                <div className='bones-bar percentile-table-container'>
                    <span className='meter percentile-bar-container'>
                        <span className='percentile-bar-content' id='bones-ulna'>
                            <p>{ulnaPercent}p</p>
                        </span>
                    </span>
                </div>
            </div>
            <div className='bones-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('radius_help')}>{t('radius_title')}:</span>
                        <input
                            type='number'
                            placeholder='mm'
                            min={0}
                            value={radiusValue}
                            onChange={handleRadiusChange} />
                        <div className="scores">
                            <span id="radius-zscore">{radiusZscore}z</span>
                            <span id="radius-percent">{radiusPercent}p</span>
                        </div>
                    </div>
                </div>
                <div className='bones-bar percentile-table-container'>
                    <span className='meter percentile-bar-container'>
                        <span className='percentile-bar-content' id='bones-radius'>
                            <p>{radiusPercent}p</p>
                        </span>
                    </span>
                </div>
            </div>

        </div>
    )
}