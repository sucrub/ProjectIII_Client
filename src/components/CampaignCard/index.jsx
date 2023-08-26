import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Link,
} from "@mui/material";

const CampaignCard = (props) => {
  const { campaign } = props;
  return (
    <Card>
      <CardContent sx={{ width: "60vw" }}>
        <Typography gutterBottom variant="h5" component="div">
          {campaign.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {campaign.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link underline="none" href={`/campaign/${campaign.id}`}>
            More Details
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CampaignCard;
