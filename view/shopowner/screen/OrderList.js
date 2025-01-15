import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getOrderListDone, getOrderListPedding, updateOrderStatus } from '../../../api/shopApi';

const Tab = createBottomTabNavigator();

const OrderCard = ({ order, onDetailPress, onConfirmPress }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>Mã đơn hàng: {order.id}</Text>
      {order.status === 'PENDING' && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => onConfirmPress(order.id)}
        >
          <Text style={styles.confirmButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      )}
    </View>
    <Text style={styles.cardText}>Người dùng: {order.fullname} ({order.username})</Text>
    <Text style={styles.cardText}>Trạng thái: {order.status}</Text>
    <Text style={styles.cardText}>
      Ngày tạo: {new Date(order.createAt).toLocaleDateString()}
    </Text>
    <Text style={styles.cardText}>Giảm giá: {order.discount} VND</Text>
    <Text style={styles.cardText}>Số lượng sản phẩm: {order.totalProduct}</Text>
    <Text style={styles.cardAmount}>Tổng tiền: {order.amount} VND</Text>
    <TouchableOpacity style={styles.detailButton} onPress={() => onDetailPress(order.id)}>
      <Text style={styles.detailButtonText}>Xem chi tiết</Text>
    </TouchableOpacity>
  </View>
);

const OrderList = ({ orders, title, refreshOrders }) => {
  const navigation = useNavigation();

  const handleConfirmOrder = async (orderId) => {
    try {
      const response = await updateOrderStatus(orderId);
      console.log('STATUS CONFIRM:', response.result);
      Alert.alert('Thông báo', 'Đơn hàng đã được xác nhận!', [
        {
          text: 'OK',
          onPress: () => refreshOrders(),
        },
      ]);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleViewDetail = (orderId) => {
    navigation.navigate('OrderDetailShop', { orderId });
  };

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={<Text style={styles.header}>{title}</Text>}
      renderItem={({ item }) => (
        <OrderCard
          order={item}
          onDetailPress={handleViewDetail}
          onConfirmPress={handleConfirmOrder}
        />
      )}
    />
  );
};

function PendingOrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderListPending = async () => {
    try {
      const data = await getOrderListPedding();
      setOrders(data.result);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderListPending();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#2e86de" />;
  }

  return <OrderList orders={orders} title="Đơn hàng chờ xác nhận" refreshOrders={fetchOrderListPending} />;
}

function ConfirmedOrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderListDone = async () => {
      try {
        const data = await getOrderListDone();
        setOrders(data.result);
      } catch (error) {
        console.error('Error fetching confirmed orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderListDone();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#2e86de" />;
  }

  return <OrderList orders={orders} title="Đơn hàng đã chốt" refreshOrders={() => {}} />;
}

export default function OrderListApp() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <Icon
            name="home"
            size={24}
            color="#E95322"
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate('ShopHome')}
          />
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'PendingOrders' ? 'clock-o' : 'check-circle';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2e86de',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="PendingOrders" component={PendingOrdersScreen} options={{ title: 'Đơn chờ xác nhận' }} />
      <Tab.Screen name="ConfirmedOrders" component={ConfirmedOrdersScreen} options={{ title: 'Đơn đã chốt' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#E95322',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginTop: 5,
  },
  detailButton: {
    marginTop: 10,
    backgroundColor: '#E95322',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#E95322',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
