import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import ArterialComponent from './hemodinamicComponents/arterialComponent.jsx';
import SystolicComponent from './hemodinamicComponents/systolicComponent.jsx';
import DuctusIsthmusComponent from './hemodinamicComponents/ductusIsthmusComponent.jsx';
import HemodinamicChart from './charts/hemodinamicChart.jsx';
export default function Hemodinamic(props) {
    const [ga, setGa] = useState((props.weeks) + props.days / 7);
    const [ua, setUA] = useState(props.ua);
    const [mca, setMCA] = useState(props.mca);
    const { t } = useTranslation();
    useEffect(() => {
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
        setGa((props.weeks) + props.days / 7);
    }, [props, mca, ua])
    return (
        <div className="service-container">
            <div className='title-container'>
                <h1>{t('hemodinamic')}</h1>
                <div className='weeksAndDays'>
                    <h3>{t('weeks')}: {props.weeks}</h3>
                    <h3>{t('days')}: {props.days}</h3>
                </div>
            </div>
            <div className='service-content'>
                <div id="hemodinamic">
                    <ArterialComponent setMCA={setMCA} setUA={setUA} ga={ga} ua={ua} mca={mca} />
                    <SystolicComponent ga={ga} />
                    <DuctusIsthmusComponent ga={ga} />
                </div>
            </div>
            <HemodinamicChart ></HemodinamicChart>
        </div>
    );
}