import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
var linkapi = 'http://10.0.2.2:3000/users';
const ThongTinCaNhan = (props) => {
    const userData = useSelector(state => state.user.userData);

    const [hoten, setHoten] = useState('')
    const [email, setEmail] = useState('')
    const [diachi, setDiachi] = useState('')
    const [sdt, setSdt] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [idupdate, setidupdate] = useState('')
    const [data, setdata] = useState([])

    useEffect(() => {
        const lay_ds = async () => {
            try {
                let res = await fetch(linkapi);
                let data = await res.json();
                setdata(data)

                data.forEach(data => {
                    if (userData.username == data.username) {
                        setidupdate(data.id)
                        setUsername(data.username)
                        setPassword(data.password)
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
            <View style={{ flex: 14 }}>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ color: '#333333', fontSize: 23, fontWeight: 'bold' }}>Chỉnh sửa thông tin</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
                    <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={require('../assets/img/avatar.png')} />
                </View>
                <View style={{ marginTop: 70, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                    <TextInput value={hoten} placeholder='Họ và tên' onChangeText={txt => setHoten(txt)} style={{ fontSize: 18, color: '#555555' }} />
                </View>
                <View style={{ marginTop: 20, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                    <TextInput value={email} placeholder='Email' onChangeText={txt => setEmail(txt)} style={{ fontSize: 18, color: '#555555' }} />
                </View>
                <View style={{ marginTop: 20, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                    <TextInput value={diachi} placeholder='Địa chỉ' onChangeText={txt => setDiachi(txt)} style={{ fontSize: 18, color: '#555555' }} />
                </View>
                <View style={{ marginTop: 20, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
                    <TextInput value={sdt} placeholder='Số điện thoại' onChangeText={txt => setSdt(txt)} style={{ fontSize: 18, color: '#555555' }} />
                </View>

                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{ position: 'absolute', top: 35 }}>
                    <Image style={{ width: 20, height: 20 }} source={require('../assets/icon/back.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, backgroundColor: '#555555', justifyContent: 'center', borderRadius: 15 }}>
                <TouchableOpacity
                    onPress={() => update(idupdate)}
                    style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>LƯU THÔNG TIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ThongTinCaNhan

const styles = StyleSheet.create({})