import ProfileCard from '../../kiddos/Home/ProfileCard/ProfileCard'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Buttons from '../../kiddos/Home/Buttons/Buttons'
import Error from '../../components/Errors/ErrorHome'
import NavBar from '../../components/NavBar/NavBar'
import MatchAlert from '../../kiddos/Home/MatchAlert'
import { baseUrl } from "../../constants/urls";
import Loading from '../../components/Loading/Loading'


function Home(props) {
  const [yes, setYes] = useState(false)
  const [no, setNo] = useState(false)

  const [profile, setProfile] = useState({})

  const [isMatch, setIsMatch] = useState(false)

  const [swipeLeft, setSwipeLeft] = useState(false)
  const [swipeRight, setSwipeRight] = useState(false)

  const [loaded, setLoaded] = useState(false)


  useEffect(() => {
    getProfile()
  }, [])


  const getProfile = () => {
    setLoaded(false)
    axios.get(`${baseUrl}/person`).then((res) => {
      setProfile(res.data.profile)
      setLoaded(true)
    }).catch((err) => {
      console.log(err.message)
    })

  }

  // yes / coração = true
  // no / x = false

  const mouseOverIcon = (answer) => {
    if (answer) {
      setYes(true)
    } else {
      setNo(true)
    }
  }

  const mouseOutIcon = () => {
    setYes(false)
    setNo(false)
  }

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsMatch(false);
  };

  const choosePerson = (answer) => {
    if (answer) {
      setYes(true)
      setSwipeLeft(true)
    } else {
      setNo(true)
      setSwipeRight(true)
    }

    const body = {
      id: profile.id,
      choice: answer
    }

    axios.post(`${baseUrl}/choose-person`, body).then((res) => {
      setIsMatch(res.data.isMatch)
      getProfile()
      setYes(false)
      setNo(false)
      setSwipeRight(false)
      setSwipeLeft(false)
    }).catch((err) => {
      console.log(err.message)
    })

  }

  return (
    <div>
      <MatchAlert open={isMatch} close={handleClose} />

      <NavBar getProfile={getProfile} currentPage={props.currentPage} goToHome={props.goToHome} goToMatches={props.goToMatches} />
      {loaded ? (!profile ? <Error /> : <ProfileCard swipeLeft={swipeLeft} swipeRight={swipeRight} profile={profile} />) : <Loading />}
      {loaded ? (!profile ? null : <Buttons mouseOverIcon={mouseOverIcon} mouseOutIcon={mouseOutIcon} no={no} yes={yes} choosePerson={choosePerson} />) : <Loading />}
    </div>
  )
  
}

export default Home;