import { environment } from './../../environment/environment';

export const headers = {
    'Authorization': `Bearer ${environment.bearerToken}`
}