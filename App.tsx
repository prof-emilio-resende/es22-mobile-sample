import { useState } from 'react';

import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from 'anonymous-files';

import img from './assets/icon.png';

export interface LocalImage {
  localUri: string;
  remoteUri?: string;
}


export default function App() {
  const [selectedImage, setSelectedImage] = useState<LocalImage|null>(null);

  const openImagePickerAsync = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      alert('App não pode acessar a galeria, encerrando...');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      alert('Nenhuma foto selecionada...');
      return;
    }

    const imageObj = { localUri: pickerResult.uri } as LocalImage;

    if (Platform.OS === "web") {
      const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      imageObj.remoteUri = remoteUri;
    }

    setSelectedImage(imageObj);
  }

  const openShareAsync = async () => {
    if (!(await Sharing.isAvailableAsync()) || selectedImage === null) {
      alert('não pode compartilhar, selecione uma imagem primeiro...');
      return;
    }

    await Sharing.shareAsync(selectedImage.remoteUri ?? selectedImage.localUri)
  }

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>Hey, selecione uma imagem...</Text>
      </View>
      { selectedImage === null && 
        (<Image source={img} style={styles.image} resizeMode="contain" />)
      }
      { selectedImage !== null && 
        (<Image source={{
          uri: selectedImage.localUri
        }} style={styles.image} resizeMode="contain" />)
      }
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>Selecionar Imagem</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openShareAsync} style={[styles.button, styles.buttonShare]}>
          <Ionicons
            name="share-outline"
            size={16}
            style={styles.buttonText}
          />
          <Text style={styles.buttonText}>Compartilhar!</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: Dimensions.get("screen").width * 0.8,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    ...Platform.select({
      ios: {
        borderRadius: 25,
        backgroundColor: "#CCCCCC"
      },
      android: {
        borderRadius: 5,
        backgroundColor: "#00aaff"
      }
    })
  },
  buttonText: {
    ...Platform.select({
      ios: {
        color: "#000"
      },
      android: {
        color: "#fff"
      }
    })
  },
  buttonShare: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    width: 300,
    height: 300
  }
});
