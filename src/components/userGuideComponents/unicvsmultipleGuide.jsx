import { useTranslation } from "react-i18next"
export default function UnicVsMultipleGuide() {
    const { t } = useTranslation();
    return (
        <div className="guidePart" id="unicVsMultipleGuide">
            <h5>{t('specific_instruction_title')} <strong>{t('unicvsmulti')}:</strong></h5>
            <p>{t('unicVsMultipleExplanation')}</p>
            <ol>
                <li><p>{t('unicVsMultipleExp1')}</p></li>
                <li><p>{t('unicVsMultipleExp2')}</p></li>
            </ol>
        </div>
    )
}