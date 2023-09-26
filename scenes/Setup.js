import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../context/authContext';

const Setup = () => {
  const navigation = useNavigation();
  const {practice, setPractice} = useAuth();

  //An error was caused and then resolved using the blog
  //https://gorannikolovski.com/blog/cannot-update-a-component-while-rendering-a-different-component-react-native
  useEffect(() => {
    if (practice) navigation.navigate('homeTab');
  }, [practice]);

  const handlePress = async (languageId) => {
    setPractice(languageId);
    await AsyncStorage.setItem('lango-practice', languageId);
  }

  const languages = [
    {
      languageId: 'EN',
      name: 'English',
    },
    {
      languageId: 'ES',
      name: 'Spanish',
    },
    {
      languageId: 'FR',
      name: 'French',
    },
    {
      languageId: 'DE',
      name: 'German',
    },
    {
      languageId: 'IT',
      name: 'Italian',
    },
  ];

  return (
    <View style={styles.setupBody}>
      <View style={styles.setupContainer}>
        <Text style={styles.setupHeading}>Getting Started....</Text>

        <View style={styles.languagesContainer}>
          <Text style={styles.languageContainerHeading}>Which Language do you want to learn..</Text>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.languageId}
              onPress={() => handlePress(lang.languageId)}
            >
              <Text style={styles.languageOption}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    setupBody: {
      color: 'white',
      flex: 1,
      backgroundColor: 'rgb(33, 109, 250)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    setupContainer: {
      backgroundColor: '#ffffff20',
      width: '80%',
      alignItems: 'center',
    },
    setupHeading: {
      width: 200,
      color: '#ffffff',
      margin: 0,
      padding: 40,
    },
    languageContainerHeading: {
      fontSize: 18,
      fontWeight: '500',
      color: 'white',
    },
    languageOption: {
      fontSize: 16,
      marginVertical: 5,
      color: '#ffffff',
      fontWeight: '500',
      borderRadius: 5,
      padding: 15,
    },
    setupSubmitButton: {
      alignItems: 'center',
    },
    submitButton: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'white',
    },
  });

export default Setup;
