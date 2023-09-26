import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet , ActivityIndicator} from 'react-native';
import * as Yup from 'yup';
import useAuth from '../context/authContext';


export default Auth = () => {

  const {userData, setUserData, setToken, loading, setLoading} = useAuth();
  const [pageType, setPageType] = useState("login");
  const [credentials , setCredentials ] = useState({fullName : '', email : '' , password : ''});
  const [formErrors, setFormErrors] = useState({});
  
    const togglePageType = () => {
        setCredentials({fullName : '', email : '' , password : ''});
        setFormErrors({})
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
          console.log(data.token);
          setUserData(data.user);
          setToken(data.token);
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
        <View style={styles.container}>
          <View style={styles.authBody}>
            <View style={styles.authFormContainer}>
              <Text style={styles.welcome}>Welcome to Lango</Text>
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
                  {loading ? <ActivityIndicator /> : <Text>{pageType === 'login' ? 'Login' : 'Register'}</Text>}
                </TouchableOpacity>
                <Text style={styles.togglePage} onPress={togglePageType}>
                  {pageType === 'login' ? 'Register here' : 'Login here'}
                </Text>
                <Text>{userData && userData.name}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    };






const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    authBody: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(33, 109, 250)',
    },
    authFormContainer: {
      width: '80%',
      maxWidth: 450,
      borderRadius: 15,
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      padding: 20,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
    },
    welcome: {
      color: 'rgb(33, 109, 250)',
      fontSize: 24,
      marginBottom: 20,
    },
    authFormContainerH1: {
      fontSize: 24,
    },
    authForm: {
      width: '85%',
    },
    input: {
      width: '100%',
      backgroundColor: 'rgb(243, 243, 243)',
      color: 'rgb(93, 93, 93)',
      fontSize: 18,
      borderRadius: 8,
      height: 50,
      marginVertical: 7,
      padding: 15
    },
    inputPlaceholder: {
      color: 'rgb(143, 143, 143)',
    },
    button: {
      height: 50,
      marginVertical: 20,
      borderRadius: 5,
      padding: 5,
      fontSize: 18,
      backgroundColor: 'cornflowerblue',
      color: '#fff',
    },

    togglePage: {
      color: 'cornflowerblue',
      fontWeight: '500',
      fontSize: 14,
      marginTop: 0,
      height: 10,
      width: '100%',
      textAlign: 'right',
    },
    error: {
      color: 'red',
      textAlign: 'left',
      fontSize: 13,
    },
  });
  