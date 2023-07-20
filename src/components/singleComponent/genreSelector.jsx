import { useTranslation } from "react-i18next"
export default function GenreSelector(props) {
    const [t] = useTranslation();
    return (
        <div className="genreSelectorContainer">
            <button className="genreSelector" id="male-selector" onClick={props.handleSelectGenre} value="male">{t('male')}</button>
            <button className="genreSelector" id="female-selector" onClick={props.handleSelectGenre} value="female">{t('female')}</button>
        </div>
    )
}