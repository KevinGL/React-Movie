//import './App.css';
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import About from './pages/About'
import {BrowserRouter, Switch, Route} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/a-propos" exact component={About} />
          <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
  )
}

export default App;
