import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from './firebaseConfig';  

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null); 
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  
  const handleLogin = async () => {
    setError(null); 
    if (email.trim() && senha.trim()) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        console.log('Login bem-sucedido!', userCredential.user.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
      } catch (e) {
        console.error('Erro de login:', e.message);
        setError(e.message); 
      }
    } else {
      setError('Preencha email e senha');
    }
  };

  const handleCadastro = async () => {
    setError(null);
    if (email.trim() && senha.trim()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        console.log('Cadastro bem-sucedido!', userCredential.user.uid);
        alert('Usuário cadastrado com sucesso!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
      } catch (e) {
        console.error('Erro de cadastro:', e.message);
        setError(e.message);
      }
    } else {
      setError('Preencha email e senha para o cadastro');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.logo}>Sereno Vibes</Text>
          <Text style={styles.bemVindo}>Bem Vindo (a)</Text>

          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#555"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.senhaWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#555"
                secureTextEntry={!senhaVisivel}
                onChangeText={setSenha}
                value={senha}
              />
              <TouchableOpacity
                onPress={() => setSenhaVisivel(!senhaVisivel)}
                style={styles.iconSenha}
              >
                <Feather name={senhaVisivel ? 'eye-off' : 'eye'} size={20} color="#333" />
              </TouchableOpacity>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
                <Text style={styles.botaoTexto}>Cadastro</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botao} onPress={handleLogin}>
                <Text style={styles.botaoTexto}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 24,
    color: '#6C41F2',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bemVindo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#D6C3F6',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#EDF3F7',
    width: '100%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 10,
  },
  botao: {
    backgroundColor: '#A4EAC5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  botaoTexto: {
    color: '#000',
    fontWeight: 'bold',
  },
  errorText: { 
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  senhaWrapper: {
  width: '100%',
  position: 'relative',
  justifyContent: 'center',
},
iconSenha: {
  position: 'absolute',
  right: 15,
  top: 16,
},

});