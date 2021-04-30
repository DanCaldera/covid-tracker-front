import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import CovidApp from '../pages/CovidApp'
import Footer from '../components/Footer'
import useStore from '../store'

function App() {
  const user = useStore((state) => state.user)
  console.log(user)
  return (
    <Router>
      <Switch>
        {user && (
          <Route path="/app" exact>
            <CovidApp />
          </Route>
        )}
        {!user && (
          <Route path="/login" exact>
            <Login />
          </Route>
        )}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
