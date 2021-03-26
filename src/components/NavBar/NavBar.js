import React from 'react'
import axios from "axios";
import Tooltip from '@material-ui/core/Tooltip'
import goBack from '../../assets/go-back.svg'
import matches from '../../assets/matches.svg'
import logo from '../../assets/logo-astromatch.svg'
import pinkClean from '../../assets/pink-clean.svg'
import blueClean from '../../assets/blue-clean.svg'
import { baseUrl } from '../../constants/urls'
import { Clean, NavContainer, Logo, GoBack, Matches } from './styledNav'


function NavBar(props) {


  const clearAll = () => {
    const beSure = window.confirm("Are you sure you want to delete all matches and seen profiles?")

    if (beSure) {

      axios.put(`${baseUrl}/clear`).then((res) => {
        console.log(res)

        if (props.currentPage === "home") {
          props.getProfile()
        } else {
          props.getMatches()
        }
        alert("I've deleted everything!")
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }

  return (
    <NavContainer>
      {props.currentPage === "home" ? (<Tooltip title="Reset" arrow>
        <Clean src={pinkClean} onClick={clearAll} />
      </Tooltip>)
        : <GoBack src={goBack} onClick={props.goToHome} />}
      <Logo src={logo} />
      {props.currentPage === "home" ? <Matches src={matches} onClick={props.goToMatches} /> :
        (<Tooltip title="Reset" arrow>
          <Clean src={blueClean} onClick={clearAll} />
        </Tooltip>)}
    </NavContainer>
  );
}

export default NavBar;