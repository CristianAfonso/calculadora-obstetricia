import { useTranslation } from "react-i18next"
export default function BiometricGuide() {
    const { t } = useTranslation();
    return (
        <div className="guidePart" id="biometricGuide">
            <h5>{t('specific_instruction_title')} <strong>{t('biometric')}:</strong></h5>
            <p>{t('biometricExplanation')}</p>
            <ol>
                <li><p>{t('biometricExp1')}</p></li>
                <ol>
                    <li><p>{t('biometricExp2')} {t('biometricExp3')}</p></li>
                    <li><p>{t('biometricExp4')}</p></li>
                </ol>
                <li><p>{t('biometricExp5')}</p></li>
                <ol>
                    <li><p>{t('hemodynamicExp1')}</p></li>
                    <li><p>{t('biometricExp6')}</p></li>
                </ol>
            </ol>
        </div>
    )
}