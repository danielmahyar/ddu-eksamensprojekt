import { atom } from 'recoil';

export const globalModal = atom({
  key: 'globalModal',
  default: {
    message: '',
    accept: false,
    show: false,
    type: '',
  },
});
