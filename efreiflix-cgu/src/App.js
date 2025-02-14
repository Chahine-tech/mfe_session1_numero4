import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import CGU from "./components/CGU";
import CGV from "./components/CGV";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Nav = styled.nav`
  background-color: #1a1a1a;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 2rem;
  font-size: 1.1rem;

  &:hover {
    color: #e50914;
  }
`;

const App = () => {
  return (
    <Router>
      {/* <Container>
        <Nav>
          <NavLink to="/cgu">Conditions Générales d'Utilisation</NavLink>
          <NavLink to="/cgv">Conditions Générales de Vente</NavLink>
        </Nav>

        <Routes>
          <Route path="/cgu" element={<CGU />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/" element={<CGU />} />
        </Routes>
      </Container> */}
    </Router>
  );
};

export default App;
