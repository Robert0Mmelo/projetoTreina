import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNavBar from "./Components/MyNavBar/NavBar";
import Home from "./Components/MyHome/Home";
import Editar from "./Components/MyEditar/Editar";
import Exibir from "./Components/MyExibir/Exibir";



function App() {
  return (
    <Router>
      <MyNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editar" element={<Editar />} />
        <Route path="/exibir" element={<Exibir />} />
      </Routes>
    </Router>
    
  );
}

export default App;