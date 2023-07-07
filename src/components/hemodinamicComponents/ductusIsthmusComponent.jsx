import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
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
                        <span title={t('DV_help')}>{t('DV_title')}:</span>
                        <input
                            type='number'
                            placeholder='IP'
                            min={0.4}
                            step={0.1}
                            value={ductusVenosus}
                            onChange={handleDuctusVenosus} />
                        <div className="scores">
                            <span id="ua-zscore">{ductusVenosusZscore}z</span>
                            <span id="ua-p">{ductusVenosusPercent}p</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hemodinamic-bar percentile-table-container'>
                <span className='meter percentile-bar-container'>
                    <span className='percentile-bar-content' id='percentile-bar-hemo-dv'>
                        <p>p{ductusVenosusPercent}</p>
                    </span>
                </span>
            </div>
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('AI_help')}>{t('AI_title')}:</span>
                        <input
                            type='number'
                            placeholder='mm'
                            min={0.5}
                            step={0.1}
                            value={aorticIsthmus}
                            onChange={handleAorticIsthmus} />
                        <div className="scores">
                            <span id="mca-zscore">{aorticIsthmusZscore} z</span>
                            <span id="mca-p">{aorticIsthmusPercent} p</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hemodinamic-bar percentile-table-container'>
                <span className='meter percentile-bar-container'>
                    <span className='percentile-bar-content' id='percentile-bar-hemo-ai'>
                        <p>p{aorticIsthmusPercent}</p>
                    </span>
                </span>
            </div>
        </div>
    )
}