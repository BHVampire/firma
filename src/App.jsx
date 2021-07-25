import Layout from "./components/Layout/Layout"
import Home from "./pages/Home/Home"
import RouteWrapper from "./utils/RouteWrapper"

const App = () => {
  return (
    <div>

      <RouteWrapper exact path="/" component={Home} layout={Layout} />

    </div>
  )
}

export default App
