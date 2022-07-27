import "./app.scss";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Topbar from "./components/Topbar";
import Home from "./screens/Home";
import Account from "./screens/Account";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Summary from "./screens/Summary";
import TransactionScreen from "./screens/TransactionScreen";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
      <ToastContainer position="top-center" limit={1} />
        <header>
          <Topbar />
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/transactions" element={<TransactionScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <p className="footer-content">Kyle Ruban</p>
          <p className="footer-content">Footer</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
