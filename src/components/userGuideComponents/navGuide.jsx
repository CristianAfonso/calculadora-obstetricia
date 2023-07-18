import { useTranslation } from "react-i18next"
export default function NavGuide(){
    const {t} = useTranslation();

    return(
        <div className="guidePart" id="navGuide">
            <h5>{t('specific_instruction_title')} <strong>{t('nav')}:</strong></h5>
            <p>{t('navExplanation')}</p>
            <p>{t('navExp1')}</p>
            <p>{t('navExp2')}</p>
            <p>{t('navExp3')}</p>
            <p>{t('navExp4')}</p>
        </div>
    )
}