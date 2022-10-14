export const calculateCustomerPoints = (dollarAmountPerMonth) => {
  //Checks if money is less than 100 if its true this calculates only the
  //point for 50 dollars or more if its false it calculates both 100 and 50 dollar points
  if (dollarAmountPerMonth < 50) return 0;
  return dollarAmountPerMonth < 100
    ? dollarAmountPerMonth - 50
    : 2 * (dollarAmountPerMonth - 100) + 50;
};

export const calculateTotalPoints = (monthlyPointsArray) => {
  let totalPointsForThreeMonthTimePeriod = 0;
  for (let points in monthlyPointsArray) {
    totalPointsForThreeMonthTimePeriod += monthlyPointsArray[points];
  }
  return totalPointsForThreeMonthTimePeriod;
};
