import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import Bar from '../singleComponent/percentileBar.jsx';
import Scores from '../singleComponent/scores.jsx';
import Pair from '../singleComponent/pair.jsx';
import { getUAZscore, getMCAZscore, getCPRZscore, getUAZscore_GregorioFormula, getMCAZscore_GregorioFormula, displayBar, getZPercent } from "../functions.js";
export default function HemodinamicStudio(props) {
    const [ga, setGa] = useState(props.ga);
    const [ua, setUA] = useState(props.ua ? props.ua : '');
    const [uaZscore, setUAZscore] = useState(props.ua ? getUAZscore(props.ga, props.ua).toFixed(2) : '');
    const [uaPercent, setUAPercent] = useState(props.ua ? getZPercent(uaZscore).toFixed(0) : '');
    const [mca, setMCA] = useState(props.mca ? props.mca : '');
    const [mcaZscore, setMCAZscore] = useState(props.mca ? getMCAZscore(props.ga, props.mca).toFixed(2)  : '' );
    const [mcaPercent, setMCAPercent] = useState(props.mca ? getZPercent(getMCAZscore(props.ga, props.mca)).toFixed(0)  : '' );
    const [ratio, setRatio] = useState(props.mca ? (props.mca / props.ga).toFixed(2)  : '' );
    const [ratioZscore, setRatioZscore] = useState(props.mca && props.ua ? getCPRZscore(props.mca, props.ua, props.ga).toFixed(2) : '');
    const [ratioPercent, setRatioPercent] = useState(props.mca && props.ua ? getZPercent(getCPRZscore(props.mca, props.ua, props.ga)).toFixed(0) : '');
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
    }, [handleBars, handleRatio, mca, props, ua])
    return (
        <div id="hemodinamic-studio">
            <div id="left-hemodinamic">
                <div className='biometric-single'>
                    <div className="pair">
                        <div className="input">
                            <Pair help={t('UA_help')} title={t('UA_title')} measure={t('IP')} min={0.4} step={0.1} max={999} value={ua} onChange={handleUAChange} />
                            <Scores zscore={uaZscore} percent={uaPercent} />
                        </div>
                    </div>
                </div>
                <div className='biometric-single'>
                    <div className="pair">
                        <div className="input">
                            <Pair help={t('MCA_help')} title={t('MCA_title')} measure={t('IP')} min={0.5} step={0.1} max={999} value={mca} onChange={handleMCAChange} />
                            <Scores zscore={mcaZscore} percent={mcaPercent} />
                        </div>
                    </div>
                </div>
                <div className='biometric-single'>
                    <div className="pair">
                        <div className="input">
                            <Pair help={t('ratio_help')} title={t('ratio_title')} measure={t('mm')} min={0} max={999} value={ratio} readOnly={true} />
                            <Scores zscore={ratioZscore} percent={ratioPercent} />
                        </div>
                    </div>
                </div>
            </div>
            <div id="right-hemodinamic">
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic', display: 'block', textAlign: 'left' }}>{t('own_formula_clinic_ua')}: ({uaPercent}p) ({uaZscore}z)</p>
                    <Bar percent={uaPercent} id="percentile-bar-hemo-clinic-ua" />
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic', display: 'block', textAlign: 'left' }}>{t('own_formula_gregorio_ua')}: ({gregorioUAPercent}p) ({gregorioUAZscore}z)</p>
                    <Bar percent={gregorioUAPercent} id="percentile-bar-hemo-gregorio-ua" />
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic', display: 'block', textAlign: 'left' }}>{t('own_formula_clinic_mca')}: ({mcaPercent}p) ({mcaZscore}z)</p>
                    <Bar percent={mcaPercent} id="percentile-bar-hemo-clinic-mca" />
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic', display: 'block', textAlign: 'left' }}>{t('own_formula_gregorio_mca')}: ({gregorioMCAPercent}p) ({gregorioMCAZscore}z)</p>
                    <Bar percent={gregorioMCAPercent} id="percentile-bar-hemo-gregorio-mca" />
                </div>
                <div class="single-hemodinamic-displayer">
                    <p style={{ fontStyle: 'italic', display: 'block', textAlign: 'left' }}>{t('own_formula_gregorio_ratio')}: ({gregorioRatioPercent}p) ({gregorioRatioZscore}z)</p>
                    <Bar percent={ratioPercent} id="percentile-bar-hemo-clinic-ratio" />
                </div>
            </div>

        </div>

    )
}