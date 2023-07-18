import { useTranslation } from "react-i18next"
export default function HemodynamicGuide() {
    const { t } = useTranslation();
    return (
        <div className="guidePart" id="hemodynamicGuide">
            <h5>{t('specific_instruction_title')} <strong>{t('hemodynamic')}:</strong></h5>
            <p>{t('hemodynamicExplanation')}</p>
            <ol>
            <li><p>{t('hemodynamicExp4')}</p></li>
                <ol>
                    <li><p>{t('hemodynamicExp1')}</p></li>
                    <li><p>{t('hemodynamicExp2')}</p></li>
                    <li><p>{t('hemodynamicExp3')}</p></li>
                </ol>
                <li><p>{t('hemodynamicExp5')}</p></li>
            </ol>
        </div>
    )
}