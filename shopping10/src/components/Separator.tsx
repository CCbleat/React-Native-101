import {StyleSheet, View} from 'react-native';
import React from 'react';

export default function separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 0.8,
    backgroundColor: '#CAD5E2',
  },
});
