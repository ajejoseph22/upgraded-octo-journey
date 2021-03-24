import styled from "styled-components";

const StyledNavBar = styled.nav`
  height: 60px;
  background: #f2f3f4;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);

  & > div {
    text-align: center;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;

    &.selected {
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
    <div id="navbar_logo">Honesto</div>
    <div className="selected">Share feedback</div>
    <div>My feedback</div>
    <div>Team feedback</div>
    <div>Teams</div>
    <div>Next Feedback cycle</div>
    <div id="navbar_profile-area">Profile Area</div>
  </StyledNavBar>
);

export default NavBar;
