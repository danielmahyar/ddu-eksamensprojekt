import { MdClear } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';
import { globalNotifcation } from '../../state/notification-state';

const Notifcation = ({ message }: any) => {
  const setNotification = useSetRecoilState(globalNotifcation);

  // useEffect(() => {
  // 	setInterval(() => setNotification(""), 5000)
  // }, [setNotification])

  const handleClear = () => {
    setNotification('');
  };

  return (
    <div className="absolute flex border border-discord-purple justify-between items-center transition-all h-auto w-auto max-w-2xl right-10 bottom-10 z-50 bg-discord-dark px-5 py-8 rounded-xl">
      <p className="text-white">{message}</p>
      <MdClear
        onClick={handleClear}
        size={18}
        className="text-gray-300 font-bold ml-4 cursor-pointer transform transition-all rotate-0 hover:rotate-180"
      />
    </div>
  );
};

export default Notifcation;
