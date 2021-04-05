import firebase from './Firebase';
import axios from 'axios';
import ApiConfig from './ApiConfig';

// Login a user with an email and password
const login = async (email, password) => {

  const userData = {
    email: email,
    password: password,
  };

  axios.post(
    ApiConfig.login,
    userData
  ).then(result => {
    if (result.data.token) {
      firebase.auth().signInWithEmailAndPassword(
        email,
        password
      ).catch(console.error);
    }
  }).catch(console.error);
};

export default login;