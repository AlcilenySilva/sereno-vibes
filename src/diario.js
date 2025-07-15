import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Diario() {
  const [descricao, setDescricao] = useState('');
  const [reacao, setReacao] = useState('');
  const [envolvidos, setEnvolvidos] = useState('');
  const [acao, setAcao] = useState('');

  const opcoesLidar = [
    { nome: 'Choro', icon: <Feather name="droplet" size={18} color="#000" /> },
    { nome: 'Respiração', icon: <MaterialCommunityIcons name="meditation" size={18} color="#000" /> },
    { nome: 'Xingamento', icon: <Feather name="alert-triangle" size={18} color="#000" /> },
    { nome: 'Conversa', icon: <Feather name="message-circle" size={18} color="#000" /> },
    { nome: 'Não se aplica', icon: <Feather name="x-circle" size={18} color="#000" /> },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}></View>

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
        {opcoesLidar.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.botao, reacao === item.nome && styles.selecionado]}
            onPress={() => setReacao(item.nome)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.icon}
              <Text style={{ marginLeft: 6 }}>{item.nome}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Pessoas envolvidas ?</Text>
      <View style={styles.buttonGroup}>
        {['Família', 'Amigos', 'Colegas', 'Estranhos', 'Só', 'Outros'].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.botao, envolvidos === item && styles.selecionado]}
            onPress={() => setEnvolvidos(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    padding: 16,
  },
  topBar: {
    backgroundColor: '#D6C3F6',
    height: 50,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
  },
  textArea: {
    backgroundColor: '#FADCDC',
    padding: 10,
    borderRadius: 8,
    height: 90,
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#D6EAF8',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  selecionado: {
    backgroundColor: '#AFCDEB',
  },
  input: {
    backgroundColor: '#EAF1F4',
    padding: 10,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#C1A6F5',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
