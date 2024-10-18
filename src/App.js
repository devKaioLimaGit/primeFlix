import RouterApp from "./routes";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <RouterApp />
    </div>
  );
}

export default App;
