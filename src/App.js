import './App.css';

import { GoogleAuthProvider, getAuth, signInWithPopup, GithubAuthProvider, signOut, FacebookAuthProvider } from "firebase/auth";

import initializeAuthentication from './firebase/firebase.initialize';
import { useState } from 'react';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch(error => console.log(error.message));
  }
  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)

      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      }).catch(error => console.log(error.message));
  }
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);

      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      }).catch(error => console.log(error.message));
  }
  return (
    <div className="App">
      {!user.name ? <div>
        <button onClick={handleGoogleSignIn}>Google Sign-In</button>
        <button onClick={handleGitHubSignIn}>GitHub SignIn</button>
        <button onClick={handleFacebookSignIn}>Facebook Login</button>
      </div> :
        <button onClick={handleSignOut}>Sign Out</button>}
      <br />
      {
        user.name &&
        <div>
          <h2>Welcome {user.name}</h2>
          <img src={user.photo} alt="profile" />
          <p>Your Email: {user.email}</p>
        </div>
      }
    </div>
  );
}

export default App;
