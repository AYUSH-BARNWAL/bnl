// import { getCash } from "../../API/api.js";
"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
const CashBook = () => {
  const [getpaisa, setpaisa] = useState([]);
  useEffect(() => {
    getallpaisa().then((data) => {
      data.forEach((element) => {
        console.log(new Date(element.transactiondate).toLocaleDateString());
        element.transactiondate = new Date(
          element.transactiondate
        ).toLocaleDateString();
      });
      setpaisa(data);
    });
  }, []);
  const getallpaisa = async () => {
    try {
      let response = await getCash();
      console.log(response);

      // Ensure transactiondate is a Date object before formatting
      const formattedData = response.map((element) => {
        if (element.transactiondate instanceof Date) {
          element.transactiondate =
            element.transactiondate.toLocaleDateString();
        }
        return element;
      });

      setpaisa(formattedData);
      return formattedData;
    } catch (error) {
      console.error("Error while fetching and formatting data:", error);
      throw error;
    }
  };

  const Line = () => {
    return <div className="w-full mx-auto h-[1.5px] my-5 bg-gray-400" />;
  };
  return (
    <div>
      <Navbar />
      <table className="table mx-auto  border-collapse border-black border px-4 w-11/12 text-left">
        <caption className="caption  text-4xl font-bold">
          CashBook <Line />
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
              Particular
            </th>

            <th className="th px-3 text-sm border border-collapse border-black">
              Late fine
            </th>
          </tr>
        </thead>
        <tbody>
          {getpaisa.map((paisa) => (
            <>
              {paisa.membershipamount === "0" ? (
                <tr>
                  <td className="td px-3 text-sm border border-collapse border-black">
                    {paisa.transactiondate}
                  </td>
                  <td className="td px-3 text-sm border border-collapse border-black">
                    {paisa.membershipnumber}
                  </td>
                  <td className="td px-3 text-sm border border-collapse border-black">
                    {paisa.accountnumber}
                  </td>
                  <td className="td px-3 text-sm border border-collapse border-black">
                    {paisa.transactiontype}
                  </td>
                  <td className="td px-3 text-sm border border-collapse border-black">
                    {paisa.transactiontype === "withdraw" ? paisa.amount : 0}
                  </td>
                  <td className="td px-3 text-sm border border-collapse border-black">
                    {paisa.transactiontype === "deposit" ? paisa.amount : 0}
                  </td>
                  <td className="td px-3 text-sm border border-collapse border-black">
                    {paisa.balance}
                  </td>
                  <td className="td px-3 text-sm border border-collapse border-black">
                    {paisa.particular}
                  </td>
                  <td className="td px-3 text-sm border border-collapse border-black">
                    {0}
                  </td>
                </tr>
              ) : (
                <>
                  <tr>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {paisa.transactiondate}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {paisa.membershipnumber}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {paisa.accountnumber}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {"membership charge"}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {0}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {paisa.membershipamount}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {paisa.balance}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {"membership charge"}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {0}
                    </td>
                  </tr>
                  <tr>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {paisa.transactiondate}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {paisa.membershipnumber}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {paisa.accountnumber}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {"share amount"}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {0}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {paisa.shareamount}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {paisa.balance}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {"share amount"}
                    </td>
                    <td className="td px-3 text-sm border border-collapse border-black">
                      {0}
                    </td>
                  </tr>
                </>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CashBook;
