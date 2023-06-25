import React, { useState , useEffect} from 'react';
import { useTranslation } from "react-i18next";
import { set, subDays, subWeeks } from "date-fns";
import moment from 'moment';

export default function Datation(props){
    const [weeks, setWeeks] = useState(props.weeks);
    const [days, setDays] = useState(props.days);
    const [newWeeks, setNewWeeks] = useState("");
    const [newDays, setNewDays] = useState("");
    const [lccData, setLCCData] =   useState(props.lcc);
    const [dbpData, setDBPData] =   useState(props.dbp);
    const [lfData, setLFData] =   useState(props.lf);
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
        setLCCData(event.target.value);
        props.setLCC(event.target.value);
    }
    function handleDBPChange(event) {
        setDBPData(event.target.value);
        props.setDBP(event.target.value);
    }
    function handleLFChange(event) {
        setLFData(event.target.value);
        props.setLF(event.target.value);
    }
    function lccCalculate(){
        if(lccData >= 2 && lccData <= 121){
            calculateNewFur('LCC');
        }
    }
    function dbpCalculate(){
        if(dbpData >= 31 && dbpData <= 100){
            calculateNewFur('DBP');
        }
    }
    function lfCalculate(){
        if(lfData >= 17 && lfData <= 75){
            calculateNewFur('LF');
        }
    }
    function calculateNewFur(method){
        switch(method){
            case 'LCC':
                    updateFur(40.9041+(3.21585*Math.pow(lccData,0.5))+(0.348956*lccData)); //CRL Ultrasound Obstet Gynecol 2014; 44: 641-648: https://obgyn.onlinelibrary.wiley.com/doi/pdf/10.1002/uog.13448
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
                        <div className="pair">
                            <span title={t('LCC_help')}>{t('LCC_title')}:</span>
                            <input 
                                type='number'
                                placeholder='mm'
                                value={lccData}
                                onChange={handleLCCChange}/>
                        </div>
                        <div className="pair">
                            <span className="last-fur-span">{lastFur && `${t('last_fur')}: ${lastFur.toLocaleDateString()}`}</span> 
                            <span className="new-fur-container">{displayedNewFur && `${t('new_fur')}: ${displayedNewFur.toLocaleDateString()}`}</span>
                        </div>
                            <button onClick={lccCalculate}>{t('update_FUR')}</button>
                    </div>
                    <div className="datation-input">
                        <div className="pair">
                            <span title={t('DBP_help')}>{t('DBP_title')}:</span>
                            <input 
                            type='number'
                            placeholder='mm'
                            value={dbpData}
                            onChange={handleDBPChange}/>
                            </div>
                            <div className="pair">
                                <span className="last-fur-span">{lastFur && `${t('last_fur')}: ${lastFur.toLocaleDateString()}`}</span> 
                                <span className="new-fur-container">{displayedNewFur && `${t('new_fur')}: ${displayedNewFur.toLocaleDateString()}`}</span>
                            </div>
                            <button onClick={dbpCalculate}>{t('update_FUR')}</button>
                        
                    </div>
                    <div className="datation-input">
                        <div className="pair">
                            <span title={t('LF_help')}>{t('LF_title')}:</span>
                            <input 
                            type='number'
                            placeholder='mm'
                            value={lfData}
                            onChange={handleLFChange}/>

                        </div>
                        <div className="pair">
                            <span className="last-fur-span">{lastFur && `${t('last_fur')}: ${lastFur.toLocaleDateString()}`}</span> 
                            <span className="new-fur-container">{displayedNewFur && `${t('new_fur')}: ${displayedNewFur.toLocaleDateString()}`}</span>
                        </div>
                            <button onClick={lfCalculate}>{t('update_FUR')}</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}