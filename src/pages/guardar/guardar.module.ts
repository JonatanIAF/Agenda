import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuardarPage } from './guardar';

@NgModule({
  declarations: [
    GuardarPage,
  ],
  imports: [
    IonicPageModule.forChild(GuardarPage),
  ],
})
export class GuardarPageModule {}
