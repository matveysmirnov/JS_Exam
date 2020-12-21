import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../shared/models/item.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { isNullOrUndefined } from 'util';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  id: number;
  item: Item;
  itemForm: FormGroup;

  constructor(
    private activatedRouter: ActivatedRoute,
    private itemsdataService: DataService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe((param) => {
      this.id = param.id;
    });
  }

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required,Validators.pattern(/^\d+$/)]),
      status: new FormControl(null, [Validators.required]),
    });
    this.getData();
  }

  async getData() {
    if (!this.isNullOrUndefined(this.id)) {
      try {
        let item = this.itemsdataService.getOneById(this.id);
        this.item = await item;
      } catch (err) {
        console.error(err);
      }
      this.itemForm.patchValue({
        name: this.item.name,
        amount: this.item.amount,
        status: this.item.status,
      });
    } else {
      this.itemForm.patchValue({
        name: undefined,
        amount: 1,
        status: false,
      });
    }
  }

  async onSave() {
    if (!this.isNullOrUndefined(this.id)) {
      try {
        await this.itemsdataService.putOneById(this.id, this.itemForm.value);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.itemsdataService.postOne(this.itemForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async onDelete() {
    try {
      await this.itemsdataService.deleteOneById(this.id);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/items']);
  }



  isNullOrUndefined(value){
    return (value===null||value===undefined);
  }

}
