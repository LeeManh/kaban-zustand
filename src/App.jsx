import "./App.css";
import Column from "./components/Column";
import { STATE } from "./constants";

function App() {
  return (
    <div className="App">
      <Column state={STATE.PLANNED} />
      <Column state={STATE.ONGOING} />
      <Column state={STATE.DONE} />
    </div>
  );
}

export default App;
