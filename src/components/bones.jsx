import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import HandBones from './bonesComponents/handBonesComponent';
import LegBones from './bonesComponents/legBonesComponent';
export default function Bones(props) {
    const [ga, setGa] = useState((props.weeks) + props.days / 7);
    const { t } = useTranslation();

    useEffect(() => {
        setGa((props.weeks) + props.days / 7);
    })
    return (
        <div className="service-container">
            <div className='title-container'>
                <h1>{t('bones')}</h1>
                <div className='weeksAndDays'>
                    <h3>{t('weeks')}: {props.weeks}</h3>
                    <h3>{t('days')}: {props.days}</h3>
                </div>
            </div>
            <div id="bones-studio">
                <HandBones ga={ga} />
                <LegBones ga={ga} />
            </div>
        </div>
    );
}