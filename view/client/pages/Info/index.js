import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {COLORS} from "../../../../constants"; // Nhớ định nghĩa các màu trong constants

const Info = () => {
    return (
        <View style={styles.container}>
            {/* Phần đầu (head) */}
            <View style={styles.header}>
                <Image
                    source={require("../../../../assets/icons8-user-30.png")}
                    style={styles.avatar}
                />
                <Image
                    source={require("../../../../assets/img/icons8-tick-mark-48.png")}
                    style={{
                        position: "absolute",
                        right: 495,
                        top: 145,
                        width: 30,
                        height: 30,
                    }}

                />
                <Text style={styles.name}>Duc Dat</Text>
            </View>

            {/* Thông tin chi tiết người dùng */}
            <View style={styles.infoContainer}>
                {/*ví voucher*/}
                <View>
                    <Image
                        source={require("../../../../assets/img/icons8-voucher-48.png")}
                        style={{
                            position: "absolute",
                            top: 200
                        }}
                    />
                    <Text style={{
                        position: "absolute",
                        top: 215,
                        fontWeight: 500,
                        right: 430
                    }}> Ví Voucher</Text>

                    <Image
                        source={require("../../../../assets/img/icons8-greater-than-24.png")}
                        style={{
                            position: "absolute",
                            top: 220,
                            left: 500
                        }}
                    />
                </View>
                {/*shoppe su*/}

                <View style={{
                    position: "absolute",
                    top: 70
                }}>

                    <Image
                        source={require("../../../../assets/img/icons8-dollar-48.png")}
                        style={{
                            position: "absolute",
                            top: 200
                        }}
                    />
                    <Text style={{
                        position: "absolute",
                        top: 215,
                        fontWeight: 500,
                        left: 60
                    }}> Shoppe Xu</Text>

                    <Text style={{
                        position: "absolute",
                        top: 215,
                        fontWeight: 500,
                        left: 400,
                        color: COLORS.blue

                    }}> Liên Kết ngay</Text>

                    <Image
                        source={require("../../../../assets/img/icons8-greater-than-24.png")}
                        style={{
                            position: "absolute",
                            top: 215,
                            left: 500
                        }}
                    />
                </View>
                {/*thanh toán*/}
                <View style={{
                    position: "absolute",
                    top: 140
                }}>

                    <Image
                        source={require("../../../../assets/img/icons8-payment-40.png")}
                        style={{
                            position: "absolute",
                            top: 200
                        }}
                    />
                    <Text style={{
                        position: "absolute",
                        top: 215,
                        fontWeight: 500,
                        left: 60
                    }}> Thanh toán</Text>

                    <Image
                        source={require("../../../../assets/img/icons8-greater-than-24.png")}
                        style={{
                            position: "absolute",
                            top: 220,
                            left: 500
                        }}
                    />
                </View>
                {/*Đị chỉ */}
                <View style={{
                    position: "absolute",
                    top: 210,
                }}>

                    <Image
                        source={require("../../../../assets/img/icons8-location-48.png")}
                        style={{
                            position: "absolute",
                            top: 200
                        }}
                    />
                    <Text style={{
                        position: "absolute",
                        top: 215,
                        fontWeight: 500,
                        left: 60
                    }}> Địa Chỉ</Text>

                    <Image
                        source={require("../../../../assets/img/icons8-greater-than-24.png")}
                        style={{
                            position: "absolute",
                            top: 220,
                            left: 500
                        }}
                    />
                </View>

                {/*Mời bạn bè */}
                <View style={{
                    position: "absolute",
                    top: 330,
                }}>

                    <Image
                        source={require("../../../../assets/img/icons8-mail-48.png")}
                        style={{
                            position: "absolute",
                            top: 200
                        }}
                    />
                    <Text style={{
                        position: "absolute",
                        top: 215,
                        fontWeight: 500,
                        left: 60
                    }}> Mời bạn bè</Text>

                    <Image
                        source={require("../../../../assets/img/icons8-greater-than-24.png")}
                        style={{
                            position: "absolute",
                            top: 220,
                            left: 500
                        }}
                    />
                </View>
                {/*Trung tâm trợ giúp */}
                <View style={{
                    position: "absolute",
                    top: 400,
                }}>

                    <Image
                        source={require("../../../../assets/img/icons8-mail-48.png")}
                        style={{
                            position: "absolute",
                            top: 200
                        }}
                    />
                    <Text style={{
                        position: "absolute",
                        top: 215,
                        fontWeight: 500,
                        left: 60
                    }}> Mời bạn bè</Text>

                    <Image
                        source={require("../../../../assets/img/icons8-greater-than-24.png")}
                        style={{
                            position: "absolute",
                            top: 220,
                            left: 500
                        }}
                    />
                </View>
                <View style={{
                    width: 550,  // Chiều dài đường gạch
                    height: 0.4,     // Độ dày của đường gạch
                    backgroundColor: '#9a9999',  // Màu của đường gạch
                    marginVertical: 20,  // Khoảng cách phía trên và dưới
                    position: "absolute",
                    right: 10,
                    top: 300,

                }}/>
                <View style={{
                    width: 550,  // Chiều dài đường gạch
                    height: 1,     // Độ dày của đường gạch
                    backgroundColor: '#9a9999',  // Màu của đường gạch
                    marginVertical: 20,  // Khoảng cách phía trên và dưới
                    position: "absolute",
                    right: 10,
                    top: 240,

                }}/>
                <View style={{
                    width: 550,  // Chiều dài đường gạch
                    height: 1,     // Độ dày của đường gạch
                    backgroundColor: '#9a9999',  // Màu của đường gạch
                    marginVertical: 20,  // Khoảng cách phía trên và dưới
                    position: "absolute",
                    right: 10,
                    top: 380,

                }}/>
                <View style={{
                    width: 550,  // Chiều dài đường gạch
                    height: 20,     // Độ dày của đường gạch
                    backgroundColor: '#dedcdc',  // Màu của đường gạch
                    marginVertical: 20,  // Khoảng cách phía trên và dưới
                    position: "absolute",
                    right: 10,
                    top: 460,

                }}/>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white, // Màu nền của toàn bộ trang
    },
    header: {
        width: 600,
        height: 200,
        backgroundColor: COLORS.orange, // Màu nền của phần header
        justifyContent: 'center',
        alignItems: 'center',

        marginBottom: 20,
        position: "absolute",

    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40, // Để ảnh thành hình tròn
        marginBottom: 10,
        position: "absolute",
        right: 500,
        top: 100
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.black, // Màu chữ của tên
        position: "absolute",
        right: 420,
        top: 130,
    },
    infoContainer: {
        marginTop: 20,
    },
    infoText: {
        fontSize: 16,
        color: COLORS.black, // Màu chữ của thông tin người dùng
        marginBottom: 10, // Khoảng cách giữa các dòng
    },

});

export default Info;
