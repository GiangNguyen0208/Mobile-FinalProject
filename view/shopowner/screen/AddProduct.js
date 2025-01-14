import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../api/firebaseConfig'; // Firebase config
import { Picker } from '@react-native-picker/picker';
import { getListCategoryByShopId, addProduct, saveImagesToDatabase } from '../../../api/shopApi';
import { useAuth } from '../../context/Auth/AuthContext';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../api/firebaseConfig'; // Firebase Firestore config
import { SafeAreaView } from 'react-native-safe-area-context';

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

  // Chọn nhiều ảnh
  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      selectionLimit: 0, // Cho phép chọn nhiều ảnh
    });

    if (!result.canceled) {
      setImages(result.assets); // Lưu tất cả ảnh đã chọn vào state
    }
  };

  // Lấy danh sách danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getListCategoryByShopId(shopId);
        setCategories(categoryData.result || []);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, [shopId]);

  const uploadImagesToFirebase = async (images) => {
    const uploadedUrls = [];
    for (const image of images) {
      if (!image || !image.uri) {
        console.error('Invalid image:', image);
        continue; // Bỏ qua ảnh không hợp lệ
      }
  
      const fileName = `products/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
      const storageRef = ref(storage, fileName);
      try {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        uploadedUrls.push(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    return uploadedUrls;
  };
  
  // Lưu ảnh vào Firestore
  const saveImageToFirestore = async (productId, imageUrl) => {
    const foodsRef = doc(db, 'Foods', productId); // Tham chiếu đến bảng Foods và sử dụng ID sản phẩm làm key
    await setDoc(foodsRef, {
      key: productId,   // key của sản phẩm
      value: imageUrl,  // URL của ảnh
    });
    console.log('Image data saved to Firestore');
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      alert('Vui lòng chọn ít nhất một ảnh!');
      return;
    }
  
    setUploading(true);
    try {
      // Kiểm tra lại các ảnh
      const validImages = images.filter(image => image && image.uri);
      if (validImages.length === 0) {
        alert('Không có ảnh hợp lệ để tải lên!');
        return;
      }
  
      const imageUrls = await uploadImagesToFirebase(validImages);
      if (imageUrls.length === 0) {
        alert('Tải ảnh lên Firebase thất bại!');
        return;
      }
  
      const productData = {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        categoryId: category,
        status,
      };
  
      const response = await addProduct(productData);
      if (response && response.data) {
        for (const imageUrl of imageUrls) {
          await saveImagesToDatabase(response.data.id, imageUrl);
        }
  
        alert('Thêm sản phẩm và ảnh thành công!');
        setName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setImages([]);
        setCategory('');
        setStatus('ON_SALE');
      } else {
        alert('Thêm sản phẩm thất bại!');
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Đã xảy ra lỗi khi thêm sản phẩm!');
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
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

      <Text>Chọn tình trạng sản phẩm:</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="ON_SALE" value="ON_SALE" />
        <Picker.Item label="SOLD_OUT" value="SOLD_OUT" />
      </Picker>

      <Button title="Chọn ảnh" onPress={pickImages} color={"#E95322"}/>
      <ScrollView horizontal>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.uri }}
            style={styles.image}
          />
        ))}
      </ScrollView>

      <Button
        title="Thêm sản phẩm"
        onPress={handleSubmit}
        disabled={uploading}
        color={"#E95322"}
      />
    </SafeAreaView>
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
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default AddProduct;
