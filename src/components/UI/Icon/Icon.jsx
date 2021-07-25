import { useMemo } from 'react'
import './Icon.scss'

const Icon = ({
    size = null,
    color = 'inherit',
    icon = 'favorite',
    style = 'round',
    ...rest
}) => {

    const iconStyle = useMemo(() => {
        switch (style) {
            case 'filled':
                return 'material-icons'

            case 'round':
                return 'material-icons-round'

            case 'sharp':
                return 'material-icons-sharp'

            case 'outlined':
                return 'material-icons-outlined'

            case 'two-tone':
                return 'material-icons-two-tone'

            default:
                return 'material-icons'
        }
    }, [style])

    return (
        <span
            className={`${iconStyle} icon ${rest.className ? rest.className : ''}`}
            style={{ fontSize: size ? `${size}rem` : 'inherit', color: color }}
        >
            {icon}
        </span>
    )
}

export default Icon
