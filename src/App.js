import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './admin/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Class from './admin/Class';

import Batches from './admin/Batches';
import Student from './admin/Event';
import Modules from './admin/Modules';
import Capstone from './admin/Capstone';
import Webcode from './admin/Webcode';
import Login from './admin/Login';
import Stuweb from './admin/Stuweb';
import Stucap from './admin/Stucap';
import Addsession from './admin/Addsession';
import Eventedit from './admin/Eventedit';
import Editweb from './admin/Editweb';
import Editcap from './admin/Editcap';

function App() {
  return (
   <>
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Login/>} />
    <Route path="/home" element={<Home/>}>
<Route index element={<Class/>}/>

<Route path="/home/batchCreate" element={<Batches/>} />
<Route path="/home/event-manage" element={<Student/>} />
<Route path ="/home/modules" element={<Modules/>} />
<Route path="/home/capstone/:userId" element={<Capstone/>} />
<Route path="/home/webcode/:userid" element={<Webcode/>} />
<Route path="/home/stuweb" element={<Stuweb/>} />
<Route path="/home/stucap" element={<Stucap/>} />
<Route path="/home/add-session" element={<Addsession/>} />
<Route path="/home/event-edit" element={<Eventedit/>} />
<Route path="/home/edit-web/:id" element={<Editweb/>} />
<Route path="/home/edit-cap/:id" element={<Editcap/>} />
    </Route>
   
  </Routes>
  </BrowserRouter>
   </>
  );
}

export default App;
