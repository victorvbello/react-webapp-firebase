import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';

import './App.css';
import logo from './familia.png';

class App extends Component {
  constructor(){
    super();

    this.state={
      user:null,
      percentage:0,
      pictures:[]
    };

    this.handleAuth=this.handleAuth.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
    this.handleUpload=this.handleUpload.bind(this);
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

    firebase.database().ref('photo').on('child_added', snapshot=>{
      this.setState({
        pictures:this.state.pictures.concat(snapshot.val())
      })
    })
  }

  renderGoogleButton(){
    if(this.state.user){
      return(<div className="App-intro">
                <p className="App-intro">¡Hola, { this.state.user.displayName }!</p>
                <button onClick={this.handleLogout}>Logout</button>
                <FileUpload onUpload={this.handleUpload} percentage={this.state.percentage}/>

                {
                  this.state.pictures.map(picture=>{
                   return(
                     <div className="App-card"  key={Math.random()}>
                      <figure className="App-card-image">
                        <img width="320" src={picture.photoURL} alt="Error"/>
                        <figCaption className="App-card-footer">
                          <img className="App-card-avatar" src={picture.userImage} alt={picture.userDisplayName} />
                          <span className="App-card-name">{picture.userDisplayName}</span>
                        </figCaption>
                      </figure>
                    </div>
                   );
                  }).reverse()
                }

              </div>);
    }else{
      return(<button onClick={this.handleAuth}>Login width Google</button>);
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

  handleUpload(event){
    const file=event.target.files[0];
    const storageRef=firebase.storage().ref(`photos/photo-${Math.random()}-${file.name}`);
    const task=storageRef.put(file);

   task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        percentage:percentage
      })
    }, (error) => {
      console.error(error.message)
    }, () => {
      const record={
        userImage:this.state.user.photoURL,
        userDisplayName:this.state.user.displayName,
        photoURL:task.snapshot.downloadURL
      }

      const dbRef=firebase.database().ref('photo');
      const newPicture=dbRef.push();
      newPicture.set(record);

      this.setState({
        percentage:0
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Familia 2017</h2>
        </div>
        <div className="App-intro">
         {this.renderGoogleButton()}
        </div>
      </div>
    );
  }
}

export default App;
