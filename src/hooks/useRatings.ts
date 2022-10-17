import { useRecoilStateLoadable } from 'recoil';
import { ratingsApi } from '../api/ratingsApi';
import { Rating } from '../models/Rating';
import { ratingsState } from '../state/ratingsState';

export const useRatings = () => {
  const [ratingsLoadable, setRatings] = useRecoilStateLoadable(ratingsState);

  function addRating(rating: Rating) {
    ratingsApi.addRating(rating);
    if (ratingsLoadable.state === 'hasValue') {
      setRatings([...ratingsLoadable.contents, rating]);
    }
  }

  return {
    addRating,
    ratingsLoadable,
  };
};
