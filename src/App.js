import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Ourwork from "./pages/Ourwork";
import Ourstory from "./pages/Ourstory";

function App() {
  return (
    <Router>
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ourwork" element={<Ourwork />} />
        <Route path="/ourstory" element={<Ourstory />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
