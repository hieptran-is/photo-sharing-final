import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";
function TopBar() {
  const location = useLocation();
  // tạo biến userID chưa id trên url
  const { userId } = useParams();
  // state lưu giá trị (user) và hàm lưu state
  const [user, setUser] = useState(null);
  // Chỉ lo fetch user
  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    fetchModel(`/api/user/${userId}`)
      .then((data) => setUser(data)) // data là Ob user từ DB
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  }, [userId]);
  // Tính titleRight dựa trên user + URL
  const path = location.pathname;
  let titleRight = "";
  if (user) {
    if (path.startsWith("/photos/")) {
      titleRight = `Photos of ${user.first_name} ${user.last_name}`;
    } else if (path.startsWith("/users/")) {
      titleRight = `${user.first_name} ${user.last_name}`;
    }
  }
  return (
    // layer này sẽ là layer đầu tiên "absolute"
    // flex -> nằm trên một hàng
    // space-between ->2 đầu trái phải
    // h5 -> cỡ chữ lớn (heading)
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Your Name Here</Typography>
        <Typography variant="h6">{titleRight}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
