import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants';

export const RankingTableRows = ({data}) => {
  return (
    <View style={styles.row}>
        <View style={styles.col}>
            <Text style={styles.colData}>{data.rank+1}</Text>
        </View>
        <View style={styles.col}>
            <Text style={styles.colData}>{data.name}</Text>
        </View>
        <View style={styles.col}>
            <Text style={styles.colData}>{data.solved}</Text>
        </View>        
    </View>
  )
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: COLORS.gray2,
        padding: 20,
        margin: 8,
        borderRadius: 8
    },
    colData: {
        fontWeight: "500",
        color: COLORS.gray1,
        textAlign: "center"
    }
    
})