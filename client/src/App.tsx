import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Homepage";
import ShortUrlRedirect from "./components/ShortUrlRedirect";
import Toggle from "./components/Toggle";
import { JSX } from "react/jsx-runtime";

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:urlCode" element={<ShortUrlRedirect />} />
      </Routes>
      <>
        <Toggle />
      </>
    </div>
  );
}

export default App;
