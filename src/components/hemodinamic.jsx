import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import ArterialComponent from './hemodinamicComponents/arterialComponent.jsx';
import SystolicComponent from './hemodinamicComponents/systolicComponent.jsx';
import DuctusIsthmusComponent from './hemodinamicComponents/ductusIsthmusComponent.jsx';
export default function Hemodinamic(props) {
    const [ga, setGa] = useState((props.weeks) + props.days / 7);
    const [ua, setUA] = useState(props.ua);
    const [mca, setMCA] = useState(props.mca);
    const [ratio, setRatio] = useState((mca / ga).toFixed(2));
    const { t } = useTranslation();
    useEffect(() => {
        setGa((props.weeks) + props.days / 7);
        if (ua) {
            props.setUA(ua);
        } else {
            setUA(props.ua);
        }
        if (mca) {
            props.setMCA(mca)
        } else {
            setMCA(props.mca);
        }
        if (props.mca && props.ua) {
            setRatio(props.mca/props.ua);
        }
    })
    return (
        <div className="service-container">
            <div className='title-container'>
                <h3>{t('hemodinamic')}</h3>
                <div className='weeksAndDays'>
                    <p>{t('weeks')}: {props.weeks}</p>
                    <p>{t('days')}: {props.days}</p>
                </div>
            </div>
            <div className='service-content'>
                <div id="hemodinamic-studio">
                    <ArterialComponent setMCA={setMCA} setUA={setUA} ga={ga} ua={ua} mca={mca}/>
                    <SystolicComponent ga={ga} />
                    <DuctusIsthmusComponent ga={ga} />
                </div>

            </div>
        </div>
    );
}