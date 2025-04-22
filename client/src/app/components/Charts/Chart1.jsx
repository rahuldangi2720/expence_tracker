import React, { useContext, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { Bar, Doughnut, PolarArea } from 'react-chartjs-2';
import { AuthContext } from '@/app/context/AuthContext';
import { ExpenceContext } from '@/app/context/expenceContext';


ChartJS.register(CategoryScale, LinearScale, BarElement,ArcElement, RadialLinearScale, Title, Tooltip, Legend);

export const Chart1 = () => {
const { AuthData } = useContext(AuthContext);
const { getexpence, dispatch,ExpenceData} = useContext
(ExpenceContext);
const [TotalAmount, setTotalAmount] = useState({total:"",income:"",expence:""});
let userid = AuthData.userId;
const data = {
    labels: ['Total', 'Income', 'Expence'],
    datasets: [{
      label: 'Overview',
      data: [TotalAmount.total, TotalAmount.income, TotalAmount.expence],
      backgroundColor: [
        'rgb(23, 185, 206)',
        'rgb(16, 144, 52)',
        'rgb(187, 20, 32)'
      ],
      hoverOffset: 4,
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };
  async function handlesubmit(id) {
    try {
      const data = await getexpence(id);
      dispatch({
        type: "ADD_EXPENCE",
        payload: data?.expence,
      });
    } catch (error) {
      console.log(error);
    }
  }

   useEffect(() => {
      let totalamount = 0;
      ExpenceData?.forEach((transaction) => {
        if (transaction.category === "expense") {
            totalamount -= transaction.amount;
            setTotalAmount((prev) => {
                return { ...prev, expence: transaction.amount };
              });
            setTotalAmount((prev) => {
                return { ...prev, total: totalamount};
              });
        } else {
            totalamount += transaction.amount;
            setTotalAmount((prev) => {
                return { ...prev, income: transaction.amount };
              });
            setTotalAmount((prev) => {
                return { ...prev, totalamount };
              });
        }
      });
    }, [ExpenceData]);

   useEffect(()=>{
      handlesubmit(userid)
    },[])

  return (
    <div style={{ height: '300px', width: '100%' }}> 
    <PolarArea data={data} options={options} />
  </div>
  );
};
