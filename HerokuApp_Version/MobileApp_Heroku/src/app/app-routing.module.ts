import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
/*const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
  { path: 'add-document', loadChildren: './pages/add-document/add-document.module#AddDocumentPageModule' }
  { path: 'document', loadChildren: './pages/document/document.module#DocumentPageModule' }
  ,
];*/
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'menu',canActivate: [AuthGuard], loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  
  
  
  
 ];
 //{path: 'document/:id',canActivate: [AuthGuard], loadChildren: './pages/document/document.module#DocumentPageModule'}
 
@NgModule({
  imports: [RouterModule.forRoot(routes)]
  ,
  exports: [RouterModule]
})
export class AppRoutingModule {}
//imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })]