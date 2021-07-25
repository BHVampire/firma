import { Route } from "react-router"

const RouteWrapper = ({ component: Component, layout: Layout, roles = [], ...rest }) => {
    return (
        <Route {...rest} render={(props) =>
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        } />
    )
}

export default RouteWrapper
