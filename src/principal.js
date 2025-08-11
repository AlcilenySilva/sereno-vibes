import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { db, auth } from './firebaseConfig'; 
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

export default function Principal({ navigation }) {  const [humorAtual, setHumorAtual] = useState(null);  const humorAnterior = '😊 Tranquilo';   const emojis = [
 { icone: '😄', nome: 'Feliz' },
 { icone: '🙂', nome: 'Tranquilo' },
 { icone: '😐', nome: 'Neutro' },
 { icone: '😕', nome: 'Ansioso' },
 { icone: '😣', nome: 'Estressado' },
 { icone: '😢', nome: 'Triste' },
];


 const handleSelecionarHumor = async (humorSelecionado) => {setHumorAtual(humorSelecionado.icone); 

 const user = auth.currentUser;

if (!user) {

Toast.show({
 type: 'error',
text1: 'Erro de Login',
text2: 'Você precisa estar logado para registrar o humor.',
 });
 return;
 }
 
 if (!db) {

Toast.show({
 type: 'error',
 text1: 'Erro de Conexão',
 text2: 'A conexão com o banco de dados falhou. Tente reiniciar o app.',
 });
return;
 }

 try {
await addDoc(collection(db, 'humores'), {
 userId: user.uid,
      emocao: humorSelecionado.nome, 
 data: serverTimestamp(), 
 });
   console.log('Humor salvo com sucesso:', humorSelecionado.nome);


 Toast.show({
type: 'success',
 text1: 'Humor registrado!',
text2: `Seu humor "${humorSelecionado.nome}" foi salvo.`,
 });

} catch (error) {
   console.error("Erro ao salvar humor:", error);

 Toast.show({
type: 'error',
text1: 'Erro ao salvar',
 text2: 'Não foi possível registrar seu humor. Tente novamente.',
 });
 }
 };

return (
<View style={styles.container}>
 <View style={styles.topBar} />
 <Text style={styles.label}>Como você está se sentindo agora?</Text>

 <View style={styles.emojiBox}>
 {emojis.map((item, index) => ( <TouchableOpacity
       key={index}
       onPress={() => handleSelecionarHumor(item)}
 style={styles.emojiItem}
><Text style={[styles.emoji, humorAtual === item.icone && styles.emojiSelecionado]}>
{item.icone} </Text>
 <Text style={styles.emojiNome}>{item.nome}</Text>
</TouchableOpacity>
 ))}
 </View> 

 
 <Text style={styles.label}>Último registro:</Text>
 <View style={styles.box}>
 <Text style={styles.texto}>{humorAnterior}</Text>
 </View>

 <Text style={styles.label}>Abrir meu diário</Text> <TouchableOpacity
style={styles.botao}
 onPress={() => navigation.navigate('Diario')} >
<Text style={styles.botaoTexto}>Clique aqui</Text>
 </TouchableOpacity>
 <Toast />  </View>
);
} 


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60, 
    paddingHorizontal: 24,
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
  
  emojiItem: {
    alignItems: 'center',
    
    width: '30%', 
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