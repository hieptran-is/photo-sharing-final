import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/api/user/${userId}`)
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [userId]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    // tạo hộp (card) trắng
    // nội trung trong hộp (card)
    // h4 -> cỡ chữ to
    <Card>
      <CardContent>
        <Typography variant="h4">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography>Location: {user.location}</Typography>
        <Typography>Occupation: {user.occupation}</Typography>
        <Typography>Description: {user.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
