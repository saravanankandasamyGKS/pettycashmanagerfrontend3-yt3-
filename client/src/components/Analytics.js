import React from "react";
import { Progress } from "antd";
//category
const categories = [
  "salary",
  "tip",
  "project",
  "food",
  "movie",
  "bills",
  "medical",
  "fee",
  "tax",
];

//total transaction
const Analytics = ({ allTransection }) => {
  const totalTransaction = allTransection.length;
  const totalIncomeTransactions = allTransection.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransection.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;
  //total turnover
  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalBalanceAmount=totalIncomeTurnover-totalExpenseTurnover
  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;
    const totalMainBalanceTurnoverPercent=totalIncomeTurnoverPercent-totalExpenseTurnoverPercent

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions:{totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-Success">
                Income:{totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense:{totalExpenseTransactions.length}
              </h5>
              <h5 className="text-yellow">
                Total No of Transactions:{totalTransaction}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
                
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total TurnOver :{totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-Success">Income  ₹:{totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense  ₹:{totalExpenseTurnover}</h5>
              <h5 className="text-yellow">TotalMainBalanceAmount  ₹:{totalBalanceAmount}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"yellow"}
                  className="mx-2"
                  percent={totalMainBalanceTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <h4>Categorywise Income</h4>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-4">
          <h4>Categorywise Expense</h4>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount/totalExpenseTurnover)*100).toFixed(0)}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Analytics;
