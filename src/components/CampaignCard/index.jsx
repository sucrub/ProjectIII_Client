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
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {campaign.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {campaign.description}
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
