import { useTranslation } from "react-i18next"
export default function BonesGuide() {
    const { t } = useTranslation();
    return (
        <div className="guidePart" id="bonesGuide">
            <h5>{t('specific_instruction_title')} <strong>{t('bones')}:</strong></h5>
            <p>{t('bonesExplanation')}</p>
            <ol>
                <li><p>{t('bonesExp1')}</p></li>
                <li><p>{t('bonesExp2')}</p></li>
            </ol>
        </div>
    )
}