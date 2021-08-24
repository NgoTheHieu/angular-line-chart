import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })],
  exports: [RouterModule,NgxEchartsModule]
})
export class AppRoutingModule { }
