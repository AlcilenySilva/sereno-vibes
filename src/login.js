import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
  console.log('Login:', email, senha);
  navigation.navigate('Tabs'); 
};

  const handleCadastro = () => {
    console.log('Cadastro');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>Sereno vibes</Text>
        <Text style={styles.bemVindo}>Bem Vindo (a)</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#555"
            onChangeText={setEmail}
            value={email}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#555"
            secureTextEntry
            onChangeText={setSenha}
            value={senha}
          />

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
    </View>
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
});


