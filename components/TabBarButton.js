import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants';

const TabBarButton = ({ label, accessibilityState, onPress, name }) => {
    return (
      <TouchableOpacity
        style={[styles.tabButton, accessibilityState.selected ? styles.tabButtonFocused : null]}
        onPress={onPress}
      >
        <View style={styles.iconBox}>
            <Feather name={name} size={24} color={accessibilityState.selected ? COLORS.yellow : COLORS.gray1 } />
            {accessibilityState.selected && <Text style={styles.tabButtonText}>{label}</Text>}
        </View>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonText: {
      fontSize: 12,
      color: COLORS.yellow
    },
  });
  
  export default TabBarButton;