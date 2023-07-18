import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Bar from '../singleComponent/percentileBar.jsx';
import Scores from '../singleComponent/scores.jsx';
import Pair from '../singleComponent/pair.jsx';
import { getZPercent, getDVZscore, getAIZscore, displayBar } from "../functions.js";
export default function DuctusIsthmusComponent(props) {
    const [ga, setGa] = useState(props.ga);
    const [ductusVenosus, setDuctusVenosus] = useState("");
    const [aorticIsthmus, setAorticIsthmus] = useState("");
    const [ductusVenosusZscore, setDuctusVenosusZscore] = useState("");
    const [ductusVenosusPercent, setDuctusVenosusPercent] = useState("");
    const [aorticIsthmusZscore, setAorticIsthmusZscore] = useState("");
    const [aorticIsthmusPercent, setAorticIsthmusPercent] = useState("");
    const { t } = useTranslation();

    function handleDuctusVenosus(event) {
        const dvZscore = getDVZscore(ga, event.target.value);
        const dvPercent = getZPercent(dvZscore);
        setDuctusVenosus(event.target.value);
        setDuctusVenosusZscore(dvZscore.toFixed(2));
        setDuctusVenosusPercent(dvPercent.toFixed(0));
        displayBar(dvPercent, 'percentile-bar-hemo-dv');
    }
    function handleAorticIsthmus(event) {
        const aiZscore = getAIZscore(ga, event.target.value);
        const aiPercent = getZPercent(aiZscore);
        setAorticIsthmus(event.target.value);
        setAorticIsthmusZscore(aiZscore.toFixed(2));
        setAorticIsthmusPercent(aiPercent.toFixed(0));
        displayBar(aiPercent, 'percentile-bar-hemo-ai');
    }

    useEffect(() => {
        setGa(props.ga);
    }, [props])

    return (
        <div id="right-hemodinamic">
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('DV_help')} title={t('DV_title')} measure={t('IP')} min={0.4} step={0.1} max={999} value={ductusVenosus} onChange={handleDuctusVenosus} />
                        <Scores zscore={ductusVenosusZscore} percent={ductusVenosusPercent} />
                    </div>
                </div>
                <div className='hemodinamic-bar percentile-table-container'>
                    <Bar percent={ductusVenosusPercent} id="percentile-bar-hemo-dv" />
                </div>
            </div>
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('AI_help')} title={t('AI_title')} measure={t('IP')} min={0.5} step={0.1} max={999} value={aorticIsthmus} onChange={handleAorticIsthmus} />
                        <Scores zscore={aorticIsthmusZscore} percent={aorticIsthmusPercent} />
                    </div>
                </div>
                <Bar percent={aorticIsthmusPercent} id="percentile-bar-hemo-ai" />
            </div>
        </div>
    )
}