import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../api/Firebase'; // Firebase config
import { Picker } from '@react-native-picker/picker';
import { getListCategoryByShopId } from '../../../api/shopApi';
import { useAuth } from '../../context/Auth/AuthContext';

const AddProduct = () => {
  const [name, setName] = useState('');
  const { shopId } = useAuth();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('ON_SALE');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      selectionLimit: 0, // Cho phép chọn nhiều ảnh
    });

    if (!result.canceled) {
      setImages(result.assets); // Lưu tất cả ảnh đã chọn vào state
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getListCategoryByShopId(shopId);
        setCategories(categoryData.result || []);
      } catch (error) {
        if (error.response) {
          console.error('API error response:', error.response.data); // Data from the server
        } else if (error.request) {
          console.error('No response received:', error.request); // No response from the server
        } else {
          console.error('Request setup error:', error.message); // Any other errors
        }
      }
    };

    fetchCategories();
  }, [shopId]);

  // Chọn ảnh
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload ảnh lên Firebase
  const uploadImageToFirebase = async () => {
    if (!image) return null;

    setUploading(true);
    try {
      const fileName = `products/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
      const storageRef = ref(storage, fileName);

      const response = await fetch(image);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);

      const url = await getDownloadURL(storageRef);
      return url; 
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Gửi dữ liệu sản phẩm đến server Spring Boot
  const handleSubmit = async () => {
    const imageUrl = await uploadImageToFirebase();
    if (!imageUrl) {
      alert('Upload ảnh thất bại!');
      return;
    }

    const productData = {
        name,
        description,
        price: parseFloat(price),
        imageUrl, 
        category, 
    };

      try {
        const response = await fetch('http://<YOUR_SPRING_BOOT_SERVER>/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
  
        if (response.ok) {
          alert('Thêm sản phẩm thành công!');
          setName('');
          setDescription('');
          setPrice('');
          setImage(null);
          setCategory(''); // Reset category
          setStatus()
        } else {
          alert('Thêm sản phẩm thất bại!');
        }
      } catch (error) {
        console.error('Error submitting product:', error);
      }
    };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên sản phẩm"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả sản phẩm"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá sản phẩm"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Số lượng sản phẩm"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      
      {/* Category Dropdown */}
      <Text>Chọn danh mục:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Chọn danh mục" value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
        ))}
      </Picker>

      {/* Product Status */}
      <Text>Chọn tình trạng sản phẩm:</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="ON_SALE" value="ON_SALE" />
        <Picker.Item label="SOLD_OUT" value="SOLD_OUT" />
      </Picker>


      {/* Image Picker */}
      {/* <Button title="Chọn ảnh" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />} */}

        <Button title="Chọn ảnh" onPress={pickImages} />
        {/* Hiển thị tất cả ảnh đã chọn */}
        <ScrollView horizontal>
            {images.map((image, index) => (
            <Image
                key={index}
                source={{ uri: image.uri }}
                style={styles.image}
            />
            ))}
        </ScrollView>
      
      <Button title="Thêm sản phẩm" onPress={handleSubmit} disabled={uploading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default AddProduct;
