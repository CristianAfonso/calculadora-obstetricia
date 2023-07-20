export default function Pair(props) {

        if (props.readOnly) {
            return(
            <div className="pair">
                <span title={props.help}>{props.title}</span>
                <input
                    className='read-only-number'
                    type='number'
                    placeholder={props.measure}
                    min={props.min}
                    max={props.max}
                    value={props.value}
                    readOnly/>
            </div>)
        } else {
            return(
            <div className="pair">
                <span title={props.help}>{props.title}</span>
                <input
                    aria-label = "code"
                    type='number'
                    placeholder={props.measure}
                    min={props.min}
                    max={props.max}
                    value={props.value}
                    step={props.step}
                    onChange={props.onChange} />
            </div>)
        }

    }