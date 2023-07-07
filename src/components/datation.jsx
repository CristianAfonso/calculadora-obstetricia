import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import { subDays } from "date-fns";
import moment from 'moment';
import { matchingGA } from './functions';

export default function Datation(props) {
    const [weeks, setWeeks] = useState(props.weeks);
    const [days, setDays] = useState(props.days);
    const [newWeeks, setNewWeeks] = useState("");
    const [newDays, setNewDays] = useState("");
    const [lccData, setLCCData] = useState(props.lcc);
    const [dbpData, setDBPData] = useState(props.dbp);
    const [lfData, setLFData] = useState(props.lf);
    const [lccDays, setLCCDays] = useState(props.lcc);
    const [lccWeeks, setLCCWeeks] = useState(props.dbp);
    const [dbpDays, setDBPDays] = useState(props.lf);
    const [dbpWeeks, setDBPWeeks] = useState(props.lcc);
    const [lfDays, setLFDays] = useState(props.dbp);
    const [lfWeeks, setLFWeeks] = useState(props.lf);
    const [ecoDate] = useState(props.ecoDate);
    const [today] = useState(new Date());
    const [lastFur, setLastFur] = useState(subDays(today, weeks * 7 + days));
    const [displayedNewFur, setDisplayedNewFur] = useState(lastFur);
    const [newFur, setNewFur] = useState("");
    const { t } = useTranslation();

    function handleLCCChange(event) {
        setLCCData(event.target.value);
        props.setLCC(event.target.value);
        updateDaysLCC(event.target.value);
    }
    function handleDBPChange(event) {
        setDBPData(event.target.value);
        props.setDBP(event.target.value);
        updateDaysDBP(event.target.value);
    }
    function handleLFChange(event) {
        setLFData(event.target.value);
        props.setLF(event.target.value);
        updateDaysLF(event.target.value);
    }
    const updateDaysLCC = useCallback((value) => {
        const calculatedDays = matchingGA(value, "LCC");
        const newDate = subDays(ecoDate, calculatedDays);
        const totalDays = moment(ecoDate).diff(newDate, 'days');
        const totalWeeks = moment(ecoDate).diff(newDate, 'weeks');
        setLCCDays(totalDays % 7);
        setLCCWeeks(totalWeeks);
    }, [ecoDate])
    function updateDaysDBP(value) {
        const calculatedDays = matchingGA(value, "DBP");
        const newDate = subDays(ecoDate, calculatedDays);
        const totalDays = moment(ecoDate).diff(newDate, 'days');
        const totalWeeks = moment(ecoDate).diff(newDate, 'weeks');
        setDBPDays(totalDays % 7);
        setDBPWeeks(totalWeeks);
    }
    function updateDaysLF(value) {
        const calculatedDays = matchingGA(value, "LF");
        const newDate = subDays(ecoDate, calculatedDays);
        const totalDays = moment(ecoDate).diff(newDate, 'days');
        const totalWeeks = moment(ecoDate).diff(newDate, 'weeks');
        setLFDays(totalDays % 7);
        setLFWeeks(totalWeeks);
    }
    function updateFur(calculatedDays) {
        const newDate = subDays(ecoDate, calculatedDays);
        const totalDays = moment(ecoDate).diff(newDate, 'days');
        const totalWeeks = moment(ecoDate).diff(newDate, 'weeks');
        setNewFur(newDate);
        setNewDays(totalDays % 7);
        setNewWeeks(totalWeeks);
        if (lastFur !== displayedNewFur) {
            setLastFur(displayedNewFur);
        }
    }
    function lccCalculate() {
        if (lccData >= 2 && lccData <= 121) {
            updateFur(matchingGA(lccData, "LCC"));
        }
    }
    function dbpCalculate() {
        if (dbpData >= 31 && dbpData <= 100) {
            updateFur(matchingGA(dbpData, "DBP"));
        }
    }
    function lfCalculate() {
        if (lfData >= 17 && lfData <= 75) {
            updateFur(matchingGA(lfData, "LF"));
        }
    }

    useEffect(() => {
        setDays(props.days);
        setWeeks(props.weeks);
        if (newFur) {
            props.updateNewPeriod(newFur);
            setDisplayedNewFur(newFur);
            setNewFur("");
        }
        if (newDays && newWeeks) {
            props.GiveNewTime(newWeeks, newDays);
            setNewDays("");
            setNewWeeks("");
        } else if (newDays) {
            props.GiveNewTime(weeks, newDays);
            setNewDays("");

        } else if (newWeeks) {
            props.GiveNewTime(newWeeks, days);
            setNewWeeks("");
        }
        if (props.lcc !== lccData) {
            setLCCData(props.lcc);
            updateDaysLCC(props.lcc);
        }
    }, [props, newFur, newDays, newWeeks, lccData, weeks, days, updateDaysLCC]);
    return (
        <div className="service-container">
            <div className='title-container'>
                <h1>{t('datation')}</h1>
                <div className='weeksAndDays'>
                    <h3>{t('weeks')}: {props.weeks}</h3>
                    <h3>{t('days')}: {props.days}</h3>
                </div>
            </div>
            <div className='service-content'>
                <div id='datation-container'>
                    <div className="datation-input">
                        <div className="pair">
                            <span title={t('lcc_help')}>{t('lcc_title')}:</span>
                            <input
                                type='number'
                                placeholder={t('mm')}
                                min={2}
                                max={121}
                                value={lccData}
                                onChange={handleLCCChange} />
                        </div>
                        <div className="pair">
                            <div>
                                <h6>{t('last_fur')}</h6>
                                <span className="last-fur-span">{lastFur.toLocaleDateString()}</span>
                            </div>
                            <div>
                                <h6>{t('new_fur')}</h6>
                                <span className="last-fur-span">{displayedNewFur.toLocaleDateString()}</span>
                            </div>
                        </div>
                        <button onClick={lccCalculate}>{lccWeeks} {t('weeks')} + {lccDays} {t('days')}</button>
                    </div>
                    <div className="datation-input">
                        <div className="pair">
                            <span title={t('dbp_help')}>{t('dbp_title')}:</span>
                            <input
                                type='number'
                                placeholder={t('mm')}
                                min={31}
                                max={100}
                                value={dbpData}
                                onChange={handleDBPChange} />
                        </div>
                        <div className="pair">
                            <div>
                                <h6>{t('last_fur')}</h6>
                                <span className="last-fur-span">{lastFur.toLocaleDateString()}</span>
                            </div>
                            <div>
                                <h6>{t('new_fur')}</h6>
                                <span className="last-fur-span">{displayedNewFur.toLocaleDateString()}</span>
                            </div>
                        </div>
                        <button onClick={dbpCalculate}>{dbpWeeks} {t('weeks')} + {dbpDays} {t('days')}</button>

                    </div>
                    <div className="datation-input">
                        <div className="pair">
                            <span title={t('lf_help')}>{t('lf_title')}:</span>
                            <input
                                type='number'
                                placeholder={t('mm')}
                                min={17}
                                max={75}
                                value={lfData}
                                onChange={handleLFChange} />

                        </div>
                        <div className="pair">
                            <div>
                                <h6>{t('last_fur')}</h6>
                                <span className="last-fur-span">{lastFur.toLocaleDateString()}</span>
                            </div>
                            <div>
                                <h6>{t('new_fur')}</h6>
                                <span className="last-fur-span">{displayedNewFur.toLocaleDateString()}</span>
                            </div>
                        </div>
                        <button onClick={lfCalculate}>{lfWeeks} {t('weeks')} + {lfDays} {t('days')}</button>

                    </div>
                </div>
            </div>
        </div>
    );
}