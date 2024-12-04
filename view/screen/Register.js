import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Pressable, TouchableOpacity} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../../constants/COLORS";
import COLOR from "../../constants/COLORS";
import Button from "../client/components/Button";
import ButtonText from "../client/components/ButtonText";
import Ionicons from "react-native-vector-icons/Ionicons";

const Register = ({navigation}) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}
        >
            <View style={{
                flex: 1
            }}>
                <View>
                    <Image
                        source={require("../../assets/Vector 1.png")}
                        style={{
                            bottom: 60,
                            right: 40
                        }}
                    />
                </View>
            </View>

            <View style={{
                flex: 1,
                position: 'relative',
                justifyContent: 'center', // Căn giữa theo chiều ngang
                alignItems: 'center', // Căn giữa theo chiều dọc,
                bottom: 390

            }}>
                <Text style={{
                    color: COLORS.black,
                    fontSize: 90,
                    fontWeight: 500,
                }}>
                    Register
                </Text>
                <Text
                    style={{

                        fontSize: 20,
                        fontWeight: 500
                    }}>
                    Create your account.
                </Text>
            </View>
            {/**/}
            <View
                style={{
                    backgroundColor: COLORS.white,
                    position: "relative",
                    bottom: 500,
                    flexDirection: 'row',
                    borderRadius: 20,
                    marginHorizontal: 40,
                    elevation: 10,
                    marginVertical: 20,
                    padding: 20
                }}
            >
                <Image
                    source={require("../../assets/icons8-user-30.png")}
                />
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 20,
                        left: 10
                    }}
                    placeholder="Enter user name"
                />
            </View>

            {/*    */}
            <View

                style={{
                    backgroundColor: COLORS.white,
                    position: "relative",
                    bottom: 500,
                    flexDirection: 'row',
                    borderRadius: 20,
                    marginHorizontal: 40,
                    elevation: 10,
                    marginVertical: 20,
                    padding: 20
                }}
            >
                <Image
                    source={require("../../assets/icons8-phone-number-50.png")}
                    style={{
                        bottom: 5,
                        width:30,
                        height:30

                    }}
                />
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 20,
                        left: 10,
                    }}
                    placeholder="Enter phone number"

                />

            </View>
            {/*    */}
            <View

                style={{
                    backgroundColor: COLORS.white,
                    position: "absolute",
                    bottom: 390,
                    flexDirection: 'row',
                    borderRadius: 20,
                    marginHorizontal: 40,
                    elevation: 10,
                    marginVertical: 20,
                    padding: 20
                }}
            >
                <Image
                    source={require("../../assets/icons8-name-tag-30.png")}
                    style={{

                    }}
                />
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 20,
                        left: 10,
                    }}
                    placeholder="First name"

                />

            </View>
            {/**/}
            <View

                style={{
                    backgroundColor: COLORS.white,
                    position: "absolute",
                    bottom: 280,
                    flexDirection: 'row',
                    borderRadius: 20,
                    marginHorizontal: 40,
                    elevation: 10,
                    marginVertical: 20,
                    padding: 20
                }}
            >
                <Image
                    source={require("../../assets/icons8-name-tag-30.png")}
                    style={{

                    }}
                />
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 20,
                        left: 10,
                    }}
                    placeholder="Last name"

                />

            </View>
            {/**/}
            <View style={{
                position: "absolute",
                top: 850
            }}>
                <Image
                    source={require("../../assets/Vector 3.png")}/>
            </View>

            {/*    */}
            <View style={{
                position: "absolute",
                top: 800,
                left: 300
            }}>
                <Button
                    title="Sign up"
                    onPress={()=>navigation.navigate("Verify")}
                    style={{
                        left: 120
                    }}>
                </Button>

            </View>
            {/*    */}
            <View style={{
                position: "absolute",
                top: 815,
                left: 300,

            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 700
                }}>

                    Sign in
                </Text>
            </View>
            <View style={{
                position: "absolute",
                top: 890,
                left: 180
            }}>
                <Text style={{
                    fontSize: 20,
                    right: 50

                }}>
                    Or create account using social media
                </Text>
                <View style={{
                    flexDirection: 'row', // Sắp xếp theo chiều ngang
                    justifyContent: 'space-between', // Khoảng cách giữa các ảnh
                    alignItems: 'center', // Căn giữa theo chiều dọc
                    top:20,
                    right:40
                }}>
                    <Image
                        style={{  marginHorizontal: 40}}
                        source={(require("../../assets/icons8-facebook-48.png"))}
                    />
                    <Image
                        source={(require("../../assets/icons8-instagram-48.png"))}
                    />
                    <Image
                        style={{  marginHorizontal: 40}}
                        source={(require("../../assets/icons8-twitter-48.png"))}
                    />


                </View>
            </View>
        </View>

    );
}

export default Register;
