import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
var linkapi = 'http://10.0.2.2:3000/cart';
const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const [dialogXoa, setDialogXoa] = useState(false);
  const [idItem, setIdItem] = useState('');
  const [tongtien, setTongtien] = useState(0)

  const lay_ds = async () => {
    try {
      let res = await fetch(linkapi);
      let data = await res.json();
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      lay_ds();
    });

    return unsubscribe;
  }, [props.navigation]);

  const deleteCart = (id) => {
    let url_api_del = linkapi + '/' + idItem;
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
            console.log("Đã xóa");
            lay_ds();
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const UpdateSL = (item, newSL) => {
    let objSP = {
      soluong: newSL,
      itemCart: item.itemCart
    };
    let url_api = linkapi + '/' + item.id;

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
          console.log('Update thành công');
        lay_ds();
      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  const tang = (item) => {
    const newSL = item.soluong + 1;
    UpdateSL(item, newSL);
    console.log(newSL);
  }

  const giam = (item) => {
    const newSL = item.soluong - 1;

    if (newSL === 0) {
      setIdItem(item.id);
      console.log(idItem);
      setDialogXoa(true);
    } else {
      UpdateSL(item, newSL);
    }

  }

  const trangThai = (trangThai) => {
    if (trangThai == true) {
      return "Còn hàng"
    } else {
      return "Hết hàng"
    }
  }
  const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.itemCart.gia * item.soluong;
    });
    setTongtien(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const cartView = ({ item }) => {
    const gia = item.itemCart.gia * item.soluong;
    return (
      <View>
        <View style={{ backgroundColor: 'white', height: 160, marginTop: 15, flexDirection: 'row' }}>
          <View style={{ flex: 1.8 }}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.itemCart.anh }} />
          </View>
          <View style={{ flex: 2.5, marginLeft: 20, marginTop: 5 }}>
            <View style={{ height: 60 }}>
              <Text style={{ color: '#343434', fontSize: 23, fontWeight: 'bold' }}>{item.itemCart.ten}</Text>
            </View>
  
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ color: 'red', fontSize: 22, fontWeight: 'bold' }}>{gia} đ</Text>
            </View>
  
            <Text style={{ fontSize: 17, marginTop: 3 }}>Trạng thái: {trangThai(item.itemCart.trangthai)}</Text>
  
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => giam(item)}>
                  <Text style={{ marginRight: 15, color: '#444444', fontSize: 30 }}>-</Text>
                </TouchableOpacity>
  
                <View style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#343434', fontSize: 20 }}>{item.soluong}</Text>
                </View>
  
                <TouchableOpacity onPress={() => tang(item)}>
                  <Text style={{ marginLeft: 15, color: '#444444', fontSize: 23 }}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setIdItem(item.id);
                  setDialogXoa(true)
                }}
                style={{ marginRight: 10 }}>
                <Text style={{ color: '#343434', fontSize: 18, color: 'red' }}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 12 }}>
        <FlatList
          data={cart}
          renderItem={cartView}
          style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, marginTop: 20, }}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold', color: 'red' }}>Tổng tiền: {tongtien}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ThanhToan', { tongtien: tongtien })}
          style={{ marginRight: 10, width: 150, height: 50, justifyContent: 'center', backgroundColor: 'green', borderRadius: 15 }}>
          <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Thanh toán</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={dialogXoa}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setDialogXoa(!dialogXoa);
        }}>
        <View style={styles.khung}>
          <View style={{ backgroundColor: '#444444', width: 300, height: 200, borderRadius: 15, padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Thông báo</Text>
            <Text style={{ fontSize: 19, color: 'white', marginTop: 20 }}>Bạn có chắc chắn muốn xóa?</Text>
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 15, right: 0 }}>
              <TouchableOpacity onPress={() => {
                setDialogXoa(false)
                deleteCart(idItem)
              }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginRight: 22 }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDialogXoa(false)}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginRight: 22 }}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  khung: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
})
