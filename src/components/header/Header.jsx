import "./header.css";
import { Profile } from "./Profile";

export const Header = () => {
  return (
    <>
      <div className="header">
        <div className="">
          <h1 className="header-logo">Awesome Kanban Board</h1>
        </div>
        <Profile />
      </div>
    </>
  );
};
