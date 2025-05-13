import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'

function NavComponent() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg"  fixed='top'>
      <Container>
        <Navbar.Brand href="/"> <Image src="logo.png" height={50} width={50} roundedCircle /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">View</Nav.Link>
            <Nav.Link href="/create">Create</Nav.Link>
          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;