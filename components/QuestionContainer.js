import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useAuth from '../context/authContext';
import { COLORS, SIZES } from '../constants';

export default  QuestionContainer = ({ q }) => {
  const [selected, setSelected] = useState(-1);
  const { userData } = useAuth();

  const handleSubmit = async (index) => {
    setSelected(index);
    try {
      const res = await fetch(`https://lango-server.onrender.com/questions/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: q._id,
          userId: userData._id,
          submission: index,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSubmissionResult(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.quizContainer}>
      <View style={styles.questionMetaContainer}>
        <Text style={styles.questionMetaData}>{q.languageId.toUpperCase()}</Text>
        <Text style={styles.questionMetaData}>{q.level}</Text>
      </View>

      <View style={styles.questionData}>
        <Text style={styles.text}>{q.helper_text}</Text>
        <Text style={styles.text}>Q: {q.quiz.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {q.quiz.options.map((o, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selected === index
                ? selected === q.quiz.correct_option
                  ? styles.green
                  : styles.red
                : null,
            ]}
            onPress={() => handleSubmit(index)}
          >
            <Text>{o}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  text: {
    color: COLORS.gray1,
    fontSize: SIZES.large,
    padding: SIZES.xSmall
  },
  quizContainer: {
    padding: SIZES.xSmall,
  },
  questionMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 10, 
  },
  questionMetaData: {
    color: COLORS.yellow,
    marginHorizontal: SIZES.xSmall, 
    fontWeight: "800"
  },
  questionData: {
    marginVertical: SIZES.small,
    textAlign: 'center',
  },
  optionsContainer: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    width: 300,
    height: 50,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: COLORS.gray2,
  },
  green: {
    backgroundColor: 'greenyellow',
  },
  red: {
    color: 'rgb(202, 202, 202)',
  
    backgroundColor: 'rgb(255, 0, 0)',
  },
});
