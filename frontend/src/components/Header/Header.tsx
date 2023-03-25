import type { FC } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const HeaderAuthed: FC = () => {
  return (
    <Box component={"header"} textAlign="center" margin="0 auto" width="600px">
      <Typography variant="h3" padding={2} fontWeight="300" fontSize="44px">
        Title
      </Typography>

      <Grid
        container
        textAlign="center"
        mb={2}
        sx={{
          "& a": {
            color: "purple",
            textDecoration: "none",
            ":hover": { color: "red" },
          },
        }}
      >
        <>
          <Grid item xs={12} sm={6}>
            <Link to="/">
              <Typography fontSize=" 32px">Home</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to="/addParticipant">
              <Typography fontSize=" 32px">Participant registration</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to="/events">
              <Typography fontSize=" 32px">Event list</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to="/participants">
              <Typography fontSize=" 32px">Participant list</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to="/logout">
              <Typography fontSize=" 32px">Logout</Typography>
            </Link>
          </Grid>
        </>
      </Grid>
    </Box>
  );
};

export const HeaderNotAuthed: FC = () => {
  return (
    <Box component={"header"} textAlign="center" margin="0 auto" width="600px">
      <Typography variant="h3" padding={2} fontWeight="300" fontSize="44px">
        Not authed
      </Typography>

      <Grid
        container
        textAlign="center"
        mb={2}
        sx={{
          "& a": {
            color: "purple",
            textDecoration: "none",
            ":hover": { color: "red" },
          },
        }}
      >
        <>
          <Grid item xs={12} sm={6}>
            <Link to="/login">
              <Typography fontSize=" 32px">Sign in</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to="/login">
              <Typography fontSize=" 32px">Register</Typography>
            </Link>
          </Grid>
        </>
      </Grid>
    </Box>
  );
};
