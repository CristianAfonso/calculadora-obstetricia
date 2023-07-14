export default function Bar(props) {
    return (
        <span className='meter percentile-bar-container'>
            <span className='percentile-bar-content' id={props.id}>
                <p>p{props.percent}</p>
            </span>
        </span>
    )
} 