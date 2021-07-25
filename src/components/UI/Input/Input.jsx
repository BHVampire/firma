import './Input.scss'
import { useState } from "react"
import useOnclickOutside from "react-cool-onclickoutside"
import Icon from '../Icon/Icon'

const Input = ({
    value = '',
    setValue = null,
    onChange,
    label = 'Label',
    type = 'text',
    theme = 'primary',
    icon = null,
    iconSize = 1.5,
    ...rest
}) => {

    const [openMenu, setOpenMenu] = useState(false)

    const ref = useOnclickOutside(() => {
        setOpenMenu(false)
    })

    return (
        <div className={`custom-input ${theme}`}>
            <input {...rest}
                type={type}
                ref={ref}
                onClick={() => setOpenMenu(true)}
                onChange={setValue ? e => setValue(e.target.value) : onChange}
                value={value}
            />
            <label className={`${openMenu || value.length > 0 ? 'active' : null} ${theme}`}>{label}</label>
            {
                icon
                    ? <Icon icon={icon} size={iconSize} />
                    : null
            }
        </div>
    )
}

export default Input