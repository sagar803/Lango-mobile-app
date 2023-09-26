import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default  QuestionContainer = ({ q }) => {
  const [selected, setSelected] = useState(-1);
  const [submissionResult, setSubmissionResult] = useState();
  const userId = AsyncStorage.getItem('lango-user-id');

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
          userId,
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
      <View style={styles.questionMetaData}>
        <Text>{q.languageId.toUpperCase()}</Text>
        {/* You can replace the icon with a suitable React Native icon component */}
        <Text>{q.level}</Text>
      </View>

      <View style={styles.questionHr} />

      <View style={styles.questionData}>
        <Text>{q.helper_text}</Text>
        <Text>Q: {q.quiz.question}</Text>
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
  quizContainer: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.133)',
    padding: 10,
    margin: 50,
    marginHorizontal: 15, 
  },
  questionMetaData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 10, 
  },
  // Styles for question-meta-data * go here
  questionHr: {
    width: '95%',
    borderColor: 'white',
  },
  questionData: {
    // Your styles for question-data
    // Note that React Native does not support background-image with linear gradients.
    // You may need to use an image or other techniques for the background.
    backgroundColor: 'transparent', // Placeholder for background-image
    borderRadius: 10,
    marginVertical: 20, // Use marginVertical instead of separate margins for top and bottom
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row', // Use flexDirection to achieve display: flex
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20, // Use marginVertical instead of separate margins for top and bottom
  },
  option: {
    width: 100,
    textAlign: 'center',
    fontWeight: '800', // Use 'bold' instead of '800px'
    padding: 10,
    cursor: 'pointer',
    marginHorizontal: 8, // Use marginHorizontal instead of separate margins for left and right
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.263)',
  },
  green: {
    color: 'black',
    backgroundColor: 'greenyellow',
  },
  red: {
    color: 'rgb(202, 202, 202)',
    backgroundColor: 'rgb(255, 0, 0)',
  },
  // Media queries are not applicable in React Native
});
