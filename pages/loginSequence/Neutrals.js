import React, { useState } from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../../components/Styles';
import SwipeConfig from '../../utils/SwipeConfig';
import GenreSelections from '../../components/genreButtons/GenreSelections';

/**
 * Selection menu for a user's 'learn more's.
 * 
 * @param {Route} route
 * @param {Navigator} navigation 
 */
const Neutrals = ({ route, navigation, userData, applyUserData, updateCurPage, applyRegistration }) => {
  // Genres are stateful and inhereted from previous selections.
  const [ genres, setGenres ] = useState(route.params.genres);

  // Update a dislike by key.
  const updateNeutrals = (key) => {
    const curGenres = genres;
    curGenres[key] = !curGenres[key];
    setGenres(curGenres);
  };

  // Proceed to the next step in registration.
  const proceed = () => {
    const profileData = userData;
    const remainingGenres = {};

    profileData.neutrals = [];

    // Add selected values to profileData, and push the rest to next step.
    for (const [key, value] of Object.entries(genres))
      if (value)
        profileData.neutrals.push(key);
      else
        remainingGenres[key] = value;

    // Apply the new changes.
    applyUserData(profileData);

    // Finish the process.
    applyRegistration();
  };

  // Return to the previous step in registration.
  const backtrack = () => {
    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex - 1);
    navigation.navigate('Dislikes', {
      pageIndex: route.params.pageIndex - 1,
    });
  };
 
  return (
    <GestureRecognizer
      onSwipeRight={backtrack}
      onSwipeLeft={proceed}
      config={SwipeConfig}
      style={Styles.container}
    >
      <Text style={Styles.headerText}>
      What are you&nbsp;
        <Text style={Styles.blueAccentText}>
        open&nbsp;
        </Text>
      to?
      </Text>
      <GenreSelections
        data={genres}
        color={'#0000FF44'}
        updateButtons={updateNeutrals}
      />
    </GestureRecognizer>
  );
};
 
export default Neutrals;