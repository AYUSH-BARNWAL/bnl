// import { getChequeOnline, getaccount } from "../../API/api.js";
"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar.js";

const BankBook = () => {
  const [getcash, setcash] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [getA, setA] = useState([]);

  const allaccounts = async () => {
    const res = await getaccount();
    // return res.data;
    setA(res.data);
  };

  // useEffect(() => {
  //   allaccounts();
  //   getAllCash().then((data) => {
  //     data.forEach((element) => {
  //       // Assuming the timestamp is in milliseconds, convert it to IST date
  //       const ISTDate = new Date(element.transactiondate);
  //       ISTDate.setTime(ISTDate.getTime() + 5.5 * 60 * 60 * 1000); // Adjust for IST offset
  //       element.transactiondate = ISTDate.toLocaleString();
  //     });
  //     setcash(data);
  //   });
  // }, []);

  // const getAllCash = async () => {
  //   let response = await getChequeOnline();
  //   console.log(response);

  //   return response;
  // };
  const Line = () => {
    return <div className="w-full mx-auto h-[1.5px] my-5 bg-gray-400" />;
  };
  return (
    <div>
      <Navbar />
      <>
        <table className="table mx-auto mt-20 border-collapse border-black border px-4">
          <caption className="caption text-4xl font-bold">
            BankBook <Line />
          </caption>
          <thead className="border border-collapse border-black px-2">
            <tr className="border border-collapse border-black px-2">
              <th className="th px-3 text-sm border border-collapse border-black">
                Date
              </th>
              <th className="th px-3 text-sm border border-collapse border-black">
                Membership No.
              </th>
              <th className="th px-3 text-sm border border-collapse border-black">
                {" "}
                Account No.
              </th>
              <th className="th px-3 text-sm border border-collapse border-black">
                Transaction Type
              </th>
              <th className="th px-3 text-sm border border-collapse border-black">
                Money Debit
              </th>
              <th className="th px-3 text-sm border border-collapse border-black">
                Money Credit
              </th>
              <th className="th px-3 text-sm border border-collapse border-black">
                Balance
              </th>
              <th className="th px-3 text-sm border border-collapse border-black">
                Transaction ID
              </th>
              <th className="th px-3 text-sm border border-collapse border-black">
                Late fine
              </th>
              <th className="th px-3 text-sm border border-collapse border-black">
                Campany Bank Account No.
              </th>
              <th className="th px-3 text-sm border border-collapse border-black">
                Branch Name
              </th>
              <th className="th px-3 text-sm border border-collapse border-black">
                Particular
              </th>
            </tr>
          </thead>
          <tbody className="border border-collapse border-black px-2">
            {getcash.map((paisa) => (
              <>
                {paisa.membershipamount === 0 ? (
                  <tr>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {paisa.transactiondate}
                    </td>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {paisa.membershipnumber}
                    </td>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {paisa.accountnumber}
                    </td>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {paisa.transactiontype}
                    </td>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {paisa.transactiontype === "withdraw" ? paisa.amount : 0}
                    </td>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {paisa.transactiontype === "deposit" ? paisa.amount : 0}
                    </td>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {paisa.balance}
                    </td>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {0}
                    </td>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {0}
                    </td>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {paisa.companyaccount}
                    </td>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {paisa.bankname}
                    </td>
                    <td className="td border border-collapse border-black px-3 text-sm">
                      {paisa.particular}
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr className="border border-collapse border-black px-2">
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.transactiondate}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.membershipnumber}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.accountnumber}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {"membership charge"}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {0}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.membershipamount}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.balance}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {0}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {0}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.companyaccount}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.bankname}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {"membership charge"}
                      </td>
                    </tr>
                    <tr className="border border-collapse border-black px-2">
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.transactiondate}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.membershipnumber}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.accountnumber}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {"share amount"}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {0}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.shareamount}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.balance}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {0}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {0}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.companyaccount}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {paisa.bankname}
                      </td>
                      <td className="td border border-collapse border-black px-3 text-sm">
                        {"share amount"}
                      </td>
                    </tr>
                  </>
                )}
              </>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
};
export default BankBook;
