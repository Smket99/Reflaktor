import './App.css';
import {Link,BrowserRouter as Router} from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Link className="links" to="Student/history">Student</Link>
    <Link className="links" to="login">Login</Link>
    </div>
  );
}

export default App;
