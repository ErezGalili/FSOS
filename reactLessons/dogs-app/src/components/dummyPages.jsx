import { Link, useParams, NavLink, Outlet } from "react-router-dom";
import "./css/dummyPage.css";

const DummyHeader = () => (
  <header className="dummyHeader">
    <Link to="/">Home</Link>
    {[1, 2, 3, 4, 5].map((num) => (
      <NavLink
        key={num}
        to={`/page/${num}`}
        style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
      >
        Page {num}
      </NavLink>
    ))}
  </header>
);

function DummyLayout() {
  return (
    <>
      <DummyHeader />
      <Outlet />
    </>
  );
}

export function DummyPage() {
  const { num } = useParams();
  return (
    <>
      <h1>This is page {num}</h1>
    </>
  );
}

export default DummyLayout;

