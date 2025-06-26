import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Principal({ navigation }) {
  const [humorAtual, setHumorAtual] = useState(null);
  const humorAnterior = '😊 Tranquilo';

  const emojis = ['😄', '🙂', '😐', '😕', '😣', '😢'];

  return (
    <View style={styles.container}>
      {/* Faixa lilás superior */}
      <View style={styles.topBar}>
        <Text style={styles.topText}>Tela Inicial</Text>
      </View>

      <Text style={styles.label}>Como você está se sentindo agora?</Text>

      {/* Caixa com borda verde envolvendo os emojis */}
      <View style={styles.emojiBox}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity key={index} onPress={() => setHumorAtual(emoji)}>
            <Text style={[styles.emoji, humorAtual === emoji && styles.emojiSelecionado]}>
              {emoji}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Último registro:</Text>
      <View style={styles.box}>
        <Text style={styles.texto}>{humorAnterior}</Text>
      </View>

      <Text style={styles.label}>Abrir meu diário</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Diario')}
      >
        <Text style={styles.botaoTexto}>Clique aqui</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
topBar: {
  backgroundColor: '#D6C3F6',
  paddingVertical: 16,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1,
},
topText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#6C41F2',
},
container: {
  flex: 1,
  backgroundColor: '#fff',
  paddingTop: 60, 
  paddingHorizontal: 24,
},
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 10,
  },
  emojiBox: {
    borderWidth: 2,
    borderColor: '#B8E5D3',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 32,
    padding: 8,
  },
  emojiSelecionado: {
    backgroundColor: '#E3D1FB',
    borderRadius: 12,
  },
  box: {
    backgroundColor: '#DDECF9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#99CFC2',
    padding: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  botaoTexto: {
    color: '#000',
    fontWeight: 'bold',
  },
});
