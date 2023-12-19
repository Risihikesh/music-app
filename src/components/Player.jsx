import React from "react";
// import a from "../images/1.png";
import { useEffect } from "react";
import "../components/css/Player.css";
// import b from "../images/Cover.png";
import more from "../images/more.png";
import prev1 from "../images/prev.png";
import play1 from "../images/play.png";
import pause from "../images/pause.png";
import next1 from "../images/next.png";
import volume from "../images/volume.png";
import muted from "../images/muted.png";
import progress from "../images/progress.png";

function Player(props) {
  // const [current1, setcurrent1] = React.useState(props.current)
  // let current1=props.current;
  let flag = 0;
  let flag2 = 0;
  useEffect(() => {
    console.log(props.currentsong, "player");
  }, [props.currentsong]);

  function handleplay() {
    let play = document.getElementById("audio");
    let imgchange = document.getElementById("play");
    if (flag == 1) {
      play.play();
      flag = 0;
      imgchange.src = pause;
    } else {
      play.pause();
      flag = 1;
      imgchange.src = play1;
    }

    // console.log("play");
  }
  function handlemute() {
    let mute = document.getElementById("audio");
    let imgchange2 = document.getElementById("mute");
    if (flag2 == 0) {
      mute.muted = true;
      flag2 = 1;
      imgchange2.src = muted;
    } else {
      mute.muted = false;
      flag2 = 0;
      imgchange2.src = volume;
    }

    // console.log("mute");
  }

  useEffect(()=>{
    console.log(props.current);
  },[props.current])


  const prev = ()=>{  
    console.log("prev");
    // console.log(props.current);
    // setcurrent1(current1-1);
    props.setcurrent(props.current-1)
    // current1=current1-1;    
    setTimeout(() => {
      console.log(props.current)

    }, 1000);
    
    props.setcurrentsong(props.songdata[props.current])
    handleclick(props.current);
  }

  const next = ()=>{
    console.log("next")
    // console.log(props.current);
    // setcurrent1(current1+1);
    // current1=current1+1;
    props.setcurrent(props.current+1);
    setTimeout(() => {
      console.log(props.current)

    }, 1000);
   
    props.setcurrentsong(props.songdata[props.current])
    handleclick(props.current);
   
    // console.log(audio)
    // setTimeout(()=>{
    //   console.log("aya")
     
    //  },100)
  }

  useEffect(()=>{
    setTimeout(() => {
      let audio = document.getElementById("audio") ;
      audio.play();
    }, 100);
  
  },[props.currentsong])

  function handleclick(index){
 
    let blur = document.getElementById(`${index}`)
    blur.style.background= "#FFFFFF54";
    blur.style.borderRadius= "15px";
  
    ;
    
    for(let i=0 ; i<props.songdata.length; i++){
      if(i!==index){
      let blur = document.getElementById(`${i}`);
      console.log(blur);
      blur.style.background="none";
      
      }
    }
  }
  
  return (
    <div>
      {props.currentsong ? (
        <div className="player_container">
          <div className="backgroundimg">
            <img src={props.currentsong.track.album.images[0].url} alt="" />
          </div>
          <audio
            src={props.currentsong.track.preview_url}
            controls
            id="audio"
            loop="loop"
          ></audio>
          <div className="tracks_details">
            <p id="title">{props.currentsong.track.name} </p>

            <p id="artist">{props.currentsong.track.artists[0].name}</p>
          </div>
          <div className="song_image">
            <img src={props.currentsong.track.album.images[0].url} alt="" />
          </div>
          <div className="progressbar">
            <img src={progress} alt="progress" />
          </div>
          <div className="controls">
            <div className="more">
              <img src={more} alt="more" />
            </div>
            <div className="buttons">
              <img id="prev" src={prev1} alt="prev" onClick={prev}/>
              <img id="play" src={play1} onClick={handleplay} alt="play" />
              <img id="next" src={next1} alt="next" onClick={next}/>
            </div>
            <div className="volume">
              <img id="mute" src={volume} onClick={handlemute} alt="volume" />
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}

export default Player;
