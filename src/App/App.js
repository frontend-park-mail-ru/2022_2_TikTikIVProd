// import './App.css';
import Header from './components/Header/Header.js';
function App() {
    const root = document.getElementById('root');
    const header = new Header(root);
    
    header.render();
}
;
export default App;
