import { useState, useEffect } from "react";
import { auth, db } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {onSnapshot, collection, getDocs, addDoc, updateDoc, Timestamp, query, where} from "firebase/firestore"
import { v4 as uuid4 } from 'uuid';
import "./Items.css";

const Items = ({onClose, open}) => {
    const [user, loading, error] = useAuthState(auth);
    const [userDocId, setUserDocId] = useState(''); 
    const [itemDocId, setItemDocId] = useState('');

    const [itemName, setItemName] = useState('');
    const [discount, setDiscount] = useState(0);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [currentStatus, setCurrentStatus] = useState('Inactive');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
              snapshot.docs.forEach((doc) => {
                setUserDocId(doc.id);
                console.log(doc.data())
              })
            }
          });
        } catch(err) {
          console.log("we're so close");
        }
      }, [user]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const itemUUID = uuid4();
            await addDoc(collection(db, 'users', userDocId, 'items'), {
            itemId: itemUUID,
            itemName: itemName,
            discount: discount,
            stock: stock,
            price: price,
            currentStatus: currentStatus,
            desc: desc
        })
        } catch (err) {
            alert(err);
        }
    }

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

                {/* <div className="discount">
                    <input
                        onChange={(e) => setDiscount(e.target.value)}
                        type="discount"
                        id="discount"
                        required
                    />
                    <label  htmlFor="discount">Discount</label>
                </div> */}

                <div className="stock">
                    <input
                        onChange={(e) => setStock(Number(e.target.value))}
                        type="stock"
                        id="stock"
                        required
                    />
                    <label  htmlFor="">Stock</label>
                </div>

                <div className="price">
                    <input
                        onChange={(e) => setPrice(Number(e.target.value))}
                        type="price"
                        id="price"
                        required
                    />
                    <label  htmlFor="price">Price per Unit</label>
                </div>

                <div className="currentStatus">
                    <input
                        onChange={(e) => setCurrentStatus(e.target.value)}
                        type="currentStatus"
                        id="currentStatus"
                        required
                    />
                    <label  htmlFor="currentStatus">Current Status</label>
                </div>

                <div className="desc">
                    <input
                        onChange={(e) => setDesc(e.target.value)}
                        type="desc"
                        id="desc"
                        required
                    />
                    <label  htmlFor="desc">Description</label>
                </div>

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

export default Items;