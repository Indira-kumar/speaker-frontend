import React, { useState } from "react";
import "../css/SignInUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../../config/firebase";

const SignInUp = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [tabs, setTabs] = useState(0);
  const [message, setMessage] = useState("");
  // const [provider, setProvider] = useState()
  const navigate = useNavigate();
  // Google Response
  const googleSuccessResponse = (response) => {
    axios
      .post(`${process.env.REACT_APP_URL}/auth/login`, {
        name: response.displayName,
        email: response.email,
        provider: "google",
        phone: "null",
      })
      .then((data) => {
        console.log("Success", data?.data);
        localStorage.setItem("@token", JSON.stringify(data?.data));
        if (data?.data?.userdata?.role === "MODERATOR") {
          navigate("/myprofile", { replace: true });
        }
        // if (data?.data?.isSubscribed) {
        else navigate("/events", { replace: true });
        // }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const googleFailureResponse = (response) => {
    console.log(response);
  };

  const handleSubmit = (e, provide) => {
    console.log("API working");
    if (email === "") {
      return setMessage("Please enter the details");
    }
    e.preventDefault();
    if (provide) {
      axios
        .post(`${process.env.REACT_APP_URL}/auth/login`, {
          name: name,
          email: email,
          provider: "email",
          phone: "null",
        })
        .then((data) => {
          console.log("Success", data?.data);
          localStorage.setItem("@token", JSON.stringify(data?.data));
          if (data?.data?.userdata?.role === "MODERATOR") {
            navigate("/myprofile", { replace: true });
          }
          // if (data?.data?.isSubscribed) {
          else navigate("/events", { replace: true });
          // }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  return (
    <div className="mp-parent" style={{ background: "none", marginTop: "0" }}>
      <div className="mp-left siu-left">
        <div className="siul-child">
          <div className={tabs == 0 ? "mpl-heading " : ""}>
            <p onClick={() => setTabs(0)}>Login</p>
          </div>

          {message && (
            <p
              style={{
                color: "red",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )}

          {tabs === 0 && (
            <form>
              <div className="siubtn-parent">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    signInWithPopup(auth, provider)
                      .then((result) => {
                        const credential =
                          GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        const user = result.user;
                        console.log(user);
                        googleSuccessResponse(user);
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        const email = error.customData.email;
                        const credential =
                          GoogleAuthProvider.credentialFromError(error);
                      });
                  }}
                >
                  Login with Google
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="siul-child">
          <div className="siul-child1">
            <div className="siul-child2">
              <h4>4000+ Speaking Opportunities From Across The World</h4>
              <p>
                New leads to apply everyday! Focus on speaking, not lead
                generation. Business growth opportunity - connect with the right
                audience.
              </p>
            </div>
            <br />
            <div>
              <h4>100+ SpeakerOre Exclusive Events</h4>
              <p>
                Reduces competition increasing the probability of being selected
                as a speaker
              </p>
            </div>
            <br />

            <div>
              <h4> Directly contact the event managers</h4>
              <p>
                No commissions, favouritism. Deal directly with the event
                managers.
              </p>
            </div>
            <br />

            <div>
              <h4> Saves your precious resources (Time, Money & Effort)</h4>
              <p>
                Easy, Efficient and Cost Effective. Saves Effort, Time and Money
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <LoggedInSidebar /> */}
    </div>
  );
};
export default SignInUp;
