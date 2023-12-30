import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bulma/css/bulma.min.css";
import "./App.css";

const Register = () => {
  const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [password, passwordChange] = useState("");
  const [email, emailChange] = useState("");
  const [mobile, mobileChange] = useState("");

  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "Please enter a value in ";
    if (id === null || id === "") {
      isProceed = false;
      errorMessage += "Username";
    }
    if (password === null || password === "") {
      isProceed = false;
      errorMessage += "Password";
    }
    if (name === null || name === "") {
      isProceed = false;
      errorMessage += "Name";
    }
    if (email === null || email === "") {
      isProceed = false;
      errorMessage += "Email";
    }
    if (mobile === null || mobile === "") {
      isProceed = false;
      errorMessage += "Mobile Number";
    }
    if (!isProceed) {
      toast.warning(errorMessage);
    } else {
      if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
      } else {
        isProceed = false;
        toast.warning("Please enter a valid email");
      }
    }
    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let regobj = { id, name, password, email, mobile };
    if (isValidate()) {
      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Registered Successfully");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };

  return (
    <div
      className="hero is-fullheight is-flex is-justify-content-center is-align-items-center"
      style={{ backgroundColor: "rgb(248, 223, 212)" }}
    >
      <form className="box" onSubmit={handleSubmit} style={{ width: "600px" }}>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Register</p>
          </header>
          <div className="card-content">
            <div className="field">
              <label className="label">User Name *</label>
              <div className="control">
                <input
                  value={id}
                  onChange={(e) => idChange(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password *</label>
              <div className="control">
                <input
                  value={password}
                  onChange={(e) => passwordChange(e.target.value)}
                  type="password"
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Name *</label>
              <div className="control">
                <input
                  value={name}
                  onChange={(e) => nameChange(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email *</label>
              <div className="control">
                <input
                  value={email}
                  onChange={(e) => emailChange(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Mobile Number *</label>
              <div className="control">
                <input
                  value={mobile}
                  onChange={(e) => mobileChange(e.target.value)}
                  className="input"
                />
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <button type="submit" className="button is-primary">
              Register
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
};

export default Register;
