import './App.css';

import Main from '../src/pages/main/main';
import {AppMainBar} from "./components/AppMainBar/AppMainBar";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Sprints} from "./pages/Sprints/Sprints";

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <AppMainBar />
            <Routes >
                <Route path={'/sprints'}  element={<Sprints />} />
                <Route path={'*'} element={<Main />} />
            </Routes>

            {/*<Main />*/}
        </BrowserRouter>
    </div>
  );
}

export default App;
