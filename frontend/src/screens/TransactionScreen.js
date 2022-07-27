import React, { useState, useContext, useEffect, useReducer } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { getError } from "../utils";
import { toast } from "react-toastify";
import { Store } from '../Store';

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
//import { useNavigate, useLocation, Link } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state };
    case "FETCH_SUCCESS":
      return { ...state, transactions: action.payload };
    case "FETCH_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function TransactionScreen() {
  //const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);  

  const handleCloseTransactionModal = () => setShowTransactionModal(false);
  const handleShowTransactionModal = () => setShowTransactionModal(true);

  const handleCloseExpenseModal = () => setShowExpenseModal(false);
  const handleShowExpenseModal = () => setShowExpenseModal(true);

  const [{ transactions, error }, dispatch] = useReducer(reducer, {
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleIncomeSubmit = async (values) => {
    values.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/transactions/add-income",
        {
          amount,
          category,
          description,
          date,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");
      handleCloseTransactionModal();
      console.log("Add Successful");
      toast.success("Add Successful");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleExpenseSubmit = async (values) => {
    values.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/transactions/add-expense",
        {
          amount,
          category,
          description,
          date,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");
      handleCloseExpenseModal();
      console.log("Add Successful");
      toast.success("Add Successful");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/transactions/my-transactions",
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className="main">
      <Row className="mb-4 mt-3">
        <h3 className="tranasction-title">Transaction Page</h3>
      </Row>
      <Button className="mb-4 me-3" onClick={handleShowTransactionModal}>
        Add a new income
      </Button>
      <Button className="mb-4" onClick={handleShowExpenseModal}>
        Add a new expense
      </Button>

      <table className="table">
        <thead>
          <tr>
            <th>AMOUNT</th>
            <th>CATEGORY</th>
            <th>DESCRIPTION</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={showTransactionModal}
        onHide={handleCloseTransactionModal}
        size="fullscreen-sm-down"
      >
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleIncomeSubmit}>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                as="select"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option></option>
                <option value="paycheck">Paycheck</option>
                <option value="freelance">Freelance</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Transaction</Form.Label>
              <Form.Control
                required
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button type="submit">Submit</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseTransactionModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showExpenseModal}
        onHide={handleCloseExpenseModal}
        size="fullscreen-sm-down"
      >
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleExpenseSubmit}>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                as="select"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option></option>
                <option value="rent">Rent</option>
                <option value="food">Food</option>
                <option value="gas">Gas</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Transaction</Form.Label>
              <Form.Control
                required
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button type="submit">Submit</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseExpenseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default TransactionScreen;
