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
        backgroundColor: COLORS.yellow,
        padding: 15,
        margin: 5,
        borderRadius: 8
    },
    colData: {
        fontWeight: "500",
        color: COLORS.gray3,
        textAlign: "center"
    }
    
})