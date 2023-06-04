import { useState, useEffect } from "react";
import { auth, db } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {onSnapshot, collection, getDocs, addDoc, Timestamp, query, where} from "firebase/firestore";
import { v4 as uuid4 } from 'uuid';
import "./Vendors.css";

const Vendors = ({onClose, open}) => {
    const [user, loading, error] = useAuthState(auth);
    const [userDocId, setUserDocId] = useState(''); 

    const [vendorName, setVendorName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [addr, setAddr] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [currentStatus, setCurrentStatus] = useState('Inactive');


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


    const submit = async (e) => {
        e.preventDefault();
        let vendorUUID = uuid4();
        try {
            await addDoc(collection(db, 'users', userDocId, 'vendors'), {
              vendorId: vendorUUID,
              vendorName: vendorName,
              email: email,
              phoneNo: phoneNo,
              addr: addr,
              city: city,
              district: district,
              currentStatus: currentStatus,
              created: Timestamp.now() });
            //   onClose();
            console.log("Vendor details added successfully!");
            // Show a popup
            const el = document.createElement("div");
            el.className = "popup";
            el.innerHTML = "Vendor details added successfully!";
            document.body.appendChild(el);
            setTimeout(() => {
                document.body.removeChild(el);
            }, 2000);
            
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
            <h1>Vendor Details</h1>
                <form onSubmit={submit}>
                    <div className="vendorName">
                        <input
                            onChange={(e) => setVendorName(e.target.value)}
                            type="vendorName"
                            id="vendorName"
                            required
                        />
                        <label  htmlFor="vendorName">Vendor Name</label>
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

                    <div className="email">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            required
                        />
                        <label  htmlFor="email">Vendor Email</label>
                    </div>

                    <div className="phoneNo">
                        <input
                            onChange={(e) => setPhoneNo(e.target.value)}
                            type="phoneNo"
                            id="phoneNo"
                            required
                        />
                        <label  htmlFor="phoneNo">Phone No.</label>
                    </div>

                    <div className="addr">
                        <input
                            onChange={(e) => setAddr(e.target.value)}
                            type="addr"
                            id="addr"
                            required
                        />
                        <label  htmlFor="addr">Address</label>
                    </div>

                    <div className="city">
                        <input
                            onChange={(e) => setCity(e.target.value)}
                            type="city"
                            id="city"
                            required
                        />
                        <label  htmlFor="city">City</label>
                    </div>

                    <div className="district">
                        <input
                            onChange={(e) => setDistrict(e.target.value)}
                            type="district"
                            id="district"
                            required
                        />
                        <label  htmlFor="district">District</label>
                    </div>

                    <div className="currentStatus">
                        <input
                            onChange={(e) => setCurrentStatus(e.target.value)}
                            type="currentStatus"
                            id="currentStatus"
                            required
                        />
                        <label  htmlFor="currentStatus">Status</label>
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

export default Vendors;