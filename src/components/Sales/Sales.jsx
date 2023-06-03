import { useState, useEffect } from "react";
import { auth, db } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {onSnapshot, collection, doc, updateDoc, addDoc, Timestamp, query, where} from "firebase/firestore"
import "./Sales.css";
import { v4 as uuid4 } from "uuid";

const Sales = ({onClose, open}) => {
    const [user, loading, error] = useAuthState(auth);
    const [userDocId, setUserDocId] = useState(''); 

    const [itemName, setItemName] = useState('');
    const [custName, setCustName] = useState('');

    const [itemDocId, setItemDocId] = useState('');
    const [custDocId, setCustDocId] = useState('');
    const [discount, setDiscount] = useState(0);
    const [stock, setStock] = useState(0);
    const [currentStatus, setCurrentStatus] = useState('Inactive');
    const [desc, setDesc] = useState('');

    const [currentStock, setCurrentStock] = useState(0);

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
        }
        catch(err) {
          console.log("we're so close");
        }
      }, [user]);

    useEffect(() => {
    try {
      const itemQ = query(collection(db, "users", userDocId, "items"),
      where(
        "itemName", "==", itemName,
        ));
        onSnapshot(itemQ, (snapshot) => {
        if (!snapshot.empty) {
          snapshot.docs.forEach((doc) => {
            setItemDocId(doc.id);
            setCurrentStock(doc.data().stock);
          })
        }
      });
    } catch(err) {
        console.log("humana humana");
    }});

    useEffect(() => {
    try {
      const custQ = query(collection(db, "users", userDocId, "customers"),
      where(
        "custName", "==", custName,
        ));
        onSnapshot(custQ, (snapshot) => {
        if (!snapshot.empty) {
          snapshot.docs.forEach((doc) => {
            setCustDocId(doc.id);
          })
        }
      });
    } catch(err) {
        console.log("hummana hummana");
    }});

    const submit = async (e) => {
        let saleUUID = uuid4();
        e.preventDefault();
        try {
            await addDoc(collection(db, 'users', userDocId, 'sales'), {
                saleId: saleUUID,
                custId: custDocId,
                itemId: itemDocId,
                discount: discount,
                stock: stock,
                saleDate: Timestamp.now()
             });
             await updateDoc(doc(db, 'users', userDocId, 'items', itemDocId), {
                stock: currentStock - stock,
             });
        } catch (err) {
            alert(err);
        };
    };

        // if(NewUser) {
        //     registerWithEmailAndPassword(username, email, password)
        //         .then(() => {
        //             localStorage.setItem("username", username);
        //         })
        //         .catch((error) => {
        //             seterror(true)
        //             const errorMessage = error.message;
        //             seterrorMsg(errorMessage);
        //         });
        // } else {
        //     logInWithEmailAndPassword(username, email, password)
        //     .catch((error) => {
        //         seterror(true)
        //         const errorMessage = error.message;
        //         seterrorMsg(errorMessage);
        //     });
        // }
    
    return (
        <div className="login-page">
            <form onSubmit={submit}>
                <div className="itemName">
                    <input
                        onChange={(e) => setItemName(e.target.value)}
                        type="itemName"
                        id="itemName"
                        required
                    />
                    <label  htmlFor="itemName">Item Name</label>
                </div>

                <div className="custName">
                    <input
                        onChange={(e) => setCustName(e.target.value)}
                        type="custName"
                        id="custName"
                        required
                    />
                    <label  htmlFor="custName">Customer Name</label>
                </div>

                <div className="stock">
                    <input
                        onChange={(e) => setStock(Number(e.target.value))}
                        type="stock"
                        id="stock"
                        required
                    />
                    <label  htmlFor="stock">Sale Quantity</label>
                </div>

                <div className="discount">
                    <input
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        type="discount"
                        id="discount"
                        required
                    />
                    <label  htmlFor="discount">Discount in Percentage</label>
                </div>

                {/* <div className="desc">
                    <input
                        onChange={(e) => setDesc(e.target.value)}
                        type="desc"
                        id="desc"
                        required
                    />
                    <label  htmlFor="desc">Description</label>
                </div> */}

                {/* {error && <img src={illustration} alt=""
                className="status" />} */}
                
                {/* {error && <span className="error">Process Failed</span>}

                {error && <span className="error">{errorMsg}</span>} */}

                <button type="submit">{"Input Data"}
                </button>

                {/* {NewUser ? (
                    <span className="user-stat">
                        Already have an account? <b onClick={() => {
                            setNewUser(false)
                            seterror(false)
                        }}>Log In</b>
                    </span>
                ) : (
                    <span className="user-stat">
                        Don't have an account? <b onClick={() => {
                            setNewUser(true)
                            seterror(true)
                        }}>Sign Up</b>
                    </span>
                )} */}
            </form>
        </div>
    );
};

export default Sales;