import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css"; // Import Bulma CSS

function Home() {
  const usenavigate = useNavigate();

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      usenavigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="header has-background-info">
        <Link to={"/"}>
          <button className="button is-primary">Home</button>
        </Link>
        <Link className="is-pulled-right" to={"/login"}>
          <button className="button is-primary">Logout</button>
        </Link>
      </div>
      <div
        className="has-background-primary-dark has-text-white"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <div className="container has-text-centered mt-5">
          <Link to={"/questions"}>
            <button className="button is-secondary">Choose your team</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
