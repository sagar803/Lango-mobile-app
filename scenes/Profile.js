import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { RankingTableRows } from '../components/RankingTableRows';
import {COLORS} from '../constants';
import ProfileWidget from '../components/ProfileWidget';

const Profile = () => {
  

  return (
    <SafeAreaView style={styles.container}>
        <ProfileWidget />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray3,
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeadingContainer:{
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeading: {
    color: COLORS.gray1,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
  },
});


export default Profile;
