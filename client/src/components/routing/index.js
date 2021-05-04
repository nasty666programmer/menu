 
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import UpdateItem from '../UpdateItem';
function IndexRouter () {
    return (
    <Router>
          <Switch>
            <Route exact path={'/update-item'}>
                <UpdateItem />
            </Route> 
          </Switch>    
    </Router>
    )
}

export default IndexRouter;