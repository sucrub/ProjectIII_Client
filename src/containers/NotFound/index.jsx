import { Button, Typography, Container, Box } from "@mui/material";
import notFoundImage from "../../assets/images/illustration_404.svg";
import NotFoundStyle from "./index.style";

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <NotFoundStyle>
      <Container className="container">
        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>

        <Typography>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box component="img" src={notFoundImage} className="image" />

        <Button href="/login" size="large" variant="contained">
          Go to login page
        </Button>
      </Container>
    </NotFoundStyle>
  );
}
