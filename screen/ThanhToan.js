import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

var linkapi = 'http://10.0.2.2:3000/users';
var linkOrder = 'http://10.0.2.2:3000/orders';
var linkCart = 'http://10.0.2.2:3000/cart';

const ThanhToan = (props) => {
    const userData = useSelector(state => state.user.userData);

    const [hoten, setHoten] = useState('')
    const [email, setEmail] = useState('')
    const [diachi, setDiachi] = useState('')
    const [sdt, setSdt] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [idupdate, setidupdate] = useState('')

    const [cart, setCart] = useState([])

    const [phivanchuyen, setphivanchuyen] = useState(0)
    const [tongthanhtoan, settongthanhtoan] = useState(0)
    const [ptttt, setPtttt] = useState('')

    const tamtinh = props.route.params.tongtien

    useEffect(() => {
        settongthanhtoan(tamtinh + phivanchuyen);
    }, [tamtinh, phivanchuyen]);

    useEffect(() => {
        const lay_ds = async () => {
            try {
                let res = await fetch(linkapi);
                let data = await res.json();

                data.forEach(data => {
                    if (userData.username == data.username) {
                        setidupdate(data.id);
                        setUsername(data.username);
                        setPassword(data.password);
                        setHoten(data.hoten);
                        setEmail(data.email);
                        setDiachi(data.diachi);
                        setSdt(data.sdt);
                    }
                });

            } catch (error) {
                console.log(error);
            }
        }

        lay_ds();
    }, []);

    const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
    const handleTextPress = (text) => {
        setSelectedShippingMethod(text);

        if (text === 'Giao hàng nhanh - 15.000đ') {
            setphivanchuyen(15000);
        } else if (text === 'Giao hàng COD - 20.000đ') {
            setphivanchuyen(20000);
        }
    };

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handlePaymentMethodPress = (text) => {
        setSelectedPaymentMethod(text);
        setPtttt(text)
    };

    const lay_ds = async () => {
        try {
            let res = await fetch(linkCart);
            let data = await res.json();
            console.log('Cart : ', data);
            setCart(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        lay_ds()
    }, [])

    const clearCart = (cart) => {
        cart.forEach((cart) => {
            let url_api_del = linkCart + '/' + cart.id;
            try {
                fetch(url_api_del, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then((res) => {
                        if (res.status == 200) {
                            console.log("Đã xóa giỏ hàng");
                        }
                    })
                    .catch((ex) => {
                        console.log(ex);
                    });
            } catch (error) {
                console.log(error);
            }
        })
    };


    const thanhToan = () => {
        const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

        fetch(linkOrder, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                thoigian: formattedDate,
                trangthai: 1,
                ptttt: ptttt,
                thongtin: {
                    hoten: hoten,
                    email: email,
                    diachi: diachi,
                    sdt: sdt
                },
                productOrder: cart
            })
        })
            .then((res) => {
                if (res.status == 201)
                    Alert.alert("Thêm thành công")
                clearCart(cart);
            })
            .catch((ex) => {
                console.log(ex);
            });

        update(idupdate)
    }

    const update = (id) => {
        let objSP = {
            username: username,
            password: password,
            hoten: hoten,
            email: email,
            diachi: diachi,
            sdt: sdt
        };

        let url_api = linkapi + '/' + id;
        fetch(url_api, {
            method: 'PUT',
            hheaders: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objSP)
        })
            .then((res) => {
                if (res.status == 200)
                    Alert.alert('Update thành công');
            })
            .catch((ex) => {
                console.log(ex);
            });
    }


    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flex: 5, marginBottom: 10 }}>
                <ScrollView >
                    <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
                        <Text style={{ color: '#333333', fontSize: 23, fontWeight: 'bold' }}>Thanh toán</Text>
                    </View>
                    <View style={{ marginTop: 40, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 22, color: '#333333', marginBottom: 5, fontWeight: 'bold' }}>Thông tin khách hàng</Text>
                    </View>
                    <View style={{ borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                        <TextInput onChangeText={txt => setHoten(txt)} placeholder='Họ và tên' value={hoten} style={{ fontSize: 18, color: '#555555' }} />
                    </View>
                    <View style={{ borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                        <TextInput onChangeText={txt => setEmail(txt)} placeholder='Email' value={email} style={{ fontSize: 18, color: '#555555' }} />
                    </View>
                    <View style={{ borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                        <TextInput onChangeText={txt => setDiachi(txt)} placeholder='Địa chỉ' value={diachi} style={{ fontSize: 18, color: '#555555' }} />
                    </View>
                    <View style={{ borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                        <TextInput onChangeText={txt => setSdt(txt)} placeholder='Số điện thoại' value={sdt} style={{ fontSize: 18, color: '#555555' }} />
                    </View>

                    <View style={{ marginTop: 40, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 22, color: '#333333', marginBottom: 5, fontWeight: 'bold' }}>Phương thức vận chuyển</Text>
                    </View>
                    <View style={{ marginTop: 15, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                        <TouchableOpacity onPress={() => handleTextPress('Giao hàng nhanh - 15.000đ')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[{ fontSize: 18, color: '#333333', marginBottom: 5 }, selectedShippingMethod === 'Giao hàng nhanh - 15.000đ' && { color: 'green', fontWeight: 'bold' }]}>
                                    Giao hàng nhanh - 15.000đ
                                </Text>
                                {selectedShippingMethod === 'Giao hàng nhanh - 15.000đ' && (
                                    <Image source={require('../assets/icon/checkmark.png')} style={{ width: 30, height: 30 }} />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 15, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                        <TouchableOpacity onPress={() => handleTextPress('Giao hàng COD - 20.000đ')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[{ fontSize: 18, color: '#333333', marginBottom: 5 }, selectedShippingMethod === 'Giao hàng COD - 20.000đ' && { color: 'green', fontWeight: 'bold' }]}>
                                    Giao hàng COD - 20.000đ
                                </Text>
                                {selectedShippingMethod === 'Giao hàng COD - 20.000đ' && (
                                    <Image source={require('../assets/icon/checkmark.png')} style={{ width: 30, height: 30 }} />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{ marginTop: 50, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 22, color: '#333333', marginBottom: 5, fontWeight: 'bold' }}>Hình thức thanh toán</Text>
                    </View>
                    <View style={{ marginTop: 15, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                        <TouchableOpacity onPress={() => handlePaymentMethodPress('Thanh toán khi nhận hàng')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[{ fontSize: 18, color: '#333333', marginBottom: 5 }, selectedPaymentMethod === 'Thanh toán khi nhận hàng' && { color: 'green', fontWeight: 'bold' }]}>
                                    Thanh toán khi nhận hàng
                                </Text>
                                {selectedPaymentMethod === 'Thanh toán khi nhận hàng' && (
                                    <Image source={require('../assets/icon/checkmark.png')} style={{ width: 30, height: 30 }} />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 15, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                        <TouchableOpacity onPress={() => handlePaymentMethodPress('Thẻ ATM')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[{ fontSize: 18, color: '#333333', marginBottom: 5 }, selectedPaymentMethod === 'Thẻ ATM' && { color: 'green', fontWeight: 'bold' }]}>
                                    Thẻ ATM
                                </Text>
                                {selectedPaymentMethod === 'Thẻ ATM' && (
                                    <Image source={require('../assets/icon/checkmark.png')} style={{ width: 30, height: 30 }} />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={{ position: 'absolute', top: 35 }}>
                        <Image style={{ width: 20, height: 20 }} source={require('../assets/icon/back.png')} />
                    </TouchableOpacity>
                </ScrollView>
            </View>


            <View style={{ flex: 1.7, borderRadius: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ color: "#333333", fontSize: 22 }}>Tạm tính: </Text>
                    <Text style={{ color: 'red', fontSize: 22, fontWeight: 'bold' }}>{tamtinh} đ</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ color: "#333333", fontSize: 22 }}>Phí vận chuyển: </Text>
                    <Text style={{ color: 'red', fontSize: 22, fontWeight: 'bold' }}>{phivanchuyen} đ</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ color: "#333333", fontSize: 22 }}>Tổng tiền: </Text>
                    <Text style={{ color: 'red', fontSize: 22, fontWeight: 'bold' }}>{tongthanhtoan} đ</Text>
                </View>
                <TouchableOpacity
                    onPress={() => thanhToan()}
                    style={{ borderRadius: 15, height: 60, marginTop: 20, alignItems: 'center', backgroundColor: 'green', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ThanhToan

const styles = StyleSheet.create({})