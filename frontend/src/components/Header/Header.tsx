import { StyledLink } from "../../styles/StyledLink";
import { HeaderStyle } from "../../styles/HeaderStyle";
import { useContext } from "react";
import LoggedInMenu from "./LoggedInMenu";

export const Header = () => {
  return (
    <HeaderStyle>
      <StyledLink to="/">Home</StyledLink>
      {!isLoggedIn ? (
        <LoggedInMenu />
      ) : (
        <StyledLink to="/login">Login</StyledLink>
      )}
    </HeaderStyle>
  );
};
