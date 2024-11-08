import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const ThanhToan = ({ route, navigation }) => {
    // Nhận thông tin đơn hàng từ route params
    const { order } = route.params;

    // State để điều khiển hiển thị của các Modal
    const [isMoMoModalVisible, setMoMoModalVisible] = useState(false);
    const [isCreditCardModalVisible, setCreditCardModalVisible] = useState(false);

    const handleMoMoPayment = () => {
        // Mở form mã QR thanh toán qua MoMo
        setMoMoModalVisible(true);
    };

    const handleCreditCardPayment = () => {
        // Mở form nhập thông tin thẻ Credit Card
        setCreditCardModalVisible(true);
    };

    const closeMoMoModal = () => {
        setMoMoModalVisible(false);
    };

    const closeCreditCardModal = () => {
        setCreditCardModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Tiêu đề "Thanh Toán" */}
            <Text style={styles.title}>Thanh Toán</Text>

            {/* Mã đơn hàng và tổng tiền */}
            <View style={styles.orderInfoContainer}>
                <Text style={styles.orderDetailText}>Mã đơn hàng: <Text style={styles.boldText}>{order.id}</Text></Text>
                <Text style={styles.orderDetailText}>Tổng tiền: <Text style={styles.boldText}>{order.price} VND</Text></Text>
            </View>

            {/* Các phương thức thanh toán */}
            <TouchableOpacity style={styles.paymentOption} onPress={handleMoMoPayment}>
                <Text style={styles.paymentText}>Thanh toán qua MoMo</Text>
                <Image source={require('../../../assets/momo.jpg')} style={styles.paymentImage} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption} onPress={handleCreditCardPayment}>
                <Text style={styles.paymentText}>Thanh toán qua Credit Card</Text>
                <Image source={require('../../../assets/creditcard.jpg')} style={styles.paymentImage} />
            </TouchableOpacity>

            {/* Modal hiển thị mã QR MoMo */}
            <Modal
                visible={isMoMoModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeMoMoModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Quét mã QR để thanh toán qua MoMo</Text>
                        <Image source={require('../../../assets/myMomo.jpg')} style={styles.qrImage} />
                        <Button title="Đóng" onPress={closeMoMoModal} />
                    </View>
                </View>
            </Modal>

          {/* Modal nhập thông tin Credit Card */}
          <Modal
              visible={isCreditCardModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={closeCreditCardModal}
          >
              <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Nhập thông tin thẻ Credit Card</Text>
                      <TextInput style={styles.input} placeholder="Số thẻ" keyboardType="numeric" />
                      <TextInput style={styles.input} placeholder="Ngày hết hạn (MM/YY)" keyboardType="numeric" />
                      <TextInput style={styles.input} placeholder="CVV" keyboardType="numeric" secureTextEntry={true} />
                      <View style={styles.buttonContainer}>
                          <View style={styles.button}>
                              <Button title="Thanh Toán" onPress={() => { console.log('Thanh toán bằng Credit Card') }} />
                          </View>
                          <View style={styles.button}>
                              <Button title="Đóng" onPress={closeCreditCardModal} />
                          </View>
                      </View>
                  </View>
              </View>
          </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    orderInfoContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    orderDetailText: {
        fontSize: 18,
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    paymentText: {
        fontSize: 18,
    },
    paymentImage: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    qrImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
      buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10, // Tạo khoảng cách giữa các trường nhập liệu và các nút
        },
        button: {
            flex: 1, // Để nút chiếm cùng một không gian
            marginHorizontal: 5, // Tạo khoảng cách ngang giữa các nút
        },
});

export default ThanhToan;
