import { useTranslation } from "react-i18next"
export default function DatationDates(props) {
    const [t] = useTranslation();
    return (
        <div className="pair">
            <div>
                <h6>{t('last_fur')}</h6>
                <span className="last-fur-span">{props.lastFur.toLocaleDateString()}</span>
            </div>
            <div>
                <h6>{t('new_fur')}</h6>
                <span className="last-fur-span">{props.displayedNewFur.toLocaleDateString()}</span>
            </div>
        </div>
    )
}