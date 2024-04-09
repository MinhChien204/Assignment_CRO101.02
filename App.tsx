import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './screen/Redux/store';
import Login from './screen/Login';
import Register from './screen/Register';
import Welcome from './screen/Welcome';
import TabNavigator from './components/TabNavigator'; // Import TabNavigator
import DetailPlant from './screen/DetailPlant';
import Cart from './screen/Cart';
import ThongTinCaNhan from './screen/ThongTinCaNhan';
import Profile from './screen/Profile';
import LichSuDonHang from './screen/LichSuDonHang';
import ThanhToan from './screen/ThanhToan';
import OrderDetail from './screen/OrderDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Wellcome" component={Welcome} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Tabnavigator" component={TabNavigator} />
          <Stack.Screen name='DetailPlant' component={DetailPlant}/>
          <Stack.Screen name='Cart' component={Cart} />
          <Stack.Screen name="ThongTinCaNhan" component={ThongTinCaNhan} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="LichSuDonHang" component={LichSuDonHang}/>
          <Stack.Screen name="ThanhToan" component={ThanhToan}/>
          <Stack.Screen name='OrderDetail' component={OrderDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
