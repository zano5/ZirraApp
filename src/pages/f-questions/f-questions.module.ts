import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FQuestionsPage } from './f-questions';

@NgModule({
  declarations: [
    FQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(FQuestionsPage),
  ],
})
export class FQuestionsPageModule {}
