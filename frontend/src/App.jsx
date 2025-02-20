import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNavBar from "./Components/MyNavBar/NavBar";
import Home from "./Components/MyHome/Home";
import Editar from "./Components/MyEditar/Editar";
import Exibir from "./Components/MyExibir/Exibir";
import Footer from "./Components/MyFooter/Footer";



function App() {
  return (
    <div className="app-container">
    <Router>
      <MyNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editar" element={<Editar />} />
        <Route path="/exibir" element={<Exibir />} />
      </Routes>
    </Router>
    <Footer></Footer>
    </div>
    
    
  );
}

export default App;