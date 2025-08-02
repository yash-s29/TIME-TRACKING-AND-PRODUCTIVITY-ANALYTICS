import { HashRouter, Routes, Route } from "react-router-dom";
import PopupPage from "./Popup";
import HomePage from "./HomePage";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<PopupPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
