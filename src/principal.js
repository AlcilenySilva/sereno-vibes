import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react'; 
import { db, auth } from './firebaseConfig'; 
import { 
  addDoc, 
  collection, 
  serverTimestamp,
  query, 
  orderBy, 
  limit, 
  getDocs 
} from 'firebase/firestore';
import Toast from 'react-native-toast-message';

export default function Principal({ navigation }) {
  const [humorAtual, setHumorAtual] = useState(null);
  const [ultimoRegistro, setUltimoRegistro] = useState('Nenhum registro'); 

  const emojis = [
    { icone: '😄', nome: 'Feliz' },
    { icone: '🙂', nome: 'Tranquilo' },
    { icone: '😐', nome: 'Neutro' },
    { icone: '😕', nome: 'Ansioso' },
    { icone: '😣', nome: 'Estressado' },
    { icone: '😢', nome: 'Triste' },
  ];

  
  const fetchUltimoRegistro = async () => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    
    try {
      const q = query(
        collection(db, 'humores'),
        orderBy('data', 'desc'), 
        limit(1) 
      );
      
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const ultimoDoc = querySnapshot.docs[0];
        const data = ultimoDoc.data();
       
        const humorEncontrado = emojis.find(h => h.nome === data.emocao);
        if (humorEncontrado) {
           setUltimoRegistro(`${humorEncontrado.icone} ${humorEncontrado.nome}`);
        } else {
           setUltimoRegistro(data.emocao);
        }
       
      } else {
        setUltimoRegistro('Nenhum registro encontrado');
      }
    } catch (error) {
      console.error("Erro ao buscar último registro:", error);
      setUltimoRegistro('Erro ao carregar');
    }
  };

  
  useEffect(() => {
    fetchUltimoRegistro();
  }, []);

  const handleSelecionarHumor = async (humorSelecionado) => {
    setHumorAtual(humorSelecionado.icone); 

    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para registrar o humor.");
      setHumorAtual(null); 
      return;
    }
    
    if (!db) {
      console.error("Erro: Instância do Firestore (db) não está disponível.");
      Alert.alert("Erro", "A conexão com o banco de dados falhou. Tente reiniciar o app.");
      setHumorAtual(null); 
      return;
    }

    try {
      await addDoc(collection(db, 'humores'), {
        userId: user.uid,
        emocao: humorSelecionado.nome, 
        data: serverTimestamp(), 
      });
      console.log('Humor salvo com sucesso:', humorSelecionado.nome);
      
      fetchUltimoRegistro();
      
      Toast.show({
        type: 'success',
        text1: 'Humor registrado!',
        text2: `Seu humor "${humorSelecionado.nome}" foi salvo.`,
      });

    } catch (error) {
      console.error("Erro ao salvar humor:", error);
      Alert.alert("Erro", "Não foi possível registrar seu humor. Tente novamente.");

    } finally {
      
      setHumorAtual(null); 
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.topBar} />

      <Text style={styles.label}>Como você está se sentindo agora?</Text>

      <View style={styles.emojiBox}>
        {emojis.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelecionarHumor(item)}
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
        <Text style={styles.texto}>{ultimoRegistro}</Text>
      </View>

      <Text style={styles.label}>Abrir meu diário</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Diario')}
      >
        <Text style={styles.botaoTexto}>Clique aqui</Text>
      </TouchableOpacity>
      <Toast /> 
    </View>
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

