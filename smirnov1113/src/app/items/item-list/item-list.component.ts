import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/models/item.model';
import { DataService } from 'src/app/shared/services/data.service';
//import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[];
  constructor(private itemsdataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      let items = this.itemsdataService.getAll();
      this.items = this.isNullOrUndefined(await items) ? [] : await items;
    } catch (err) {
      console.error(err);
    }
  }

  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  
  async onEditStatus(id: number) {
    if (!this.isNullOrUndefined(id)) {
      try {
        let item:Item = await this.itemsdataService.getOneById(id);
        item.status=!item.status;
        await this.itemsdataService.putOneById(id, item);
      } catch (err) {
        console.error(err);
      }
      this.getData();
    } 
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  isNullOrUndefined(value){
    return (value===null||value===undefined);
  }

}
