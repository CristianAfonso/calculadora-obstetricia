import React, {useState , useEffect} from 'react';
import { useTranslation } from "react-i18next";

export default function Biometric(props){
    const [weeks, setWeeks] = useState("");
    const [days, setDays] = useState("");
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
    function handleChange(event, from){
        let matchingGAvalue = matchingGA(event.target.value,from);
        let matchingWeeks = Math.floor(matchingGAvalue/7);
        let zscore;
        let percentile;
        switch(from){
            case 'DBP':
                setDBPWeeks( matchingWeeks);
                setDBPDays(Math.round(((matchingGAvalue/7)-matchingWeeks)*7));
                zscore = (event.target.value-bpd_mean(ga))/bpd_sd(ga);
                setDBPZscore(zscore.toFixed(2));
                percentile = getZPercent(zscore).toFixed(0);
                setDBPpercentil(percentile);
                displayBar(percentile, 'percentile-bar-dbp');
                return;
            case 'CC':
                setCCWeeks( matchingWeeks);
                setCCDays(Math.round(((matchingGAvalue/7)-matchingWeeks)*7));
                zscore = (event.target.value-cc_mean(ga))/cc_sd(ga);
                setCCZscore(zscore.toFixed(2));
                percentile = getZPercent(zscore).toFixed(0);
                setCCpercentil(percentile);
                displayBar(percentile, 'percentile-bar-cc');
                return;
            case 'CA':
                setCAWeeks( matchingWeeks);
                setCADays(Math.round(((matchingGAvalue/7)-matchingWeeks)*7));
                zscore = (event.target.value-ca_mean(ga))/ca_sd(ga);
                setCAZscore(zscore.toFixed(2));
                percentile = getZPercent(zscore).toFixed(0);
                setCApercentil(percentile);
                displayBar(percentile, 'percentile-bar-ca');
                return;
            case 'LF':
                setLFWeeks( matchingWeeks);
                setLFDays(Math.round(((matchingGAvalue/7)-matchingWeeks)*7));
                zscore = (event.target.value-lf_mean(ga))/lf_sd(ga);
                setLFZscore(zscore.toFixed(2));
                percentile = getZPercent(zscore).toFixed(0);
                setLFpercentil(percentile);
                displayBar(percentile, 'percentile-bar-lf');
                return;
            
        }
        
        
    }
    function displayBar(percentile, elementId){
        if(percentile>0 && percentile < 100){
            if(percentile > 10 && percentile < 90){
                document.getElementById(elementId).style.backgroundImage = 'linear-gradient( #2bc2535e, #54f054b0)';
            }else if(percentile <= 10 || percentile >= 90){
                document.getElementById(elementId).style.backgroundImage = 'linear-gradient(#f1a165, #f36d0a)';
            }
            document.getElementById(elementId).style.width = percentile + "%";
        }else{
            document.getElementById(elementId).style.width = "100%";
            document.getElementById(elementId).style.backgroundImage = 'linear-gradient(#f0a3a3, #f42323)';
        }
    }
    function matchingGA(data,from){
            let iterator;
            switch(from){
                case 'DBP':
                    iterator = 800;
                    break;
                case 'CC':
                    iterator = 800;
                    break;
                case 'CA':
                    iterator = 450;
                    break;
                case 'LF':
                    iterator = 450;
                    break;
            }
            let media_anterior;
            switch(from){
                case 'DBP':
                    media_anterior = bpd_mean(1);
                    break;
                case 'CC':
                    media_anterior = cc_mean(1);
                    break;
                case 'CA':
                    media_anterior = ca_mean(1);
                    break;
                case 'LF':
                    media_anterior = lf_mean(1);
                    break;
            }
            let ga;
            for (let i = 7; i < iterator; i++) {
                let media;
                switch(from){
                    case 'DBP':
                        media = bpd_mean(i/7.0);
                        break;
                    case 'CC':
                        media = cc_mean(i/7.0);
                        break;
                    case 'CA':
                        media = ca_mean(i/7.0);
                        break;
                    case 'LF':
                        media = lf_mean(i/7.0);
                        break;
                }
                if (data < media) {
                    if ((data - media_anterior) <= (data - media)) {
                        ga = (i - 1);
                        return ga;
                    } else {
                        ga = i;
                        return ga;
                    }
                } else {
                    switch(from){
                        case 'DBP':
                            media_anterior = bpd_mean(i/7.0);
                            break;
                        case 'CC':
                            media_anterior = cc_mean(i/7.0);
                            break;
                        case 'CA':
                            media_anterior = ca_mean(i/7.0);
                            break;
                        case 'LF':
                            media_anterior = lf_mean(i/7.0);
                            break;
                    }
                }
            }
    }
    function getZPercent(z) {
        //z == number of standard deviations from the mean
    
        //if z is greater than 6.5 standard deviations from the mean
        //the number of significant digits will be outside of a reasonable
        //range
        if (z < -3.5)
            return 0;
        if (z > 3.5)
            return 100;
    
        let factK = 1;
        let sum = 0;
        let term = 1;
        let k = 0;
        let loopStop = Math.exp(-23);
        while (Math.abs(term) > loopStop) {
            term = .3989422804 * Math.pow(-1, k) * Math.pow(z, k) / (2 * k + 1) / Math.pow(2, k) * Math.pow(z, k + 1) / factK;
            sum += term;
            k++;
            factK *= k;
    
        }
        sum += 0.5;
    
        return sum * 100;
    }
    function bpd_mean(ga) {
        let mean = 5.60878 + 0.158369 * Math.pow(ga,2) - 0.00256379 * Math.pow(ga,3);
        return mean;
    }
    
    function bpd_sd(ga) {
        let sd = Math.exp(0.101242 + 0.00150557 * Math.pow(ga,3) - 0.000771535 * Math.pow(ga,3) * Math.log(ga) + 0.0000999638 * Math.pow(ga,3) * (Math.log(ga) * Math.log(ga)));
        return sd;
    }
    function cc_mean(ga) {
        let mean = -28.2849 + 1.69267 * Math.pow(ga,2) - 0.397485 *Math.pow(ga,2)* Math.log(ga);
        return mean;
    }
    
    function cc_sd(ga) {
        let sd = 1.98735 + 0.0136772 *  Math.pow(ga,3) - 0.00726264 * Math.pow(ga,3)* Math.log(ga) + 0.000976253 * ga * ga * ga * Math.pow((Math.log(ga)), 2);
        return sd;
    }
    function ca_mean(ga) {
        let mean = -81.3243 + 11.6772 * ga - 0.000561865 * Math.pow(ga,3);
        return mean;
    }
    
    function ca_sd(ga) {
        let sd = -4.36302 + 0.121445 * Math.pow(ga,2) - 0.0130256 * Math.pow(ga,3) + 0.00282143 * Math.pow(ga,3) * Math.log(ga);
        return sd;
    }
    
    function lf_mean(ga) {
        let mean = -39.9616 + 4.32298 * ga - 0.0380156 * Math.pow(ga,2);
        return mean;
    }
    
    function lf_sd(ga) {
        let sd = Math.pow(Math.E, 0.605843 - 42.0014 * Math.pow(ga, -2) + 0.00000917972 * Math.pow(ga,3));
        return sd;
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
                    <div id='rigth-biometric'></div>
                </div>
            </div>
        </div>
    );
}