import "./Courier.css";
import React from "react";
import { useEffect, useState } from "react";

const Courier = () => {
  const [weight, setWeight] = useState("");
  const [pin, setPincode] = useState("");
  const [rate, setRate] = useState("");
  const [charge, setCharge] = useState(0);

  const [companyx, setCompanyx] = useState([]);
  const [companyy, setCompanyy] = useState([]);

  useEffect(() => {
    fetch("https://swiggydbjson.herokuapp.com/companyx")
      .then((res) => res.json())
      .then((result) => setCompanyx(result));
  }, []);

  useEffect(() => {
    fetch("https://swiggydbjson.herokuapp.com/companyy")
      .then((res) => res.json())
      .then((result) => setCompanyy(result));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let zo = companyx.filter((e) => {
      // console.log(e.pincode);
      return Number(pin) === e.CustomerPincode;
    });
    // console.log(zo);
    checkzone(zo);
  };

  const checkzone = (zo) => {
    // console.log(z);
    let zone = zo.map((e) => {
      return e.Zone;
    });

    let uzone = zone.join("");

    let pric = companyy.filter((e) => {
      return uzone === e.Zone && rate === e.RateType;
    });
    // console.log(pric);
    checkprice(pric);
  };

  const checkprice = (data) => {
    let firstkgprice = data.map((e) => {
      return e.FirstKG;
    });
    let additionalkg = data.map((e) => {
      return e.Every_AdditionalKG;
    });

    let firstkg = Number(firstkgprice.join(""));
    let addikg = Number(additionalkg.join(""));

    calculateprice(firstkg, addikg, weight);
  };

  const calculateprice = (firstkg, addikg, weight) => {
    let weightkgprice = Math.round(weight);

    let sum = firstkg;
    for (let i = 1; i < weightkgprice; i++) {
      sum += addikg;
    }
    let totalprice = sum.toFixed(2);
    setCharge(totalprice);
  };

  return (
    <>
      <h1 className="heading">Courier Price Calculater</h1>
      <div className="form_div">
        <div className="form_div">
          <form action="">
            <input
              type="text"
              placeholder="enter weight in kg"
              onChange={(e) => setWeight(e.target.value)}
              name="weight"
            />
            <input
              type="number"
              placeholder="enter pincode"
              onChange={(e) => setPincode(e.target.value)}
              name="pincode"
            />
            <select
              name="ratetype"
              id=""
              onChange={(e) => setRate(e.target.value)}
            >
              <option value="Forward">Forward</option>
              <option value="Forward & RTO">Forward&Rto</option>
            </select>
            <button onClick={handleSubmit}>Get Price</button>
          </form>

          <div className="pricediv">
            <h4>Expected Price:{charge}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courier;
