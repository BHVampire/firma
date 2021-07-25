import { Fragment } from "react"
import { toast } from "react-toastify"
import Icon from "../components/UI/Icon/Icon"

const ToastCall = (message = 'Toast', theme = 'info') => {
    const toastType = () => {
        switch (theme) {
            case 'success':
                return 'success'

            case 'info':
                return 'info'

            case 'warning':
                return 'warn'

            case 'danger':
                return 'error'

            default:
                return 'info'
        }
    }

    const iconType = () => {
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
    }

    return toast[toastType()]((
        <Fragment>
            <div><Icon icon={iconType()} size={2} /></div>
            <div>{message}</div>
        </Fragment>
    ), {
        className: theme,
        toastId: message,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}

export default ToastCall
