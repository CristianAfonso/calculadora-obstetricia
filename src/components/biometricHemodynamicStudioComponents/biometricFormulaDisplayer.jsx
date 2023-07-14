import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import Bar from '../singleComponent/percentileBar';
import GenreSelector from '../singleComponent/genreSelector';
import { displayBar, getZPercent, EFW_Hadlock2Weight, EFW_Hadlock2Age, EFW_Hadlock3Weight, EFW_Hadlock3Age, hospitalGetWeight, hospitalGetZscore } from "../functions";
export default function BiometricFormulaDisplayer(props) {
    const [dbp, setDBP] = useState(props.dbp);
    const [cc, setCC] = useState(props.cc);
    const [ca, setCA] = useState(props.ca);
    const [lf, setLF] = useState(props.lf);
    const [ga, setGa] = useState((props.weeks) + props.days / 7);
    const [handler, setHandler] = useState("");
    const [hadlock2Weight, setHL2Weight] = useState("");
    const [hadlock2Weeks, setHL2Weeks] = useState("");
    const [hadlock2Days, setHL2Days] = useState("");
    const [hadlock3Weight, setHL3Weight] = useState("");
    const [hadlock3Weeks, setHL3Weeks] = useState("");
    const [hadlock3Days, setHL3Days] = useState("");
    const [customWeight, setCustomWeight] = useState("");
    const [gregorioCustomPercentile, setGregorioCustomPercentile] = useState("");
    const [gregorioCustomWeight, setGregorioCustomWeight] = useState("");
    const [gregorioCustomZscore, setGregorioCustomZscore] = useState("");
    const [clinicCustomPercentile, setClinicCustomPercentile] = useState("");
    const [clinicCustomWeight, setClinicCustomWeight] = useState("");
    const [clinicCustomZscore, setClinicCustomZscore] = useState("");
    const [genre, setGenre] = useState(props.genre);
    const { t } = useTranslation();

    function handleCustomWeightChange(event) {
        setCustomWeight(event.target.value);
        setHandler("manual");
    }
    function handleSelectGenre(event) {
        setGenre(event.target.value);
        props.setGenre(event.target.value);
        if (event.target.value === t('male')) {
            document.getElementById("female-selector").className = 'genreSelector';
            document.getElementById("male-selector").className = 'genreSelector focus';
        } else if (event.target.value === t('female')) {
            document.getElementById("male-selector").className = 'genreSelector';
            document.getElementById("female-selector").className = 'genreSelector focus';
        }
    }
    const handleGregorioChanges = useCallback((weight) => {
        const gregorioReferenceWeight = hospitalGetWeight(ga, genre, "gregorio");
        const gregorioCalculatedZscore = hospitalGetZscore(weight, gregorioReferenceWeight, "gregorio");
        const gregorioPercent = getZPercent(gregorioCalculatedZscore);
        setGregorioCustomWeight(Math.exp(gregorioReferenceWeight).toFixed(2));
        setGregorioCustomZscore(gregorioCalculatedZscore.toFixed(2));
        setGregorioCustomPercentile(gregorioPercent.toFixed(0));
        displayBar(gregorioPercent.toFixed(0), 'percentile-bar-bio-gregorio');
    }, [ga, genre])
    const handleClinicChanges = useCallback((weight) => {
        const clinicReferenceWeight = hospitalGetWeight(ga, genre, "clinic");
        const clinicCalculatedZscore = hospitalGetZscore(weight, clinicReferenceWeight, "clinic");
        const clinicPercent = getZPercent(clinicCalculatedZscore);
        setClinicCustomWeight(clinicReferenceWeight.toFixed(2));
        setClinicCustomZscore(clinicCalculatedZscore.toFixed(2));
        setClinicCustomPercentile(clinicPercent.toFixed(0));
        displayBar(clinicPercent.toFixed(0), 'percentile-bar-bio-clinic');
    }, [ga, genre])

    const handleHadlock2 = useCallback(() => {
        if (cc && ca && lf) {
            setHandler("hadlock2");
            const hadlock2weight = EFW_Hadlock2Weight(ca, cc, lf);
            const hdlock2age = EFW_Hadlock2Age(ca, cc, lf);
            const hdlock2weeks = Math.floor(hdlock2age / 7);
            setHL2Weight(hadlock2weight.toFixed(2) + "gr");
            setHL2Weeks(hdlock2weeks);
            setHL2Days(Math.round(((hdlock2age / 7) - hdlock2weeks) * 7));
            handleGregorioChanges(hadlock2weight);
            handleClinicChanges(hadlock2weight);
        } else {
            setHL2Weight(t('not_values'));
        }
    }, [setHandler, ca, cc, handleClinicChanges, handleGregorioChanges, lf, t])
    const handleHadlock3 = useCallback(() => {
        if (dbp && ca && lf) {
            setHandler("hadlock3");
            const hadlock3weight = EFW_Hadlock3Weight(ca, lf, dbp);
            const hdlock3age = EFW_Hadlock3Age(ca, lf, dbp);
            const hdlock3weeks = Math.floor(hdlock3age / 7);
            setHL3Weight(hadlock3weight.toFixed(2) + "gr");
            setHL3Weeks(hdlock3weeks);
            setHL3Days(Math.round(((hdlock3age / 7) - hdlock3weeks) * 7));
            handleGregorioChanges(hadlock3weight);
            handleClinicChanges(hadlock3weight);
        } else {
            setHL3Weight(t('not_values'));
        }
    }, [setHandler, ca, dbp, handleClinicChanges, handleGregorioChanges, lf, t])
    const handleManualWeight = useCallback(() => {
        setHandler("manual");
        handleGregorioChanges(customWeight);
        handleClinicChanges(customWeight);
    }, [setHandler, customWeight, handleClinicChanges, handleGregorioChanges])

    const showSelectedHandler = useCallback(() => {
        switch (handler) {
            case "hadlock2":
                handleHadlock2();
                return;
            case "hadlock3":
                handleHadlock3();
                return;
            case "manual":
                handleManualWeight();
                return;
            default:
                return;
        }
    }, [handleHadlock2, handleHadlock3, handleManualWeight, handler])
    useEffect(() => {
        setGa((props.weeks) + props.days / 7);
        props.setCustomWeight(customWeight);
        showSelectedHandler();
        setDBP(props.dbp);
        setCC(props.cc);
        setCA(props.ca);
        setLF(props.lf);
    }, [props, customWeight, showSelectedHandler, handleManualWeight]);
    return (
        <div id='right-biometric'>
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
                            <button onClick={handleHadlock2}>Hadlock 2</button>
                        </th>
                        <th>
                            CC CA LF
                        </th>
                        <th>
                            {hadlock2Weight}
                        </th>
                        <th>
                            {hadlock2Weeks} {t('w')} {hadlock2Days} {t('d')}
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <button onClick={handleHadlock3}>Hadlock 3</button>
                        </th>
                        <th>
                            DBP CA LF
                        </th>
                        <th>
                            {hadlock3Weight}
                        </th>
                        <th>
                            {hadlock3Weeks} {t('w')} {hadlock3Days} {t('d')}
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <button onClick={handleManualWeight}>{t('manual_weight')}</button>
                        </th>
                        <th></th>
                        <th colSpan={3}>
                            <span>
                                <input
                                    style={{ marginLeft: 5 + "px", maxWidth: 70 + 'px', height: 39 + 'px' }}
                                    type='number'
                                    placeholder='g'
                                    min={0}
                                    value={customWeight}
                                    onChange={handleCustomWeightChange} />
                                <GenreSelector handleSelectGenre={handleSelectGenre}/>
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={4}>
                            <tr style={{ display: 'block', textAlign: 'center' }}>{t('own_formula_gregorio')}:</tr>
                            <tr style={{ display: 'block', textAlign: 'center' }}>(p{gregorioCustomPercentile}) ({gregorioCustomWeight}g) ({gregorioCustomZscore}z)</tr>
                            <tr className='percentile-table-container'>
                                <Bar percent={gregorioCustomPercentile} id="percentile-bar-bio-gregorio" />
                            </tr>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={4}>
                            <tr style={{ display: 'block', textAlign: 'center' }}>{t('own_formula_clinic')}:</tr>
                            <tr style={{ display: 'block', textAlign: 'center' }}>(p{clinicCustomPercentile}) ({clinicCustomWeight}g) ({clinicCustomZscore}z)</tr>
                            <tr className='percentile-table-container'>
                                <Bar percent={clinicCustomPercentile} id="percentile-bar-bio-clinic" />
                            </tr>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}