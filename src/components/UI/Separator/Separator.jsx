import './Separator.scss'

const Separator = ({ padding = null }) => {
    return (
        <div className="separator" style={{ padding: `0 ${padding}rem` }}>
            <hr />
        </div>
    )
}

export default Separator
