import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadViewPage } from './upload-view';

@NgModule({
  declarations: [
    UploadViewPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadViewPage),
  ],
})
export class UploadViewPageModule {}
