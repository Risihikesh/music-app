import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import Sidebar from "./Sidebar";
import { reducerCases } from "../utils/Constants";
import "../components/css/Spotify.css";
import Songs from "./Songs";
import Player from "./Player";

export default function Spotify() {
  let [current, setcurrent] = useState(0)
  const [currentsong, setcurrentsong] = useState();
  const [songdata, setsongdata] = useState([]);

  const [{ token }, dispatch] = useStateProvider();
 
  useEffect(() => {
    console.log(songdata, "a");
    setcurrentsong(songdata[0]);
  }, [songdata]);
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  useEffect(() => {
    console.log(currentsong, "123");

  }, [currentsong]);


  useEffect(()=>{
    console.log(current);
  },[current])



  useEffect(() => {
    const getPlaybackState = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: data.is_playing,
      });
    };
    getPlaybackState();
  }, [dispatch, token]);
  return (
    <Container>
      <div className="maincontainer">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="songslist">
          <Songs
            current={current}
            setcurrentsong={setcurrentsong}
            currentsong={currentsong}
            songdata={songdata}
            setsongdata={setsongdata}
            setcurrent={setcurrent}
          />
        </div>
        <div className="player">
          <Player
            setcurrent={setcurrent}
            setcurrentsong={setcurrentsong}
            currentsong={currentsong}
            songdata={songdata}
            setsongdata={setsongdata}
            current={current}
          />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div``;
