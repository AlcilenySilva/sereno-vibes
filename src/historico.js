import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { db, auth } from './firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LineChart } from 'react-native-chart-kit';

const humorParaValor = {
  'Feliz': 5,
  'Tranquilo': 4,
  'Neutro': 3,
  'Ansioso': 2,
  'Estressado': 2,
  'Triste': 1,
};

const humorParaEmoji = {
  'Feliz': '😄',
  'Tranquilo': '🙂',
  'Neutro': '😐',
  'Ansioso': '😕',
  'Estressado': '😣',
  'Triste': '😢',
};

const screenWidth = Dimensions.get('window').width;

export default function Historico() {
  const [loading, setLoading] = useState(true);
  const [diarios, setDiarios] = useState([]);
  const [humoresData, setHumoresData] = useState([]);
  const [registrosVisiveis, setRegistrosVisiveis] = useState(2); 

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const humoresQuery = query(
      collection(db, 'humores'),
      where('userId', '==', user.uid),
      orderBy('data', 'asc')
    );
    const unsubscribeHumores = onSnapshot(humoresQuery, (snapshot) => {
      const humores = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })).filter(h => h.data);
      setHumoresData(humores);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar humores:", error);
      setLoading(false);
    });

    const diariosQuery = query(
      collection(db, 'diarios'),
      where('userId', '==', user.uid),
      orderBy('data', 'desc')
    );
    const unsubscribeDiarios = onSnapshot(diariosQuery, (snapshot) => {
      const diarios = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })).filter(d => d.data);
      setDiarios(diarios);
    }, (error) => {
      console.error("Erro ao buscar diários:", error);
    });

    return () => {
      unsubscribeHumores();
      unsubscribeDiarios();
    };
  }, []);

  const verMaisRegistros = () => {
    setRegistrosVisiveis(diarios.length);
  };

  const ocultarRegistros = () => {
    setRegistrosVisiveis(2);
  };

  const renderItem = ({ item }) => {
    const dataFormatada = item.data ? format(item.data.toDate(), 'dd/MM/yyyy', { locale: ptBR }) : 'Data Indisponível';
    
    const humorCorresp = humoresData.find(h => 
      item.data && h.data && h.data.toDate().getTime() === item.data.toDate().getTime()
    );
    const emoji = humorCorresp ? humorParaEmoji[humorCorresp.emocao] : null;

    return (
      <View style={styles.registroContainer}>
        <View style={styles.dataContainer}>
          <FontAwesome name="calendar" size={12} color="#444" style={{ marginRight: 6 }} />
          <Text style={styles.data}>{dataFormatada}</Text>
        </View>
        <Text style={styles.registroTexto}>"{item.descricao}"</Text>
        {item.formasDeLidar && item.formasDeLidar.length > 0 && (
          <Text style={styles.detalhesDiario}>
            {item.formasDeLidar.join(', ')}
          </Text>
        )}
        {item.pessoasEnvolvidas && item.pessoasEnvolvidas.length > 0 && (
          <Text style={styles.detalhesDiario}>
            <Feather name="user" size={10} color="#555" /> {item.pessoasEnvolvidas.join(', ')}
          </Text>
        )}
      </View>
    );
  };
  
  const labelsGrafico = humoresData.map(h => format(h.data.toDate(), 'dd/MM', { locale: ptBR }));
  const dataGrafico = humoresData.map(h => humorParaValor[h.emocao] || 0);
  
  const chartData = {
    labels: labelsGrafico,
    datasets: [{ data: dataGrafico }],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(108, 65, 242, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 0,
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#6C41F2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}></View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        <Text style={styles.titulo}>Histórico Emocional</Text>
        <View style={styles.chartContainer}>
          {chartData.datasets[0].data.length > 0 ? (
            <>
              <LineChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginLeft: -24, 
                }}
                renderDotContent={({ x, y, index, indexData }) => {
                  const emoji = humorParaEmoji[humoresData[index]?.emocao];
                  if (!emoji) return null;
                  return (
                    <View
                      key={index}
                      style={{
                        position: 'absolute',
                        top: y - 25, 
                        left: x - 10,
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{emoji}</Text>
                    </View>
                  );
                }}
              />
            </>
          ) : (
            <Text style={styles.semRegistros}>Não há dados de humor para o gráfico.</Text>
          )}
        </View>

        <Text style={styles.subtitulo}>Seus Registros Recentes</Text>
        
        {diarios.length === 0 ? (
          <Text style={styles.semRegistros}>Nenhum registro de diário encontrado.</Text>
        ) : (
          <FlatList
            data={diarios.slice(0, registrosVisiveis)} 
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false} 
            style={styles.lista}
          />
        )}
        
        {diarios.length > 2 && (
          <TouchableOpacity 
            style={styles.botaoMais} 
            onPress={registrosVisiveis === 2 ? verMaisRegistros : ocultarRegistros}
          >
            <Text style={styles.botaoTexto}>
              {registrosVisiveis === 2 ? 'Ver mais registros...' : 'Ocultar'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    padding: 24,
    paddingTop: 10,
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
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    paddingVertical: 10,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  registroContainer: {
    backgroundColor: '#F7F7F7',
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  data: {
    fontSize: 12,
    color: '#888',
  },
  registroTexto: {
    fontSize: 14,
    lineHeight: 18,
  },
  detalhesDiario: {
    fontSize: 12, 
    color: '#555',
    marginTop: 2, 
  },
  semRegistros: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  botaoMais: {
    backgroundColor: '#A8E6CF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lista: {
    marginBottom: 10,
  }
});   