import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet , ActivityIndicator, SafeAreaView} from 'react-native';
import * as Yup from 'yup';
import useAuth from '../context/authContext';
import {COLORS, SIZES} from '../constants';

export default Auth = () => {

  const {userData, setUserData, setToken, loading, setLoading} = useAuth();
  const [pageType, setPageType] = useState("login");
  const [credentials , setCredentials ] = useState({fullName : '', email : '' , password : ''});
  const [formErrors, setFormErrors] = useState({});
  
    const togglePageType = () => {
        setCredentials({fullName : '', email : '' , password : ''});
        setFormErrors({});
        setLoading(false);
        if (pageType === "login") setPageType("register");
        else setPageType("login");
    }

     // Validation schema for the registration form
     const registrationSchema = Yup.object().shape({
       fullName: Yup.string()
       .required('Name is equired'),
       email: Yup.string()
       .email('Invalid email address')
       .required('Email is required'),
       password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
    });
      
    // Validation schema for the login form
    const loginSchema = Yup.object().shape({
      email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
        password: Yup.string()
          .required('Password is required'),
    });


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if(pageType === 'login')     await loginSchema.validate(credentials, { abortEarly: false });
        else     await registrationSchema.validate(credentials, { abortEarly: false });
        
        setLoading(true);
        const res = await fetch(`https://lango-server.onrender.com/auth/${pageType}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }) 
        if (res.ok){
          const data = await res.json();
          setUserData(data.user);
          setToken(data.token);
          console.log(data);
          AsyncStorage.setItem("lango-token" , data.token);
          AsyncStorage.setItem("lango-user-id" , data.user._id);
        }
      } catch (error) {
            if (error.inner) {
                // Validation failed, update the formErrors state with the error messages
                const errors = {};
                error.inner.forEach((e) => {
                  errors[e.path] = e.message;
                });
                setFormErrors(errors);
            }
      } finally{
          setLoading(false)
      }
    }

    return (
        <SafeAreaView style={styles.authBody}>
          <View style={styles.authFormContainer}>
            <Text style={styles.welcome}>Lango</Text>
            <Text style={{color: COLORS.gray1, paddingBottom: SIZES.xxLarge, fontWeight: '100', letterSpacing: 3}}>A language learning platform</Text>
            <View style={styles.authForm}>
              {pageType === 'register' && (
                <>
                  {formErrors.fullName && <Text style={styles.error}>{formErrors.fullName}</Text>}
                  <TextInput
                    style={styles.input}
                    value={credentials.fullName}
                    onChangeText={(text) => setCredentials({ ...credentials, fullName: text })}
                    placeholder="Enter your name.."
                  />
                </>
              )}
              {formErrors.email && <Text style={styles.error}>{formErrors.email}</Text>}
              <TextInput
                style={styles.input}
                value={credentials.email}
                onChangeText={(text) => setCredentials({ ...credentials, email: text })}
                placeholder="Email"
              />
              {formErrors.password && <Text style={styles.error}>{formErrors.password}</Text>}
              <TextInput
                style={styles.input}
                value={credentials.password}
                onChangeText={(text) => setCredentials({ ...credentials, password: text })}
                secureTextEntry
                placeholder="Password"
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                {loading ? <ActivityIndicator size="large" color={COLORS.gray2}/> : <Text>{pageType === 'login' ? 'Login' : 'Register'}</Text>}
              </TouchableOpacity>
              <Text style={styles.togglePage} onPress={togglePageType}>
                {pageType === 'login' ? 'Register here' : 'Login here'}
              </Text>
              <Text>{userData && userData.name}</Text>
            </View>
          </View>
        </SafeAreaView>
      );
    };






const styles = StyleSheet.create({
    authBody: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.gray4,
    },
    authFormContainer: {
      width: '90%',
      padding: 20,
    },
    welcome: {
      color: COLORS.yellow,
      fontSize: 80,
      fontWeight: '100',
      marginBottom: 10,
      letterSpacing: 10,
    },
    authForm: {
      width: '100%',
    },
    input: {
      width: '100%',
      backgroundColor: COLORS.gray2,
      color: COLORS.gray1,
      fontSize: 18,
      borderRadius: 8,
      height: 50,
      marginVertical: 7,
      padding: 15,
      
    },
    button: {
      alignItems : 'center',
      justifyContent: 'center', 
      marginVertical: 20,
      height: 50,
      borderRadius: 5,
      padding: 5,
      fontSize: 18,
      backgroundColor: COLORS.yellow,
    },

    togglePage: {
      color: COLORS.yellow,
      fontWeight: '500',
      fontSize: 14,
      marginTop: 0,
      height: 20,
      width: '100%',
      textAlign: 'right',
    },
    error: {
      color: 'red',
      textAlign: 'left',
      fontSize: 13,
    },
  });
  