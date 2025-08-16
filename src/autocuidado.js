import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

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


  const SELECTED_ACTIVITIES_KEY = 'selected_autocuidado_activities';
  const CUSTOM_ACTIVITIES_KEY = 'custom_autocuidado_activities';

  
  const loadSelecionadas = async () => {
    try {
      const storedActivities = await AsyncStorage.getItem(SELECTED_ACTIVITIES_KEY);
      if (storedActivities !== null) {
        setSelecionadas(JSON.parse(storedActivities));
      }
    } catch (error) {
      console.error("Erro ao carregar atividades selecionadas:", error);
      Alert.alert("Erro", "Não foi possível carregar as atividades selecionadas.");
    }
  };

  const loadPersonalizadas = async () => {
    try {
      const storedCustomActivities = await AsyncStorage.getItem(CUSTOM_ACTIVITIES_KEY);
      if (storedCustomActivities !== null) {
        setAtividadesPersonalizadas(JSON.parse(storedCustomActivities));
      }
    } catch (error) {
      console.error("Erro ao carregar atividades personalizadas:", error);
      Alert.alert("Erro", "Não foi possível carregar as atividades personalizadas.");
    }
  };


  const saveSelecionadas = async (currentSelection) => {
    try {
      await AsyncStorage.setItem(SELECTED_ACTIVITIES_KEY, JSON.stringify(currentSelection));
    } catch (error) {
      console.error("Erro ao salvar atividades selecionadas:", error);
      Alert.alert("Erro", "Não foi possível salvar as atividades selecionadas.");
    }
  };

  const savePersonalizadas = async (currentCustomActivities) => {
    try {
      await AsyncStorage.setItem(CUSTOM_ACTIVITIES_KEY, JSON.stringify(currentCustomActivities));
    } catch (error) {
      console.error("Erro ao salvar atividades personalizadas:", error);
      Alert.alert("Erro", "Não foi possível salvar as atividades personalizadas.");
    }
  };


  useEffect(() => {
    loadSelecionadas();
    loadPersonalizadas();
  }, []);


  const toggleAtividade = (item) => {
    const newSelecionadas = selecionadas.includes(item)
      ? selecionadas.filter((a) => a !== item)
      : [...selecionadas, item];
    setSelecionadas(newSelecionadas);
    saveSelecionadas(newSelecionadas); 
  };

  const togglePersonalizada = (item) => {
    const newPersonalizadas = atividadesPersonalizadas.includes(item)
      ? atividadesPersonalizadas.filter((a) => a !== item)
      : [...atividadesPersonalizadas, item];
    setAtividadesPersonalizadas(newPersonalizadas);
    savePersonalizadas(newPersonalizadas); 
  };

  const adicionarAtividade = () => {
    if (atividadeAtual.trim() !== '') {
      const newPersonalizadas = [...atividadesPersonalizadas, atividadeAtual.trim()];
      setAtividadesPersonalizadas(newPersonalizadas);
      savePersonalizadas(newPersonalizadas); 
      setAtividadeAtual('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.topBar} />

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
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
            placeholderTextColor="#333"
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  planoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  planoBox: {
    backgroundColor: '#FADDDD',
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
