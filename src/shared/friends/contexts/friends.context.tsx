import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { AuthContext } from '../../auth/context/auth.context';
import { Platform } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { IActiveFriend } from '../models';
import { useQuery } from 'react-query';
import { getFriendRequests } from '../../../screen/people/requests';
import getFriends from '../helpers/friends';
import { UserDetails } from '../../auth/models';

export interface IFriendsContext {
    friends: IActiveFriend[];
    isLoading: boolean;
    setFriend: (friend: IActiveFriend) => void;
}

export const FriendsContext = createContext<IFriendsContext>({
    friends: [],
    isLoading: false,
    setFriend: () => null,
});

export const FriendsProvider = ({ children }: { children: ReactNode }) => {
    const { isActive, jwt, isLoggedIn, userDetails } = useContext(AuthContext);
    const [friends, setFriends] = useState<IActiveFriend[]>([]);
    const [friend, setFriend] = useState<IActiveFriend>({} as IActiveFriend);
    const [isLoading, setIsLoading] = useState(false);

    useQuery(
        'friendRequests',
        async () => {
            setIsLoading(true);

            const friendRequests = await getFriendRequests();

            const _friends = getFriends(
                friendRequests,
                (userDetails as UserDetails).id
            );

            const activeFriends: IActiveFriend[] = _friends.map((f) => ({
                ...f,
                isActive: false,
            }));

            setFriends(activeFriends);

            return _friends;
        },
        {
            enabled: isLoggedIn,
            onSettled: () => {
                setIsLoading(false);
            },
        }
    );

    const baseUrl = 'http://10.0.2.2:6000';

    const socket = useMemo(
        () =>
            SocketIOClient(baseUrl, {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            Authorizatin: jwt,
                        },
                    },
                },
            }),
        [jwt, baseUrl]
    );

    useEffect(() => {
        socket.emit('updateActiveStatus', isActive);

        socket.on(
            'friendActive',
            ({
                id,
                isActive: isFriendActive,
            }: {
                id: number;
                isActive: boolean;
            }) => {
                setFriends((prevFriends) => {
                    if (userDetails?.id === id) return prevFriends;

                    const updatedFriends = [...prevFriends];
                    (
                        updatedFriends.find((f) => f.id === id) as IActiveFriend
                    ).isActive = isFriendActive;

                    return updatedFriends;
                });
            }
        );

        return () => {
            socket.emit('updateActiveStatus', false);
            socket.off('friendActive');
        };
    }, [socket, isActive, userDetails]);

    return (
        <FriendsContext.Provider
            value={{
                friends,
                isLoading,
                setFriend,
            }}
        >
            {children}
        </FriendsContext.Provider>
    );
};
