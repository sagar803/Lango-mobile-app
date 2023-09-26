import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Assuming you are using React Navigation
import ProfileWidget from './ProfileWidget';

const Navbar = ({ setIsAuth }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState();
  

  

  const navigation = useNavigation(); // Use useNavigation hook from React Navigation for navigation

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.logo}>LANGO</Text>
      </TouchableOpacity>
      <View style={styles.navIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('Ranking')}>
          <Text style={styles.icon}>Ranking</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Text style={styles.icon}>User</Text>
        </TouchableOpacity>
      </View>
      {visible && (
        <View style={styles.widgetContainer}>
          <ProfileWidget progress={progress} setIsAuth={setIsAuth} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    nav: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 80,
      backgroundColor: 'transparent',
      color: 'white',
    },
    navIcons: {
      flexDirection: 'row',
    },
    icon: {
      margin: 5,
      padding: 15,
      borderRadius: 10,
    },
    logo: {
      width: 150,
      fontSize: 20,
      fontWeight: '500',
      letterSpacing: 2,
    },
    widgetContainer: {
      borderRadius: 10,
      position: 'absolute',
      right: '20%', // You may need to adjust this based on your layout
      top: 80,
      color: 'gray',
      backgroundColor: 'rgba(255, 255, 255, 0.873)',
    },
    active: {
      backgroundColor: 'rgba(255, 255, 255, 0.147)',
    },
    // Media queries are not applicable in React Native
});

export default Navbar;
