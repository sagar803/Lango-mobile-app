import { StyleSheet } from 'react-native';
import Navigation from './Navigation.js'

import { AuthProvider } from './context/authContext.js';

export default function App() {

  return (
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
