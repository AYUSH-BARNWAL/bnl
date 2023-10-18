"use client";
// import {
//   addCash,
//   getmembershipNo,
//   addChequeOnline,
//   getaccount,
//   getCash,
// } from "../../API/api";
// import Withdraw from "./WithdrawType";
import Navbar from "../../components/navbar";

import { useState, useEffect } from "react";

const Update = () => {
  const initial = {
    transactiontype: "",
    accountnumber: "",
    member: "",
    amount: "",
  };
  const [getmem, setmem] = useState([]);
  const [getdata, setdata] = useState(initial);
  const [getpaymode, setpaymode] = useState({ payMode: "cash" });
  const [getAllAccount, setAllAccount] = useState([]);

  const [getError, setError] = useState({});

  useEffect(() => {
    if (getError) {
      if (getdata.transactiontype !== "") {
        console.log("from useEffect");
        getError.transactiontype = "";
      }
      if (getdata.accountnumber.length >= 0) {
        console.log("from account");
        getError.accountnumber = "";
      }
    }
  }, [getdata]);

  useEffect(() => {
    setmember();
  }, []);

  const setmember = async () => {
    let b = await getmembershipNo();
    let c = await getCash();
    console.log(c.data[0].accountnumber);

    console.log("sumit");
    setmem(b.data);
  };
  let memc = getmem.map((k) => k._id);
  console.log("hii");
  console.log(memc[0]);

  const getinput = (input) => {
    setdata({ ...getdata, [input.target.name]: input.target.value });
  };

  console.log(getdata);

  const [getRadio, setRadio] = useState(false);

  const pay = (e) => {
    setpaymode({ ...getpaymode, [e.target.name]: e.target.value });
    console.log("hii this is from pay");
    console.log(getpaymode);
  };

  const payment = async () => {
    let a = { membershipnumber: memc[0].toString() };
    let get = Object.assign(getdata, a);
    setdata(get);
    console.log("hii from payment");
    console.log(get);
    if (getpaymode.payMode === "cash") {
      let b = Object.assign(get, getpaymode);
      console.log(b);

      await addCash(b);
    } else {
      let c = Object.assign(get, getpaymode);
      console.log(c);
      await addChequeOnline(c);
    }
  };

  const [account, setaccount] = useState();
  useEffect(() => {
    allAccount();
  }, []);

  const allAccount = async () => {
    const da = await getaccount();
    console.log("heloo");
    console.log(da.data[0].companyaccount);

    setaccount(da.data);
  };

  if (getpaymode.companyaccount != null) {
    console.log(getpaymode.companyaccount);

    console.log(
      account.find((o) => o.companyaccount === getpaymode.companyaccount)
        .bankname
    );
  }

  const handleError = (e) => {
    if (e.target.name === "transactiontype") {
      if (getdata.transactiontype === "") {
        let a = "please select transaction type";
        setError({ ...getError, [e.target.name]: a });
        console.log(e.target.name);
        console.log("from error");
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "accountnumber") {
      let p = /^[0-9]{9,18}$/;
      if (getdata.accountnumber === "") {
        let a = "account number required";
        setError({ ...getError, [e.target.name]: a });
      } else if (!p.test(e.target.value)) {
        setError({ ...getError, [e.target.name]: "invalid account number" });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "amount") {
      if (e.target.value === "") {
        console.log("empty");
        setError({ ...getError, [e.target.name]: "enter amount" });
      } else if (e.target.value < 1) {
        setError({
          ...getError,
          [e.target.name]: "amount cannot be less than 1",
        });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    }
  };
  const Line = () => {
    return <div className="w-11/12 mx-auto h-[1.5px] my-10 bg-gray-400" />;
  };

  return (
    <div>
      <Navbar />
      <>
        <div className="text-5xl pt-28 mb-8 font-medium text-slate-800 ml-16">
          TRANSACTION
        </div>
        <Line />

        <form className="flex flex-col gap-y-8">
          <div className="flex flex-row w-11/12 mx-auto">
            <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
              Personal Details
            </p>
            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="la font-bold text-lg text-gray-700">
                    Transaction Type <span>*</span>
                  </label>
                  <select
                    className="box transF i1 rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                    required
                    name="transactiontype"
                    id="myselect"
                    onChange={(e) => getinput(e)}
                    onBlur={(e) => handleError(e)}
                  >
                    <option disabled selected value="">
                      choose transc. type
                    </option>
                    <option value="withdraw">withdraw</option>
                    <option value="deposit">deposit</option>
                  </select>

                  <span className="error">{getError.transactiontype}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  {getdata.transactiontype === "deposit" ? (
                    <div>
                      <label className="la font-bold text-lg text-gray-700">
                        Account Type<span>*</span>
                      </label>
                      <select
                        onChange={(e) => getinput(e)}
                        name="accounttype"
                        id=""
                        className="box transF i2 rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        required
                      >
                        <option value="saving">saving</option>
                        <option value="FD">FD</option>{" "}
                        <option value="RD">RD</option>{" "}
                      </select>
                    </div>
                  ) : (
                    <></>
                  )}

                  {getdata.transactiontype === "withdraw" ? (
                    // <Withdraw setdata={setdata} getdata={getdata} />
                    <div className="flex flex-col">
                      <label className="la font-bold text-lg text-gray-700">
                        Account Type <span>*</span>
                      </label>
                      <select
                        className="box rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        name="accounttype"
                      >
                        <option>saving</option>
                      </select>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="la font-bold text-lg text-gray-700">
                    Account Number <span>*</span>
                  </label>

                  <input
                    onChange={(e) => getinput(e)}
                    className="box transF i3 rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                    type="number"
                    placeholder="Enter Account Number"
                    minLength={13}
                    maxLength={13}
                    required
                    name="accountnumber"
                    onBlur={(e) => handleError(e)}
                  />

                  <span className="error">{getError.accountnumber}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="la font-bold text-lg text-gray-700">
                    {" "}
                    Membership Number<span></span>{" "}
                  </label>

                  <input
                    type="number"
                    name="member"
                    required
                    className="box transF i4 rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                    placeholder="membership no......"
                    onBlur={(e) => handleError(e)}
                  />

                  <span className="error">{getError.member}</span>
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="la font-bold text-lg text-gray-700">
                    Amount <span>*</span>
                  </label>
                  <input
                    onChange={(e) => getinput(e)}
                    type="text"
                    name="amount"
                    min="1"
                    placeholder="0.00"
                    required
                    className="box transF i5 rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                    onBlur={(e) => handleError(e)}
                  />
                  <span className="error">{getError.amount}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="la font-bold text-lg text-gray-700">
                    Transaction Date &nbsp;
                  </label>
                  <input
                    onChange={(e) => getinput(e)}
                    name="transactiondate"
                    className="box rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                    type="date"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="la font-bold text-lg text-gray-700">
                    Remarks (if any) &nbsp;
                  </label>
                  <textarea
                    name="particular"
                    onChange={(e) => getinput(e)}
                    className="box rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                    id=""
                    cols="30"
                    rows="2"
                  ></textarea>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="la font-bold text-lg text-gray-700">
                    Payment Mode
                  </label>
                  <div className="flex gap-x-2">
                    <input
                      className="ra "
                      onClick={(e) => pay(e)}
                      type="radio"
                      name="payMode"
                      value="cash"
                      defaultChecked
                    />
                    <label className="ra font-bold text-lg text-gray-700">
                      Cash
                    </label>
                    <input
                      className="ra "
                      onClick={(e) => pay(e)}
                      type="radio"
                      name="payMode"
                      value="cheque"
                    />
                    <label className="ra font-bold text-lg text-gray-700">
                      Cheque
                    </label>
                    <input
                      className="ra"
                      onClick={(e) => pay(e)}
                      type="radio"
                      name="payMode"
                      value="onlinetran"
                    />
                    <label className="ra font-bold text-lg text-gray-700">
                      Online
                    </label>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5"> */}
              {getpaymode.payMode === "cash" ? (
                <></>
              ) : (
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <label className="la font-bold text-lg text-gray-700">
                      Company bank Account<span>*</span>
                    </label>
                    <select
                      onChange={(e) => pay(e)}
                      name="companyaccount"
                      className="account rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                    >
                      <option disabled selected value="">
                        select account
                      </option>
                      {/* {account.map((d) => (
                            <>{<option> {d.companyaccount}</option>}</>
                          ))} */}
                    </select>
                  </div>
                  <div className="flex flex-col w-2/5">
                    <label className="la font-bold text-lg text-gray-700">
                      Bank Name<span>*</span>
                    </label>
                    <select
                      onChange={(e) => pay(e)}
                      name="bankname"
                      id=""
                      className="rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                    >
                      <option disabled selected value="">
                        select bank name
                      </option>

                      {getpaymode.companyaccount != null ? (
                        <option>
                          {/* {
                              account.find(
                                (o) =>
                                  o.companyaccount === getpaymode.companyaccount
                              ).bankname
                            } */}
                        </option>
                      ) : (
                        <></>
                      )}
                    </select>
                  </div>
                </div>
              )}
            </div>
            {/* </div>
          </div> */}
          </div>
          <div className="flex gap-0 items-end self-end justify-end mr-44 mb-16 mt-16">
            <input
              onClick={() => {
                payment();
                window.location.reload();
              }}
              type="button"
              value="SUBMIT"
              className="bg-red-600 cursor-pointer tracking-wider font-bold w-fit justify-end self-end items-end rounded-lg shadow-xl text-gray-50 px-6 py-1.5 text-xl"
            />
          </div>
        </form>
      </>
    </div>
  );
};
export default Update;
