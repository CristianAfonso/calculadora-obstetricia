import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import {getUAZscore, getMCAZscore, getCPRZscore, getUAZscore_GregorioFormula,getMCAZscore_GregorioFormula,displayBar, getZPercent } from "../functions.js";
export default function HemodinamicStudio(props) {
    const [ga, setGa] = useState((props.weeks) + props.days / 7);
    const [ua, setUA] = useState("");
    const [uaZscore, setUAZscore] = useState("");
    const [uaPercent, setUAPercent] = useState("");
    const [mca, setMCA] = useState("");
    const [mcaZscore, setMCAZscore] = useState("");
    const [mcaPercent, setMCAPercent] = useState("");
    const [ratio, setRatio] = useState("");
    const [ratioZscore, setRatioZscore] = useState("");
    const [ratioPercent, setRatioPercent] = useState("");
    const [clinicUAZscore,      setClinicUAZscore] = useState("");
    const [clinicUAPercent,     setClinicUAPercent] = useState("");
    const [clinicMCAZscore,     setClinicMCAZscore] = useState("");
    const [clinicMCAPercent,    setClinicMCAPercent] = useState("");
    const [gregorioUAZscore,    setGregorioUAZscore] = useState("");
    const [gregorioUAPercent,   setGregorioUAPercent] = useState("");
    const [gregorioMCAZscore,   setGregorioMCAZscore] = useState("");
    const [gregorioMCAPercent,  setGregorioMCAPercent] = useState("");
    const [gregorioRatioZscore, setGregorioRatioZscore] = useState("");
    const [gregorioRatioPercent,setGregorioRatioPercent] = useState("");
    const { t } = useTranslation();

    function handleUAChange (event){
        setUA(event.target.value);
        if(mca){
            handleRatio(event.target.value, mca);
        }
        const uaZscoreChange = getUAZscore(ga, event.target.value);
        const uaPercentChange = getZPercent(uaZscoreChange);
        setUAZscore(uaZscoreChange.toFixed(2));
        setUAPercent(uaPercentChange.toFixed(0));
    }
    function handleMCAChange (event){
        setMCA(event.target.value);
        if(ua){
            handleRatio(ua, event.target.value);
        }
        const mcaZscoreChange   = getMCAZscore(ga, event.target.value);
        const mcaPercentChange  = getZPercent(mcaZscoreChange);
        setMCAZscore(mcaZscoreChange.toFixed(2));
        setMCAPercent(mcaPercentChange.toFixed(0));
    }
    function handleRatio(ua, mca){
        const ratioZscoreChange     = getCPRZscore(mca, ua, ga);
        const ratioPercentChange    = getZPercent(ratioZscoreChange);
        setRatio((mca/ua).toFixed(2));
        setRatioZscore(ratioZscoreChange.toFixed(2));
        setRatioPercent(ratioPercentChange.toFixed(0));
    }
    function handleBars(){
        if(ua && mca){
            const gregorioUAZ =  getUAZscore_GregorioFormula(ga,ua).toFixed(2);
            const gregorioUAP =  getZPercent(gregorioUAZ).toFixed(0);
            const gregorioMCAZ =  getMCAZscore_GregorioFormula(ga,mca).toFixed(2);
            const gregorioMCAP =  getZPercent(gregorioMCAZ).toFixed(0);
            setClinicUAZscore(uaZscore);
            setClinicUAPercent(uaPercent);
            setClinicMCAZscore(mcaZscore);
            setClinicMCAPercent(mcaPercent);
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
        }else if(mca){
            const gregorioMCAZ =  getMCAZscore_GregorioFormula(ga,mca).toFixed(2);
            const gregorioMCAP =  getZPercent(gregorioMCAZ).toFixed(0);
            setGregorioMCAZscore(gregorioMCAZ);
            setGregorioMCAPercent(gregorioMCAP);
            displayBar(gregorioMCAP, 'percentile-bar-hemo-gregorio-mca');
            displayBar(mcaPercent, 'percentile-bar-hemo-clinic-mca');

        }else if(ua){
            const gregorioUAZ =  getUAZscore_GregorioFormula(ga,ua).toFixed(2);
            const gregorioUAP =  getZPercent(gregorioUAZ).toFixed(0);
            setGregorioUAZscore(gregorioUAZ);
            setGregorioUAPercent(gregorioUAP);
            displayBar(uaPercent, 'percentile-bar-hemo-clinic-ua');
            displayBar(gregorioUAP, 'percentile-bar-hemo-gregorio-ua');
        }
    }
    useEffect(() => {
        setGa((props.weeks) + props.days / 7);
        handleBars();
    })

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
                                    <span id="ua-zscore">{uaZscore}z</span>
                                    <span id="ua-p">{uaPercent}p</span>
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
                                    <span id="mca-zscore">{mcaZscore} z</span>
                                    <span id="mca-p">{mcaPercent} p</span>
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
                                value={ratio}/>
                                <div className="scores">
                                    <span id="ca-zscore">{ratioZscore} z</span>
                                    <span id="ca-p">{ratioPercent} p</span>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="right-hemodinamic">
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic',display: 'block', textAlign: 'left' }}>{t('own_formula_clinic_ua')}: (p{uaPercent}) ({uaZscore}z)</p>
                    <div className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-hemo-clinic-ua'>
                                <p>p{uaPercent}</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic',display: 'block', textAlign: 'left' }}>{t('own_formula_gregorio_ua')}: (p{gregorioUAPercent}) ({gregorioUAZscore}z)</p>
                    <div className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-hemo-gregorio-ua'>
                                <p>p{gregorioUAPercent}</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic',display: 'block', textAlign: 'left' }}>{t('own_formula_clinic_mca')}: (p{mcaPercent}) ({mcaZscore}z)</p>
                    <div className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-hemo-clinic-mca'>
                                <p>p{mcaPercent}</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic',display: 'block', textAlign: 'left' }}>{t('own_formula_gregorio_mca')}: (p{gregorioMCAPercent}) ({gregorioMCAZscore}z)</p>
                    <div className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-hemo-gregorio-mca'>
                                <p>p{gregorioMCAPercent}</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic',display: 'block', textAlign: 'left' }}>{t('own_formula_gregorio_ratio')}: (p{gregorioRatioPercent}) ({gregorioRatioZscore}z)</p>
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