import { StyleSheet, Image, } from 'react-native';

export default function MyImage(props: any) {
  return <Image source={props.img} style={styles.image} resizeMode="contain" />
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  }
});
