import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Styles from '../components/Styles';
import InputStyles from '../components/InputStyles';
import { Button } from 'react-native-material-ui';

/**
 * Logs a user in.
 */
const LoginSplash = () => {
  // Email and Password are stateful
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    // TODO
    // Make API call.
    // Store the session in Async storage.

    /*
    const user = `{"email": ${email}, "password": ${password}}`
    const result = api call with user
    if (result !== null)
      createSession(result)
    */
  };

  return (
    <View style={Styles.container}>
      <Text style={[Styles.text, Styles.headerText]}>
        Please&nbsp;
        <Text style={Styles.blueAccentText}>
        login
        </Text>
      </Text>
      <View style={{marginTop: 15}} />
      <TextInput 
        style={InputStyles.textInput}
        placeholder='wevibe@gmail.com'
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        style={InputStyles.textInput}
        placeholder={'password'}
        onChangeText={text => setPassword(text)}
      />
      <View style={{marginTop: 30}} />
      <Button
        raised
        primary
        text="Login"
        onPress={login}
      />
      <View style={{marginTop: 15}} />
      <Button
        raised
        text="Register"
      />
    </View>
  );
};
 
export default LoginSplash;