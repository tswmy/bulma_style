import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css"; // Import Bulma CSS

function Questions() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [responses, setResponses] = useState({
    question1: null,
    question2: null,
  });

  const navigate = useNavigate();

  const handleTeamSelection = (team) => {
    setSelectedTeam(team);
  };

  const handleResponseChange = (question, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [question]: value,
    }));
  };

  const handleSubmit = () => {
    const username = "id";
    const userId = "id";

    console.log("Responses:", responses);

    fetch(`http://localhost:8000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        responses: {
          ...responses,
          team: selectedTeam,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response submitted successfully:", data);

        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting response:", error);
      });
  };

  return (
    <div className="section" style={{ backgroundColor: "rgb(248, 223, 212)" }}>
      <div className="container">
        <div className="has-text-centered">
          <h2 className="title is-2">Questions</h2>

          <div className="buttons">
            <button
              className={`button is-secondary ${
                selectedTeam === "TeamA" ? "is-active" : ""
              }`}
              onClick={() => handleTeamSelection("TeamA")}
            >
              Team A
            </button>
            <button
              className={`button is-secondary ${
                selectedTeam === "TeamB" ? "is-active" : ""
              }`}
              onClick={() => handleTeamSelection("TeamB")}
            >
              Team B
            </button>
          </div>

          {selectedTeam && (
            <div>
              <h3 className="title is-3">{`Questions for ${selectedTeam}`}</h3>
              {selectedTeam === "TeamA" && (
                <div>
                  <p>
                    <label className="radio">
                      <input
                        type="radio"
                        name="question1"
                        value="Option1"
                        onChange={() =>
                          handleResponseChange("question1", "Option1")
                        }
                      />
                      How are you?
                    </label>
                  </p>
                  <p>
                    <label className="radio">
                      <input
                        type="radio"
                        name="question1"
                        value="Option2"
                        onChange={() =>
                          handleResponseChange("question1", "Option2")
                        }
                      />
                      What is your Name?
                    </label>
                  </p>
                </div>
              )}
              {selectedTeam === "TeamB" && (
                <div>
                  <p>
                    <label className="radio">
                      <input
                        type="radio"
                        name="question2"
                        value="Option1"
                        onChange={() =>
                          handleResponseChange("question2", "Option1")
                        }
                      />
                      How many members are there in your team?
                    </label>
                  </p>
                  <p>
                    <label className="radio">
                      <input
                        type="radio"
                        name="question2"
                        value="Option2"
                        onChange={() =>
                          handleResponseChange("question2", "Option2")
                        }
                      />
                      Who is the best athlete in your team?
                    </label>
                  </p>
                </div>
              )}
              <button className="button is-success" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;
