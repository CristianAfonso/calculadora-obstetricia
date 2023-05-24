import React, {useState , useEffect} from 'react';
import { useTranslation } from "react-i18next";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { subDays, subWeeks } from "date-fns";

export default function Nav(props){
    const [weeks, setWeeks] = useState(0);
    const [days, setDays] = useState(0);
    const [today] = useState(new Date());
    const [lastPeriodDate, setLastPeriodDate] = useState(props.lastPeriodDateUpdated);
    const [ecoDate, setEcoDate] = useState(today);
    const [estimatedDueDate, setEstimatedDueDate] = useState("");
    const [actualComponent, setActualComponent] = useState("");
    const handleDateChange = (date) => {
        setLastPeriodDate(date);
        const estimatedDueDate = new Date(date.getTime() + 280 * 24 * 60 * 60 * 1000);
        setEstimatedDueDate(estimatedDueDate);
    };
    const handleEcoChange = (date) => {
        setEcoDate(date);
        props.SetLastEcoDate(date);
    };
    function handleWeeksChange(event) {
        if(0 <= event.target.value && event.target.value <= 44){
            setWeeks(event.target.value);
        }
    }
    function handleDaysChange(event) {
        if(0 <= event.target.value && event.target.value <= 6){
            setDays(event.target.value);
        }
    }


    function calculateFURDate(){
        const newLasPeriodDate = subWeeks(subDays(today, days), weeks);
        setLastPeriodDate(newLasPeriodDate);
        const estimatedDueDate = new Date(newLasPeriodDate.getTime() + 280 * 24 * 60 * 60 * 1000);
        setEstimatedDueDate(estimatedDueDate);
    };


    function CalculateWeeksAndDays(){
        const totalDays = moment().diff(lastPeriodDate, 'days');
        const totalWeeks = moment().diff(lastPeriodDate, 'weeks');
        setDays(totalDays % 7);
        setWeeks(totalWeeks);
    }

    function handleFURSubmit(event) {
        event.preventDefault();
        if(estimatedDueDate){
            document.getElementById('navBar').style.display="flex";
            document.getElementById('last-period-date').style.color="black";
            document.getElementById('last-period-date').style.borderColor=null;
            CalculateWeeksAndDays();
        }else{
            document.getElementById('last-period-date').style.color="red";
            document.getElementById('last-period-date').style.borderColor="red";
        }
    }
    function handleWeeksSubmit(event) {
        event.preventDefault();
        if(!days && !weeks){
            document.getElementById('weeks').style.color="red";
            document.getElementById('weeks').style.borderColor="red";
            document.getElementById('days').style.color="red";
            document.getElementById('days').style.borderColor="red";
        }else if(!weeks){
            document.getElementById('days').style.color="black";
            document.getElementById('days').style.borderColor=null;
            document.getElementById('weeks').style.color="red";
            document.getElementById('weeks').style.borderColor="red";
        }else if(!days){
            document.getElementById('weeks').style.color="black";
            document.getElementById('weeks').style.borderColor=null;
            document.getElementById('days').style.color="red";
            document.getElementById('days').style.borderColor="red";
        }else{
            document.getElementById('navBar').style.display="flex";
            document.getElementById('weeks').style.color="black";
            document.getElementById('weeks').style.borderColor=null;
            document.getElementById('days').style.color="black";
            document.getElementById('days').style.borderColor=null;
            calculateFURDate();
        }
    }
    useEffect(() =>{
        if(props.newPeriodDate){
            let newLastPeriodDate = props.newPeriodDate;
            setLastPeriodDate(newLastPeriodDate);
            const estimatedDueDate = new Date(newLastPeriodDate.getTime() + 280 * 24 * 60 * 60 * 1000);
            setEstimatedDueDate(estimatedDueDate); 
            props.stopUpdateFUR();  
        }
        if(props.newWeeks && props.newDays){
            setDays(props.newDays);
            setWeeks(props.newWeeks);
            props.stopUpdateWeeksandDays();
        }else if(props.newWeeks){
            setWeeks(props.newWeeks);
            props.stopUpdateWeeksandDays();
        }else if(props.newDays){
            setDays(props.newDays);
            props.stopUpdateWeeksandDays();
        }
        props.GetDesiredComponentValue(actualComponent);
        props.GiveTime(weeks, days);
        props.updateLastPeriod(lastPeriodDate);
        
    })
    const {t} = useTranslation();
    return(
        <nav>
            <div className='forms-container'>
                <form className='FUR-form' onSubmit={handleFURSubmit}>
                    <DatePicker 
                        placeholderText={t('FUR')}
                        value={estimatedDueDate && lastPeriodDate.toLocaleDateString()}
                        id="last-period-date"
                        onChange={handleDateChange} 
                    />
                    <DatePicker 
                        placeholderText={t('FECO')}
                        value={ecoDate && ecoDate.toLocaleDateString()}
                        id="last-eco-date" 
                        onChange={handleEcoChange} 
                    />
                        <input 
                            type='text'
                            className='expected-birth'
                            placeholder={t('EXPECTEDBIRTH')}
                            value={estimatedDueDate && (
                                `${t('EXPECTEDBIRTH')} ${estimatedDueDate.toLocaleDateString()}`
                            )}
                            readOnly
                        />
                        <button className="submitButton" onClick={handleFURSubmit}
                        type="button">Enviar</button>
                    
                </form>
                <form className='weeks-form' onSubmit={handleWeeksSubmit}>
                    <div>
                        <label htmlFor="weeks">{t('weeks')}:</label>
                        <input
                            type="number"
                            id="weeks"
                            name="weeks"
                            max={44}
                            min={0}
                            value={weeks}
                            onChange={handleWeeksChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="days">{t('days')}:</label>
                        <input
                            type="number"
                            id="days"
                            name="days"
                            max={6}
                            min={0}
                            value={days}
                            onChange={handleDaysChange}
                        />
                    </div>
                    
                    <button className="submitButton" onClick={handleWeeksSubmit}
                    type="submit" >Enviar</button>
                </form>
            </div>
            <ul id="navBar">
                <button onClick={() => setActualComponent("datation")}>{t('datation')}</button>
                <button onClick={() => setActualComponent("biometric")}>{t('biometric')}</button>
                <button onClick={() => setActualComponent("hemodinamic")}>{t('hemodinamic')}</button>
                <button onClick={() => setActualComponent("bones")}>{t('bones')}</button>
                <button onClick={() => setActualComponent("lancet")}>{t('lancet')}</button>
                <button onClick={() => setActualComponent("unicvsmulti")}>{t('unicvsmulti')}</button>
            </ul>
        </nav>
    );
}