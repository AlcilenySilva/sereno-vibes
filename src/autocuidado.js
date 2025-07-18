import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const atividades = [
  'Fazer uma caminhada',
  'Fazer uma meditação',
  'Cuidar da pele',
  'Sair com algum amigo (a)',
  'Comer algo que tenha vontade',
];

export default function Autocuidado() {
  const [selecionadas, setSelecionadas] = useState([]);
  const [atividadesPersonalizadas, setAtividadesPersonalizadas] = useState([]);
  const [atividadeAtual, setAtividadeAtual] = useState('');

  const toggleAtividade = (item) => {
    if (selecionadas.includes(item)) {
      setSelecionadas(selecionadas.filter((a) => a !== item));
    } else {
      setSelecionadas([...selecionadas, item]);
    }
  };

  const togglePersonalizada = (item) => {
    setAtividadesPersonalizadas((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const adicionarAtividade = () => {
    if (atividadeAtual.trim() !== '') {
      setAtividadesPersonalizadas([...atividadesPersonalizadas, atividadeAtual.trim()]);
      setAtividadeAtual('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Escolha as atividades que deseja praticar hoje</Text>

        {atividades.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => toggleAtividade(item)}
          >
            <Text style={styles.marker}>
              {selecionadas.includes(item) ? '✅' : '⬜'}
            </Text>
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.planoTitulo}>Seu plano de hoje:</Text>
        <View style={styles.planoBox}>
          {(selecionadas.length > 0 || atividadesPersonalizadas.length > 0) ? (
            <>
              {selecionadas.map((item, index) => (
                <TouchableOpacity key={`s-${index}`} onPress={() => toggleAtividade(item)}>
                  <Text style={styles.planoItem}>• {item}</Text>
                </TouchableOpacity>
              ))}
              {atividadesPersonalizadas.map((item, index) => (
                <TouchableOpacity key={`p-${index}`} onPress={() => togglePersonalizada(item)}>
                  <Text style={styles.planoItem}>• {item}</Text>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <Text style={styles.planoVazio}>Nenhuma atividade selecionada ainda.</Text>
          )}
        </View>

        <Text style={styles.label}>Quer adicionar outra atividade?</Text>
        <TextInput
          style={styles.inputPersonalizado}
          placeholder="Digite aqui sua própria atividade..."
          value={atividadeAtual}
          onChangeText={setAtividadeAtual}
          onSubmitEditing={adicionarAtividade}
          returnKeyType="done"
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    backgroundColor: '#D6C3F6',
    height: 40,
    
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#AFCDEB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  marker: {
    fontSize: 18,
    marginRight: 12,
  },
  itemText: {
    fontSize: 15,
    color: '#000',
  },
  botao: {
    backgroundColor: '#99CFC2',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  botaoTexto: {
    fontWeight: 'bold',
  },
  planoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
 
  planoBox: {
    backgroundColor: '#DCEBFB',
    padding: 12,
    borderRadius: 8,
  },
  planoItem: {
    fontSize: 14,
    marginVertical: 4,
  },
 
  planoVazio: {
  fontSize: 14,
  color: '#888',
},

inputPersonalizado: {
  backgroundColor: '#AFCDEB',
  borderRadius: 10,
  padding: 12,
  marginBottom: 12,
  fontSize: 15,
  color: '#000',
},

});






















