import {Platform} from 'react-native';

export const API_URL = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://192.168.137.51:3000',
  default: 'http://192.168.137.51:3000', 
});



//https://goamigo-admin-0r3k.onrender.com -for render backend
// http://10.0.2.2:3000  -for android 
//http://192.168.xx.xx:3000  -for physical android phone
//http://localhost:3000  -for ios 
