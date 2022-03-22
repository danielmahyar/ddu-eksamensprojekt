import { useRecoilState } from 'recoil';
import { MdClear } from 'react-icons/md';
import { errorNotification } from '../../state/error-state';

const Error = ({ message, color }: any) => {
  const [noti, setError] = useRecoilState(errorNotification);

  const handleRemoveError = () => {
    setError({ ...noti, message: '' });
  };

  return (
    <div
      className={`flex px-2 justify-between items-center w-full rounded-tl-lg ${color}`}
    >
      <p className="font-bold text-white">{message}</p>
      <MdClear
        onClick={handleRemoveError}
        className="cursor-pointer"
        size={20}
        color="white"
      />
    </div>
  );
};

export default Error;
