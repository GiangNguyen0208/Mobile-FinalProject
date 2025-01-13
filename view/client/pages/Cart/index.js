import React, { useState, useEffect } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { updateCart, removeFromCart, viewCart } from '../../../../api/cartApi'
import { Checkbox } from 'react-native-paper'

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await viewCart()
        if (cartData.result.length === 0) {
          Alert.alert(
            'Your cart is empty',
            'You will be redirected to the Home page.',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('UserHome')
              }
            ]
          )
        } else {
          setCartItems(cartData.result)
          const total = cartData.result.reduce(
            (sum, item) => sum + item.totalPrice,
            0
          )
          setTotalAmount(total)
        }
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
    fetchCart()
  }, [])

  const toggleSelection = item => {
    const isSelected = selectedItems.some(
      selectedItem => selectedItem.idProduct === item.idProduct
    )
    let updatedSelectedItems

    if (isSelected) {
      updatedSelectedItems = selectedItems.filter(
        selectedItem => selectedItem.idProduct !== item.idProduct
      )
    } else {
      updatedSelectedItems = [...selectedItems, item]
    }

    setSelectedItems(updatedSelectedItems)
    updateTotal(updatedSelectedItems)
  }

  const updateTotal = updatedSelectedItems => {
    const total = updatedSelectedItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    )
    setTotalAmount(total)
  }

  const updateCartProduct = async cartData => {
    try {
      const response = await updateCart(cartData)
      console.log(response)
      const updatedCart = await viewCart()
      setCartItems(updatedCart.result)
    } catch (error) {
      console.error('Error updating cart:', error)
    }
  }

  const removeItem = async productId => {
    try {
      const response = await removeFromCart(productId)
      console.log(response)
      const updatedCart = await viewCart()
      setCartItems(updatedCart.result)
      const total = updatedCart.result.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      )
      setTotalAmount(total)
    } catch (error) {
      console.error('Error removing product from cart:', error)
    }
  }

  const changeQuantity = async (item, operation) => {
    const updatedItem = { ...item }
  
    // Tăng hoặc giảm số lượng
    if (operation === 'increase') {
      updatedItem.quantity += 1
    } else if (operation === 'decrease' && updatedItem.quantity > 1) {
      updatedItem.quantity -= 1
    } else {
      alert('Quantity cannot be less than 1.')
      return
    }
  
    // Tạo yêu cầu cập nhật giỏ hàng
    const cartRequest = {
      productId: updatedItem.idProduct,
      quantity: updatedItem.quantity,
    }
  
    try {
      // Gửi yêu cầu cập nhật giỏ hàng
      await updateCartProduct(cartRequest)
  
      // Cập nhật danh sách giỏ hàng
      const updatedCart = await viewCart()
      setCartItems(updatedCart.result)
  
      // Kiểm tra nếu sản phẩm đang được chọn, cập nhật trong `selectedItems`
      const isSelected = selectedItems.some(
        selectedItem => selectedItem.idProduct === updatedItem.idProduct
      )
  
      if (isSelected) {
        const updatedSelectedItems = selectedItems.map(selectedItem =>
          selectedItem.idProduct === updatedItem.idProduct
            ? { ...selectedItem, quantity: updatedItem.quantity }
            : selectedItem
        )
        setSelectedItems(updatedSelectedItems)
  
        // Tính lại tổng tiền từ danh sách đã chọn
        updateTotal(updatedSelectedItems)
      }
    } catch (error) {
      console.error('Error updating cart:', error)
      alert('Failed to update cart. Please try again.')
    }
  }
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.idProduct.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Checkbox */}
            <TouchableOpacity
              onPress={() => toggleSelection(item)}
              style={styles.checkboxContainer}
            >
              <Checkbox
                status={
                  selectedItems.some(
                    selectedItem => selectedItem.idProduct === item.idProduct
                  )
                    ? 'checked'
                    : 'unchecked'
                }
              />
            </TouchableOpacity>

            {/* Product Info */}
            <View style={styles.productInfo}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productText}>{item.name}</Text>
                <Text style={styles.productText}>${item.price}</Text>
              </View>
            </View>

            {/* Quantity Controls */}
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => changeQuantity(item, 'decrease')}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => changeQuantity(item, 'increase')}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Remove Button */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(item.idProduct)}
            >
              <Icon name='delete' size={20} color='#fff' />
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.total}>Total: {totalAmount} VND</Text>
      <TouchableOpacity
        style={styles.checkOut}
        onPress={() => {
          if (selectedItems.length === 0) {
            alert('Please select at least one item to proceed to checkout.')
          } else {
            navigation.navigate('Pay', { cartItems: selectedItems })
          }
        }}
      >
        <Text style={styles.checkOutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center'
  },
  productInfo: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10
  },
  productDetails: {
    justifyContent: 'center',
    flex: 1
  },
  productText: {
    fontSize: 16,
    marginBottom: 5,
    flexWrap: 'nowrap'
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  quantityButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10
  },
  removeButton: {
    backgroundColor: '#e80b0b',
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20
  },
  checkOut: {
    backgroundColor: '#e80b0b',
    borderRadius: 5,
    padding: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkOutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default Cart
