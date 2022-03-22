import { useEffect, useRef } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { setShowModal } from '../../electron-state/user-state';
import useClickOutside from '../../hooks/useClickOutside';
import { globalModal } from '../../state/modal-state';

const Modal = ({ message }: any) => {
  const modalRef = useRef<any>();
  const resetModal = useResetRecoilState(globalModal);
  const [modal, setModal] = useRecoilState(globalModal);
  useClickOutside(modalRef, () => {
    resetModal();
  });

  useEffect(() => {
    if (modal.accept === true) {
      resetModal();
    }
  }, [modal, resetModal]);

  const handlePreferShowNot = (state: any) => {
    setShowModal(modal.type, state);
  };

  return (
    <div
      ref={modalRef}
      className="h-auto w-96 p-4 absolute rounded-lg bg-discord-dark shadow-2xl transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <h1 className="uppercase font-bold text-discord-purple">Warning</h1>
      <p className="text-white font-semibold">{message}</p>
      <div className="flex items-center justify-start">
        <p className="text-discord-text-secondary font-semibold mr-5">
          Do not show this message again:
        </p>
        <input
          type="checkbox"
          className="bg-discord-light"
          onChange={(e) => handlePreferShowNot(e.target.checked)}
        />
      </div>
      <div className="flex space-x-4 mt-2">
        <button
          type="submit"
          className="bg-discord-green w-full transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
          onClick={() => setModal({ ...modal, accept: true })}
        >
          Continue
        </button>
        <button
          type="submit"
          className="bg-discord-red w-full transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
          onClick={() => resetModal()}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default Modal;
