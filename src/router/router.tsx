import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { LoginViews } from '../views/loginViews';
import { LoginRegister } from '../views/registerView';
import { LayoutAuth } from '../layouts/layoutAuth';
import AppLayout from '../layouts/AppLayout';
import ProfileView from '../views/ProfileView';
import LinkTreeView from '../views/LinkTreeView';
import HandleView from '../views/HandleView';
import { Page404 } from '../views/Page404';
import { HomeView } from '../views/HomeView';


export const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route element={<LayoutAuth/>}>
                <Route index= {true} path='/auth/login' element={<LoginViews/>}/>
                <Route path='/auth/register' element={<LoginRegister/>}/>
            </Route>
            <Route path='/admin' element={<AppLayout/>}>
              <Route index={true}/>
              <Route path='profile' element={<ProfileView/>}/>
              <Route path='links' element={<LinkTreeView/>}/>
            </Route>

            <Route path='/:handle' element={<LayoutAuth/>}>
              <Route element={<HandleView/>} index={true} />
            </Route>
            <Route path='/404' element={<LayoutAuth/>}>
              <Route element={<Page404/>} index={true}/>
            </Route>
            <Route path='/Home' element={<HomeView/>}/>
        </Routes>
    </BrowserRouter>
  );
};



