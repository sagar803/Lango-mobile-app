import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for storing data locally
import QuestionContainer from '../components/QuestionContainer';
import useAuth from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ setIsAuth }) => {
  const [questions, setQuestions] = useState([]);
  const [level, setLevel] = useState("easy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {practice} = useAuth();

  const fetchData = async () => {
    try {
        setLoading(true);

        const res = await fetch(`https://lango-server.onrender.com/questions/${practice.toLowerCase()}/${level}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          setQuestions(data.result);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    
  useEffect(() => {
    fetchData();
  }, [level]);

  return (
    <View style={styles.home}>
      
      <View style={styles.levelContainer}>
        <TouchableOpacity
          style={[
            styles.level,
            level === 'easy' && styles.selected,
          ]}
          onPress={() => setLevel('easy')}
        >
          <Text>Easy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.level,
            level === 'medium' && styles.selected,
          ]}
          onPress={() => setLevel('medium')}
        >
          <Text>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.level,
            level === 'hard' && styles.selected,
          ]}
          onPress={() => setLevel('hard')}
        >
          <Text>Hard</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.homeMain}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" style={{ flex: 1, justifyContent: 'center' }} />
        ) : error ? (
          <Text style={{ textAlign: 'center' }}>Something Went wrong</Text>
        ) : questions.length !== 0 ? (
          questions.map((q) => <QuestionContainer key={q._id} q={q} />)
        ) : (
          <Text style={{ textAlign: 'center' }}>Nothing to show up here.</Text>
        )}
      </ScrollView>
    </View>
  );
};


export default Home;

const styles = {
  home: {
    backgroundColor: 'rgb(33, 109, 250)',
    color: 'white',
    minHeight: '100%',
    width: '100%',
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffffff21',
    padding: 5,
  },
  level: {
    fontWeight: '800',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    transition: '0.2s',
  },
  selected: {
    backgroundColor: 'white',
    color: 'rgb(82, 82, 82)',
  },
  homeMain: {
    flex: 1
  },
  questionsContainer: {
    padding: '25px 0',
    width: 'min(100%, 800px)',
  },
};
