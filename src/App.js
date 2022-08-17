import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Routing } from './Components/Routing/Route';


function App() {
  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Routing />
        </div>
      </div>
    </div>
  );
}

export default App;
