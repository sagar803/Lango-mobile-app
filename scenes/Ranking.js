import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { RankingTableRows } from '../components/RankingTableRows';
import {COLORS} from '../constants';

const Ranking = () => {
  const [loading, setLoading] = useState(false);
  const [rankings, setRankings] = useState([]);

  const fetchRankingsData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://lango-server.onrender.com/user/rankings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        setRankings(data.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankingsData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.yellow} style={{ flex: 1, justifyContent: 'center' }} />
          </View>
        ) : rankings && rankings.length !== 0 ? (
          <View style={styles.tableContainer}>
            <View style={styles.tableHeadingContainer}>
                <Text style={styles.tableHeading}>Rank</Text>
                <Text style={styles.tableHeading}>Name</Text>
                <Text style={styles.tableHeading}>Solved</Text>
            </View>
            <ScrollView style={{height: '85%', paddingBottom: 150}}> 
                {rankings.map((r, index) => (
                    <RankingTableRows key={index} data={r}/>
                ))}
            </ScrollView>
          </View>
        ) : (
          <Text style={styles.errorText}>Something Went wrong</Text>
        )}
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


export default Ranking;
