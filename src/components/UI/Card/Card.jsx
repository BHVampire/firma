import './Card.scss'

const Card = ({ children, ...rest }) => {
    return (
        <div {...rest} className="card">
            {children}
        </div>
    )
}

export default Card
