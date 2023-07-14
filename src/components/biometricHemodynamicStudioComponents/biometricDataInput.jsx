import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Bar from '../singleComponent/percentileBar';
import Scores from '../singleComponent/scores';
import Pair from '../singleComponent/pair';
import { displayBar, matchingGA, getZPercent, bpd_mean, cc_mean, ca_mean, lf_mean, bpd_sd, cc_sd, ca_sd, lf_sd } from "../functions";
export default function BiometricDataInput(props) {
    const [ga, setGa] = useState((props.weeks) + props.days / 7);
    const [dbp, setDBP] = useState("");
    const [cc, setCC] = useState("");
    const [ca, setCA] = useState("");
    const [lf, setLF] = useState("");
    const [DBPzscore, setDBPZscore] = useState("");
    const [DBPpercentil, setDBPpercentil] = useState("");
    const [DBPweeks, setDBPWeeks] = useState("");
    const [DBPdays, setDBPDays] = useState("");
    const [CCzscore, setCCZscore] = useState("");
    const [CCpercentil, setCCpercentil] = useState("");
    const [CCweeks, setCCWeeks] = useState("");
    const [CCdays, setCCDays] = useState("");
    const [CAzscore, setCAZscore] = useState("");
    const [CApercentil, setCApercentil] = useState("");
    const [CAweeks, setCAWeeks] = useState("");
    const [CAdays, setCADays] = useState("");
    const [LFzscore, setLFZscore] = useState("");
    const [LFpercentil, setLFpercentil] = useState("");
    const [LFweeks, setLFWeeks] = useState("");
    const [LFdays, setLFDays] = useState("");
    const { t } = useTranslation();
    function handleDBPBiometricChange(event) {
        setDBP(event.target.value);
        handleChange(event, 'DBP');
    }
    function handleCCBiometricChange(event) {
        setCC(event.target.value);
        handleChange(event, 'CC');
    }
    function handleCABiometricChange(event) {
        setCA(event.target.value);
        handleChange(event, 'CA');
    }
    function handleLFBiometricChange(event) {
        setLF(event.target.value);
        handleChange(event, 'LF');
    }
    function handleChange(event, from) {
        let matchingGAvalue = matchingGA(event.target.value, from);
        let matchingWeeks = Math.floor(matchingGAvalue / 7);
        let zscore;
        let percentile;
        switch (from) {
            case 'DBP':
                setDBPWeeks(matchingWeeks);
                setDBPDays(Math.round(((matchingGAvalue / 7) - matchingWeeks) * 7));
                zscore = (event.target.value - bpd_mean(ga)) / bpd_sd(ga);
                setDBPZscore(zscore.toFixed(2));
                percentile = getZPercent(zscore).toFixed(0);
                setDBPpercentil(percentile);
                displayBar(percentile, 'percentile-bar-dbp');
                return;
            case 'CC':
                setCCWeeks(matchingWeeks);
                setCCDays(Math.round(((matchingGAvalue / 7) - matchingWeeks) * 7));
                zscore = (event.target.value - cc_mean(ga)) / cc_sd(ga);
                setCCZscore(zscore.toFixed(2));
                percentile = getZPercent(zscore).toFixed(0);
                setCCpercentil(percentile);
                displayBar(percentile, 'percentile-bar-cc');
                return;
            case 'CA':
                setCAWeeks(matchingWeeks);
                setCADays(Math.round(((matchingGAvalue / 7) - matchingWeeks) * 7));
                zscore = (event.target.value - ca_mean(ga)) / ca_sd(ga);
                setCAZscore(zscore.toFixed(2));
                percentile = getZPercent(zscore).toFixed(0);
                setCApercentil(percentile);
                displayBar(percentile, 'percentile-bar-ca');
                return;
            case 'LF':
                setLFWeeks(matchingWeeks);
                setLFDays(Math.round(((matchingGAvalue / 7) - matchingWeeks) * 7));
                zscore = (event.target.value - lf_mean(ga)) / lf_sd(ga);
                setLFZscore(zscore.toFixed(2));
                percentile = getZPercent(zscore).toFixed(0);
                setLFpercentil(percentile);
                displayBar(percentile, 'percentile-bar-lf');
                return;
            default:
                return;
        }
    }
    useEffect(() => {
        setGa((props.weeks) + props.days / 7);
        props.cc(cc);
        props.ca(ca);
        props.lf(lf);
        props.dbp(dbp);
    }, [props, ca, cc, lf, dbp])
    return (
        <div id='left-biometric'>
            <div className='biometric-single'>
                <div className="pair">
                    <Pair help={t('DBP_biometric_help')} title={t('DBP_biometric_title')} measure={t('mm')} min={0} max={999} value={dbp} onChange={handleDBPBiometricChange} />
                    <Scores zscore={DBPzscore} percent={DBPpercentil} weeks={DBPweeks} days={DBPdays} />
                </div>
                <Bar percent={DBPpercentil} id="percentile-bar-dbp" />
            </div>
            <div className='biometric-single'>
                <div className="pair">
                    <Pair help={t('CC_biometric_help')} title={t('CC_biometric_title')} measure={t('mm')} min={0} max={999} value={cc} onChange={handleCCBiometricChange} />
                    <Scores zscore={CCzscore} percent={CCpercentil} weeks={CCweeks} days={CCdays} />
                </div>
                <Bar percent={CCpercentil} id="percentile-bar-cc" />
            </div>
            <div className='biometric-single'>
                <div className="pair">
                    <Pair help={t('CA_biometric_help')} title={t('CA_biometric_title')} measure={t('mm')} min={0} max={999} value={ca} onChange={handleCABiometricChange} />
                    <Scores zscore={CAzscore} percent={CApercentil} weeks={CAweeks} days={CAdays} />
                </div>
                <Bar percent={CApercentil} id="percentile-bar-ca" />
            </div>
            <div className='biometric-single'>
                <div className="pair">
                    <Pair help={t('LF_biometric_help')} title={t('DBP_biometric_title')} measure={t('mm')} min={0} max={999} value={lf} onChange={handleLFBiometricChange} />
                    <Scores zscore={LFzscore} percent={LFpercentil} weeks={LFweeks} days={LFdays} />
                </div>
                <Bar percent={LFpercentil} id="percentile-bar-lf" />
            </div>
        </div>
    )
}