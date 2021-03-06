import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import pokerRedBkrd from '../images/pokerRedBkrd.jpg';
import Button from '@material-ui/core/Button';
import StartDateTime from '../stylesProject/StartDateTime';
import EndDateTime from '../stylesProject/EndDateTime';
import SelectGameLocation from '../stylesProject/SelectGameLocation';
import SelectGameBlindsName from '../stylesProject/SelectGameBlindsName';
import SelectGameName from '../stylesProject/SelectGameName';
import SelectKillStatus from '../stylesProject/SelectKillStatus';
import {updateNewGame, createNewGame } from '../actions/userActions';


const styles = theme => ({

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.unit *10,
    marginRight: theme.spacing.unit*10,
  },
  textField: {
    textAlign: "center",

    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class FormCreateGame extends Component {

  render(){
    //const { classes } = this.props;


    return (

      <div style={styles.container}>
      <h1>New Game Session</h1>
      <h4>Please add your recently played poker game session here:</h4>
        <form  onSubmit={this.handleSubmit}>
          <SelectGameLocation />

          <SelectGameName />

          <SelectGameBlindsName />

          <SelectKillStatus />
        <div >
          <TextField style={styles.textField}
          required
          id="standard-required"
          label="Buy In: $"
          defaultValue= ""
          margin="normal"
          onChange={e=>this.props.updateNewGame({buy_in: e.target.value })} type="integer"/>
        </div>
        <br/>
        <div>
        <StartDateTime style={styles.textField} updateNewGame={this.props.updateNewGame} value={this.props.newUserGame.start_date_time}/>
        </div>
        <br/>
        <div >
          <TextField
          style={styles.textField}
          required
          id="standard-required"
          label="Cash Out: $"
          defaultValue= ""
          margin="normal"
          onChange={e=>this.props.updateNewGame({cash_out: e.target.value})}
          type="integer"/>
        </div>
        <br/>
        <div>
        <EndDateTime style={styles.textField} updateNewGame={this.props.updateNewGame} value={this.props.newUserGame.end_date_time} />
        </div>
        <br/>
        </form>
        <Button variant="contained" color="primary" onClick={e => this.props.createNewGame(e, this.props.history)} >Submit New Game</Button>
        </div>
    )
  }

}
const mapStateToProps = ( state ) => {
  return {
    currentUser: state.currentUser,
    jwt: state.jwt,
    newUserGame: state.newUserGame
  }
}
const mapDispatchToProps = {

  updateNewGame: updateNewGame,
  createNewGame: createNewGame

}
FormCreateGame.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default  compose(
  withStyles(styles, {
    name: 'FormCreateGame',
  }),
  connect(mapStateToProps, mapDispatchToProps))(withRouter(FormCreateGame));

// export default connect(mapStateToProps, mapDispatchToProps)(FormCreateGame);
