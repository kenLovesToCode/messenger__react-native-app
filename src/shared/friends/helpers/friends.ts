import { IFriendRequest } from '../../../screen/people/models';
import { UserDetails } from '../../auth/models';

const getFriends = (friendRequests: IFriendRequest[], userId: number) => {
    const friends = friendRequests.map((friendRequest) => {
        const isUserCreator = userId === friendRequest.creator.id;
        const friendDetails = isUserCreator
            ? friendRequest.receiver
            : friendRequest.creator;

        const { id, firstName, lastName, email } = friendDetails;

        return {
            id,
            email,
            firstName,
            lastName,
        } as UserDetails;
    });

    return friends;
};

export default getFriends;
