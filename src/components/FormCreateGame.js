import React, { Component } from 'react';
import { connect } from 'react-redux';

class FormCreateGame extends Component {
  render(){
    const style={
      border: "1px solid green",
      padding: "1rem",
      margin: "1rem"
    };
    return (
      <div style={style}> Hello Create Played Game Form
      <form>
      
      </form>


      </div>
    )
  }

}
const mapStateToProps = ( state ) => {
  return {

  }
}
const mapDispatchToProps = {


}

export default connect(mapStateToProps, mapDispatchToProps)(FormCreateGame);
