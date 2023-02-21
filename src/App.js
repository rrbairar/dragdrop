import logo from './logo.svg';
import './App.css';
import Workspace from './components/Workspace/Workspace.tsx';

function App() {
  return (
    <div className="App">
      <h1>Simple Editor</h1>
      <div className='editor_container'>
        <Workspace/>
      </div>
    </div>
  );
}

export default App;
