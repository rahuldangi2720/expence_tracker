import React from 'react';
import Navbar from './navbar';
import { Expencelist } from '../Form/Expencelist';
import { Chart1 } from '../Charts/Chart1';

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-4">
        <div className="row g-4 align-items-start">
          {/* Expense List */}
          <div className="col-lg-7 col-md-12">
            <div
              className="p-3 border rounded shadow-sm bg-white"
              style={{ maxHeight: '500px', overflowY: 'auto' }}
            >
              <h5 className="mb-3">Your Transactions</h5>
              <Expencelist />
            </div>
          </div>

          {/* Chart */}
          <div className="col-lg-5 col-md-12">
            <div
              className="p-3 border rounded shadow-sm bg-white"
              style={{ height: '400px' }} // Adjust height of chart container
            >
              <h5 className="mb-3">Expense Overview</h5>
              <Chart1 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
