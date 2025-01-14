import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addVoucher, editVoucher, deleteVoucher } from '../../../api/shopApi';


export default function AddVoucher({ route, navigation }) {
    const [priceMin, setPriceMin] = useState();
    const [code, setCode] = useState('');
    const [valueDiscount, setValueDiscount] = useState();
    const { shop, voucher } = route.params; // Lấy shop và notification từ params

    const isEditMode = voucher != null;

    useEffect(() => {
        if (isEditMode) {
            // Điền dữ liệu của notification vào các trường nếu là chế độ chỉnh sửa
            setPriceMin(voucher.priceMin);
            setValueDiscount(voucher.valueDiscount);
            setCode(voucher.code)
        }
    }, [isEditMode, voucher]);

    const handleDelete = async (voucherId) => {
        try {
            const response = await deleteVoucher(voucherId);
            if (response.status==200) {
                alert("Xóa thành công"); // Hiển thị thông báo thành công
                navigation.goBack();
            } else {
                alert(`Xóa thất bại`); // Hiển thị lỗi từ server
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            alert('Đã xảy ra lỗi khi xóa mã giảm giá.');
        }
    };


    const handleSubmit = async () => {
        const voucherData = {
            priceMin: priceMin,
            code: code,
            valueDiscount: valueDiscount,
            shopId: shop.id, // Dùng shop.id từ shop
        };

        let response;
        if (isEditMode) {
            // Sửa mã giảm giá
            response = await editVoucher(voucher.id, voucherData);
        } else {
            // Thêm mã giảm giá mới
            response = await addVoucher(voucherData);
        }

        if (response.code === 1000) {
            alert(isEditMode ? 'Cập nhật mã giảm giá thành công!' : 'Thêm mã giảm giá thành công!');
            setPriceMin('');
            setCode('');
            setValueDiscount('');
            navigation.goBack(); // Quay lại màn hình trước
        } else {
            alert(isEditMode ? 'Cập nhật mã giảm giá thất bại!' : 'Thêm mã giảm giá thất bại!');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Mã giảm giá"
                value={code}
                onChangeText={setCode}
                editable={!isEditMode}  // Nếu là chế độ chỉnh sửa, không cho phép chỉnh sửa
            />

            <TextInput
                style={styles.input}
                placeholder="Giá trị đơn hàng tối thiểu"
                value={priceMin !== undefined && priceMin !== null ? priceMin + '' : ''}
                onChangeText={setPriceMin}
            />

            <TextInput
                style={styles.input}
                placeholder="Phần trăm giảm giá"
                value={valueDiscount !== undefined && valueDiscount !== null ? valueDiscount + '' : ''}
                onChangeText={setValueDiscount}
            />

            {/* Hiển thị tên cửa hàng nếu có */}
            {shop && shop.name ? (
                <Text style={styles.input}>{shop.name}</Text>
            ) : (
                <Text>Cửa hàng không có tên</Text> // Hiển thị khi không có tên cửa hàng
            )}
            <Button
                title={isEditMode ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"}
                onPress={handleSubmit}
                color={"#E95322"}
            />
            {isEditMode && (
                <View style={{ marginTop: 8 }}>
                    <Button
                        title="Xóa mã giảm giá"
                        onPress={() => handleDelete(voucher.id)}
                        color="#E95322"
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

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

});

