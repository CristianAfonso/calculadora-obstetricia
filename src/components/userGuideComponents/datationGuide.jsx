import { useTranslation } from "react-i18next"
export default function DatationGuide(){
    const {t} = useTranslation();
    return(
        <div className="guidePart" id="datationGuide">
            <h5>{t('specific_instruction_title')} <strong>{t('datation')}:</strong></h5>
            <p>{t('datationExplanation')}</p>
            <p>{t('datationExp1')}</p>
            <p>{t('datationExp2')}</p>
            <p>{t('datationExp3')}</p>
            <p>{t('datationExp4')}</p>
            <p>{t('datationExp5')}</p>
        </div>
    )
}