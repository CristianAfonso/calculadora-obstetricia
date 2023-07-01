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
                <h3>{t('bones')}</h3>
                <div className='weeksAndDays'>
                    <p>{t('weeks')}: {props.weeks}</p>
                    <p>{t('days')}: {props.days}</p>
                </div>
            </div>
            <div id="bones-studio">
                <HandBones ga={ga} />
                <LegBones ga={ga} />
            </div>
        </div>
    );
}