import { AuthContext } from "@/app/context/AuthContext";
import { ExpenceContext } from "@/app/context/expenceContext";
import React, { useContext, useEffect, useState } from "react";

export const Expencelist = () => {
  const { getexpence, dispatch, ExpenceData, addexpence, deleteExpence } = useContext(ExpenceContext);
  const { AuthData } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [TransactionData, setTransactionData] = useState({
    amount: "",
    category: "expense",
    description: "",
  });

  const [TotalAmount, setTotalAmount] = useState(0);
  const userid = AuthData.userId;
  const [IdforUpdate , SetIdforUpdate] = useState()
  useEffect(() => {
    let total = 0;
    ExpenceData?.forEach((transaction) => {
      if (transaction.category === "expense") {
        total -= transaction.amount;
      } else {
        total += transaction.amount;
      }
    });
    setTotalAmount(total);
  }, [ExpenceData]);

  useEffect(() => {
    handlesubmit(userid);
  }, []);

  const handlesubmit = async (id) => {
    try {
      const data = await getexpence(id);
      dispatch({
        type: "ADD_EXPENCE",
        payload: data?.expence,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleData = async (id, transaction) => {
    try {
      await addexpence(id, transaction);
      handlesubmit(userid);
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = async (id) => {
    try {
      await deleteExpence(id);
      handlesubmit(userid);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded shadow-sm bg-light">
        <h4 className="mb-0">
          Total Balance: <span className={TotalAmount >= 0 ? "text-success" : "text-danger"}>₹{TotalAmount}</span>
        </h4>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Transaction
        </button>
      </div>

      {/* Modal for adding transaction */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Transaction</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="amount"
                      value={TransactionData.amount}
                      onChange={(e) => setTransactionData({ ...TransactionData, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={TransactionData.description}
                      onChange={(e) => setTransactionData({ ...TransactionData, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                      className="form-select"
                      id="category"
                      value={TransactionData.category}
                      onChange={(e) => setTransactionData({ ...TransactionData, category: e.target.value })}
                      required
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleData(userid, TransactionData);
                    setShowModal(false);
                    setTransactionData({ amount: "", category: "expense", description: "" });
                    handelDelete(IdforUpdate)
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction List */}
      <div className="row">
        {ExpenceData?.map((transaction, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <div className={`card shadow-sm border-0 ${transaction.category === "income" ? "bg-success bg-opacity-10" : "bg-danger bg-opacity-10"}`}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{transaction.description}</h6>
                  <small className="text-muted">
                    {transaction.category === "income" ? "Income" : "Expense"} | ₹{transaction.amount}
                  </small>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-warning" onClick={() =>{
                    setTransactionData({ amount:transaction.amount ,
                      category: transaction.category,
                      description: transaction.description,})
                      SetIdforUpdate(transaction._id)
                    setShowModal(true)
                  }}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handelDelete(transaction._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
