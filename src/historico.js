import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Historico() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Tela de Histórico - Teste</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfcff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
