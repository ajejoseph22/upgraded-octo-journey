import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavBar = styled.nav`
  height: 7.5vh;
  background: #f2f3f4;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);

  & > a,
  & > div {
    text-align: center;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #031323;

    &.selected:not(#navbar_logo) {
      border-bottom: 3px solid #ab61e5;
      height: 95%;
    }
  }

  #navbar_logo {
    width: 20vw;
    font-weight: bold;
    font-size: 18px;
  }

  #navbar_profile-area {
    width: 15vw;
    border-left: 1px solid #d9dcde;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NavBar = () => (
  <StyledNavBar>
    <NavLink to="/" exact activeClassName="selected" id="navbar_logo">
      Honesto
    </NavLink>
    <NavLink to="/share-feedback" activeClassName="selected">
      Share feedback
    </NavLink>
    <NavLink to="/my-feedback" activeClassName="selected">
      My feedback
    </NavLink>
    <NavLink to="/team-feedback" activeClassName="selected">
      Team feedback
    </NavLink>
    <NavLink to="/teams" activeClassName="selected">
      Teams
    </NavLink>
    <div>Next Feedback cycle</div>
    <div id="navbar_profile-area">Profile Area</div>
  </StyledNavBar>
);

export default NavBar;
