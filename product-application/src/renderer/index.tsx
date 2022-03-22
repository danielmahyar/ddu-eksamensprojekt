import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <App />
    </Router>
  </RecoilRoot>,
  document.getElementById('root')
);
