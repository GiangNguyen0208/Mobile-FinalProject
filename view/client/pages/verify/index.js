import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Pressable, TouchableOpacity, Platform} from 'react-native';
import COLORS from "../../../../constants/COLORS";
import Button from "../../../client/components/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from "react-native-confirmation-code-field";
// //////////
const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20,
        marginHorizontal: 49,

    },
    cell: {
        width: 70,
        height: 70,
        lineHeight: 70,
        fontSize: 50,
        borderWidth: 3,
        borderColor: COLORS.blue,
        textAlign: 'center', // Căn giữa theo chiều ngang
        justifyContent: 'center', // Căn giữa theo chiều dọc
        alignItems: 'center',    // Đảm bảo ô căn giữa nội dung
        borderRadius:5,
        color:COLORS.blue
    },
    focusCell: {
        borderColor: '#000',

    },
});

const CELL_COUNT = 4;
const Verify = ({navigation}) => {
    const [isPasswordShown, setIsPasswordShow] = useState(false);
    const [isConformPasswordShown, setIsConformPasswordShow] = useState(false);

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
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
                        source={require("../../../../assets/Vector 1.png")}
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
                bottom: 350

            }}>
                <Text style={{
                    color: COLORS.black,
                    fontSize: 100,
                    fontWeight: 500,
                }}>
                    Verify
                </Text>
                <Text
                    style={{
                        top: 10,
                        fontSize: 20,
                        fontWeight: 500
                    }}>
                    Confirm your code and password
                </Text>
            </View>
            {/**/}
            <View
                style={{
                    backgroundColor: COLORS.white,
                    position: "relative",
                    bottom: 450

                }}
            >
                <Text style={{
                    color:COLORS.blue,
                    position:"absolute",
                    left:35,
                    top:90,
                    fontWeight:700

                }}>
                    Enter your code you just receive.
                </Text>
                <CodeField
                    ref={ref}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoComplete={Platform.select({android: 'sms-otp', default: 'one-time-code'})}
                    testID="my-code-input"
                    renderCell={({index, symbol, isFocused}) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor/> : null)}
                        </Text>
                    )}
                />
            </View>

            {/*    */}
            <View

                style={{
                    backgroundColor: COLORS.white,
                    position: "relative",
                    bottom: 400,
                    flexDirection: 'row',
                    borderRadius: 20,
                    marginHorizontal: 40,
                    elevation: 10,
                    marginVertical: 20,
                    padding: 20
                }}
            >
                <Image
                    source={require("../../../../assets/icons8-lock-30.png")}
                />
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 20,
                        left: 10,

                    }}
                    placeholder="Create password"
                    secureTextEntry={isPasswordShown}
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordShow(!isPasswordShown)}
                >
                    {
                        isPasswordShown == true ? (
                            <Ionicons name="eye" size={24} color={COLORS.black}
                            />
                        ) : (
                            <Ionicons name="eye-off" size={24} color={COLORS.black}
                            />
                        )
                    }
                </TouchableOpacity>
            </View>
            {/*    */}
            <View

                style={{
                    backgroundColor: COLORS.white,
                    position: "absolute",
                    bottom: 290,
                    flexDirection: 'row',
                    borderRadius: 20,
                    marginHorizontal: 40,
                    elevation: 10,
                    marginVertical: 20,
                    padding: 20
                }}
            >
                <Image
                    source={require("../../../../assets/icons8-lock-30.png")}
                />
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 20,
                        left: 10,

                    }}
                    placeholder="Confirm password"
                    secureTextEntry={isConformPasswordShown}
                />
                <TouchableOpacity
                    onPress={() => setIsConformPasswordShow(!isConformPasswordShown)}
                >
                    {
                        isConformPasswordShown == true ? (
                            <Ionicons name="eye" size={24} color={COLORS.black}
                            />
                        ) : (
                            <Ionicons name="eye-off" size={24} color={COLORS.black}
                            />
                        )
                    }
                </TouchableOpacity>
            </View>
            {/*    */}
            <View style={{
                position: "absolute",
                top: 850
            }}>
                <Image
                    source={require("../../../../assets/Vector 3.png")}/>
            </View>

            {/*    */}
            <View style={{
                position: "absolute",
                top: 790,
                left: 300
            }}>
                <Button
                    onPress={() => navigation.navigate("Register")}
                    title="Sign in"
                    style={{
                        left: 120
                    }}>
                </Button>

            </View>
            {/*    */}
            <View style={{
                position: "absolute",
                top: 810,
                left: 300,

            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 700
                }}>

                    Confirm
                </Text>
            </View>
            <View style={{
                position: "absolute",
                top: 900,
                left: 250
            }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 500,
                    right: 60

                }}>
                    Let's go to the Hello.
                </Text>

            </View>
        </View>

    );
}

export default Verify;
