

export function getAllGameNamesList(){
  return dispatch => {
    fetch('http://localhost:3000/api/v1/game_names', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(payload =>
      dispatch( {type: 'GET_ALL_GAME_NAMES_LIST', payload: payload } )
    )

  }
}

// export function updateNewGameName(gameNameAttributes){
//   return ({
//     type: 'UPDATE_NEW_GAME_NAME',
//     payload: gameNameAttributes
//   })
// }
export function UPDATE_CURRENT_GAME_NAME(gameNameAttributes){
  return ({
    type: 'UPDATE_CURRENT_GAME_NAME',
    payload: gameNameAttributes
  })
}

export function selectGameName(payload){

  return ({
    type: 'UPDATE_NEW_GAME',
    payload: { game_name_id: payload.id }
  })
}
export function setGameNameSearch(payload){
  // console.log('GameLocation: ', payload)
  return ({
    type: 'UPDATE_GAME_FILTERS',
    payload: {game_name_id: payload.id}
  })
}
