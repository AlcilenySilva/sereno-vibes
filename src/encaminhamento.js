import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Encaminhamentos() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
       
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.texto}>
            📞 <Text style={styles.bold}>CVV – Centro de Valorização da Vida:</Text>{'\n'}
            188
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.texto}>
            📞 <Text style={styles.bold}>SAMU:</Text>{'\n'}
            192
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.texto}>
            🏥 <Text style={styles.bold}>CAPS – Centros de Atenção Psicossocial</Text>{'\n'}
            Locais especializados no atendimento de transtornos mentais e crises psicológicas.{'\n'}
            Procure o CAPS mais próximo da sua cidade (pelo site da prefeitura ou diretamente na unidade de saúde).
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  topBar: {
    backgroundColor: '#D6C3F6',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderBottomLeftRadius: 25, 
    borderBottomRightRadius: 25,
  },
 
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    paddingTop:60,
  },
  card: {
    borderWidth: 1,
    borderColor: '#A6DDC8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  texto: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});
