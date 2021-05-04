import './App.css';
import Header from './components/Header';
import DragMenu from './components/DragMenu';
import MenuNav from './components/MenuNav';
import MenuTree from './components/MenuTree';
import IndexRouter from './components/routing';


function App() {
  return (
    <div>
      <Header />
      <DragMenu />
      <IndexRouter/>
    </div>
  );
}

export default App;
