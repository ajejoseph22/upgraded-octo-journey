import styled from "styled-components";
import classNames from "classnames";

const StyledFeedBackItemList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;

  &.clickable:hover {
    background: #fbf7fe;
    cursor: pointer;
  }

  .profile-image {
    border-radius: 50%;
    margin-right: 20px;
  }

  .user-profile-area {
    display: flex;
    align-items: center;
  }

  button {
    cursor: pointer;
    padding: 5px 10px;
  }
`;

const FeedBackItemList = ({
  users,
  handleClickFill,
  handleClick,
  showFillButton = true,
}) => {
  const classes = classNames({
    "feedback-item": true,
    clickable: !showFillButton,
  });

  return users.map((user) => (
    <StyledFeedBackItemList
      onClick={showFillButton ? () => {} : () => handleClick(user)}
      key={user.id}
      className={classes}
    >
      <div className="user-profile-area">
        <img
          width={58}
          height={58}
          src={user.avatar}
          alt={`${user.firstName}-profile`}
          className="profile-image"
        />
        <span>
          {user.firstName} {user.lastName}
        </span>
      </div>
      {showFillButton && (
        <button onClick={() => handleClickFill(user)}>Fill</button>
      )}
    </StyledFeedBackItemList>
  ));
};

export default FeedBackItemList;
