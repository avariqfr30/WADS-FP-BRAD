import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { onSnapshot, collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db, auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Table.css";

const BasicTable = () => {
  const [rows, setRows] = useState([]);
  const [user] = useAuthState(auth);
  const [userDocId, setUserDocId] = useState("");

  const fetchUserDocId = async () => {
    if (user) {
      const usersQuery = query(collection(db, "users"), where("uid", "==", user.uid));
      const snapshot = await getDocs(usersQuery);
      snapshot.forEach((doc) => {
        setUserDocId(doc.id);
      });
    }
  };

  useEffect(() => {
    fetchUserDocId();
  }, [user]);

  useEffect(() => {
    if (userDocId) {
      const salesQuery = query(collection(db, "users", userDocId, "sales"), orderBy("saleDate", "desc"), limit(4));
      const unsubscribe = onSnapshot(salesQuery, (snapshot) => {
        const updatedRows = snapshot.docs.map((doc) => {
          const data = doc.data();
          const date = data.saleDate.toDate();
          const formattedDate = date.toLocaleDateString();
          return {
            itemName: data.itemName,
            custName: data.custName,
            date: formattedDate,
            status: "Approved",
          };
        });
        setRows(updatedRows);
      });

      return unsubscribe; // Unsubscribe from the snapshot on cleanup
    }
  }, [userDocId]);

  const makeStyle = (status) => {
    if (status === "Approved") {
      return {
        background: "rgb(145 254 159 / 47%)",
        color: "green",
      };
    } else if (status === "Pending") {
      return {
        background: "#ffadad8f",
        color: "red",
      };
    } else {
      return {
        background: "#59bfff",
        color: "white",
      };
    }
  };

  return (
    <div className="Table">
      <h3>Recent Orders</h3>
      <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="left">Customer</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.trackingId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.itemName}
                </TableCell>
                <TableCell align="left">{row.custName}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details">
                  Details
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BasicTable;
