import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
//container cho ds,từng dòng trong ds,phần text trong từng dòng, đường kẻ ngăn cách
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("/api/user/list")
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    // nav -> đây là vùng điều hướng
    // Fragment
    // ListItem: biến dòng thành button, ấn button -> điều hướng tới link
    // ListItemText: hiển thị text của dòng
    <List component="nav">
      {users.map((user) => (
        <Fragment key={user._id}>
          <ListItem button component={Link} to={`/users/${user._id}`}>
            <ListItemText primary={`${user.first_name} ${user.last_name}`} />
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
}

export default UserList;
