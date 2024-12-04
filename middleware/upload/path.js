import React from 'react';
import { View, Button, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const UploadImage = () => {
  const [imageUri, setImageUri] = React.useState(null);

  const uploadImage = async (uri) => {
    const data = new FormData();
    data.append('file', {
      uri,
      type: 'image/jpeg', // or the appropriate type
      name: 'photo.jpg', // or the appropriate name
    });
    data.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your upload preset

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload',
        data
      );
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        uploadImage(uri);
      }
    });
  };

  return (
    <View>
      <Button title="Select Image" onPress={selectImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
    </View>
  );
};

export default UploadImage;