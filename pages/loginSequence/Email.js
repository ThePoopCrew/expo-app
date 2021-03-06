import React, { useState } from 'react';
import { Text, TextInput, View, Alert } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import InputStyles from '../../components/InputStyles';
import Styles from '../../components/Styles';
import SwipeConfig from '../../utils/SwipeConfig';
import emailExists from '../../utils/emailExists';

/**
 * Greets the user in registration.
 * 
 * @param {Route} route
 * @param {Navigator} navigation 
 */
const Email = ({ route, navigation, userData, applyUserData, updateCurPage }) => {
  // Email and Password are stateful
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Proceed to the next step in registration.
  const proceed = async () => {
    // Don't allow the user to continue if empty fields.
    if (email == '' || password == '') {
      Alert.alert(
        'Hold up.',
        'You really should fill these fields out...'
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Hold up.',
        'Passwords must be 6 characters or longer.'
      );
      return;
    }

    try {
      if (await emailExists(email)) {
        Alert.alert(
          'Hold up.',
          'That email is taken, try a different one.'
        );
        return;
      }
    } catch (err) {
      console.error(err);
      Alert.alert(
        'Hold up.',
        'We couldn\'t verify the status of that email, try again.'
      );
      return;
    }

    // Grab and update the data.
    const profileData = userData;
    
    profileData.email = email;
    profileData.password = password;

    // Apply the new changes.
    applyUserData(profileData);

    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex + 1);
    navigation.navigate('Likes', {
      pageIndex: route.params.pageIndex + 1,
    });
  };

  // Return to the previous step in registration.
  const backtrack = () => {
    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex - 1);
    navigation.navigate('Username', {
      pageIndex: route.params.pageIndex - 1,
    });
  };

  return (
    <GestureRecognizer
      onSwipeLeft={proceed}
      onSwipeRight={backtrack}
      config={SwipeConfig}
      style={Styles.container}
    >
      <Text style={[Styles.text, Styles.headerText]}>
        How do you want to&nbsp;
        <Text style={Styles.blueAccentText}>
        login?
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
    </GestureRecognizer>
  );
};
 
export default Email;