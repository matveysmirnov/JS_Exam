import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemListComponent } from './item-list/item-list.component';


@NgModule({
  declarations: [ItemsComponent, ItemEditComponent, ItemListComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule, 
    ReactiveFormsModule
  ]
})
export class ItemsModule { }
