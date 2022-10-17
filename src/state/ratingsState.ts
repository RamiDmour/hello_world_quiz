import { atom } from 'recoil';
import { ratingsApi } from '../api/ratingsApi';
import { Rating } from '../models/Rating';

export const ratingsState = atom<Rating[]>({
  key: 'ratingsState',
  default: ratingsApi.getRatings(),
});
