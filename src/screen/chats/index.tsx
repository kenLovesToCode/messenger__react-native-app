import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { AuthContext } from '../../shared/auth/context/auth.context';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { baseUrl, get } from '../../shared/request';
import Friends from '../../shared/friends/components/Friends';

const ChatsScreen = () => {
    return <Friends showMessage />;
};

// const ChatsScreen = () => {
//     const navigate = useNavigate();
//     const { onLogout, jwt } = useContext(AuthContext);

//     useQuery(
//         'presence',
//         async () => {
//             const { data: presence } = await get(baseUrl + '/presence');
//             console.log(1, presence);
//             console.log(5, jwt);
//             return presence;
//         },
//         {
//             enabled: !!jwt,
//         }
//     );

//     const friends = [
//         { id: 1, name: 'ken' },
//         { id: 2, name: 'meow' },
//         { id: 3, name: 'joe' },
//     ];

//     return (
//         <View style={styles.container}>
//             {friends.map((friend) => (
//                 <Pressable
//                     key={friend.id}
//                     onPress={() => navigate(`/chat/${friend.id}`)}
//                 >
//                     <View style={styles.friend}>
//                         <Avatar.Image
//                             size={72}
//                             style={styles.profilePicture}
//                             source={{
//                                 uri: `https://randomuser.me/api/portraits/men/${friend.id}.jpg`,
//                             }}
//                         />
//                         <View>
//                             <Text>{friend.name}</Text>
//                             <Text>This was the last message | Sun</Text>
//                         </View>
//                     </View>
//                 </Pressable>
//             ))}
//             <Button onPress={onLogout}>Sign Out</Button>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     friend: {
//         flexDirection: 'row',
//         marginBottom: 8,
//         alignItems: 'center',
//     },
//     profilePicture: {
//         marginRight: 8,
//     },
// });

export default ChatsScreen;
