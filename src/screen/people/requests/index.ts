import { baseUrl, get } from '../../../shared/request';
import { IFriendRequest } from '../models';

export const getFriendRequests = async () => {
    const { data: friendRequests } = await get<IFriendRequest[]>(
        `${baseUrl}/get-friends`
    );

    console.log('called');
    return friendRequests;
};
