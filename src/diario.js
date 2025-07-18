import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Diario() {
  const [descricao, setDescricao] = useState('');
  const [reacoesSelecionadas, setReacoesSelecionadas] = useState([]);
  const [envolvidosSelecionados, setEnvolvidosSelecionados] = useState([]);
  const [acao, setAcao] = useState('');

  const opcoesLidar = [
    { nome: 'Choro', icon: <Feather name="droplet" size={18} color="#000" /> },
    { nome: 'Respiração', icon: <MaterialCommunityIcons name="meditation" size={18} color="#000" /> },
    { nome: 'Xingamento', icon: <Feather name="alert-triangle" size={18} color="#000" /> },
    { nome: 'Conversa', icon: <Feather name="message-circle" size={18} color="#000" /> },
    { nome: 'Não se aplica', icon: <Feather name="x-circle" size={18} color="#000" /> },
  ];

  const opcoesPessoas = ['Família', 'Amigos', 'Colegas', 'Estranhos', 'Só', 'Outros'];

  const toggleReacao = (nome) => {
    setReacoesSelecionadas(prev =>
      prev.includes(nome) ? prev.filter(item => item !== nome) : [...prev, nome]
    );
  };

  const toggleEnvolvido = (nome) => {
    setEnvolvidosSelecionados(prev =>
      prev.includes(nome) ? prev.filter(item => item !== nome) : [...prev, nome]
    );
  };

  return (
    <View style={{ flex: 1 }}>
    <View style={styles.topBar} />
    <ScrollView style={styles.container}>
      <Text style={styles.label}>O que aconteceu hoje que te deixou estressado(a)?</Text>
      <TextInput
        placeholder="Caixa de texto"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.textArea}
        multiline
      />
      <Text style={styles.label}>Como você conseguiu lidar com essa situação?</Text>
      <View style={styles.buttonGroup}>
        {opcoesLidar.map((item, index) => {
          const isSelecionado = reacoesSelecionadas.includes(item.nome);
          return (
            <TouchableOpacity
              key={index}
             style={[
             styles.botao,
       {
         backgroundColor: isSelecionado ? '#4985c1ff' : '#A7C7E7', 
         elevation: isSelecionado ? 2 : 0,
  }
]}
              onPress={() => toggleReacao(item.nome)}
            >
              <View style={{ alignItems: 'center' }}>
                {item.icon}
                <Text style={{ marginTop: 4 }}>{item.nome}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>Pessoas envolvidas?</Text>
      <View style={styles.buttonGroup}>
        {opcoesPessoas.map((item, index) => {
          const isSelecionado = envolvidosSelecionados.includes(item);
          const isVerde = ['Família', 'Colegas', 'Outros'].includes(item);

          const corNormal = isVerde ? '#A8E6CF' : '#D4E8F5';
          const corSelecionado = isVerde ? '#50C9A6' : '#71B1D6';

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.botao,
                {
                  backgroundColor: isSelecionado ? corSelecionado : corNormal,
                  borderWidth: isSelecionado ? 1.5 : 0,
                  borderColor: isSelecionado ? '#333' : 'transparent',
                }
              ]}
              onPress={() => toggleEnvolvido(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>O que você fez para se sentir melhor?</Text>
      <TextInput
        placeholder="Digite aqui..."
        value={acao}
        onChangeText={setAcao}
        style={styles.input}
      />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6F6',
    paddingHorizontal: 16,
    paddingTop: 0,
  },
topBar: {
  backgroundColor: '#D6C3F6',
  height: 40,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 16,
  marginBottom: 10,
},

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },
  textArea: {
    backgroundColor: '#FADDDD',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  input: {
    backgroundColor: '#EDF3F3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  botao: {
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  saveButton: {
    backgroundColor: '#C5AAF8',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
});
