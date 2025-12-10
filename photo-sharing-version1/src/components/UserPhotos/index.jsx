import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`/api/photo/${userId}`)
      .then((data) => setPhotos(data))
      .catch((err) => console.log(err));
  }, [userId]);
  // nếu photo null hoặc mảng rỗng
  if (!photos || photos.length === 0) {
    return <Typography>No photos available.</Typography>;
  }

  return (
    <div>
      {photos.map((p) => (
        <Card key={p._id} style={{ margin: "20px 0" }}>
          <CardMedia
            component="img"
            height="300"
            image={`/images/${p.file_name}`}
            alt="User"
          />

          <CardContent>
            <Typography variant="subtitle2">
              Date: {new Date(p.date_time).toLocaleString()}
            </Typography>

            <Divider style={{ margin: "10px 0" }} />

            <Typography variant="h6">Comments:</Typography>

            {p.comments.map((c) => (
              // với mỗi cmt của ảnh p render ra 1 card
              <Card key={c._id} style={{ marginTop: "10px", padding: "10px" }}>
                <Typography variant="body1">{c.comment}</Typography>
                <Typography variant="caption">
                  — {c.user.first_name} {c.user.last_name} (
                  {new Date(c.date_time).toLocaleString()})
                </Typography>
              </Card>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
