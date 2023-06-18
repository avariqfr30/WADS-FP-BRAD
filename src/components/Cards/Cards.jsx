import { useState, useEffect, useMemo, createContext } from "react";
import "./Cards.css";
import { cardsData } from "../../Data/Data";
import { auth, db } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {onSnapshot, collection, getDocs, addDoc, updateDoc, Timestamp, query, where, orderBy} from "firebase/firestore"
import Card from "../Card/Card";

export const SaleDataContext = createContext();
export const PurchDataContext = createContext();

const Cards = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userDocId, setUserDocId] = useState('');
  const [purchDocId, setPurchDocId] = useState('');
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [saleMoney, setSaleMoney] = useState([]);
  const [purchMoney, setPurchMoney] = useState([]);
  const [saleTime, setSaleTime] = useState([]);
  const [purchTime, setPurchTime] = useState([]);

  useEffect(() => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          snapshot.docs.forEach((doc) => {
            setUserDocId(doc.id);
          })
        }
      });
    } catch(err) {
      console.log("we're so close");
    }
  }, [user]);

  // Retrieve sale data
  useEffect(() => {
    try {
      const saleQ = query(collection(db, "users", userDocId, "sales"),
      orderBy("saleDate"));
      onSnapshot(saleQ, (snapshot) => {
      if (!snapshot.empty) {
        snapshot.docs.forEach(() => {
          setSales(snapshot.docs.map(doc => ({
            id : doc.id,
            data : doc.data()
        })));
        });
      }
    });
    } catch(err) {
    }}, [userDocId, setUserDocId]);

  // Retrieve purch data
  useEffect(() => {
    try {
      const purchQ = query(collection(db, "users", userDocId, "purchases"),
      orderBy("purchDate"));
      onSnapshot(purchQ, (snapshot) => {
      if (!snapshot.empty) {
        snapshot.docs.forEach(() => {
          setPurchases(snapshot.docs.map(doc => ({
            id : doc.id,
            data : doc.data()
        })));
            // console.log(doc.data()['saleDate'])
            // setCurrentStock(doc.data().stock);
        });
      }
    });
      // console.log(sales[0]['data']['itemId'])
      // console.log(sales)
    } catch(err) {
      // console.log("human");
    }}, [userDocId, setUserDocId]);

  function ttlPrice(price, stock) {
    return price * stock;
  }
  
  const saleMoneyMemo = useMemo(() => {
    return sales.map((sale) => ttlPrice(sale['data']['pricePerUnit'], sale['data']['stock']))
  }, [sales]);

  const purchMoneyMemo = useMemo(() => {
    return purchases.map((purch) => ttlPrice(purch['data']['pricePerUnit'], purch['data']['stock']))
  }, [purchases]);

  const saleTimeMemo = useMemo(() => {
    return sales.map((sale) => {return new Date(sale['data']['saleDate']['seconds'] * 1000).toISOString()})
  }, [sales]);

  const purchTimeMemo = useMemo(() => {
    return purchases.map((purch) => {return new Date(purch['data']['purchDate']['seconds'] * 1000).toISOString()})
  }, [purchases]);

  useEffect(() => {
    setSaleMoney(saleMoneyMemo);
    // setSaleTime(saleTimeMemo.reverse());
  }, [saleMoneyMemo,saleMoney]);

  useEffect(() => {
    setPurchMoney(purchMoneyMemo);
  }, [purchMoneyMemo,purchMoney]);

  useEffect(() => {
    // setSaleMoney(saleMoneyMemo);
    setSaleTime(saleTimeMemo.reverse());
  }, [saleTimeMemo, saleTime]);

  useEffect(() => {
    setPurchTime(purchTimeMemo.reverse());
  }, [purchTimeMemo, purchTime])

  
  cardsData.map((card, id) => {
    if (card.title === "Sales") {
      card.value = saleMoney.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      },0)
      card.series = [
        {
          "name": card.title,
          "data": saleMoney,
        }
      ]
      card.options.xaxis.categories = saleTime
    } else if (card.title === "Expenses") {
      card.value = purchMoney.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      },0)
      card.series = [
        {
          "name": card.title,
          "data": purchMoney,
        }
      ]
      card.options.xaxis.categories = purchTime
    } else {
      const saleTotal = saleMoney.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      },0)
      const purchTotal = purchMoney.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      },0)
      card.value = saleTotal - purchTotal;

      card.series = [
        {
          "name": card.title,
          "data": [],
        }
      ]

      card.options.xaxis.categories = []
    }
  })


  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <SaleDataContext.Provider value={[sales,setSales]}>
              <PurchDataContext.Provider value={[purchases,setPurchases]}>
                <Card
                  title={card.title}
                  color={card.color}
                  barValue={card.barValue}
                  value={card.value}
                  png={card.png}
                  series={card.series}
                  options={card.options}
                />
              </PurchDataContext.Provider>
            </SaleDataContext.Provider>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
