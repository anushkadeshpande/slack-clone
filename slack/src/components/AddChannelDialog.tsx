import { useState, useRef } from "react";
import "./AddChannelDialog.css";
import { ADD_CHANNEL_URL } from '../endpoints'

const AddChannelDialog = ({
  addDialog,
  showAddDialog,
  setOverlayVisible,
}: any) => {
  const newChannelNameRef = useRef<HTMLInputElement>(null);
  const [addChannelResponse, setAddChannelResponse] = useState("");

  if (addDialog) setOverlayVisible(true);
  else {
    setOverlayVisible(false);
  }
  const addChannel = async () => {
    setAddChannelResponse("");
    if (
      newChannelNameRef.current?.value != null &&
      newChannelNameRef.current?.value != ""
    ) {
      const addChannelRespPromsise = await fetch(
        ADD_CHANNEL_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channel: newChannelNameRef.current?.value,
          }),
        }
      );

      const addChannelResp = await addChannelRespPromsise.text();
      if (addChannelResp === "New channel created successfully!") {
        setAddChannelResponse("");
        showAddDialog(false);
      } else setAddChannelResponse(addChannelResp);

      newChannelNameRef.current.value = "";
    } else setAddChannelResponse("Channel name cannot be empty");
  };

  return (
    <div
      className="Add_ch_Dialog"
      style={addDialog ? { display: "block" } : { display: "none" }}
    >
      <div className="Add_dialog_header">
        <h3>Add a new channel</h3>
        <button
          onClick={() => {
            showAddDialog(false);
            setAddChannelResponse("");
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

      <div className="Add_channel_section">
        <input placeholder="Channel name" ref={newChannelNameRef} />
        <button onClick={() => addChannel()}>Add channel</button>
        <p style={{ marginTop: "10px" }}>{addChannelResponse}</p>
      </div>
    </div>
  );
};

export default AddChannelDialog;
