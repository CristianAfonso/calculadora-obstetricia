import React, { useState , useEffect} from 'react';
import { useTranslation } from "react-i18next";
import { set, subDays, subWeeks } from "date-fns";
import moment from 'moment';

export default function Datation(props){
    const [weeks, setWeeks] = useState(props.weeks);
    const [days, setDays] = useState(props.days);
    const [newWeeks, setNewWeeks] = useState("");
    const [newDays, setNewDays] = useState("");
    const [lccData, setLCCData] =   useState("");
    const [dbpData, setDBPData] =   useState("");
    const [lfData, setLFData] =   useState("");
    const [ecoDate, SetEcoDate] = useState(props.ecoDate);
    const [today] = useState(new Date());
    const [lastFur, setLastFur] = useState(subDays(today, weeks*7 + days));
    const [displayedNewFur, setDisplayedNewFur] = useState(lastFur);
    const [newFur, setNewFur] = useState("");
    const {t} = useTranslation();
    function updateFur(calculatedDays){
        const newDate = subDays(ecoDate,calculatedDays);
        const totalDays = moment(ecoDate).diff(newDate, 'days');
        const totalWeeks = moment(ecoDate).diff(newDate, 'weeks');
        setNewFur(newDate);
        setNewDays(totalDays % 7);
        setNewWeeks(totalWeeks);
        if(lastFur != displayedNewFur){
            setLastFur(displayedNewFur);
        }
    }

    function handleLCCChange(event) {
        if(event.target.value >= 2 && event.target.value <= 121){
            setLCCData(event.target.value);
        }
    }
    function handleDBPChange(event) {
        if(event.target.value >= 31 && event.target.value <= 100){
            setDBPData(event.target.value);
        }
    }
    function handleLFChange(event) {
        if(event.target.value >= 17 && event.target.value <= 75){
            setLFData(event.target.value);
        }
    }
    function lccCalculate(){
        calculateNewFur('LCC');
    }
    function dbpCalculate(){
        calculateNewFur('DBP');
    }
    function lfCalculate(){
        calculateNewFur('LF');
    }
    function calculateNewFur(method){
        switch(method){
            case 'LCC':
                    updateFur(40.9041+(3.21585*Math.pow(lccData,0.5))+(0.348956*lccData));
                break;
            case 'DBP':
                    updateFur( 2 * dbpData + 44.2);
                break;
            case 'LF':
                    updateFur(7*(5.2876 + (0.1584 * lccData) - (0.0007 * Math.pow(lccData, 2))));
                break;
        }
    }

    useEffect(()=>{
        setDays(props.days);
        setWeeks(props.weeks);
        if(newFur){
            props.updateNewPeriod(newFur);
            setDisplayedNewFur(newFur);
            setNewFur("");
        }
        if(newDays && newWeeks){
            props.GiveNewTime(newWeeks, newDays);
            setNewDays("");
            setNewWeeks("");
        }else if(newDays){
            props.GiveNewTime(0, newDays);
            setNewDays("");

        }else if(newWeeks){
            props.GiveNewTime(newWeeks, 0);
            setNewWeeks("");
        }
    });
    return(
    <div className="service-container">
            <div className='title-container'>
                <h3>{t('datation')}</h3>
                <div className='weeksAndDays'>
                    <p>{t('weeks')}: {props.weeks}</p>
                    <p>{t('days')}: {props.days}</p>
                </div>
            </div>
            <div className='service-content'>
                <div id='datation-container'>
                    <div className="datation-input">
                        <span title={t('LCC_help')}>{t('LCC_title')}:</span>
                        <input 
                            type='number'
                            min={2} max={121}
                            placeholder='mm'
                            value={lccData}
                            onChange={handleLCCChange}/>
                            <span className="last-fur-span">{lastFur && `${t('last_fur')}: ${lastFur.toLocaleDateString()}`}</span> 
                            <span className="new-fur-container">{displayedNewFur && `${t('new_fur')}: ${displayedNewFur.toLocaleDateString()}`}</span>
                            <button onClick={lccCalculate}>{t('update_FUR')}</button>
                    </div>
                    <div className="datation-input">
                        <span title={t('DBP_help')}>{t('DBP_title')}:</span>
                        <input 
                            type='number'
                            min={31} max={100}
                            placeholder='mm'
                            value={dbpData}
                            onChange={handleDBPChange}/>
                            <span className="new-fur-container">{displayedNewFur && `${t('new_fur')}: ${displayedNewFur.toLocaleDateString()}`}</span>
                            <button onClick={dbpCalculate}>{t('update_FUR')}</button>
                        
                    </div>
                    <div className="datation-input">
                        <span title={t('LF_help')}>{t('LF_title')}:</span>
                        <input 
                            type='number'
                            min={17} max={75}
                            placeholder='mm'
                            value={lfData}
                            onChange={handleLFChange}/>
                            <span className="new-fur-container">{displayedNewFur && `${t('new_fur')}: ${displayedNewFur.toLocaleDateString()}`}</span>
                            <button onClick={lfCalculate}>{t('update_FUR')}</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}