import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BoasVindas({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login'); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Sereno vibes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6C3F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C41F2',
  },
});
