import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MessageManagementRoutingModule } from "./message-management-routing.module";
import { MessageManagementComponent } from "./message-management.component";
import { NotificationComponent } from "./notification/notification.component";
import { FormsModule } from "@angular/forms";
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [MessageManagementComponent, NotificationComponent, FeedbackComponent],
  exports: [MessageManagementComponent],
  imports: [CommonModule, MessageManagementRoutingModule, FormsModule]
})
export class MessageManagementModule {}
