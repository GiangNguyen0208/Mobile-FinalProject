import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddressForm = () => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    const handleSaveAddress = () => {
        const address = {
            street,
            city,
            state,
            zipcode,
        };
        console.log('User Address:', address);
        // Save to backend or local storage
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Địa chỉ</Text>
            <TextInput
                style={styles.input}
                placeholder="Địa chỉ"
                value={street}
                onChangeText={setStreet}
            />
            <Text style={styles.label}>Quận/huyện</Text>
            <TextInput
                style={styles.input}
                placeholder="Quận/huyện"
                value={city}
                onChangeText={setCity}
            />
            <Text style={styles.label}>Thành phố</Text>
            <TextInput
                style={styles.input}
                placeholder="Thành phố"
                value={state}
                onChangeText={setState}
            />
            <Text style={styles.label}>Mã bưu điện</Text>
            <TextInput
                style={styles.input}
                placeholder="Mã bưu điện"
                value={zipcode}
                onChangeText={setZipcode}
                keyboardType="numeric"
            />
            <Button title="Save Address" onPress={handleSaveAddress} color="#e74c3c"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    label: { fontSize: 16, marginVertical: 5 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
});

export default AddressForm;
