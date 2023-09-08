import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Scrollbar,
  CircularProgress,
} from "@mui/material";

const ScrollableCardList = ({
  cardsData,
  setSelectedId,
  selectedId,
  loading,
}) => {
  const handleCardClick = (card) => {
    setSelectedId(card.id);
  };
  return (
    <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          {cardsData.length === 0 && <Typography>No Agents Found</Typography>}
          {cardsData.map((card) => (
            <Paper key={card.id} elevation={1}>
              <Card
                variant="outlined"
                style={{
                  minWidth: 250,
                  cursor: "pointer",
                  padding: "10px",
                  margin: "10px",
                  borderBlockColor: selectedId == card.id ? "#1976d2" : "",
                }}
                onClick={() => handleCardClick(card)}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    Name : {card.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {card.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contact: {card.email},{card.mobile}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrollableCardList;
