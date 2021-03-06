import { store, defaultState } from '../store';
import { getUserGameData } from '../actions/userActions';
import { getAllGameNamesList } from '../actions/gameNameActions';
import { getAllLocationsList } from '../actions/gameLocationActions';
import { getAllBlindsList } from '../actions/blindsNameActions';
import { getAllKillStatusList } from '../actions/killStatusActions';
import { getAllNotes } from '../actions/noteActions';



export default function usersReducer(currentState, action) {
  // console.log(store, defaultState)
  let newState = {...currentState}
    switch(action.type){
  case 'UPDATE_NEW_USER':
    newState.newUser = { ...newState.newUser, ...action.payload }
  break;
  case 'UPDATE_CURRENT_USER':
    newState.currentUser = { ...newState.currentUser, ...action.payload }
  break;
  case 'CREATE_NEW_USER':
  //fetch post to users
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newState.newUser)
      })
      .then( resp => resp.json())
      .then( payload => {
        if(!payload.error){
        store.dispatch({ type: 'LOGIN_NEW_USER', payload: payload})
      } else {
        store.dispatch({ type: 'DISPLAY_ERROR', payload: payload})
      }
    })
  break;
  case 'ATTEMPT_TO_LOGIN_USER':
  // fetch auth(login)
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newState.currentUser)
      })
      .then( resp => resp.json())
      .then( payload => {
        if(!payload.error){
          store.dispatch({ type: 'LOGIN_USER', payload: payload})
        } else {
          store.dispatch({ type: 'DISPLAY_ERROR', payload: payload})
        }
      })
  break;
  case 'GET_USER_GAME_DATA':
    newState.userPlayedGames = { ...newState.userPlayedGames, ...action.payload }
    newState.isChartLoaded = false
  break;
  case 'LOGIN_USER':
    newState.currentUser = action.payload.user
    newState.user_id = action.payload.user.id
    newState.isLoggedIn = true
    newState.jwt = action.payload.jwt
    localStorage.setItem('jwt', newState.jwt)
    localStorage.setItem('user_id', newState.user_id)
    store.dispatch(getAllNotes())
    store.dispatch(getAllGameNamesList())
    store.dispatch(getAllBlindsList())
    store.dispatch(getAllLocationsList())
    store.dispatch(getAllKillStatusList())
    store.dispatch(getUserGameData())
    newState.isLoading = false
  break;
  case 'GET_USER_PROFILE':
    newState.currentUser = { ...newState.currentUser, ...action.payload}
  break;
  case 'LOGIN_NEW_USER':
    newState.currentUser = action.payload.user
    newState.user_id = action.payload.user.id
    newState.isLoggedIn = true
    newState.jwt = action.payload.jwt
    localStorage.setItem('jwt', newState.jwt)
    localStorage.setItem('user_id', newState.user_id)
  break;
  case 'UPDATE_NEW_GAME':
    newState.newUserGame = {...newState.newUserGame, ...action.payload }
  break;
  case 'UPDATE_GAME_FILTERS':
    newState.gameFilters = { ...newState.gameFilters, ...action.payload }
    store.dispatch(getUserGameData(newState.gameFilters))
  break;
  case 'CREATE_NEW_GAME':
    newState.newUserGame.user_id = newState.currentUser.id
    if (newState.newUserGame.start_date_time < newState.newUserGame.end_date_time) {
    fetch('http://localhost:3000/api/v1/played_games', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newState.newUserGame)
      })
      .then( resp => resp.json())
      .then( payload => {
        if(!payload.error){
        //NEED info to refresh
        store.dispatch({ type: 'GET_USER_GAME_DATA', payload: payload, history: action.history})
        action.history.push('/:user/history')
        store.dispatch(getUserGameData())

      } else {
        store.dispatch({ type: 'DISPLAY_ERROR', payload: payload})
      }

    })
  } else {
    console.log("End time must be after start time.")
  }
  break;
  case 'EDIT_SELECTED_GAME':
    newState.selectedUserGame.user_id = newState.currentUser.id
    if (newState.newUserGame.start_date_time < newState.newUserGame.end_date_time) {
      fetch(`http://localhost:3000/api/v1/played_games/gameId`, {
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newState.selectedUserGame)
        })
        .then( resp => resp.json())
        .then( payload => {
          if(!payload.error){
          store.dispatch({ type: 'GET_USER_GAME_DATA', payload: payload, history: action.history})
          action.history.push('/:user/history')
          store.dispatch(getUserGameData())
        } else {
          store.dispatch({ type: 'DISPLAY_ERROR', payload: payload})
        }
      })
    } else {
      console.log("End time must be after start time.")
    }
  break;

  case 'DISPLAY_ERROR':
    newState.displayError = action.payload
  break;
  case 'LOGOUT_USER':
    newState.isLoading = true
    localStorage.clear()
    newState = defaultState
    newState.jwt = false
    newState.user_id = 0
  break;
  case 'SELECTED_GAME':
    newState.selectedGame = {...newState.selectedGame, ...action.payload }
    newState.selectedGameEmpty = false
  break;
  case 'CLEAR_FILTERS':
    newState.gameFilters =  { blinds_name_id: '',
      kill_status_id: '',
      game_location_id: '',
      game_name_id: '',
      start_date: '',
      end_date: ''
    }
    // newState.isChartLoaded = false;
    store.dispatch(getUserGameData())
  break;
  // case 'MARK_PLAYED_GAME_REVERSED':
  //   newState.isChartLoaded = true;
  // break;
  default:
  break;
  }//end switch
  return newState
}
