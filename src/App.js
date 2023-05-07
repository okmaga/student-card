import { Route, Switch } from "react-router-dom";
import EditStudentPage from "./pages/editStudentPage";
import ViewStudentPage from "./pages/viewStudentPage";

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/edit" component={EditStudentPage}/>
          <Route path="/" exact component={ViewStudentPage} />
        </Switch>
    </div>
  );
}

export default App;
