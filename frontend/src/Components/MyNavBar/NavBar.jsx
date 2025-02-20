import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import MyThemeSwitcher from "../MyThemeSwitcher/ThemeSwitcher";
import Avatar from "../MyAvatar/Avatar";
import "bootstrap/dist/css/bootstrap.min.css";

function MyNavBar() {
  return (
    <Navbar expand="sm" bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Currículo</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center"> 
          <Nav.Link as={Link} to="/editar">Editar</Nav.Link>
          <Nav.Link as={Link} to="/exibir">Exibir</Nav.Link>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}> 
            <MyThemeSwitcher />
            <Avatar />
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;

