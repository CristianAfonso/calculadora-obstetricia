import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { subDays, subWeeks } from "date-fns";
import { matchingGA } from './functions';

export default function Nav(props) {
    const [furWeeks, setFURWeeks] = useState(0);
    const [furDays, setFURDays] = useState(0);
    const [weeks, setWeeks] = useState(0);
    const [days, setDays] = useState(0);
    const [selectedFont, setSelectedFont] = useState("FUR");
    const [today] = useState(new Date());
    const [lastPeriodDate, setLastPeriodDate] = useState(props.lastPeriodDateUpdated);
    const [ecoDate, setEcoDate] = useState(today);
    const [estimatedDueDate, setEstimatedDueDate] = useState("");
    const [lcc, setLCC] = useState(props.lcc);
    const [lccDays, setLCCDays] = useState(0);
    const [lccWeeks, setLCCWeeks] = useState(0);

    const handleDateChange = (date) => {
        setLastPeriodDate(date);
        const estimatedDueDate = new Date(date.getTime() + 280 * 24 * 60 * 60 * 1000);
        setEstimatedDueDate(estimatedDueDate);
        const totalDays = moment().diff(date, 'days');
        const totalWeeks = moment().diff(date, 'weeks');
        setFURDays(totalDays % 7);
        setFURWeeks(totalWeeks);
    }
    const handleEcoChange = (date) => {
        setEcoDate(date);
        props.SetLastEcoDate(date);
    }
    function handleFURSubmit(event) {
        event.preventDefault();
        if (estimatedDueDate) {
            if (lastPeriodDate.getTime() > today.getTime()) {
                document.getElementById('last-period-date').style.color = "red";
                document.getElementById('last-period-date').style.borderColor = "red";
                document.getElementById('last-period-date').value = t('valid_date');
            } else {
                document.getElementById('navBar').style.display = "flex";
                document.getElementById('last-period-date').style.color = "black";
                document.getElementById('last-period-date').style.borderColor = "";
                setSelectedFont("FUR");
                CalculateWeeksAndDays();
                props.GiveTime(furWeeks, furDays);
            }

        } else {
            document.getElementById('last-period-date').style.color = "red";
            document.getElementById('last-period-date').style.borderColor = "red";
        }
    }
    function CalculateWeeksAndDays() {
        const totalDays = moment().diff(lastPeriodDate, 'days');
        const totalWeeks = moment().diff(lastPeriodDate, 'weeks');
        setFURDays(totalDays % 7);
        setFURWeeks(totalWeeks);
    }

    function handleWeeksChange(event) {
        if (0 <= event.target.value && event.target.value <= 44) {
            setWeeks(parseInt(event.target.value));
        }
    }
    function handleDaysChange(event) {
        if (0 <= event.target.value && event.target.value <= 6) {
            setDays(parseInt(event.target.value));
        }
    }
    function handleWeeksSubmit(event) {
        event.preventDefault();
        if (!days && !weeks) {
            document.getElementById('weeks').style.color = "red";
            document.getElementById('weeks').style.borderColor = "red";
            document.getElementById('days').style.color = "red";
            document.getElementById('days').style.borderColor = "red";
        } else {
            document.getElementById('navBar').style.display = "flex";
            document.getElementById('weeks').style.color = "black";
            document.getElementById('weeks').style.borderColor = "";
            document.getElementById('days').style.color = "black";
            document.getElementById('days').style.borderColor = "";
            document.getElementById('days').value = days;
            document.getElementById('weeks').value = weeks;
            setSelectedFont("Weeks");
            props.GiveTime(weeks, days);
        }
    }
    function calculateFURDate(days, weeks) {
        const newLasPeriodDate = subWeeks(subDays(today, days), weeks);
        setLastPeriodDate(newLasPeriodDate);
        const estimatedDueDate = new Date(newLasPeriodDate.getTime() + 280 * 24 * 60 * 60 * 1000);
        setEstimatedDueDate(estimatedDueDate);
    };

    function handleLCCChange(event) {
        setLCC(event.target.value);
        props.setLCC(event.target.value);
        const calculatedDays = matchingGA(event.target.value, "LCC");
        updateFur(calculatedDays);
    }
    function handleLCCSubmit(event) {
        event.preventDefault();
        if(lcc){
            calculateFURDate(lccDays, lccWeeks);
            document.getElementById('navBar').style.display = "flex";
            const newDate = subDays(ecoDate, 40.9041 + (3.21585 * Math.pow(lcc, 0.5)) + (0.348956 * lcc));
            setLastPeriodDate(newDate);
            CalculateWeeksAndDays();
            setSelectedFont("FUR");
            setFURDays(lccDays);
            setFURWeeks(lccWeeks);
            document.getElementById("lcc").style.borderColor = "";
            document.getElementById('last-period-date').style.borderColor = "";
            document.getElementById('last-period-date').style.color = "";
        }else{
            document.getElementById("lcc").style.borderColor = "red";
        }

    }
    const updateFur = useCallback((calculatedDays) => {
        const newDate = subDays(ecoDate, calculatedDays);
        setLCCDays(moment(ecoDate).diff(newDate, 'days') % 7);
        setLCCWeeks(moment(ecoDate).diff(newDate, 'weeks'));
    },[ecoDate])
    useEffect(() => {
        if (props.newPeriodDate) {
            let newLastPeriodDate = props.newPeriodDate;
            setLastPeriodDate(newLastPeriodDate);
            const estimatedDueDate = new Date(newLastPeriodDate.getTime() + 280 * 24 * 60 * 60 * 1000);
            setEstimatedDueDate(estimatedDueDate);
            props.stopUpdateFUR();
            const totalDays = moment().diff(newLastPeriodDate, 'days');
            const totalWeeks = moment().diff(newLastPeriodDate, 'weeks');
            setFURDays(totalDays % 7);
            setFURWeeks(totalWeeks);
            setSelectedFont("FUR");
            props.GiveTime(totalWeeks, totalDays % 7);
        }
        if (selectedFont === "FUR") {
            props.GiveTime(furWeeks, furDays);
        } else {
            props.GiveTime(weeks, days);

        }
        props.updateLastPeriod(lastPeriodDate);
        if(props.lcc !== lcc){
            setLCC(props.lcc);
            const calculatedDays = matchingGA(props.lcc, "LCC");
            updateFur(calculatedDays);
        }

    },[props, selectedFont, lastPeriodDate, lcc, furWeeks, furDays, weeks, days, updateFur])
    const { t } = useTranslation();
    return (
        <nav>
            <div className='forms-container'>
                <form className='FUR-form' onSubmit={handleFURSubmit}>
                    <div className='date-content'>
                        <h6>{t('fur_title')}</h6>
                        <DatePicker
                            placeholderText={t('FUR')}
                            value={lastPeriodDate && lastPeriodDate.toLocaleDateString()}
                            id="last-period-date"
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className='date-content'>
                        <h6>{t('last_eco_title')}</h6>
                        <DatePicker
                            placeholderText={t('FECO')}
                            value={ecoDate.toLocaleDateString()}
                            id="last-eco-date"
                            onChange={handleEcoChange}
                        />
                    </div>
                    <div className='date-content'>
                        <h6>{t('expected_birth')}</h6>
                        <input
                            type='text'
                            className='expected-birth'
                            value={estimatedDueDate && estimatedDueDate.toLocaleDateString()}
                            readOnly
                        />
                    </div>
                    <button className="submitButton" onClick={handleFURSubmit}
                        type="button">{furWeeks} {t('weeks')} + {furDays} {t('days')}</button>

                </form>
                <form className='weeks-form' onSubmit={handleWeeksSubmit}>
                    <div>
                        <label htmlFor="weeks">{t('weeks')}</label>
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
                        <label htmlFor="days">{t('days')}</label>
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
                        type="submit">{weeks} {t('weeks')} + {days} {t('days')}</button>
                </form>
                <form className='weeks-form' onSubmit={handleLCCSubmit}>
                    <div>
                        <label htmlFor="weeks">{t('lcc_title')}</label>
                        <input
                            type="number"
                            id="lcc"
                            name="lcc"
                            placeholder={t('mm')}
                            min={2}
                            max={121}
                            value={lcc}
                            onChange={handleLCCChange}
                        />
                    </div>

                    <button className="submitButton" onClick={handleLCCSubmit}
                        type="submit" >{lccWeeks} {t('weeks')} + {lccDays} {t('days')}</button>
                </form>
            </div>
            <ul id="navBar">
                <button onClick={() => props.GetDesiredComponentValue("datation")}>{t('datation')}</button>
                <button onClick={() => props.GetDesiredComponentValue("biometric")}>{t('biometric')}</button>
                <button onClick={() => props.GetDesiredComponentValue("hemodynamic")}>{t('hemodynamic')}</button>
                <button onClick={() => props.GetDesiredComponentValue("bones")}>{t('bones')}</button>
                <button onClick={() => props.GetDesiredComponentValue("lancet")}>{t('lancet')}</button>
                <button onClick={() => props.GetDesiredComponentValue("unicvsmulti")}>{t('unicvsmulti')}</button>
            </ul>
        </nav>
    );
}