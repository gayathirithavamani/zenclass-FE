
import { Icon } from '@iconify/react';
import React from 'react'


import { Link, Outlet } from 'react-router-dom';

function Home() {
 
 
let bar=window.localStorage.getItem("adminValidate")

  return (
    <div className="container-fluid">
        <div className="row align-item-center">
            <div className="col-1 col-md-1  secOne">
            <div className="icon">
                ZEN CLASS
               </div>
             <nav className='nav-list'>
             {
              bar==='true' ?(
                <ul className='sidebar-list '>
                
     
                  <li><Link to={"/home"} ><span className='iconx'><Icon icon="healthicons:i-training-class-negative" /></span> Class</Link></li>
                  <li><Link to={"/home/event-manage"} ><span className='iconx'><Icon icon="bi:calendar-event-fill" /></span> Events</Link></li>
                  <li><Link to={"/home/batchCreate"} ><span className='iconx'><Icon icon="fluent:contact-card-group-16-filled" /></span> Batches</Link></li>
                  <li><Link to={"/home/modules"}><span className='iconx'><Icon icon="fluent-mdl2:engineering-group" /></span>  Modules</Link></li>
                  <li><Link to={"/home/add-session"}><span className='iconx'><Icon icon="mingcute:diary-fill" /></span> Additional-session</Link></li>
                  <li><Link to={'/home/event-edit'}><span className='iconx'><Icon icon="mingcute:diary-fill" /></span> Event-edit</Link></li>
                
                  
                </ul>
              ):bar==='false' ? (
                <ul className='sidebar-list '>
                
                
                  <li><Link to={"/home"} ><span className='iconx'><Icon icon="healthicons:i-training-class-negative" /></span> Class</Link></li>
                  
                 
                  
                  <li><Link to={"/home/stuweb"}><span className='iconx'><Icon icon="material-symbols:library-books" /></span> Webcode</Link></li>
                  <li><Link to={"/home/stucap"}><span className='iconx'><Icon icon="fluent:clipboard-task-list-ltr-24-filled" /></span> Capstone</Link></li>
                  
                  
                  
                </ul>
              ):null
             }
             </nav>
            </div>
         
        </div>
   
    <div className="row mt-3">
      
         <div className="col-12 dyna">
          <Outlet/>
         </div>
        </div>
    </div>
  

  )
}

export default Home