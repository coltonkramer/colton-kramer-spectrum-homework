import React, { useState, useEffect } from "react";
import { calculateCustomerPoints, calculateTotalPoints } from "../../helpers/helpers";

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
    <div className="row">
      {customers.map((customer) => {
        const monthlyPointsArray = [];
        
        //saving the object key to a variable so we don't have to manually call the function more than once
        for (let expense in customer.monthlyExpenses) {
          monthlyPointsArray.push(
            calculateCustomerPoints(customer.monthlyExpenses[expense])
            );
        }
        return (
          <div>
            <p>
              Thank you for requesting your reward point values {customer.name}!
              Below you will find your results.
            </p>
            {monthlyPointsArray.map((element, i) => {
              return (
                <div key={'div_' + element.toString()}>
                  <p key={'p_' + element.toString()}>In Month {i+1} you earned {element} points</p>
                </div>
              );
            })}
            <p>Your total points over the last 3 months is {calculateTotalPoints(monthlyPointsArray)}</p>
          </div>
          
        );
      })}
    </div>
  );
}
