import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideMenu, selectMenu } from "../features/menuSlice";
import { setChannel, selectChannel } from "../features/currentChannelSlice";

import "./SideBar.css";
import AddChannelDialog from "./AddChannelDialog";

interface ChildComponentProps {
  view: String;
}

interface channel {
  channel: String;
}

const SideBar = ({ view }: ChildComponentProps) => {
  // console.log(view);
  const menu = useSelector(selectMenu);
  const channel = useSelector(selectChannel);
  const dispatch = useDispatch();
  const [styleClassName, setStyleClassName] = useState("SideBar");
  const [selectedChannel, setSelectedChannel] = useState("main");
  const [channelsList, setChannelsList] = useState<any[]>([]);
  const [addDialog, showAddDialog] = useState(false);

  useEffect(() => {
    if (view === "mobile" && menu) setStyleClassName("m_SideBar");
    else if (view === "desktop") setStyleClassName("SideBar");
    else if (!menu && view === "mobile") setStyleClassName("hide_menu");
  }, [menu]);

  useEffect(() => {
    dispatch(setChannel(selectedChannel));
  }, [selectedChannel]);

  useEffect(() => {
    const getChannelsList = async () => {
      const channelsPromise = await fetch(
        "https://slack-backend.up.railway.app/getChannelsList"
      );
      const channelsListJson = await channelsPromise.json();
      setChannelsList(channelsListJson);
    };

    getChannelsList();
  }, [addDialog]);
  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
    <div className={styleClassName}>
      {overlayVisible && <div className="overlay" />}
      <div className="SideBar__title">
        <p>Test</p>
        {/* desktop view */}
        {!menu ? (
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />{" "}
          </svg>
        ) : (
          // phone view
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => {
              dispatch(hideMenu());
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
      <div className="SideBar__menu">
        <span>
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
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
          <p>Threads</p>
        </span>

        <span>
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
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
          <p>More</p>
        </span>
      </div>

      <div className="SideBar__channels">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={8}
            stroke="currentColor"
            className="w-6 h-6"
            style={{ height: "10px", width: "10px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
          <p>Channels</p>
        </span>

        {channelsList.map((channel) => (
          <span
            onClick={() => setSelectedChannel(channel.channel)}
            className={
              selectedChannel === channel.channel ? "selected_channel" : ""
            }
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
                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
              />
            </svg>

            <p>{channel.channel}</p>
          </span>
        ))}

        <span
          id="addChannelButton"
          onClick={() => {
            showAddDialog(true);
          }}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p>Add Channels</p>
        </span>
      </div>

      <AddChannelDialog
        addDialog={addDialog}
        showAddDialog={showAddDialog}
        setOverlayVisible={setOverlayVisible}
      />
    </div>
  );
};

export default SideBar;
