import { useMemo, useState } from 'react'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import './Notification.scss'

const Notification = ({
    children,
    theme = 'success',
    showCloseButton = true,
    open = true
}) => {

    const [isActive, setIsActive] = useState(open)

    const iconType = useMemo(() => {
        switch (theme) {
            case 'success':
                return 'done'

            case 'info':
                return 'info'

            case 'warning':
                return 'warning'

            case 'danger':
                return 'error'

            default:
                return 'done'
        }
    }, [theme])

    if (!isActive) {
        return null
    }


    return (
        <div className={`notification ${theme}`}>
            <div className="message">
                <Icon icon={iconType} size={2} />
                {children}
            </div>

            {
                showCloseButton
                    ? <Button
                        icon="close"
                        iconSize={1.25}
                        size="1.5"
                        round={true}
                        color="white"
                        onClick={() => setIsActive(false)}
                    />
                    : null
            }
        </div>
    )
}

export default Notification
