
import { Appbar, Button, IconButton, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // {{ edit_1 }}
import routes from '../../../../routes/index';

export default function Header({ header, onLogin }) {
    const navigation = useNavigation();
    return (
        <>
            <Appbar.Header>
                <IconButton icon='facebook'></IconButton>
                <IconButton icon='home'></IconButton>
                <Appbar.Content title={header}/>
                <Appbar.Action />
                <Button 
                    mode="contained" 
                    onPress={onLogin}
                >
                    Login
                </Button>
            </Appbar.Header>
        </>
    )
}