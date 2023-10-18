"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const BankInfoForm = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bankAccounts = await axios.get("/api/bankAccount/getBankAccount");
        // console.log("Bank Accounts fetched", bankAccounts.data);
        setData(bankAccounts.data);
        // console.log("banks in variable", banks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedIFSC, setSelectedIFSC] = useState("");
  const [selectedAccountNumber, setSelectedAccountNumber] = useState("");

  const uniqueBankNames = Array.from(
    new Set(data.map((item) => item.bankname))
  );
  const uniqueIFSCCodes = Array.from(
    new Set(
      data
        .filter((item) => item.bankname === selectedBank)
        .map((item) => item.ifsc)
    )
  );
  const uniqueAccountNumbers = Array.from(
    new Set(
      data
        .filter((item) => item.ifsc === selectedIFSC)
        .map((item) => item.bankaccountnumber)
    )
  );

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
    setSelectedIFSC("");
    setSelectedAccountNumber("");
  };

  const handleIFSCChange = (event) => {
    setSelectedIFSC(event.target.value);
    setSelectedAccountNumber("");
  };

  const handleAccountNumberChange = (event) => {
    setSelectedAccountNumber(event.target.value);
  };

  return (
    <div>
      <select value={selectedBank} onChange={handleBankChange}>
        <option value="">Select a bank</option>
        {uniqueBankNames.map((bankname) => (
          <option key={bankname} value={bankname}>
            {bankname}
          </option>
        ))}
      </select>

      {selectedBank && (
        <select value={selectedIFSC} onChange={handleIFSCChange}>
          <option value="">Select an IFSC code</option>
          {uniqueIFSCCodes.map((ifsc) => (
            <option key={ifsc} value={ifsc}>
              {ifsc}
            </option>
          ))}
        </select>
      )}

      {selectedIFSC && (
        <select
          value={selectedAccountNumber}
          onChange={handleAccountNumberChange}
        >
          <option value="">Select an account number</option>
          {uniqueAccountNumbers.map((accountnumber) => (
            <option key={accountnumber} value={accountnumber}>
              {accountnumber}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default BankInfoForm;
