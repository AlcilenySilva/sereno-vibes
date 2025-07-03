import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Principal({ navigation }) {
  const [humorAtual, setHumorAtual] = useState(null);
  const humorAnterior = '😊 Tranquilo';

  const emojis = [
  { icone: '😄', nome: 'Feliz' },
  { icone: '🙂', nome: 'Bem' },
  { icone: '😐', nome: 'Neutro' },
  { icone: '😕', nome: 'Ansioso' },
  { icone: '😣', nome: 'Estressado' },
  { icone: '😢', nome: 'Triste' },
];

  return (
    <View style={styles.container}>
     
      <View style={styles.topBar}>
        <Text style={styles.topText}>Tela Inicial</Text>
      </View>

      <Text style={styles.label}>Como você está se sentindo agora?</Text>

     {/* Caixa com borda verde envolvendo os emojis */}
      <View style={styles.emojiBox}>
   {emojis.map((item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => setHumorAtual(item.icone)}
      style={styles.emojiItem}
    >
      <Text style={[styles.emoji, humorAtual === item.icone && styles.emojiSelecionado]}>
        {item.icone}
      </Text>
      <Text style={styles.emojiNome}>{item.nome}</Text>
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
  justifyContent: 'center',
  marginBottom: 20,
},

emojiItem: {
  alignItems: 'center',
  width: 70,
  marginHorizontal: 6,
  marginVertical: 8,
},

emoji: {
  fontSize: 32,
  padding: 8,
  borderRadius: 12,
},

emojiSelecionado: {
  backgroundColor: '#E0D4F6',
},

emojiNome: {
  fontSize: 12,
  marginTop: 4,
  color: '#444',
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
