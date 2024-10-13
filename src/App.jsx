import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { createContext } from 'react';
import Dashboard from './pages/Dashboard';
import CustomerHealth from './pages/CustomerHealth';
const MyContext = createContext();

function App() {

  const values = {}

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <section className='main flex'>
            <div className='sideBarWrapper w-[20%]'>
              <Sidebar/>
            </div>

            <div className='content_Right w-[80%] px-3'>
              <Routes>
              <Route path="/" exact={true} element={<Dashboard/>} />
              </Routes>
            </div>

            {/* <div className='content_Right w-[80%] px-3'>
              <Routes>
              <Route path="/" exact={true} element={<CustomerHealth/>} />
              </Routes>
            </div> */}
            
          </section>
        </MyContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
