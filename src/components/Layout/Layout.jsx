import { ToastContainer } from "react-toastify"

const Layout = ({ children }) => {
    return (
        <div>
            {children}
            <ToastContainer limit={3} />
        </div>
    )
}

export default Layout
