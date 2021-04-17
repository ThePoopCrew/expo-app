import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView } from 'react-native';
import Styles from '../components/Styles';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileButtons from '../components/profile/ProfileButtons';
import Posse from '../components/profile/Posse';
import Post from '../components/posts/Post';
import Empty from '../components/profile/Empty';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import NavStyles from '../components/NavStyles';
import { StatusBar } from 'expo-status-bar';
import logout from '../utils/logout';
import getProfile from '../utils/getProfile';
import getLikedPosts from '../utils/getLikedPosts';

const Profile = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [posseData, setPosseData] = useState([]);
  const [likesData, setLikesData] = useState([]);
  const [profileData, setData] = useState([]);
  const [tabSwitch, setTabSwitch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  let updateIndex = (newIndex) => {
    setSelectedIndex(newIndex);
    
    if (newIndex === 0)
      setData(posseData);
    else if (newIndex === 1)
      setData(likesData);
    
    setTabSwitch(!tabSwitch);
  };

  const logoutUser = async () => {
    await logout();
  };

  const profileItem = ({ item }) => {
    if (item.type === 'header')
      return <ProfileHeader data={item.data} />;
    else if (item.type === 'buttons')
      return <ProfileButtons function={updateIndex} />;
    else if (item.type === 'posse')
      return <Posse data={item} />;
    else if (item.type === 'post')
      return <Post data={item} />;
    else if (item.type === 'empty')
      return <Empty />;
  };

  const updateProfile = () => {
    setRefreshing(true);

    getProfile()
      .then(res => {
        if (res.data === undefined) return;

        const tempPosseData = [];
        const tempLikesData = [];

        const header = {
          id: '1',
          type: 'header',
          data: res.data,
        };

        const buttons = {
          id: '2',
          type: 'buttons',
        };

        const empty = {
          id: '3',
          type: 'empty',
        };

        tempPosseData.push(header);
        tempPosseData.push(buttons);

        if (res.data.posses) {
          res.data.posses.forEach((f, index) => {
            let tempPosse = {};
            tempPosse.id = (index + 3).toString();
            tempPosse.name = f;
            tempPosse.imagePath = 'https://picsum.photos/200';
            tempPosse.type = 'posse';
  
            tempPosseData.push(tempPosse);
          });
        } else {
          tempPosseData.push(empty);
        }

        tempLikesData.push(header);
        tempLikesData.push(buttons);

        getLikedPosts().then(likedRes => {
          if (likedRes.data === undefined) return;

          if (likedRes.data.results !== undefined && likedRes.data.results.length > 0) {
            likedRes.data.results.forEach(post => {
              post.imagePath = 'https://picsum.photos/200';
              post.alreadyLiked = true;
              post.id = post.postID;
              post.type = 'post';
              tempLikesData.push(post);
            });
          } else {
            tempLikesData.push(empty);
          }
        });

        setPosseData(tempPosseData);
        setLikesData(tempLikesData);
        
        if (selectedIndex === 0)
          setData(tempPosseData);
        else
          setData(tempLikesData);
        
        setRefreshing(false);
        setTabSwitch(!tabSwitch);
      });
  };

  useEffect(() => {
    updateProfile();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <NavBar style={NavStyles}>
        <NavTitle style={NavStyles.title}>
          {'Profile'}
        </NavTitle>
        <NavButton onPress={logoutUser}>
          <NavButtonText style={Styles.blueAccentText}>
            Logout
          </NavButtonText>
        </NavButton>
      </NavBar>
      <FlatList
        style={{backgroundColor: 'white'}}
        data={profileData}
        renderItem={profileItem}
        stickyHeaderIndices={[1]}
        extraData={tabSwitch}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={updateProfile}
          />
        }
      />
      <StatusBar style='dark' backgroundColor='white' />
    </SafeAreaView>
  );
};

export default Profile;