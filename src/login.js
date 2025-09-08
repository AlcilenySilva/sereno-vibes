import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword,sendEmailVerification
} from 'firebase/auth';
import { auth } from './firebaseConfig';
import emailValidator from 'email-validator';


export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);


 
  const isValidEmail = (email) => {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    if (email.trim() && senha.trim()) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        console.log('Login bem-sucedido!', userCredential.user.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
      } catch (e) {
        console.error('Erro de login:', e.code, e.message);
        if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
          setError('E-mail ou senha inválidos. Verifique suas credenciais.');
        } else if (e.code === 'auth/invalid-email') {
          setError('O formato do e-mail é inválido.');
        } else {
          setError('Ocorreu um erro no login. Tente novamente mais tarde.');
        }
      }
    } else {
      setError('Preencha e-mail e senha.');
    }
    setLoading(false);
  };


  const handleCadastro = async () => {
    setError(null);
    setLoading(true);
    if (email.trim() && senha.trim()) {
     
      if (!emailValidator.validate(email) || !isValidEmail(email)) {
        setError('Por favor, insira um e-mail válido.');
        setLoading(false);
        return;
      }


      try {
        await createUserWithEmailAndPassword(auth, email, senha);
       
        const user = auth.currentUser;
        if (user) {
           await sendEmailVerification(user);
           alert('Usuário cadastrado com sucesso! Um link de verificação foi enviado ao seu e-mail (verifique a caixa de spam).');
        } else {
          alert('Usuário cadastrado com sucesso!');
        }
       
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });


      } catch (e) {
        console.error('Erro de cadastro:', e.code, e.message);
        if (e.code === 'auth/email-already-in-use') {
          setError('Este e-mail já está em uso. Tente fazer login ou use outro e-mail.');
        } else if (e.code === 'auth/weak-password') {
          setError('A senha deve ter pelo menos 6 caracteres.');
        } else if (e.code === 'auth/invalid-email') {
          setError('O formato do e-mail é inválido.');
        } else {
          setError('Erro ao cadastrar. Verifique as informações e tente novamente.');
        }
      }
    } else {
      setError('Preencha e-mail e senha para o cadastro.');
    }
    setLoading(false);
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
              editable={!loading}
            />


            <View style={styles.senhaWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#555"
                secureTextEntry={!senhaVisivel}
                onChangeText={setSenha}
                value={senha}
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setSenhaVisivel(!senhaVisivel)}
                style={styles.iconSenha}
                disabled={loading}
              >
                <Feather name={senhaVisivel ? 'eye-off' : 'eye'} size={20} color="#333" />
              </TouchableOpacity>
            </View>


            {error && <Text style={styles.errorText}>{error}</Text>}


            {loading ? (
              <ActivityIndicator size="large" color="#6C41F2" />
            ) : (
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
                  <Text style={styles.botaoTexto}>Cadastro</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.botao} onPress={handleLogin}>
                  <Text style={styles.botaoTexto}>Entrar</Text>
                </TouchableOpacity>
              </View>
            )}
           
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    color: '#6C41F2',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bemVindo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  card: {
    backgroundColor: '#D6C3F6',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  input: {
    backgroundColor: '#EDF3F7',
    width: '100%',
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
    marginTop: 20,
    width: '100%',
  },
  botao: {
    backgroundColor: '#A4EAC5',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  botaoTexto: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#D8000C',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  senhaWrapper: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  iconSenha: {
    position: 'absolute',
 right: 15,
top: 14,   },
});