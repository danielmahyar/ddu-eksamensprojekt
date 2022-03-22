import { LastVisited } from '../types/UI-Types';

export const getLastVisited = (): Array<LastVisited> | null => {
  const DATA_LOCAL_STORAGE = localStorage.getItem('last_visited');
  if (DATA_LOCAL_STORAGE) {
    const lastVisited: Array<LastVisited> = JSON.parse(DATA_LOCAL_STORAGE);
    return lastVisited;
  }
  return null;
};

export const setLastVisited = (
  newFunctionality: LastVisited
): boolean | null => {
  // const DATA_LOCAL_STORAGE = localStorage.getItem('last_visited')
  localStorage.setItem('last_visited', JSON.stringify([newFunctionality]));
  return true;
  // if(!DATA_LOCAL_STORAGE) {
  // 	const array: LastVisited[] = [newFunctionality]
  // 	localStorage.setItem('last_visited', JSON.stringify(array))
  // 	return true
  // }
  // const lastVisited: Array<LastVisited> = JSON.parse(DATA_LOCAL_STORAGE)
  // const alreadyVisited: number = lastVisited.findIndex(v => v.name === newFunctionality.name)
  // if(alreadyVisited > 0){
  // 	lastVisited[0] = lastVisited[alreadyVisited]
  // 	localStorage.setItem('last_visited', JSON.stringify(lastVisited))
  // 	return true
  // } else {
  // 	lastVisited.push(newFunctionality)
  // 	localStorage.setItem('last_visited', JSON.stringify(lastVisited))
  // 	return true
  // }
};

export const setShowModal = (type: string, value: boolean): boolean => {
  localStorage.setItem(type, JSON.stringify(value));
  return true;
};

export const getShowEditModal = (): boolean => {
  const DATA_LOCAL_STORAGE = localStorage.getItem('show_edit_modal');
  if (!DATA_LOCAL_STORAGE) return true;
  const showEditModal: boolean = JSON.parse(DATA_LOCAL_STORAGE);
  return showEditModal;
};
