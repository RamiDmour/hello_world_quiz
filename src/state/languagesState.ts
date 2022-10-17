import { atom } from 'recoil';
import { languageApi } from '../api/languageApi';
import { Language } from '../models/Language';

export const languagesAtom = atom<Language[]>({
  key: 'languagesAtom',
  default: languageApi.getLanguages(),
});
