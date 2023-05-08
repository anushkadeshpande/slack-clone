import { useState, useRef } from "react";
import "./UserProfileModal.css";
import Person from "../assets/Person";
import colors from "../assets/colorsRepo";
import { useDispatch } from "react-redux";
import { changeUserDpColor } from "../features/userSlice";
import salt from "../salt";
import CryptoJS from "crypto-js";

const Modal = ({ show, handleModalVisibility, handleOverlay, user }: any) => {
  const [dpCol, setDpCol] = useState(user.userDPCol);
  const [passwordChangeResponse, setPasswordChangeResponse] = useState("");
  const dispatch = useDispatch();

  const oldPwdRef = useRef<HTMLInputElement>(null);
  const newPwdRef = useRef<HTMLInputElement>(null);
  const newPwdConfirmRef = useRef<HTMLInputElement>(null);

  const updateUserDp = (color: string) => {
    setDpCol(color);
    dispatch(changeUserDpColor(color));
    fetch(
      "https://slack-backend.up.railway.app/" + user.userName + "/updateUserDp",
      {
        method: "PUT",
        // mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: color,
      }
    );
  };

  const updatePassword = async () => {
    // if passwords are empty
    if (
      oldPwdRef.current?.value == "" ||
      oldPwdRef.current?.value == null ||
      newPwdRef.current?.value == "" ||
      newPwdRef.current?.value == null ||
      newPwdConfirmRef.current?.value == "" ||
      newPwdConfirmRef.current?.value == null
    )
      setPasswordChangeResponse("Please fill all the fields!");
    // else check if new password matches the confirmation password
    else if (newPwdRef.current?.value === newPwdConfirmRef.current?.value) {
      // get old encrypted passwd
      const oldPassword = await fetch(
        "https://slack-backend.up.railway.app/" +
          user.userName +
          "/getCurrentPassword",
        {
          method: "GET",
          // mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const oldChangeResponseString = await oldPassword.text();
      // decrypt it
      let oldPwd = CryptoJS.AES.decrypt(oldChangeResponseString, salt).toString(
        CryptoJS.enc.Utf8
      );

      // match with entered old pwd
      if (oldPwd == oldPwdRef.current?.value) {
        const pwdChangeResponse = await fetch(
          "https://slack-backend.up.railway.app/" +
            user.userName +
            "/changePassword",
          {
            method: "PUT",
            // mode: 'cors',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPassword: CryptoJS.AES.encrypt(
                newPwdRef.current?.value,
                salt
              ).toString(),
            }),
          }
        );
        const pwdChangeResponseString = await pwdChangeResponse.text();
        await setPasswordChangeResponse(pwdChangeResponseString);
        oldPwdRef.current.value = "";
        newPwdRef.current.value = "";
        newPwdConfirmRef.current.value = "";
      }
      else 
      setPasswordChangeResponse("Old Password is incorrect!");
    } else {
      setPasswordChangeResponse("The passwords do not match!");
      oldPwdRef.current.value = "";
      newPwdRef.current.value = "";
      newPwdConfirmRef.current.value = "";
    }
  };

  if (show) handleOverlay(true);
  return (
    <div
      className="Modal"
      style={show ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-header">
        <h2>{user.userName}</h2>
        <button
          onClick={() => {
            handleModalVisibility(false);
            handleOverlay(false);
          }}
          className="close-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="Modal__contents">
        <div className="userDp">
          <div className="userDp__image">
            <Person color={dpCol} />
          </div>
          <div className="userDp__colorOptions">
            {colors.map((color) => (
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: color,
                  borderRadius: "5px",
                }}
                onClick={() => updateUserDp(color)}
              ></div>
            ))}
          </div>
        </div>

        <div className="userPassword">
          <h3>Change your password</h3>
          <input placeholder="Old Password" ref={oldPwdRef} type="password" />
          <input placeholder="New Password" ref={newPwdRef} type="password" />
          <input
            placeholder="Confirm New Password"
            ref={newPwdConfirmRef}
            type="password"
          />
          <button onClick={updatePassword}>Update Password</button>
          <p style={{ color: "#fff", marginTop: "10px" }}>
            {passwordChangeResponse}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
