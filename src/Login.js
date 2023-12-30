import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [username, usernameUpdate] = useState("");
  const [password, passwordUpdate] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:8000/users/" + username)
        .then((res) => res.json())
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter a valid username");
          } else {
            if (resp.password === password) {
              toast.success("Success");
              sessionStorage.setItem("username", username);
              usenavigate("/");
            } else {
              toast.error("Please Enter valid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to:" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  return (
    <section
      className="hero is-fullheight"
      style={{ backgroundColor: "rgb(198, 151, 116)" }}
    >
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-full">
              <form onSubmit={proceedLogin}>
                <div className="card">
                  <div className="card-header">
                    <h2>User Login</h2>
                  </div>
                  <div className="card-content">
                    <div className="field">
                      <label className="label">
                        User Name <span className="errmsg">*</span>
                      </label>
                      <div className="control">
                        <input
                          value={username}
                          onChange={(e) => usernameUpdate(e.target.value)}
                          className="input"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">
                        Password <span className="errmsg">*</span>
                      </label>
                      <div className="control">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => passwordUpdate(e.target.value)}
                          className="input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer level">
                    <div className="level-left">
                      <button type="submit" className="button is-primary">
                        Login
                      </button>
                    </div>
                    <div className="level-right">
                      <span className="level-item">
                        <Link className="button is-success" to="/register">
                          New User
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
