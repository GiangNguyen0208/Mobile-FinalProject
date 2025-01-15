
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { getUserById, updateUser } from "../../../api/adminApi";
import { useAuth } from "../../context/Auth/AuthContext";

export default function AdminProfile() {
  const { userId } = useAuth(); // Lấy userId từ AuthContext
  const [isEditing, setIsEditing] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // In ra userId để kiểm tra
  console.log("UserId from AuthContext:", userId);

  // Lấy thông tin admin khi userId có sẵn
  useEffect(() => {
    if (!userId) return; // Chờ khi userId có sẵn
    const fetchAdminInfo = async () => {
      try {
        const userData = await getUserById(userId);
        console.log("User Data from API:", userData);

        // Điều chỉnh để sử dụng các trường trả về từ API
        setAdminInfo({
          avatar: userData.avatar || "https://i.pravatar.cc/150?img=3", // Avatar mặc định
          firstName: userData.username || "Chưa có tên", // Nếu không có firstName, dùng username
          lastName: userData.lastname || "Chưa có họ", // Nếu không có lastName, dùng lastname
          phone: userData.phone || "Chưa có sdt", // Sử dụng giá trị mặc định nếu không có
          email: userData.email || "Chưa có email", // Sử dụng giá trị mặc định nếu không có
        });
      } catch (error) {
        console.error("Error fetching admin info:", error);
        Alert.alert("Lỗi", "Không thể tải thông tin admin.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminInfo();
  }, [userId]);

  // Hàm xử lý thay đổi input
  const handleInputChange = (field, value) => {
    setAdminInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUser(userId, {
        firstName: adminInfo.firstName,
        lastName: adminInfo.lastName,
        phone: adminInfo.phone,
        email: adminInfo.email,
      });
      Alert.alert("Thành công", "Thông tin admin đã được cập nhật.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating admin info:", error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !userId) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Đang tải thông tin...</Text>
      </View>
    );
  }

  if (!adminInfo) {
    return (
      <View style={styles.container}>
        <Text>Không thể tải thông tin admin.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image source={{ uri: adminInfo.avatar }} style={styles.avatar} />
      <Text style={styles.name}>
        {adminInfo.firstName} {adminInfo.lastName}
      </Text>

      {/* Thông tin cơ bản */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Họ:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={adminInfo.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)} // Gọi handleInputChange
            />
          ) : (
            <Text style={styles.text}>{adminInfo.firstName}</Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Tên:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={adminInfo.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)} // Gọi handleInputChange
            />
          ) : (
            <Text style={styles.text}>{adminInfo.lastName}</Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Số điện thoại:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={adminInfo.phone}
              keyboardType="phone-pad"
              onChangeText={(text) => handleInputChange("phone", text)} // Gọi handleInputChange
            />
          ) : (
            <Text style={styles.text}>{adminInfo.phone}</Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={adminInfo.email}
              keyboardType="email-address"
              onChangeText={(text) => handleInputChange("email", text)} // Gọi handleInputChange
            />
          ) : (
            <Text style={styles.text}>{adminInfo.email}</Text>
          )}
        </View>
      </View>

      {/* Nút chỉnh sửa hoặc lưu */}
      <TouchableOpacity
        style={styles.button}
        onPress={isEditing ? handleSave : () => setIsEditing(true)}
        disabled={saving} // Vô hiệu hóa nút khi đang lưu
      >
        <Text style={styles.buttonText}>
          {saving ? "Đang lưu..." : isEditing ? "Lưu thông tin" : "Chỉnh sửa thông tin"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F7F9FC",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    width: "30%",
  },
  text: {
    fontSize: 16,
    color: "#333",
    width: "65%",
    textAlign: "right",
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 8,
    width: "65%",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
