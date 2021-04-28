import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from '../pages/Home'

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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
