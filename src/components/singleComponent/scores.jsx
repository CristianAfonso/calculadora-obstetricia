
import { useTranslation } from "react-i18next";
export default function Scores(props) {
    const [t] = useTranslation();
    if (props.weeks & props.days) {
        return (
            <div className="scores">
                <span>{props.zscore} z</span>
                <span>{props.percent} p</span>
                <span>{props.weeks || 0} {t('w')} {props.days || 0} {t('d')}</span>
            </div>
        )
    } else if(props.mom){
        return (
            <div className="scores">
                <span>{props.zscore} z</span>
                <span>MoM {props.mom}</span>
            </div>
        )
    }else {
        return (
            <div className="scores">
                <span>{props.zscore} z</span>
                <span>{props.percent} p</span>
            </div>
        )
    }
}