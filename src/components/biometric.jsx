import React, {useState , useEffect} from 'react';
import { useTranslation } from "react-i18next";
import {displayBar, matchingGA, getZPercent, bpd_mean, cc_mean, ca_mean, lf_mean, bpd_sd, cc_sd, ca_sd, lf_sd} from "./functions";
export default function Biometric(props){
    const [dbp, setDBP] = useState("");
    const [cc, setCC] = useState("");
    const [ca, setCA] = useState("");
    const [lf, setLF] = useState("");
    const [ga, setGa] = useState((props.weeks)+props.days/7);
    const [DBPzscore,   setDBPZscore] = useState("");
    const [DBPpercentil,setDBPpercentil] = useState("");
    const [DBPweeks,    setDBPWeeks] = useState("");
    const [DBPdays,     setDBPDays] = useState("");
    const [CCzscore,    setCCZscore] = useState("");
    const [CCpercentil, setCCpercentil] = useState("");
    const [CCweeks,     setCCWeeks] = useState("");
    const [CCdays,      setCCDays] = useState("");
    const [CAzscore,    setCAZscore] = useState("");
    const [CApercentil, setCApercentil] = useState("");
    const [CAweeks,     setCAWeeks] = useState("");
    const [CAdays,      setCADays] = useState("");
    const [LFzscore,    setLFZscore] = useState("");
    const [LFpercentil, setLFpercentil] = useState("");
    const [LFweeks,     setLFWeeks] = useState("");
    const [LFdays,      setLFDays] = useState("");
    const [hadlock2Weight, setHL2peso] = useState("");
    const [hadlock2Age, setHL2Ageo] = useState("");
    const [hadlock3Weight, setHL3peso] = useState("");
    const [hadlock3Age, setHL3Age] = useState("");
    const [customWeight, setCustomWeight] = useState("");
    const [genre, setGenre] = useState("");
    const [BioGregorioPercent, setGregPercent] =useState("");
    const [BioClinicPercent, setClinicPercent] =useState("");
    const {t} = useTranslation();

    function handleDBPBiometricChange(event){
        setDBP(event.target.value);
        handleChange(event,'DBP');
    }
    function handleCCBiometricChange(event){
        setCC(event.target.value);
        handleChange(event,'CC');
    }
    function handleCABiometricChange(event){
        setCA(event.target.value);
        handleChange(event,'CA');
    }
    function handleLFBiometricChange(event){
        setLF(event.target.value);
        handleChange(event,'LF');
    }
    function handleCustomWeightChange(event){
        setCustomWeight(event.target.value);

    }
    function handleSelectGenre(event){
        setGenre(event.target.value);

    }
    function handleChange(event, from){
        let matchingGAvalue =   matchingGA(event.target.value,from);
        let matchingWeeks = Math.floor(matchingGAvalue/7);
        let zscore;
        let percentile;
        switch(from){
            case 'DBP':
                setDBPWeeks( matchingWeeks);
                setDBPDays(Math.round(((matchingGAvalue/7)-matchingWeeks)*7));
                zscore = (event.target.value-  bpd_mean(ga))/  bpd_sd(ga);
                setDBPZscore(zscore.toFixed(2));
                percentile =   getZPercent(zscore).toFixed(0);
                setDBPpercentil(percentile);
                  displayBar(percentile, 'percentile-bar-dbp');
                return;
            case 'CC':
                setCCWeeks(matchingWeeks);
                setCCDays(Math.round(((matchingGAvalue/7)-matchingWeeks)*7));
                zscore = (event.target.value-  cc_mean(ga))/  cc_sd(ga);
                setCCZscore(zscore.toFixed(2));
                percentile =   getZPercent(zscore).toFixed(0);
                setCCpercentil(percentile);
                  displayBar(percentile, 'percentile-bar-cc');
                return;
            case 'CA':
                setCAWeeks(matchingWeeks);
                setCADays(Math.round(((matchingGAvalue/7)-matchingWeeks)*7));
                zscore = (event.target.value-  ca_mean(ga))/  ca_sd(ga);
                setCAZscore(zscore.toFixed(2));
                percentile =   getZPercent(zscore).toFixed(0);
                setCApercentil(percentile);
                  displayBar(percentile, 'percentile-bar-ca');
                return;
            case 'LF':
                setLFWeeks(matchingWeeks);
                setLFDays(Math.round(((matchingGAvalue/7)-matchingWeeks)*7));
                zscore = (event.target.value-  lf_mean(ga))/  lf_sd(ga);
                setLFZscore(zscore.toFixed(2));
                percentile =   getZPercent(zscore).toFixed(0);
                setLFpercentil(percentile);
                displayBar(percentile, 'percentile-bar-lf');
                return;
            default:
                return;
        }
    }
    function handleUpdate(){

    }

    
    useEffect(() =>{
        setGa((props.weeks)+props.days/7);
        console.log(dbp);
    });

    return(
        <div className="service-container">
            <div className='title-container'>
                <h3>{t('biometric')}</h3>
                <div className='weeksAndDays'>
                    <p>{t('weeks')}: {props.weeks}</p>
                    <p>{t('days')}: {props.days}</p>
                </div>
            </div>
            <div className='service-content'>
                <div id='biometric-container'>
                    <div id='left-biometric'>
                        <div className='biometric-single'>
                                <div className="pair">
                                    <div className="input">
                                        <span title={t('DBP_biometric_help')}>{t('DBP_biometric_title')}:</span>
                                        <input 
                                            type='number'
                                            placeholder='mm'
                                            min={0}
                                            value={dbp}
                                            onChange={handleDBPBiometricChange}/>
                                    </div>
                                    <div className="scores">
                                        <span id="dbp-zscore">{DBPzscore}z</span>
                                        <span id="dbp-p">{DBPpercentil}p</span>
                                        <span id="dbp-time">{DBPweeks || 0} w {DBPdays|| 0} d</span>
                                    </div>
                                </div>
                                <span className='meter percentile-bar-container'>
                                    <span className='percentile-bar-content' id='percentile-bar-dbp'>
                                        <p>p{DBPpercentil}</p>
                                    </span>
                                </span>
                        </div>
                        <div className='biometric-single'>
                                <div className="pair">
                                    <div className="input">
                                        <span title={t('CC_biometric_help')}>{t('CC_biometric_title')}:</span>
                                        <input 
                                            type='number'
                                            placeholder='mm'
                                            min={0}
                                            value={cc}
                                            onChange={handleCCBiometricChange}/>
                                    </div>
                                    <div className="scores">
                                        <span id="cc-zscore">{CCzscore} z</span>
                                        <span id="cc-p">{CCpercentil} p</span>
                                        <span id="cc-time">{CCweeks|| 0} w {CCdays|| 0} d</span>
                                    </div>
                                </div>
                                <span className='meter percentile-bar-container'>
                                    <span className='percentile-bar-content' id='percentile-bar-cc'>
                                        <p>p{CCpercentil}</p>
                                    </span>
                                </span>
                        </div>
                        <div className='biometric-single'>
                                <div className="pair">
                                    <div className="input">
                                    <span title={t('CA_biometric_help')}>{t('CA_biometric_title')}:</span>
                                    <input 
                                        type='number'
                                        placeholder='mm'
                                        min={0}
                                        value={ca}
                                        onChange={handleCABiometricChange}/>
                                    </div>
                                    <div className="scores">
                                        <span id="ca-zscore">{CAzscore} z</span>
                                        <span id="ca-p">{CApercentil} p</span>
                                        <span id="ca-time">{CAweeks|| 0} w {CAdays|| 0} d</span>
                                    </div>
                                </div>
                                <span className='meter percentile-bar-container'>
                                    <span className='percentile-bar-content' id='percentile-bar-ca'>
                                        <p>p{CApercentil}</p>
                                    </span>
                                </span>
                        </div>
                        <div className='biometric-single'>
                                <div className="pair">
                                    <div className="input">
                                        <span title={t('LF_biometric_help')}>{t('LF_biometric_title')}:</span>
                                        <input 
                                            type='number'
                                            placeholder='mm'
                                            min={0}
                                            value={lf}
                                            onChange={handleLFBiometricChange}/>
                                    </div>
                                    <div className="scores">
                                        <span id="lf-zscore">{LFzscore} z</span>
                                        <span id="lf-p">{LFpercentil} p</span>
                                        <span id="lf-time">{LFweeks || 0} w {LFdays || 0} d</span>
                                    </div>
                                </div>
                                <span className='meter percentile-bar-container'>
                                    <span className='percentile-bar-content' id='percentile-bar-lf'>
                                        <p>p{LFpercentil}</p>
                                    </span>
                                </span>
                        </div>
                    </div>
                    <div id='rigth-biometric'>
                        <table>
                            <thead>
                                <th>
                                    Formula
                                </th>
                                <th>
                                    Medidas
                                </th>
                                <th>
                                    Peso
                                </th>
                                <th>
                                    Edad
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        <button>Hadlock 2</button>
                                    </th>
                                    <th>
                                        CC CA LF
                                    </th>
                                    <th>
                                        {hadlock2Weight}
                                    </th>
                                    <th>
                                        {hadlock2Age}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                     <button>Hadlock 3</button>
                                    </th>
                                    <th>
                                        CC CA LF
                                    </th>
                                    <th>
                                        {hadlock3Weight}
                                    </th>
                                    <th>
                                        {hadlock3Age}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                     <button>{t('manual_weight')}</button>
                                    </th>
                                    <th colSpan={3}>
                                        <span>
                                            {t('weight')}
                                            <input
                                                style={{marginLeft: 5 + "px", maxWidth: 70 +'px', height: 39 + 'px'}}
                                                type='number'
                                                placeholder='g'
                                                min={0}
                                                value={customWeight||0}
                                                onChange={handleCustomWeightChange}/>
                                            <button className="genreSelector" onClick={handleSelectGenre} value="man">{t('man')}</button>
                                            <button className="genreSelector" onClick={handleSelectGenre} value="woman">{t('woman')}</button>
                                        </span>
                                    </th>
                                </tr>
                                <tr>
                                    <th style={{textAlign:'center'}} colSpan={4}>
                                        <tr style={{display:'block'}}>{t('own_formula_gregorio')}</tr>
                                        <tr className='percentile-table-container'>
                                            <span className='meter percentile-bar-container'>
                                                <span className='percentile-bar-content' id='percentile-bar-bio-gregorio'>
                                                    <p>p{BioGregorioPercent}</p>
                                                </span>
                                            </span>
                                        </tr>
                                    </th>
                                </tr>
                                <tr>
                                    <th style={{textAlign:'center'}} colSpan={4}>
                                        <tr style={{display:'block'}}>{t('own_formula_clinic')}</tr>
                                        <tr className='percentile-table-container'>
                                            <span className='meter percentile-bar-container'>
                                                <span className='percentile-bar-content' id='percentile-bar-bio-clinic'>
                                                    <p>p{BioClinicPercent}</p>
                                                </span>
                                        </span>
                                        </tr>
                                    </th>
                                </tr>
                                
                                    
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}