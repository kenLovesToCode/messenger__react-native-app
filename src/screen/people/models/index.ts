import { UserDetails } from '../../../shared/auth/models';

export interface IFriendRequest {
    id: number;
    creator: UserDetails;
    receiver: UserDetails;
}
