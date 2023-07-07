import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from "react-i18next";
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
        } else {
            setUA(props.ua);
        }
        if (mca) {
            props.setMCA(mca)
        } else {
            setMCA(props.mca);
        }
        if (props.mca && props.ua) {
            handleRatio(props.ua, props.mca);
        }
        displayBar(uaPercent, 'percentile-bar-hemo-clinic-ua');
        displayBar(mcaPercent, 'percentile-bar-hemo-clinic-mca');

    }, [props, handleRatio,mca, mcaPercent, ua, uaPercent])
    return (
        <div id="left-hemodinamic">
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('UA_help')}>{t('UA_title')}:</span>
                        <input
                            type='number'
                            placeholder='IP'
                            min={0.4}
                            step={0.1}
                            value={ua}
                            onChange={handleUAChange} />
                        <div className="scores">
                            <span id="ua-zscore">{uaZscore}z</span>
                            <span id="ua-p">{uaPercent}p</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hemodinamic-bar percentile-table-container'>
                <span className='meter percentile-bar-container'>
                    <span className='percentile-bar-content' id='percentile-bar-hemo-clinic-ua'>
                        <p>p{uaPercent}</p>
                    </span>
                </span>
            </div>
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('MCA_help')}>{t('MCA_title')}:</span>
                        <input
                            type='number'
                            placeholder='mm'
                            min={0.5}
                            step={0.1}
                            value={mca}
                            onChange={handleMCAChange} />
                        <div className="scores">
                            <span id="mca-zscore">{mcaZscore} z</span>
                            <span id="mca-p">{mcaPercent} p</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hemodinamic-bar percentile-table-container'>
                <span className='meter percentile-bar-container'>
                    <span className='percentile-bar-content' id='percentile-bar-hemo-clinic-mca'>
                        <p>p{mcaPercent}</p>
                    </span>
                </span>
            </div>
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('ratio_help')}>{t('ratio_title')}:</span>
                        <input
                            className='read-only-number'
                            type='number'
                            readOnly
                            value={ratio === 0 ? null : ratio} />
                        <div className="scores">
                            <span id="ca-zscore">{ratio === 0 ? null : ratioZscore} z</span>
                            <span id="ca-p">{ratio === 0 ? null : ratioPercent} p</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hemodinamic-bar percentile-table-container'>
                <span className='meter percentile-bar-container'>
                    <span className='percentile-bar-content' id='percentile-bar-hemo-clinic-ratio'>
                        <p>p{ratioPercent}</p>
                    </span>
                </span>
            </div>
        </div>
    )
}