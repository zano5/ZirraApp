import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InternalizedPage } from './internalized';

@NgModule({
  declarations: [
    InternalizedPage,
  ],
  imports: [
    IonicPageModule.forChild(InternalizedPage),
  ],
})
export class InternalizedPageModule {}
