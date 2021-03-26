import styled from "styled-components";

const StyledFeedBackItemList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;

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

const FeedBackItemList = ({ users, handleClickFill }) =>
  users.map((user) => (
    <StyledFeedBackItemList key={user.id} className="feedback-item">
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
      <button onClick={() => handleClickFill(user)}>Fill</button>
    </StyledFeedBackItemList>
  ));

export default FeedBackItemList;
