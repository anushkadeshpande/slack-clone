import { useState } from "react";
import "./Modal.css";
import Person from "../assets/Person";
import colors from "../assets/colorsRepo";
import { useDispatch } from "react-redux";
import { changeUserDpColor } from "../features/userSlice";

const Modal = ({ show, handleModalVisibility, handleOverlay, user }: any) => {
  const [dpCol, setDpCol] = useState(user.userDPCol);
    const dispatch = useDispatch()

  const updateUserDp = (color:string) => {
    setDpCol(color)
    dispatch(changeUserDpColor(color))
    fetch('http://192.168.1.37:8080/'+user.userName+"/updateUserDp", {  
    method: 'PUT', 
    // mode: 'cors', 
    headers: {
        'Content-Type': 'application/json'
      },
    body: color
  })

  
}

  if (show) handleOverlay(true);
  return (
    <div
      className="Modal"
      style={show ? { display: "block" } : { display: "none" }}
    >
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
      </div>
    </div>
  );
};

export default Modal;
