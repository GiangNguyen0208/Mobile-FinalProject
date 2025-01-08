import {FlatList, StyleSheet, Text, TextInput, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import ButtonMyOrder from "../../components/ButtonMyOrderAccept";
import ButtonMyOrderRefused from "../../components/ButtonMyOrderRefused";
import ButtonMyOrderAccept from "../../components/ButtonMyOrderAccept";

import ButtonDriver from "../../components/ButtonDriver";

import ButtonRemove from "../../components/ButtonRemove";


const MyOrder = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState('preOrder'); // Mặc định là 'Đặt trước'

    const [data, setData] = useState([
        'Apple',
        'Banana',
        'Orange',
        'Mango',
        'Pineapple',
        'Grapes',
        'Watermelon',
    ]);

    const filteredData = data.filter(item =>
        item.toLowerCase().includes(searchText.toLowerCase())
    );


    const products = [
        {id: 1, name: 'Sản phẩm A', count: 2, price: 50000, image: require('../../../../assets/icons8-bell-48.png')},
        {id: 2, name: 'Sản phẩm B', count: 2, price: 50000, image: require('../../../../assets/icons8-bell-48.png')},
        {id: 3, name: 'Sản phẩm C', count: 2, price: 50000, image: require('../../../../assets/icons8-bell-48.png')},
        {id: 4, name: 'Sản phẩm D', count: 2, price: 50000, image: require('../../../../assets/icons8-bell-48.png')},
        {id: 5, name: 'Sản phẩm E', count: 2, price: 50000, image: require('../../../../assets/icons8-bell-48.png')},

    ];

    // Nội dung cho các tùy chọn
    const renderContent = () => {
        switch (selectedOption) {
            case 'preOrder':

                return (
                    <View style={{
                        borderColor: '#EEE8AA'
                    }}>
                        <View style={{
                            backgroundColor: "#D3D3D3",
                            width: 45,  // Giảm chiều rộng xuống còn 200
                            height: 30,
                            justifyContent: 'center',  // Canh giữa nội dung
                            alignItems: 'center',  // Canh giữa nội dung trong View
                            borderRadius: 5,
                            right: 60, bottom: 10

                        }}>

                            <Text>
                                Tất cả
                            </Text>
                            {/*    finish Tất cả*/}
                        </View>
                        <View style={{
                            backgroundColor: "#EEE8AA",
                            height: 80,
                            justifyContent: 'center',  // Canh giữa nội dung
                            alignItems: 'center',  // Canh giữa nội dung trong View
                            borderRadius: 5,
                            width: 700,
                            right: 100
                        }}
                        >
                            <Image source={require("../../../../assets/icons8-bell-48.png")}

                                   style={{
                                       position: 'absolute',
                                       right: 600,
                                       width: 30,
                                       height: 30
                                   }}>

                            </Image>
                            <Text>
                                Khi đến thời gian chuẩn bị,đơn hàng sẽ được chuyển tới mục đơn mới
                            </Text>
                        </View>

                        <View>
                            <Text style={
                                {
                                    fontSize: 18
                                }
                            }>
                                Hôm nay
                            </Text>

                            <Text style={{
                                fontWeight: 500,
                                position: 'absolute',
                                left: 450,
                                fontSize: 18
                            }}>
                                Đặt trước
                            </Text>


                            {/*lấy đơn*/}

                        </View>
                        {/*finish notification*/}


                        <View style={styles.outerContainer}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.orderNumber}>#12345678</Text>
                                <Text style={styles.customerName}>Khách hàng A</Text>

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.productText}>Sản phẩm</Text>
                                    <Text style={styles.priceText}>Giá tiền</Text>
                                </View>
                            </View>
                        </View>


                        {/*11-39*/}
                        <View style={{
                            position: 'absolute',
                            top: 300,

                        }}>
                            <Text style={{}}>
                                5 sản phẩm
                            </Text>

                            <Text style={{
                                left: 195,
                                bottom: 20,

                            }}>
                                200000VND
                            </Text>
                        </View>

                        <View style={{
                            position: 'absolute',
                            top: 245,
                            left: 360
                        }}>
                            <ButtonRemove
                                borderColor={'#FF0000'}
                                width={100}
                                height={60}
                                text={'Hủy'}
                                textColor={'#FF0000'}
                                fontSize={15}
                            />
                        </View>
                    </View>
                );
            case 'newReceived':
                return (
                    <View style={{flex: 1}}>
                        <View style={{flex: 1}}>
                            {/* Đường viền ngăn cách */}
                            <View style={{
                                height: 1,
                                backgroundColor: '#e0750b',
                                marginBottom: 10,
                            }}/>

                            {/* Khách hàng A */}
                            <View>
                                <Text style={{fontSize: 25, fontWeight: '800'}}>
                                    Khách hàng A
                                </Text>
                                <Text style={{fontSize: 18}}>
                                    Lần đầu đặt
                                </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    position: "absolute",
                                    bottom: 10,
                                    left: 400
                                }}>
                                    <Image
                                        source={require("../../../../assets/icons8-phone-30.png")}
                                        style={{marginRight: 30, tintColor: '#e0750b'}}
                                    />
                                    <Image
                                        source={require("../../../../assets/icons8-message-50.png")}
                                        style={{width: 30, height: 30, tintColor: '#e0750b'}}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* FlatList cho sản phẩm */}
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id.toString()} // Sử dụng id dạng string
                            renderItem={({item}) => (
                                <View style={styles.productContainer}>
                                    <Image source={item.image} style={styles.productImage}/>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 500,
                                        bottom: 10,
                                        marginLeft: 5
                                    }}>{item.count} x</Text>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 500,
                                            marginLeft: 150
                                        }}
                                    >{item.price}VND</Text>
                                </View>
                            )}
                            contentContainerStyle={styles.listContainer}
                            showsVerticalScrollIndicator={false}
                        />
                        {/*    list*/}

                        <View style={{
                            position: "absolute",
                            top: 700
                        }}>
                            <View style={{
                                flexDirection: 'row', // Hiển thị các phần tử ngang hàng
                                justifyContent: 'space-around', // Tùy chọn: căn chỉnh khoảng cách giữa các ảnh
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 600,
                                    left: 4
                                }}>

                                    5 món
                                </Text>

                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 600,
                                    left: 280,
                                    color: '#e0750b'
                                }}>

                                    200000VND
                                </Text>
                            </View>
                            <View style={{}}>
                                <ButtonMyOrderRefused
                                    text={"Từ Chối"}
                                >

                                </ButtonMyOrderRefused>
                            </View>
                            <View style={{
                                position: 'absolute',
                                left: 270,
                                top: 25
                            }}>
                                <ButtonMyOrderAccept
                                    text={"Xát Nhận"}
                                >
                                </ButtonMyOrderAccept>
                            </View>
                        </View>


                    </View>


                );
            case 'received':
                return (
                    // contain
                    <View
                        style={{
                            borderWidth: 0.3, // Độ dày của viền
                            borderColor: '#000000', // Màu của viền (màu đen)
                            borderRadius: 1, // Bo góc của viền
                            padding: 10, // Khoảng cách giữa viền và các phần tử bên trong
                            flexDirection: 'row', // Để các phần tử con (35 và 87538) nằm ngang
                            justifyContent: 'center', // Căn giữa nội dung theo chiều ngang
                            alignItems: 'center', // Căn giữa nội dung theo chiều dọc
                            position: 'absolute',
                            width: 500,
                            height: 300,
                            top: 20,
                            right: 20
                        }}
                    >
                        {/* Viền bao quanh cả số "35" và "87538" */}
                        <View
                            style={{
                                backgroundColor: '#e0750b',
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10, // Khoảng cách giữa số "35" và "87538"
                                position: 'absolute',
                                right: 420,
                                bottom: 250
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 25,
                                    fontWeight: '500',
                                    color: '#fff',
                                }}
                            >
                                35
                            </Text>
                        </View>

                        <View style={{
                            position: 'absolute',
                            right: 370,
                            bottom: 260
                        }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '500',
                                    color: '#e0750b',
                                }}
                            >
                                87538
                            </Text>
                        </View>
                        <View style={{
                            position: "absolute",
                            bottom: 260,
                            left: 450
                        }}>

                            <Image source={require("../../../../assets/icons8-pushpin-24.png")}
                                   style={{tintColor: '#e0750b'}}>
                            </Image>
                        </View>

                        <View style={{
                            position: "absolute",
                            bottom: 230,
                            right: 350,
                        }}>
                            <Text
                                style={{
                                    fontSize: 10
                                }}

                            > Đơn hàng 11:45 trong 3 phút </Text>
                        </View>
                        <View style={{
                            position: "absolute",
                            bottom: 180,
                            right: 300
                        }}>
                            <Text style={{
                                fontSize: 28,
                                fontWeight: 700
                            }}
                            > Khách Hàng A</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row', // Để các phần tử con (35 và 87538) nằm ngang
                            justifyContent: 'center', // Căn giữa nội dung theo chiều ngang
                            alignItems: 'center', //
                            position: 'absolute',
                            right: 288
                        }}>
                            <Text style={{
                                fontSize: 13,
                                fontWeight: 700
                            }}>Trạng thái:</Text>
                            <Text style={{
                                fontSize: 13,
                                fontWeight: 700,
                                marginLeft: 30,
                                color: '#e0750b'
                            }}>Tài xế đang đến</Text>
                        </View>
                        <View style={{
                            position: 'absolute',
                            left: 360,
                            bottom: 125
                        }}>
                            <ButtonDriver
                                borderColor={"#D3D3D3"}
                                text={"Bảo tài xế"}
                                textColor={COLORS.black}
                            >

                            </ButtonDriver>
                        </View>
                        <View style={{
                            position: 'absolute',
                            top: 230,
                            flexDirection: 'row', // Để các phần tử con (35 và 87538) nằm ngang
                            justifyContent: 'center', // Căn giữa nội dung theo chiều ngang
                            alignItems: 'center', //
                        }}>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 500,
                                    right: 150
                                }}
                            >2 món</Text>
                            <Image
                                source={require("../../../../assets/icons8-pay-48.png")}
                                style={{
                                    width: 20,
                                    height: 20,
                                    left: 130
                                }}
                            ></Image>
                            <Text
                                style={{
                                    left: 140,
                                    fontWeight: 600
                                }}
                            >109250 VND</Text>
                        </View>
                    </View>

                );
            case 'history':
                return <Text style={styles.content}>Đây là lịch sử các đơn hàng.</Text>;
            default:
                return <Text style={styles.content}>Chọn một tùy chọn.</Text>;
        }
    };

    return (
        <View>
            {/* view lớn bên ngoài*/}
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Image
                        source={require("../../../../assets/icons8-find-30.png")}
                        style={{
                            position: "absolute",
                            left: 430,
                        }}
                    />
                    <Image
                        source={require("../../../../assets/icons8-hamburger-menu-50.png")}
                        style={[
                            styles.icon,
                            {tintColor: 'orange', width: 40, height: 40, position: "absolute", right: 520},
                        ]}
                    />
                    <Image
                        source={require("../../../../assets/icons8-circle-50.png")}
                        style={[
                            styles.icon,
                            {tintColor: 'orange', width: 40, height: 40, position: "absolute", left: 468},
                        ]}
                    />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Tìm kiếm đơn hàng"
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                    />
                    <Image
                        source={require("../../../../assets/icons8-question-mark-48.png")}
                        style={[styles.icon, {tintColor: 'orange'}]}
                    />
                </View>

                <View style={styles.optionContainer}>
                    <TouchableOpacity
                        style={[styles.optionButton, selectedOption === 'preOrder' && styles.selectedOption]}
                        onPress={() => setSelectedOption('preOrder')}
                    >
                        <Text style={styles.optionText}>Hủy đơn hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.optionButton, selectedOption === 'newReceived' && styles.selectedOption]}
                        onPress={() => setSelectedOption('newReceived')}
                    >
                        <Text style={styles.optionText}>Mới</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.optionButton, selectedOption === 'received' && styles.selectedOption]}
                        onPress={() => setSelectedOption('received')}
                    >
                        <Text style={styles.optionText}>Đã nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.optionButton, selectedOption === 'history' && styles.selectedOption]}
                        onPress={() => setSelectedOption('history')}
                    >
                        <Text style={styles.optionText}>Lịch sử</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    {renderContent()}
                </View>

                {searchText && (
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    />
                )}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        position: "absolute",
        width: 550,
        top: 30,
        left: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchBar: {
        flex: 1,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10, // Khoảng cách giữa icon và TextInput
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        right: 20
    },
    optionButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ddd',
        borderRadius: 5,
        top: 20
    },
    selectedOption: {
        backgroundColor: 'orange', // Màu xanh lá khi chọn
    },
    optionText: {
        fontSize: 16,
        color: '#fff',
    },
    contentContainer: {
        paddingTop: 40,
    },
    content: {
        fontSize: 18,
        textAlign: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    listContainer: {
        padding: 10,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
    },
//     viền
    outerContainer: {
        borderWidth: 0.1,         // Độ dày của viền ngoài
        borderColor: '#000',    // Màu của viền (màu đen)
        borderRadius: 1,       // Bo góc viền
        padding: 15,            // Khoảng cách giữa viền và các phần tử bên trong
        margin: 10,             // Khoảng cách ngoài viền
        position: 'absolute',
        top: 150,
        width: 520,
        height: 200,
        right: 5
    },

    // Viền cho các phần tử bên trong
    innerContainer: {
        position: 'relative',
    },

    orderNumber: {
        position: 'absolute',
        top: 30,
        fontSize: 18,
    },

    customerName: {
        fontSize: 25,
        fontWeight: '800',
    },

    detailsContainer: {
        position: 'absolute',
        top: 10,
    },

    productText: {
        position: 'absolute',
        top: 75,
        fontSize: 20,
        fontWeight: '300',
        color: '#e0750b'
    },

    priceText: {
        position: 'absolute',
        top: 80,
        left: 200,
        fontSize: 20,
        fontWeight: '300',
        color: '#e0750b'
    },
});

export default MyOrder;
