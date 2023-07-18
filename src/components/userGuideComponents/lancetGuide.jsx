import { useTranslation } from "react-i18next"
export default function LancetGuide() {
    const { t } = useTranslation();
    return (
        <div className="guidePart" id="lancetGuide">
            <h5>{t('specific_instruction_title')} <strong>{t('lancet')}:</strong></h5>
            <p>{t('lancetExplanation')}</p>
            <ol>
                <li><p>{t('lancetExp1')}</p></li>
                <li><p>{t('lancetExp2')}</p></li>
            </ol>
        </div>
    )
}