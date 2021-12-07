import { useMemo } from "react"
import { Route } from "react-router"

const RouteWrapper = ({ component: Component, layout, roles = [], ...rest }) => {
    const Layout = useMemo(() => layout, [layout])

    return (
        <Route {...rest} render={(props) =>
            Layout
                ? <Layout {...props}>
                    <Component {...props} />
                </Layout>
                : <Component {...props} />
        } />
    )
}

export default RouteWrapper
