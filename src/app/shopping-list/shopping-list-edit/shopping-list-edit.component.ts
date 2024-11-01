import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  //@Output() item = new EventEmitter();

  // @ViewChild('itemName') itemN:ElementRef;
  // @ViewChild('itemAmount') itemAmt:ElementRef;

  @ViewChild('f') slForm:NgForm;

  ingrd:Ingredient;  
  subscription:Subscription
  editMode = false;
  editedItemIndex:number; 
  editedItem:Ingredient;

  constructor(private shoppingListService:ShoppingListService){}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
    (index:number)=>{
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredientByIndex(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    }
    )
  }

  onSubmit(form:NgForm){
    const value = form.value;
    console.log(form);
    this.ingrd = new Ingredient(value.name,value.amount);

    if(this.editMode==true){
      this.shoppingListService.updateIngredients(this.editedItemIndex,this.ingrd);
      this.editMode=false;
    }
    else{
      this.shoppingListService.addIngredient(this.ingrd);
    }

    form.reset();

    
    // this.inds.name=this.itemN.nativeElement.value;
    // this.inds.amount=this.itemAmt.nativeElement.value;
    // this.item.emit(this.inds);
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
