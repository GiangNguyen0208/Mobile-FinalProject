import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { viewDetail } from '../../../../api/shopApi';
import { useNavigation } from '@react-navigation/native';

const DetailOrderUser = ({ route }) => {
  const { orderId } = route.params;
  const navigation = useNavigation();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await viewDetail(orderId);
        setOrderDetails(response.result); // Set dữ liệu là mảng
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Nếu đang tải, hiển thị loading spinner
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (!orderDetails || orderDetails.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Không tìm thấy thông tin đơn hàng.</Text>
      </View>
    );
  }

  const BackHandler = () => {
    navigation.navigate('Order');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {orderDetails.map((detail) => (
        <Card style={styles.card} key={detail.id}>
          {/* Hiển thị ảnh sản phẩm */}
          {detail.image ? (
            <Card.Cover source={{ uri: detail.image }} style={styles.productImage} />
          ) : (
            <Text style={styles.text}>No image available</Text>
          )}
          <Card.Content>
            <Title style={styles.productName}>{detail.productName}</Title>
            <Paragraph style={styles.text}>Mã đơn hàng: {detail.orderId}</Paragraph>
            <Paragraph style={styles.text}>Sản phẩm ID: {detail.productId}</Paragraph>
            <Paragraph style={styles.text}>Giá: {detail.price} VND</Paragraph>
            <Paragraph style={styles.text}>Số lượng: {detail.quantity}</Paragraph>
            <Paragraph style={styles.text}>Tổng tiền: {detail.amount} VND</Paragraph>
          </Card.Content>
        </Card>
      ))}
      <Button onPress={() => BackHandler()} mode="outlined" style={styles.button}>
        Quay lại
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 5,
    backgroundColor: '#fff',
  },
  productImage: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default DetailOrderUser;
