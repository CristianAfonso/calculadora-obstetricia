import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { set, subDays, subWeeks } from "date-fns";
import moment from 'moment';

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
    function updateDaysLCC(value) {
        const calculatedDays = 40.9041 + (3.21585 * Math.pow(value, 0.5)) + (0.348956 * value);
        const newDate = subDays(ecoDate, calculatedDays);
        const totalDays = moment(ecoDate).diff(newDate, 'days');
        const totalWeeks = moment(ecoDate).diff(newDate, 'weeks');
        setLCCDays(totalDays % 7);
        setLCCWeeks(totalWeeks);
    }
    function updateDaysDBP(value) {
        const calculatedDays = 2 * value + 44.2;
        const newDate = subDays(ecoDate, calculatedDays);
        const totalDays = moment(ecoDate).diff(newDate, 'days');
        const totalWeeks = moment(ecoDate).diff(newDate, 'weeks');
        setDBPDays(totalDays % 7);
        setDBPWeeks(totalWeeks);
    }
    function updateDaysLF(value) {
        const calculatedDays = 7 * (5.2876 + (0.1584 * value) - (0.0007 * Math.pow(value, 2)));
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
        if (lastFur != displayedNewFur) {
            setLastFur(displayedNewFur);
        }
    }
    function lccCalculate() {
        if (lccData >= 2 && lccData <= 121) {
            calculateNewFur('LCC');
        }
    }
    function dbpCalculate() {
        if (dbpData >= 31 && dbpData <= 100) {
            calculateNewFur('DBP');
        }
    }
    function lfCalculate() {
        if (lfData >= 17 && lfData <= 75) {
            calculateNewFur('LF');
        }
    }
    function calculateNewFur(method) {
        switch (method) {
            case 'LCC':
                updateFur(40.9041 + (3.21585 * Math.pow(lccData, 0.5)) + (0.348956 * lccData)); //CRL Ultrasound Obstet Gynecol 2014; 44: 641-648: https://obgyn.onlinelibrary.wiley.com/doi/pdf/10.1002/uog.13448
                break;
            case 'DBP':
                updateFur(2 * dbpData + 44.2);
                break;
            case 'LF':
                updateFur(7 * (5.2876 + (0.1584 * lfData) - (0.0007 * Math.pow(lfData, 2))));
                break;
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
    });
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
                                <span className="last-fur-span">{lastFur && lastFur.toLocaleDateString()}</span>
                            </div>
                            <div>
                                <h6>{t('new_fur')}</h6>
                                <span className="last-fur-span">{displayedNewFur && displayedNewFur.toLocaleDateString()}</span>
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
                                <span className="last-fur-span">{lastFur && lastFur.toLocaleDateString()}</span>
                            </div>
                            <div>
                                <h6>{t('new_fur')}</h6>
                                <span className="last-fur-span">{displayedNewFur && displayedNewFur.toLocaleDateString()}</span>
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
                                <span className="last-fur-span">{lastFur && lastFur.toLocaleDateString()}</span>
                            </div>
                            <div>
                                <h6>{t('new_fur')}</h6>
                                <span className="last-fur-span">{displayedNewFur && displayedNewFur.toLocaleDateString()}</span>
                            </div>
                        </div>
                        <button onClick={lfCalculate}>{lfWeeks} {t('weeks')} + {lfDays} {t('days')}</button>

                    </div>
                </div>
            </div>
        </div>
    );
}