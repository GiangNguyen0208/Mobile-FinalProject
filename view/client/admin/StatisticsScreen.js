import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const transactions = [
  { id: '1', date: '2024-01-15', amount: 500, quantity: 5 },
  { id: '2', date: '2024-02-10', amount: 300, quantity: 3 },
  { id: '3', date: '2023-12-05', amount: 1000, quantity: 10 },
  { id: '4', date: '2024-03-01', amount: 1500, quantity: 8 },
  { id: '5', date: '2024-01-20', amount: 700, quantity: 7 },
  { id: '6', date: '2023-11-30', amount: 200, quantity: 2 },
  // Add more transactions here
];

const StatisticsScreen = () => {
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('01');

  // Filter transactions based on selected year and month
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getFullYear().toString() === year &&
      (transactionDate.getMonth() + 1).toString().padStart(2, '0') === month
    );
  });

  // Calculate total revenue and quantity
  const totalRevenue = filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  const totalQuantity = filteredTransactions.reduce((total, transaction) => total + transaction.quantity, 0);

  // Generate data for yearly statistics
  const yearlyData = transactions.reduce((acc, transaction) => {
    const year = new Date(transaction.date).getFullYear().toString();
    if (!acc[year]) acc[year] = { revenue: 0, quantity: 0 };
    acc[year].revenue += transaction.amount;
    acc[year].quantity += transaction.quantity;
    return acc;
  }, {});

  // Format yearly data into an array
  const yearDataList = Object.keys(yearlyData).map(year => ({
    year,
    ...yearlyData[year],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thống kê Doanh thu và Số lượng</Text>

      {/* Yearly Data */}
      <Text style={styles.sectionTitle}>Doanh thu và Số lượng theo năm:</Text>
      <FlatList
        data={yearDataList}
        keyExtractor={(item) => item.year}
        renderItem={({ item }) => (
          <View style={styles.statItem}>
            <Text>{`Năm: ${item.year}`}</Text>
            <Text>{`Tổng doanh thu: ${item.revenue} VND`}</Text>
            <Text>{`Tổng số lượng: ${item.quantity}`}</Text>
          </View>
        )}
      />

      {/* Monthly Data */}
      <View style={styles.statItem}>
        <Text style={styles.sectionTitle}>Doanh thu và Số lượng theo tháng {month} năm {year}:</Text>
        <Text>{`Tổng doanh thu: ${totalRevenue} VND`}</Text>
        <Text>{`Tổng số lượng: ${totalQuantity}`}</Text>
      </View>

      {/* Month and Year Selector */}
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setMonth(month === '12' ? '01' : (parseInt(month) + 1).toString().padStart(2, '0'))}>
          <Text style={styles.buttonText}>Tháng tiếp theo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setYear(year === '2024' ? '2023' : (parseInt(year) - 1).toString())}>
          <Text style={styles.buttonText}>Năm trước</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  statItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  selectorButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default StatisticsScreen;
