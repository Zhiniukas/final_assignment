import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

export const HeaderAuthed: FC = () => {
  const location = useLocation();
  return (
    <Box component={"header"} textAlign="center" margin="0 auto" width="90%">
      <Typography variant="h3" padding={4} fontWeight="300" fontSize="44px">
        Participant Registration System
      </Typography>

      <Grid
        container
        textAlign="center"
        mb={2}
        key={location.key}
        aria-label="Site header"
        item
        xs={12}
        padding="10px"
        justifyContent="space-between"
        bgcolor="cream"
        border="1px solid blue"
        mx="auto"
        sx={{
          "& MuiTypography-root": { fontSize: "12px" },
          color: "purple",
          textDecoration: "none",
          ":hover": { color: "green" },
          width: "100%",
        }}
      >
        <Grid item xs={1}>
          <Link to="/addParticipant">
            <Typography aria-label="Paerticipant registration">
              Participant registration
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={1}>
          <Link to="/events">
            <Typography aria-label="Event list">Event list</Typography>
          </Link>
        </Grid>
        <Grid item xs={1}>
          <Link to="/participants">
            <Typography aria-label="Participant list">
              Participant list
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={1}>
          <Link to="/logout" onClick={() => window.location.reload()}>
            <Typography aria-label="Logout">Logout</Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export const HeaderNotAuthed: FC = () => {
  const location = useLocation();
  return (
    <Box component={"header"} textAlign="center" margin="0 auto" width="90%">
      <Typography
        variant="h3"
        padding={4}
        fontWeight="300"
        fontSize="44px"
        color="red"
      >
        Participant Registration System
      </Typography>

      <Grid
        container
        textAlign="center"
        mb={2}
        key={location.key}
        aria-label="Site header"
        item
        xs={12}
        padding="10px"
        justifyContent="space-between"
        bgcolor="cream"
        border="1px solid blue"
        mx="auto"
        sx={{
          "& MuiTypography-root": { fontSize: "12px" },
          color: "purple",
          textDecoration: "none",
          ":hover": { color: "red" },
          width: "100%",
        }}
      >
        <Grid item xs={11}></Grid>
        <Grid item xs={1}>
          <Link to="/login" onClick={() => window.location.reload()}>
            <Typography aria-label="Sign in">Sign in</Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
