import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { mcaExpectedSpeed, mcaMOM, displayMoMBar, getZPercent, getUAMeanZscore, displayBar } from "../functions.js";
export default function SystolicComponent(props) {
    const [ga, setGa] = useState(props.ga);
    const [acmSystolicValue, setACMSystolicValue] = useState("");
    const [acmExpectedSpeed, setACMExpect] = useState("");
    const [acmMOM, setACMMOM] = useState("");
    const [acmText, setACMText] = useState("");
    const [uterine_arteryLeft, setUALeft] = useState("");
    const [uterine_arteryRight, setUARight] = useState("");
    const [uterine_mean, setUterineMean] = useState("");
    const [uterine_meanZscore, setUterineMeanZscore] = useState("");
    const [uterine_meanPercent, setUterineMeanPercent] = useState("");
    const { t } = useTranslation();

    function handleACMChange(event) {
        setACMSystolicValue(event.target.value);
        const acmEV = mcaExpectedSpeed(ga);
        setACMExpect(acmEV.toFixed(2));
        setACMMOM(mcaMOM(event.target.value, acmEV).toFixed(2));
        displayMoMBar(mcaMOM(event.target.value, acmEV), 'hemodinamic-acm-mom');
        switch (true) {
            case (mcaMOM(event.target.value, acmEV) > 1.6):
                setACMText("severe_anemia");
                break;
            case (mcaMOM(event.target.value, acmEV) > 1.5):
                setACMText("moderate_anemia");
                break;
            case (mcaMOM(event.target.value, acmEV) > 1.3):
                setACMText("mild_anemia");
                break;
            default:
                setACMText("no_anemia");
                break;
        }
    }
    function handleUALeftChange(event) {
        setUALeft(parseFloat(event.target.value));
        if (uterine_arteryRight) {
            handleUAmeanChange(event.target.value, uterine_arteryRight);
        }
    }
    function handleUARightChange(event) {
        setUARight(parseFloat(event.target.value));
        if (uterine_arteryLeft) {
            handleUAmeanChange(uterine_arteryLeft, event.target.value);
        }
    }
    function handleUAmeanChange(left, right) {
        const uaMean = ((parseFloat(left) + parseFloat(right)) / 2).toFixed(2);
        const uaZscore = getUAMeanZscore(ga, uaMean).toFixed(2);
        const uaPercent = getZPercent(uaZscore).toFixed(0);
        setUterineMean(uaMean);
        setUterineMeanZscore(uaZscore);
        setUterineMeanPercent(uaPercent);
        displayBar(uaPercent, 'percentile-bar-hemo-clinic-uterine_media');
    }
    useEffect(() => {
        setGa(props.ga);
    }, [props])
    return (
        <div id="center-hemodinamic">
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('ACMSystolic_help')}>{t('ACMSystolic_title')}:</span>
                        <input
                            type='number'
                            placeholder='IP'
                            min={0}
                            value={acmSystolicValue}
                            onChange={handleACMChange} />
                        <div className="scores">
                            <span id="acm-expected-speed">{acmExpectedSpeed}</span>
                            <span id="acm-mom">MoM {acmMOM}</span>
                        </div>
                    </div>
                </div>
                <div className='hemodinamic-bar percentile-table-container'>
                    <span className='meter percentile-bar-container'>
                        <span className='percentile-bar-content' id='hemodinamic-acm-mom'>
                            <p>{acmMOM} {t(acmText)}</p>
                        </span>
                    </span>
                </div>
            </div>
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('uterine_artery_help')}><p>{t('uterine_artery_title')}:</p></span>
                        <div class="double-input">
                            <div>
                                <span>{t('right')}:</span>
                                <input
                                    type='number'
                                    placeholder='IP'
                                    min={0}
                                    step={0.1}
                                    value={uterine_arteryRight}
                                    onChange={handleUARightChange} />

                            </div>
                            <div class="double-input">
                                <div>
                                    <span>{t('left')}:</span>
                                    <input
                                        type='number'
                                        placeholder='IP'
                                        min={0}
                                        step={0.1}
                                        value={uterine_arteryLeft}
                                        onChange={handleUALeftChange} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hemodinamic-single'>
                <div className="pair">
                    <div className="input">
                        <span title={t('uterine_mean_help')}>{t('uterine_mean_title')}:</span>
                        <input
                            className='read-only-number'
                            type='number'
                            readOnly
                            step={0.01}
                            value={uterine_mean} />
                        <div className="scores">
                            <span id="ca-zscore">{uterine_mean === 0 ? null : uterine_meanZscore} z</span>
                            <span id="ca-p">{uterine_mean === 0 ? null : uterine_meanPercent} p</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hemodinamic-bar percentile-table-container'>
                <span className='meter percentile-bar-container'>
                    <span className='percentile-bar-content' id='percentile-bar-hemo-clinic-uterine_media'>
                        <p>p{uterine_meanPercent}</p>
                    </span>
                </span>
            </div>
        </div>
    )
}