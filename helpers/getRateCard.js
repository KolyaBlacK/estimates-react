import {callApi} from '../middleware/api';

export const getRateCard = id => callApi(`rate-cards/${id}?group=0`, 'get');

