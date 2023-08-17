import 'bootstrap/dist/css/bootstrap.min.css';
import { register } from 'swiper/element/bundle';
register();

import { MainRouter } from './router/MainRouter';

function App() {
  return (
    <>
      <MainRouter />
    </>
  )
}

export default App
