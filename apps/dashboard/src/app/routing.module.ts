import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovementsComponent } from './movements/movements.component';
import { WorkoutsComponent } from './workouts/workouts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'movements', component: MovementsComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
