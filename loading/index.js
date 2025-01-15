import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, StyleSheet, Text, Animated } from "react-native";

// Định nghĩa màu sắc
const COLORS = {
  primary: "#4CAF50",
  lightGray: "#F5F5F5",
};

const LoadingScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Giá trị ban đầu cho hiệu ứng mờ
  const [isImageLoaded, setImageLoaded] = useState(false); // Theo dõi trạng thái tải ảnh

  // Hiệu ứng mờ dần
  useEffect(() => {
    if (isImageLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1, // Hiển thị đầy đủ
        duration: 1000, // Thời gian hiệu ứng
        useNativeDriver: true, // Tối ưu hóa hiệu suất
      }).start();
    }
  }, [isImageLoaded]);

  return (
    <View style={styles.container}>
      {/* Activity Indicator nếu ảnh chưa tải */}
      {!isImageLoaded && (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      )}

      {/* Hình ảnh từ URL */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/food-ordering-app-logo-with-points-fork-shapes-center_666184-195.jpg",
          }}
          style={styles.logo}
          onLoad={() => setImageLoaded(true)} // Khi tải xong ảnh, cập nhật trạng thái
          resizeMode="contain"
        />
      </Animated.View>

      {/* Dòng chữ "Loading..." */}
      <Text style={styles.loadingText}>Go to Food App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
  },
  loader: {
    position: "absolute",
    zIndex: 1, // Hiển thị phía trên ảnh
  },
  logo: {
    width: 200,
    height: 200, // Kích thước hình ảnh
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: "bold",
  },
});

export default LoadingScreen;
