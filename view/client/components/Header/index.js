import { Appbar, IconButton, Text } from 'react-native-paper';

export default function Header() {
    return (
        <>
            <Appbar.Header>
                <IconButton
                    icon='facebook'>
                </IconButton>
                <IconButton
                    icon='home'>
                </IconButton>
                <Appbar.Content title="BEST FOOD"/>
                <Appbar.Action />
            </Appbar.Header>
        </>
    )
}