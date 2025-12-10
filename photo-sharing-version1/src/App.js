import "./App.css";

import React from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

// Layout chung (luôn hiển thị): TopBar + cột trái UserList + cột phải (children)
const MainLayout = ({ children }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TopBar />
    </Grid>
    <div className="main-topbar-buffer" />
    <Grid item sm={3}>
      <Paper className="main-grid-item">
        <UserList />
      </Paper>
    </Grid>
    <Grid item sm={9}>
      <Paper className="main-grid-item">{children}</Paper>
    </Grid>
  </Grid>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/users/:userId"
          element={
            <MainLayout>
              <UserDetail />
            </MainLayout>
          }
        />
        <Route
          path="/photos/:userId"
          element={
            <MainLayout>
              <UserPhotos />
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout>
              <UserList />
            </MainLayout>
          }
        />
        <Route
          path="/"
          element={
            <MainLayout>
              <UserList />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
