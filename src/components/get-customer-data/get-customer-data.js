import React, { useState, useEffect } from "react";
import { calculateCustomerPoints, calculateTotalPoints } from "../../helpers/helpers";
import './get-customer-data.css'

export default function GetCustomerData() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomerData = async () => {
    const url = "customers.json"; //in public folder
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching data");
    } else {
      return response.json();
    }
  };

  useEffect(() => {
    fetchCustomerData()
      .then((data) => {
        setCustomers(data.customers);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <div className="Row">
      {customers.map((customer) => {
        const monthlyPointsArray = [];
        
        //saving the object key to a variable so we don't have to manually call the function more than once
        for (let expense in customer.monthlyExpenses) {
          monthlyPointsArray.push(
            calculateCustomerPoints(customer.monthlyExpenses[expense])
            );
        }
        return (
          <div className="Customer-response-container">
            <div className="charter-logo-container">
              <img src="charter-logo.svg" alt="Charter Communications logo" className="Charter-Logo"></img>
            </div>
            <p className="Thank-you-text">Thank you for choosing Charter Communications {customer.name}!</p>
            <div className="Body-text-container">
            <p>
              You have received this message because you requested to see how many rewards points you have accumulated over the past 3 months.
            </p>
            <p>Below you will find your results.</p>
            {monthlyPointsArray.map((element, i) => {
              return (
                <div key={'div_' + element.toString()}>
                  <p key={'p_' + element.toString()}>In <span className="Is-bold">Month {i+1}</span> you earned <span className="Is-bold">{element}</span> points</p>
                </div>
              );
            })}
            <p>Your total over the last 3 months is <span className="Is-bold">{calculateTotalPoints(monthlyPointsArray)}</span> points</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
