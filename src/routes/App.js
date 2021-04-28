import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'

import Footer from '../components/Footer'

/* <nav>
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
  </ul>
</nav> */

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
