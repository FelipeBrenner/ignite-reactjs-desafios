import { MoviesProvider } from './contexts/MoviesContext';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

export function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MoviesProvider>
        <SideBar />
        <Content />
      </MoviesProvider>
    </div>
  )
}