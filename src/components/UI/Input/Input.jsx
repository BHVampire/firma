import './Input.scss'
import { useState } from "react"
import useOnclickOutside from "react-cool-onclickoutside"
import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import Tooltip from '../Tooltip/Tooltip'

const Input = ({
    value = '',
    setValue = null,
    onChange,
    label = 'Label',
    centeredLabel = true,
    type = 'text',
    theme = 'primary',
    icon = null,
    iconSize = 1.5,
    onClick = false,
    tooltip,
    width,
    ...rest
}) => {

    const [openMenu, setOpenMenu] = useState(false)

    const ref = useOnclickOutside(() => {
        setOpenMenu(false)
    })

    return (
        <div className={`custom-input ${theme}`} style={{ width: width ? `${width}rem` : '' }}>
            {
                tooltip
                    ? <Tooltip
                        placement="auto"
                        text={tooltip}
                    />
                    : ''
            }

            <input {...rest}
                type={type}
                ref={ref}
                onClick={() => setOpenMenu(true)}
                onChange={setValue ? e => setValue(e.target.value) : onChange}
                value={value}
            />
            <label className={`label ${openMenu || value.length > 0 ? 'active' : ''} ${theme} ${centeredLabel ? 'centeredLabel' : ''}`}>{label}</label>
            {
                icon
                    ? onClick
                        ? <Button
                            icon={icon}
                            size={2}
                            round={true}
                            iconSize={iconSize}
                            iconTheme={openMenu || value.length > 0 ? theme : ''}
                            waves="red"
                            onClick={() => onClick()}
                        />
                        : <Icon
                            icon={icon}
                            size={iconSize}
                            theme={openMenu || value.length > 0 ? theme : null}
                        />
                    : null
            }
        </div>
    )
}

export default Input