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
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const handleCloseTransactionModal = () => setShowTransactionModal(false);
  const handleShowTransactionModal = () => setShowTransactionModal(true);

  const [{ transactions, error }, dispatch] = useReducer(reducer, {
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (values) => {
    values.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/transactions/add-transaction",
        {
          type,
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
      setType("");
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
      <Button className="mb-4" onClick={handleShowTransactionModal}>
        Add a new transaction
      </Button>

      <table className="table">
        <thead>
          <tr>
            <th>TYPE</th>
            <th>AMOUNT</th>
            <th>CATEGORY</th>
            <th>DESCRIPTION</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.type}</td>
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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option>-- Pick One Below --</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Control>
            </Form.Group>

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
                value={type}
                onChange={(e) => setCategory(e.target.value)}
              >
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
          <Button variant="danger" onClick={handleCloseTransactionModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TransactionScreen;
