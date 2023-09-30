import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../context/authContext';
import {COLORS, SIZES} from '../constants';

const Setup = () => {
  const navigation = useNavigation();
  const {practice, setPractice} = useAuth();

  //An error was caused and then resolved using the blog
  //https://gorannikolovski.com/blog/cannot-update-a-component-while-rendering-a-different-component-react-native
/*
  useEffect(() => {
    if (practice) navigation.navigate('homeTab');
  }, [practice]);
*/

  const handlePress = async (languageId) => {
    console.log(languageId)
    setPractice(languageId);
    await AsyncStorage.setItem('lango-practice', languageId);
    if (practice) navigation.navigate('homeTab');
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
      <View style={styles.headingContainer}>
        <Text style={styles.heading1}>Getting Started....</Text>
        <Text style={styles.heading2}>Please choose a language you'd like to learn.</Text>
      </View>
      <View style={styles.languageContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            style={styles.languageOption}
            key={lang.languageId}
            onPress={() => handlePress(lang.languageId)}
          >
            <Text style={{color: COLORS.gray1}}>{lang.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    setupBody: {
      flex: 1,
      backgroundColor: COLORS.gray4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headingContainer: {
      alignItems: 'center',
    },
    heading1: {
      fontSize: 45,
      fontWeight: '100',
      color: COLORS.gray1,
      paddingTop: 40,
      paddingBottom: 20,
    },
    heading2: {
      fontWeight: '100',
      color: COLORS.gray1,
      fontSize: 16,
      paddingBottom: 20,
    },
    languageContainer: {
      width: '80%'
    },
    languageOption: {
      justifyContent:"center",
      alignItems: 'center',
      height: 50,
      borderBottomWidth: 2,
      borderRadius: 5,
      borderColor: COLORS.gray2,
      margin: 10
    },
  });

export default Setup;
