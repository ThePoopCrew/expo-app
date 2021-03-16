import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
import InputStyles from '../components/InputStyles'
import SwipeConfig from '../components/SwipeConfig';

/**
 * Greets the user in registration.
 * 
 * @param {Route} route
 * @param {Navigator} navigation 
 */
const Handle = ({ route, navigation }) => {
  // Names are stateful
  const [handle, setHandle] = useState('');

  // Proceed to the next step in registration.
  const proceed = () => {
    // Create profileData to be passed along.
    const profileData = route.params.profileData;

    if (handle == '') return;

    profileData.handle = handle;

    // Navigate with new items.
    navigation.navigate('Like', {
      profileData: profileData,
    });
  }

  return (
    <GestureRecognizer
    onSwipeLeft={proceed}
    onSwipeRight={() => navigation.navigate('Name')}
    config={SwipeConfig}
    style={Styles.container}
    >
      <Text style={[Styles.text, Styles.headerText]}>
        What should we&nbsp;
        <Text style={Styles.blueAccentText}>
        call&nbsp;
        </Text>
        you?
      </Text>
      <View style={{marginTop: 15}}>
        <TextInput 
          style={InputStyles.textInput}
          placeholder='Username'
          onChangeText={text => setHandle(text)}
        />
      </View>
    </GestureRecognizer>
  );
}
 
export default Handle;