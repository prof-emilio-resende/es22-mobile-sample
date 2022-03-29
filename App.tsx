import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import MyImage from './MyImage';
import img from './assets/icon.png';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>Hey, selecione uma imagem...</Text>
      </View>
      <MyImage img={img} />
      <View style={styles.actions}>
        <Button title="Clique Aqui!" onPress={() => alert('oi')} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  actions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
