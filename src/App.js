import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';

import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state={
      user:null
    };

    this.handleAuth=this.handleAuth.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {

      let userInfo=null;

      if(user){
        userInfo={
          displayName:user.displayName,
          email:user.email,
          photoURL:user.photoURL
        }  
      }
      this.setState({user:userInfo})
    });
  }

  renderGoogleButton(){
    if(this.state.user){
      return(<div>
                <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                <p>Hola {this.state.user.displayName}!</p>
                <button onClick={this.handleLogout}>Logout</button>
                <FileUpload/>
              </div>);
    }else{
      return(<button onClick={this.handleAuth}>Login con Google</button>);
    }
  }

  handleLogout(){
    firebase.auth().signOut()
      .then(result => console.log(`Ha cerrado sesión`))
      .catch(error => console.log(`Error ${error.code}:${error.message}`));
  }


  handleAuth(){
    const provider=new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}:${error.message}`));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Pseudogram</h2>
        </div>
        <div className="App-intro">
         {this.renderGoogleButton()}
        </div>
      </div>
    );
  }
}

export default App;
