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
  const truncatedContent =
    campaign.content.length > 50
      ? campaign.content.substring(0, 50) + "..." // Truncate content if it's longer than 50 characters
      : campaign.content;

  return (
    <Card>
      <CardContent sx={{ width: "60vw" }}>
        <Typography gutterBottom variant="h5" component="div">
          {campaign.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncatedContent}
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
