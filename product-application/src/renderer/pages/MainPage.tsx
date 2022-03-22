/* eslint-disable import/no-cycle */
import MainContentSelection from '../components/main-components/MainContentSelection';
import MainHeader from '../components/main-components/MainHeader';
import MainSpecialContainer from '../components/main-components/MainSpecialContainer';

const MainPage = () => {
  return (
    <section className="flex flex-col w-full h-full bg-yellow-400 overflow-hidden">
      <MainHeader />
      <div className="flex h-full overflow-y-hidden">
        {/* <FriendsOnlineList site={site} /> */}

        <MainContentSelection />

        <MainSpecialContainer />
      </div>
    </section>
  );
};

export default MainPage;
