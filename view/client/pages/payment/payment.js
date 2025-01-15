import React, { useState } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import { createOrder } from '../../../../api/orderApi'
import { useNavigation } from '@react-navigation/native'

const Payment = ({ route }) => {
  const { cartItems } = route.params
  const navigation = useNavigation() 
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  const [voucher, setVoucher] = useState('')
  const [discount, setDiscount] = useState(0)

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const discountedAmount = totalAmount - discount

  const handleVoucherApply = () => {
    if (voucher === 'DISCOUNT10') {
      setDiscount(totalAmount * 0.1)
      alert('Voucher applied: 10% off')
    } else if (voucher === 'DISCOUNT20') {
      setDiscount(totalAmount * 0.2)
      alert('Voucher applied: 20% off')
    } else {
      setDiscount(0)
      alert('Invalid voucher code')
    }
  }

  const handlePayment = async () => {
    const orderData = {
      voucherId: voucher ? voucher : null,  // Nếu có voucher, gán voucherId
      paymentMethodId: paymentMethod === 'Cash on Delivery' ? 1 : 2,  
      orderDetails: cartItems.map(item => ({
        productId: item.idProduct,
        quantity: item.quantity,
      })),
    }

    try {
        const response = await createOrder(orderData)
        if (response.code === 1000) {
          alert('Thanh toán thành công!')
          navigation.navigate('UserHome') 
        } else {
          alert('Payment failed: ' + response.mesg)
        }
      } catch (error) {
        console.error('Error creating order:', error)
        alert('Có lỗi sảy ra khi thanh toán, vui lòng thử lại sau !')
      }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.idProduct.toString()}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.title}>Chi tiết hóa đơn</Text>
          </>
        )}
        ListFooterComponent={() => (
          <>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>Tổng tiền: ${totalAmount}</Text>
              <Text style={styles.summaryText}>
                Tổng giảm giá: ${discountedAmount}
              </Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nhập mã giảm giá"
              value={voucher.toString()}
              onChangeText={setVoucher}
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleVoucherApply}
            >
              <Text style={styles.applyButtonText}>Áp dụng mã giảm giá</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Phương thức thanh toán</Text>
            <View style={styles.paymentMethods}>
              <TouchableOpacity
                style={[
                  styles.paymentButton,
                  paymentMethod === 'Cash on Delivery' &&
                    styles.selectedPaymentMethod,
                ]}
                onPress={() => setPaymentMethod('Cash on Delivery')}
              >
                <Text
                  style={[
                    styles.paymentButtonText,
                    paymentMethod === 'Cash on Delivery' &&
                      styles.selectedPaymentText,
                  ]}
                >
                  Tiền mặt
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentButton,
                  paymentMethod === 'Credit Card' &&
                    styles.selectedPaymentMethod,
                ]}
                onPress={() => setPaymentMethod('Credit Card')}
              >
                <Text
                  style={[
                    styles.paymentButtonText,
                    paymentMethod === 'Credit Card' &&
                      styles.selectedPaymentText,
                  ]}
                >
                  Chuyển khoản
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
              <Text style={styles.payButtonText}>Thánh toán ngay</Text>
            </TouchableOpacity>
          </>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDesc}>{item.des}</Text>
              <Text style={styles.productPrice}>
                ${item.price} x {item.quantity}
              </Text>
            </View>
            <Text style={styles.totalPrice}>${item.totalPrice}</Text>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    alignItems: 'center'
  },
  cartList: {
    minHeight: 310
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15
  },
  productInfo: {
    flex: 1
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  productDesc: {
    fontSize: 14,
    color: '#777'
  },
  productPrice: {
    fontSize: 16,
    color: '#555'
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e80b0b'
  },
  summaryContainer: {
    marginVertical: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingHorizontal: 20
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15
  },
  applyButton: {
    backgroundColor: '#e80b0b',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center'
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  paymentMethods: {
    flexDirection: 'row',
    marginBottom: 20
  },
  paymentButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10
  },
  selectedPaymentMethod: {
    backgroundColor: '#8b0000'
  },
  paymentButtonText: {
    color: '#000'
  },
  selectedPaymentText: {
    color: '#fff'
  },
  payButton: {
    backgroundColor: '#e80b0b',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default Payment
