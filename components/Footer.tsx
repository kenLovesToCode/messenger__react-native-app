import { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import ChatsScreen from '../src/screen/chats';

const ChatsRoute = () => <ChatsScreen />;

const CallsRoute = () => <Text>Calls</Text>;

const PeopleRoute = () => <Text>People</Text>;

const StoriesRoute = () => <Text>Stories</Text>;

const Footer = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {
            key: 'chats',
            title: 'Chats',
            focusedIcon: 'chat',
        },
        { key: 'calls', title: 'Calls', focusedIcon: 'video' },
        { key: 'people', title: 'People', focusedIcon: 'account' },
        {
            key: 'stories',
            title: 'Stories',
            focusedIcon: 'book',
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        chats: ChatsRoute,
        calls: CallsRoute,
        people: PeopleRoute,
        stories: StoriesRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default Footer;
