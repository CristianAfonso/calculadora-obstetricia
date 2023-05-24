import React from 'react';
import { useTranslation } from "react-i18next";

export default function Biometric(props){
    const {t} = useTranslation();
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
                
            </div>
        </div>
    );
}