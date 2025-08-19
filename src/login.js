import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  signInAnonymously, 
  linkWithCredential, 
  EmailAuthProvider 
} from 'firebase/auth'; 
import { auth } from './firebaseConfig'; 
import emailValidator from 'email-validator'; 

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null); 
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false); 

  // Função auxiliar para validar formato de e-mail (regex)
  const isValidEmail = (email) => {
    // Regex para um formato de e-mail razoavelmente válido
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
      
      // Validação de formato de e-mail: usa email-validator E uma regex própria
      if (!emailValidator.validate(email) || !isValidEmail(email)) {
        setError('Por favor, insira um e-mail válido.');
        setLoading(false); 
        return; 
      }

      try {
        if (auth.currentUser && auth.currentUser.isAnonymous) {
          const credential = EmailAuthProvider.credential(email, senha);
          await linkWithCredential(auth.currentUser, credential);
          alert('Sua conta anônima foi vinculada com sucesso! Agora você pode fazer login com este e-mail e senha.');
          console.log('Conta anônima vinculada com sucesso!', auth.currentUser.uid);
        } else {
          await createUserWithEmailAndPassword(auth, email, senha);
          alert('Usuário cadastrado com sucesso!');
          console.log('Novo usuário cadastrado com sucesso!');
        }
        
        const user = auth.currentUser;
        if (user) {
           // O e-mail de verificação ainda será enviado em segundo plano.
           // Isso te permite rastrear quem verificou o e-mail no console do Firebase.
           await sendEmailVerification(user);
           alert('Usuário cadastrado com sucesso! Um link de verificação foi enviado ao seu e-mail (verifique a caixa de spam).');
        } else {
          alert('Usuário cadastrado com sucesso!'); // Fallback se, por algum motivo, user for null após cadastro
        }
        
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });

      } catch (e) {
        console.error('Erro de cadastro/vinculação:', e.code, e.message);
        if (e.code === 'auth/email-already-in-use') {
          setError('Este e-mail já está em uso. Tente fazer login ou use outro e-mail.');
        } else if (e.code === 'auth/weak-password') {
          setError('A senha deve ter pelo menos 6 caracteres.');
        } else if (e.code === 'auth/invalid-email') {
          setError('O formato do e-mail é inválido.');
        } else if (e.code === 'auth/credential-already-in-use') { 
          setError('Este e-mail já está associado a outra conta. Faça login com ele ou use outro e-mail para vincular.');
        }
        else {
          setError('Erro ao cadastrar/vincular. Verifique as informações e tente novamente.');
        }
      }
    } else {
      setError('Preencha e-mail e senha para o cadastro.');
    }
    setLoading(false); 
  };

  const handleAnonymousLogin = async () => {
    setError(null);
    setLoading(true); 
    try {
      await signInAnonymously(auth);
      console.log('Login anônimo bem-sucedido!');
      alert('Você entrou como convidado. Crie uma conta para salvar seus dados permanentemente!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });
    } catch (e) {
      console.error('Erro no login anônimo:', e.code, e.message);
      setError('Não foi possível entrar como convidado. Tente novamente mais tarde.');
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
                  <Text style={styles.botaoTexto}>
                    {auth.currentUser && auth.currentUser.isAnonymous ? 'Salvar Conta' : 'Cadastro'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao} onPress={handleLogin}>
                  <Text style={styles.botaoTexto}>Entrar</Text>
                </TouchableOpacity>
              </View>
            )}

            {!auth.currentUser && !loading && (
                <TouchableOpacity style={styles.botaoAnonimo} onPress={handleAnonymousLogin}>
                    <Text style={styles.botaoTextoAnonimo}>Entrar como Convidado</Text>
                </TouchableOpacity>
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
    top: 14, 
  },
  botaoAnonimo: {
    backgroundColor: '#A4EAC5', 
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20, 
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  botaoTextoAnonimo: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
