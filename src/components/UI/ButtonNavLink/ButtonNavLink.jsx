import { NavLink } from 'react-router-dom'
import Icon from '../Icon/Icon'
import './ButtonNavLink.scss'

const ButtonNavLink = ({
    icon = null,
    iconSize = 1.5,
    round = false,
    color = null,
    theme = null,
    waves = 'dark',
    vertical = false,
    size = null,
    bar = false,
    children,
    className = null,
    style = null,
    to = '/',
    ...rest
}) => {

    return (
        <NavLink
            to={to}
            activeClassName={theme}
            exact
            {...rest}
            className={` ${className} ${round ? 'round' : null} ${theme} ${vertical ? 'direction-column' : null} waves-effect waves-${waves}`}
            style={{
                color: color ? color : null,
                width: bar
                    ? '100%'
                    : size
                        ? `${size}rem`
                        : null,
                height: size
                    ? `${size}rem`
                    : null,
                ...style
            }}
        >
            {
                icon
                    ? <Icon icon={icon} size={iconSize} />
                    : null
            }

            <span>
                {children}
            </span>
        </NavLink>
    )
}

export default ButtonNavLink