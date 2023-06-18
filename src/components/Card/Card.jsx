import { useState, useEffect, useContext, useMemo } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import { auth, db } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {documentId, onSnapshot, collection, getDocs, addDoc, doc, Timestamp, query, where, orderBy} from "firebase/firestore"
import { PurchDataContext, SaleDataContext } from "../Cards/Cards";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

// parent Card

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        {/* <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        /> */}
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>${param.value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  const [user, loading, error] = useAuthState(auth);
  const [userDocId, setUserDocId] = useState('');
  const [itemData, setItemData] = useState('');
  
  const [sales, setSales] = useContext(SaleDataContext);
  const [saleTime, setSaleTime] = useState([]);
  const [purchases, setPurchases] = useContext(PurchDataContext);
  const [purchTime, setPurchTime] = useState([]);

  // console.log(sales[0]);
  // console.log(sales[0]['data']['stock']);

  // useEffect(() => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     onSnapshot(q, (snapshot) => {
  //       if (!snapshot.empty) {
  //         snapshot.docs.forEach((doc) => {
  //           setUserDocId(doc.id);
  //         })
  //       }
  //     });
  //   } catch(err) {
  //     console.log("we're so close");
  //   }
  // }, [user]);

  // const testArr = useMemo(() => {
  //   return [{
  //     'data': {
  //       'price': 1200,
  //       'stock': 5
  //     } 
  //   },
  //   {
  //     'data': {
  //       'price': 500,
  //       'stock': 8,
  //     }
  //   }
  // ]}, [])

  // const anotherArr = useMemo(() => {
  //   return testArr.map((thing) => log(thing['data']['price'], thing['data']['stock']))
  // }, [testArr])

  // console.log(anotherArr);
  
  // useEffect(() => {
  //   setPain('waht de fkacc');
  //   console.log(saleMoney);
  // },[pain, saleMoney, setPain]);

  // function log(price, stock) {
  //   return price * stock;
  // }

  // function ttlPrice(price, stock) {
  //   return price * stock;
  // }

  // const saleMoneyMemo = useMemo(() => {
  //   return sales.map((sale) => ttlPrice(sale['data']['pricePerUnit'], sale['data']['stock']))
  // }, [sales]);

  const saleTimeMemo = useMemo(() => {
    return sales.map((sale) => {return new Date(sale['data']['saleDate']['seconds'] * 1000).toISOString()})
  }, [sales]);
  
  // const purchTimeMemo = useMemo(() => {
  //   return purchases.map((purch) => {return new Date(purch['data']['purchDate']['seconds'] * 1000).toISOString()})
  // }, [purchases]);

  // setSaleMoney(sales.map((sale) => ttlPrice(sale['data']['pricePerUnit'], sale['data']['stock'])));
    // setCurrentStock(doc.data().stock);
  // sales.map((sale) => log)

  useEffect(() => {
    // setSaleMoney(saleMoneyMemo);
    setSaleTime(saleTimeMemo.reverse());
  }, [saleTimeMemo, saleTime]);
  //setSaleMoney(saleMoneyMemo);

  // useEffect(() => {
  //   setPurchTime(purchTimeMemo.reverse());
  // }, [purchTimeMemo, purchTime])

  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2023-06-03T07:57:07.000Z",
          "2023-06-13T07:46:45.000Z",
          "2023-06-13T07:49:16.000Z",
          "2023-06-19T02:30:00.000Z",
          // "2018-09-19T00:00:00.000Z",
          // "2018-09-19T00:30:00.000Z",
          // "2018-09-19T01:00:00.000Z",
          // "2018-09-19T01:30:00.000Z",
          // "2018-09-19T02:00:00.000Z",
          // "2018-09-19T02:30:00.000Z",
          // "2018-09-19T03:00:00.000Z",
          // "2018-09-19T03:30:00.000Z",
          // "2018-09-19T04:00:00.000Z",
          // "2018-09-19T04:30:00.000Z",
          // "2018-09-19T05:00:00.000Z",
          // "2018-09-19T05:30:00.000Z",
          // "2018-09-19T06:00:00.000Z",
          // "2018-09-19T06:30:00.000Z",
        ],
        
      },
    },
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
        <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={param.options} series={param.series} type="area" />
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  );
}

export default Card;
