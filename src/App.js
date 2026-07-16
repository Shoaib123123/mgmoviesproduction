import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Ourwork from "./pages/Ourwork";
import Ourstory from "./pages/Ourstory";
import Enquire from "./pages/Enquire";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { SiteContentProvider } from "./content/SiteContentContext";

function AppRoutes() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ourwork" element={<Ourwork />} />
        <Route path="/ourstory" element={<Ourstory />} />
        <Route path="/enquire" element={<Enquire />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      
      {!isAdminPage && <Footer />}  
      
    </>
  );
}    
       
function App() {
  return (
    <Router>
      <SiteContentProvider>
        <AppRoutes />
      </SiteContentProvider>
    </Router>
  );
}

export default App;
