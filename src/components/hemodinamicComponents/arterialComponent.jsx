import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import Bar from '../singleComponent/percentileBar.jsx';
import Scores from '../singleComponent/scores.jsx';
import Pair from '../singleComponent/pair.jsx';
import { getUAZscore, getMCAZscore, getCPRZscore, displayBar, getZPercent } from "../functions.js";
export default function ArterialComponent(props) {
    const [ga, setGa] = useState(props.ga);
    const [ua, setUA] = useState(props.ua);
    const [uaZscore, setUAZscore] = useState(getUAZscore(ga, ua).toFixed(2));
    const [uaPercent, setUAPercent] = useState(getZPercent(uaZscore).toFixed(0));
    const [mca, setMCA] = useState(props.mca);
    const [mcaZscore, setMCAZscore] = useState(getMCAZscore(ga, mca).toFixed(2));
    const [mcaPercent, setMCAPercent] = useState(getZPercent(getMCAZscore(ga, mca)).toFixed(0));
    const [ratio, setRatio] = useState((mca / ga).toFixed(2));
    const [ratioZscore, setRatioZscore] = useState(getCPRZscore(mca, ua, ga).toFixed(2));
    const [ratioPercent, setRatioPercent] = useState(getZPercent(getCPRZscore(mca, ua, ga)).toFixed(0));
    const { t } = useTranslation();
    function handleUAChange(event) {
        setUA(event.target.value);
        if (mca) {
            handleRatio(event.target.value, mca);
        }
        const uaZscoreChange = getUAZscore(ga, event.target.value);
        const uaPercentChange = getZPercent(uaZscoreChange);
        setUAZscore(uaZscoreChange.toFixed(2));
        setUAPercent(uaPercentChange.toFixed(0));
        displayBar(uaPercentChange, 'percentile-bar-hemo-clinic-ua');
    }
    function handleMCAChange(event) {
        setMCA(event.target.value);
        if (ua) {
            handleRatio(ua, event.target.value);
        }
        const mcaZscoreChange = getMCAZscore(ga, event.target.value);
        const mcaPercentChange = getZPercent(mcaZscoreChange);
        setMCAZscore(mcaZscoreChange.toFixed(2));
        setMCAPercent(mcaPercentChange.toFixed(0));
        displayBar(mcaPercentChange, 'percentile-bar-hemo-clinic-mca');
    }
    const handleRatio = useCallback((ua, mca) => {
        const ratioZscoreChange = getCPRZscore(mca, ua, ga);
        const ratioPercentChange = getZPercent(ratioZscoreChange);
        setRatio((mca / ua).toFixed(2));
        setRatioZscore(ratioZscoreChange.toFixed(2));
        setRatioPercent(ratioPercentChange.toFixed(0));
        displayBar(ratioPercentChange, 'percentile-bar-hemo-clinic-ratio');
    }, [ga])
    useEffect(() => {
        setGa(props.ga);
        if (ua) {
            props.setUA(ua);
            displayBar(uaPercent, 'percentile-bar-hemo-clinic-ua');
        } else {
            setUA(props.ua);
        }
        if (mca) {
            props.setMCA(mca);
            displayBar(mcaPercent, 'percentile-bar-hemo-clinic-mca');
        } else {
            setMCA(props.mca);
        }
        if (props.mca && props.ua) {
            handleRatio(props.ua, props.mca);
        }

    }, [props, handleRatio, mca, mcaPercent, ua, uaPercent])
    return (
        <div id="left-hemodinamic">
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('UA_help')} title={t('UA_title')} measure={t('mm')} min={0.4} step={0.1} max={999} value={ua} onChange={handleUAChange} />
                        <Scores zscore={uaZscore} percent={uaPercent} />
                    </div>
                </div>
                <Bar percent={uaPercent} id="percentile-bar-hemo-clinic-ua" />
            </div>
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('MCA_help')} title={t('MCA_title')} measure={t('mm')} min={0.5} step={0.1} max={999} value={mca} onChange={handleMCAChange} />
                        <Scores zscore={mcaZscore} percent={mcaPercent} />
                    </div>
                </div>
                <Bar percent={mcaPercent} id="percentile-bar-hemo-clinic-mca" />
            </div>
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <Pair help={t('ratio_help')} title={t('ratio_title')} measure={t('mm')} min={0} max={999} value={ratio} readOnly={true} />
                        <Scores zscore={ratioZscore} percent={ratioPercent} />
                    </div>
                </div>
                <Bar percent={ratioPercent} id="percentile-bar-hemo-clinic-ratio" />
            </div>
        </div>
    )
}