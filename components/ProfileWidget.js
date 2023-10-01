import React , {useEffect,  useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useAuth from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants';


const ProfileWidget = () => {
  const [progress, setProgress] = useState();
  const { logout } = useAuth();

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('lango-user-id');
      console.log(userId)
      const res = await fetch(`https://lango-server.onrender.com/user/${userId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });

      if (res.ok) {
        const data = await res.json();
        setProgress(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.profileWidgetContainer}>
      <View style={styles.userProgress}>
        <Text style={{color: COLORS.gray1}}>Progress: {progress ? progress.percentage : 'Loading...'}%</Text>
      </View>
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileWidget;


const styles = StyleSheet.create({
    userProgress: {
      paddingVertical: 5,
      paddingHorizontal: 20,
    },
    logout: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: COLORS.gray4,
      borderRadius: 10,
      alignItems: 'center', // Add this to center text horizontally
    },
    logoutText: {
      color: COLORS.gray1,
    },
  });