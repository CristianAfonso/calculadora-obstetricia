import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Bar from '../singleComponent/percentileBar.jsx';
import Scores from '../singleComponent/scores.jsx';
import Pair from '../singleComponent/pair.jsx';
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
            <div className='single-display'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('humerus_help')} title={t('humerus_title')} measure={t('mm')} min={0} max={999} value={humerusValue} onChange={handleHumerusChange} />
                        <Scores zscore={humerusZscore} percent={humerusPercent} />
                    </div>
                </div>
                <Bar percent={humerusPercent} id="bones-humerus" />
            </div>
            <div className='single-display'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('ulna_help')} title={t('ulna_title')} measure={t('mm')} min={0} max={999} value={ulnaValue} onChange={handleUlnaChange} />
                        <Scores zscore={ulnaZscore} percent={ulnaPercent} />
                    </div>
                </div>
                <Bar percent={ulnaPercent} id="bones-ulna" />
            </div>
            <div className='single-display'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('radius_help')} title={t('radius_title')} measure={t('mm')} min={0} max={999} value={radiusValue} onChange={handleRadiusChange} />
                        <Scores zscore={radiusZscore} percent={radiusPercent} />
                    </div>
                </div>
                <Bar percent={radiusPercent} id="bones-radius" />
            </div>

        </div>
    )
}