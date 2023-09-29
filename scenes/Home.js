import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import QuestionContainer from '../components/QuestionContainer';
import useAuth from '../context/authContext';
import { COLORS } from '../constants';
import Swiper from 'react-native-swiper';

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
    <SafeAreaView style={styles.home}>
      
      <View style={styles.levelContainer}>
        <TouchableOpacity
          style={[
            styles.level,
            level === 'easy' && styles.selected,
          ]}
          onPress={() => setLevel('easy')}
        >
          <Text style={[styles.text,level === 'easy' && {color: COLORS.gray3}]}>Easy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.level,
            level === 'medium' && styles.selected,
          ]}
          onPress={() => setLevel('medium')}
        >
          <Text style={[styles.text,level === 'medium' && {color: COLORS.gray3}]}>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.level,
            level === 'hard' && styles.selected,
          ]}
          onPress={() => setLevel('hard')}
        >
          <Text style={[styles.text,level === 'hard' && {color: COLORS.gray3}]}>Hard</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.homeMain}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" style={{ flex: 1, justifyContent: 'center' }} />
        ) : error ? (
          <Text style={styles.text}>Something Went wrong</Text>
        ) : questions.length !== 0 ? (
          <Swiper
            index={0}
            loop={false}
            activeDotColor={COLORS.yellow}
//            showsButtons={true}
          >
            {questions.map((q) => <QuestionContainer key={q._id} q={q} />)}
          </Swiper>
        ) : (
          <Text style={styles.text}>Nothing to show up here.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};


export default Home;

const styles = {
  text: {
    color: COLORS.gray1,
    textAlign: 'center'
  },
  home: {
    flex: 1,
    backgroundColor: COLORS.gray3,
    color: COLORS.lightWhite,
    alignItems: "center"
  },
  levelContainer: {
    borderRadius: 20,
    margin: 20,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.gray4,
    padding: 5,
  },
  level: {
    color: COLORS.white,
    fontWeight: '800',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    transition: '0.2s',
  },
  selected: {
    backgroundColor: COLORS.yellow,
    color: 'white',
  },
  homeMain: {
    height: '80%'
  }
};
