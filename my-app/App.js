import {Text, view} from 'react-native';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Register from './src/screens/Register';
import MainNav from './src/navigation/MainNav'
export default function App(){
    return (
        <View>
            <MainNav />
            <Profile />
        </View>
    )
}