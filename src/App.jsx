import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);
  return (
    <>
      {token ? <Spotify /> : <Login />}
    </>
  )
}

export default App
