import React, { useState, useEffect } from "react";
import {
  calculateCustomerPoints,
  calculateTotalPoints,
} from "../../helpers/helpers";
import "./get-customer-data.css";

export default function GetCustomerData() {
  const [customersObject, setCustomersObject] = useState([]);

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
        setCustomersObject(data.customers);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <div className="Row">
      {customersObject.map((customer) => {
        const monthlyPointsArray = [];
        const monthlyExpensesArray = [];

        //saving the object key to a variable so we don't have to manually call the function more than once
        for (let expense in customer.monthlyExpenses) {
          monthlyPointsArray.push(
            calculateCustomerPoints(customer.monthlyExpenses[expense])
          );
          monthlyExpensesArray.push(customer.monthlyExpenses[expense]);
        }
        return (
          <div className="Customer-response-container" key={customer.id.toString()}>
            <div className="charter-logo-container">
              <img
                src="charter-logo.svg"
                alt="Charter Communications logo"
                className="Charter-Logo"
              ></img>
            </div>
            <p className="Message-Header">
              Thank you for choosing Charter Communications {customer.name}!
            </p>
            <div className="Body-text-container">
              <p>
                You have received this message because you requested to see how
                many rewards points you have accumulated over the past 3 months.
              </p>
              <div className="Points-List">
                <p>Below you will find your results:</p>
                <div>
                  <ul>
                    {monthlyPointsArray.map((pointsEachMonth, i) => {
                      return (
                        <li key={i.toString()}>
                          Month <span>{i + 1}</span>: You spent{" "}
                          <span className="Is-Bold">
                            ${monthlyExpensesArray[i]}
                          </span>{" "}
                          which earned you{" "}
                          <span className="Is-Bold">{pointsEachMonth}</span>{" "}
                          points
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="Total-container">
                <p className="Is-Bold">Total</p>
                <p>
                  <span className="Is-Bold">
                    {calculateTotalPoints(monthlyPointsArray)}
                  </span>{" "}
                  points
                </p>
              </div>
            </div>
            <p>To find out how you can redeem and use your rewards points please <span><a href="https://www.spectrum.com/" target="_blank" rel="noreferrer"className="External-Link"> click here</a></span>.</p>
          </div>
        );
      })}
      <footer>
        <p>This is intended for educational purposes only</p>
      </footer>
    </div>
  );
}
