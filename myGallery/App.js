
import {
  Button,
  Dimensions,
  FlatList, Image,
  Platform,
  SafeAreaView, StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import { useGallery } from './src/use-gallery';

const width = Dimensions.get('screen').width;
const columnSize = width / 3;

export default function App() {
  const { images, pickImage, deleteImage, imageWithAddButton } = useGallery();
  const onLongPressImage = (imageId) => deleteImage(imageId);

  const renderItem = ({ item: {id, uri}, index}) => {


    if(id === -1) {
      return (
        <TouchableOpacity 
          onPress={pickImage}
          style={{
            width: columnSize, 
            height: columnSize, 
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems:"center"
        }}
        >
         <Text style={{fontWeight: "100", fontSize: 50}}>+</Text>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onLongPress={() => onLongPressImage(id)}>
        <Image source={{ uri }} style={{ width: columnSize, height: columnSize }} />
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'flexStart', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      
      <FlatList 
        data={imageWithAddButton}
        renderItem={renderItem}
        numColumns={3}
      />
{/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === 'android' ? 30 : 0
  },
});
