import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import { getUAZscore, getMCAZscore, getCPRZscore, getUAZscore_GregorioFormula, getMCAZscore_GregorioFormula, displayBar, getZPercent } from "../functions.js";
export default function HemodinamicStudio(props) {
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
    const [gregorioUAZscore, setGregorioUAZscore] = useState("");
    const [gregorioUAPercent, setGregorioUAPercent] = useState("");
    const [gregorioMCAZscore, setGregorioMCAZscore] = useState("");
    const [gregorioMCAPercent, setGregorioMCAPercent] = useState("");
    const [gregorioRatioZscore, setGregorioRatioZscore] = useState("");
    const [gregorioRatioPercent, setGregorioRatioPercent] = useState("");
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
    }
    const handleRatio = useCallback((ua, mca) => {
        const ratioZscoreChange = getCPRZscore(mca, ua, ga);
        const ratioPercentChange = getZPercent(ratioZscoreChange);
        setRatio((mca / ua).toFixed(2));
        setRatioZscore(ratioZscoreChange.toFixed(2));
        setRatioPercent(ratioPercentChange.toFixed(0));
    }, [ga])
    const handleBars = useCallback(() => {
        if (ua && mca) {
            const gregorioUAZ = getUAZscore_GregorioFormula(ga, ua).toFixed(2);
            const gregorioUAP = getZPercent(gregorioUAZ).toFixed(0);
            const gregorioMCAZ = getMCAZscore_GregorioFormula(ga, mca).toFixed(2);
            const gregorioMCAP = getZPercent(gregorioMCAZ).toFixed(0);
            setGregorioUAZscore(gregorioUAZ);
            setGregorioUAPercent(gregorioUAP);
            setGregorioMCAZscore(gregorioMCAZ);
            setGregorioMCAPercent(gregorioMCAP);
            setGregorioRatioZscore(ratioZscore);
            setGregorioRatioPercent(ratioPercent);
            displayBar(uaPercent, 'percentile-bar-hemo-clinic-ua');
            displayBar(mcaPercent, 'percentile-bar-hemo-clinic-mca');
            displayBar(gregorioUAP, 'percentile-bar-hemo-gregorio-ua');
            displayBar(gregorioMCAP, 'percentile-bar-hemo-gregorio-mca');
            displayBar(ratioPercent, 'percentile-bar-hemo-clinic-ratio');
        } else if (mca) {
            const gregorioMCAZ = getMCAZscore_GregorioFormula(ga, mca).toFixed(2);
            const gregorioMCAP = getZPercent(gregorioMCAZ).toFixed(0);
            setGregorioMCAZscore(gregorioMCAZ);
            setGregorioMCAPercent(gregorioMCAP);
            displayBar(gregorioMCAP, 'percentile-bar-hemo-gregorio-mca');
            displayBar(mcaPercent, 'percentile-bar-hemo-clinic-mca');
        } else if (ua) {
            const gregorioUAZ = getUAZscore_GregorioFormula(ga, ua).toFixed(2);
            const gregorioUAP = getZPercent(gregorioUAZ).toFixed(0);
            setGregorioUAZscore(gregorioUAZ);
            setGregorioUAPercent(gregorioUAP);
            displayBar(uaPercent, 'percentile-bar-hemo-clinic-ua');
            displayBar(gregorioUAP, 'percentile-bar-hemo-gregorio-ua');
        }
    }, [ga, mca, mcaPercent, ratioPercent, ratioZscore, ua, uaPercent])
    useEffect(() => {
        setGa((props.weeks) + props.days / 7);
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
        handleBars();
    }, [handleBars, handleRatio, mca, props,ua])

    return (
        <div id="hemodinamic-studio">
            <div id="left-hemodinamic">
                <div className='biometric-single'>
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
                                <span id="ua-zscore">{uaZscore ? null : uaZscore} z</span>
                                <span id="ua-p">{uaPercent ? null : uaPercent} p</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='biometric-single'>
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
                                <span id="mca-zscore">{mcaZscore ? null : mcaZscore} z</span>
                                <span id="mca-p">{mcaPercent ? null : mcaPercent} p</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='biometric-single'>
                    <div className="pair">
                        <div className="input">
                            <span title={t('ratio_help')}>{t('ratio_title')}:</span>
                            <input
                                className='read-only-number'
                                type='number'
                                readOnly
                                value={ratio ? null : ratio} />
                            <div className="scores">
                                <span id="ca-zscore">{ratio ? null : ratioZscore} z</span>
                                <span id="ca-p">{ratio ? null : ratioPercent} p</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="right-hemodinamic">
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic', display: 'block', textAlign: 'left' }}>{t('own_formula_clinic_ua')}: (p{uaPercent}) ({uaZscore}z)</p>
                    <div className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-hemo-clinic-ua'>
                                <p>p{uaPercent}</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic', display: 'block', textAlign: 'left' }}>{t('own_formula_gregorio_ua')}: (p{gregorioUAPercent}) ({gregorioUAZscore}z)</p>
                    <div className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-hemo-gregorio-ua'>
                                <p>p{gregorioUAPercent}</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic', display: 'block', textAlign: 'left' }}>{t('own_formula_clinic_mca')}: (p{mcaPercent}) ({mcaZscore}z)</p>
                    <div className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-hemo-clinic-mca'>
                                <p>p{mcaPercent}</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic', display: 'block', textAlign: 'left' }}>{t('own_formula_gregorio_mca')}: (p{gregorioMCAPercent}) ({gregorioMCAZscore}z)</p>
                    <div className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-hemo-gregorio-mca'>
                                <p>p{gregorioMCAPercent}</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic', display: 'block', textAlign: 'left' }}>{t('own_formula_gregorio_ratio')}: (p{gregorioRatioPercent}) ({gregorioRatioZscore}z)</p>
                    <div className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-hemo-clinic-ratio'>
                                <p>p{ratioPercent}</p>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

        </div>

    )
}