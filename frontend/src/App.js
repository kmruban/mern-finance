import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Account from "./screens/Account";
import Summary from "./screens/Summary";
import Transaction from "./screens/Transaction";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;