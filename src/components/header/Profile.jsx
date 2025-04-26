import "./header.css";

export const Profile = () => {
  let openProfileIs = false;
  function openProfile() {
    openProfileIs = !openProfileIs;
    const arrowOpen = document.querySelector('img[name="arrow"]');
    const listElement = document.querySelector(
      'div[class="header-avatar-list"]'
    );

    if (openProfileIs) {
      arrowOpen.attributes.src.value = "arrow-up.svg";
      listElement.style.display = "block";
    } else {
      arrowOpen.attributes.src.value = "arrow-down.svg";
      listElement.style.display = "none";
    }
  }

  return (
    <>
      <div className="header-avatar" onClick={openProfile}>
        <img
          className="header-avatar-logo"
          src="user-avatar.png"
          alt="Профиль"
        />
        <img
          className="header-avatar-arrow"
          src="arrow-down.svg"
          alt="Меню"
          name="arrow"
        />
        <div className="header-avatar-list">
          <div>
            Profile
            <img src="avatar-rect.svg" alt="Профиль" />
          </div>
          <div>Log Out</div>
        </div>
      </div>
    </>
  );
};
