import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { } from "../functions";
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
    const [clinicUAZscore, setClinicUAZscore] = useState("");
    const [clinicUAPercent, setClinicUAPercent] = useState("");
    const { t } = useTranslation();

    function handleUAChange (event){
        setUA(event.target.value);
        if(mca){
            handleRatio(event.target.value, mca);
        }
        setUAZscore();
        setUAPercent();
    }
    function handleMCAChange (event){
        setMCA(event.target.value);
        if(ua){
            handleRatio(ua, event.target.value);
        }
        setMCAZscore();
        setMCAPercent();
    }
    function handleRatio(ua, mca){
        setRatio(ua*mca);
        setRatioZscore();
        setRatioPercent();
    }

    useEffect(() => {
        setGa((props.weeks) + props.days / 7);
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
                <div>
                    <p style={{ display: 'block', textAlign: 'center' }}>{t('own_formula_clinic')}:</p>
                    <p style={{ display: 'block', textAlign: 'center' }}>(p{clinicUAPercent}) ({clinicUAZscore}z)</p>
                    <div className='percentile-table-container'>
                        <span className='meter percentile-bar-container'>
                            <span className='percentile-bar-content' id='percentile-bar-hemo-clinic-ua'>
                                <p>p{clinicUAPercent}</p>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

        </div>

    )
}