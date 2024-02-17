import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Typography, Box, Divider } from "@mui/material/";
import ProductRate from "./Ratting";

export default function BookCard({ item }: { item: any }) {
  const [ratting, setRattion] = React.useState(0);

  React.useEffect(() => {
    let value = 0;
    console.log("itemmmmmmm;;;;;;;", item);
    for (let i in item?.comments) {
      let rattingUnit = item?.comments[i].ratting;
      console.log(rattingUnit);
      if (rattingUnit) {
        rattingUnit = rattingUnit * 1;
      } else {
        rattingUnit = 0;
      }
      value = value + rattingUnit;
    }
    if (value == 0) return;
    setRattion(value / item?.comments?.length);
  }, []);
  return (
    <Card sx={{ maxWidth: 205, padding: "5px", cursor: "pointer" }}>
      <CardMedia
        sx={{ height: 340 }}
        image={item.imageUrl}
        title="green iguana"
      />
      <CardContent sx={{ padding: "3%" }}>
        <Typography variant="body1">Titele: {item?.title}</Typography>
        <Typography variant="body1">Author:{item?.author}</Typography>
      </CardContent>
      <Divider />
      <Box sx={{ width: "30%" }}>
        <ProductRate count={item?.comments?.length} rate={ratting} />
      </Box>
    </Card>
  );
}
