import { UserDetails } from '../../auth/models';

export interface IActiveFriend extends UserDetails {
    isActive: boolean;
}
