/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLastVisited } from '../../electron-state/user-state';
import { LastVisited } from '../../types/UI-Types';

const MainSpecialContainer = () => {
  const [lastVisited, setLastVisited] = useState<LastVisited[]>([]);

  useEffect(() => {
    const storageData = getLastVisited();
    setLastVisited(storageData || []);
  }, [setLastVisited]);

  return (
    <div className="hidden lg:block h-full w-96 flex-shrink-0 bg-discord-light border-l border-discord-border z-10 py-4 overflow-y-auto">
      <div className="w-11/12 mx-auto">
        <h1 className="text-2xl text-white font-bold mb-5">Sidst set</h1>
        <div className="flex flex-col space-y-5">
          {/* {friends.length > 0 && friends.map((friend, index) => (
						<ActiveNowField key={friend.friendID} />
					))} */}
          {lastVisited &&
            lastVisited.map((visited, index) => {
              return (
                <div
                  className="font-bold text-discord-purple underline"
                  key={index}
                >
                  <Link to={visited.route}>{visited.name}</Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MainSpecialContainer;
