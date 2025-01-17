import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})

export class RecipeEditComponent {
  id:number;
  editMode=false;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, 
              private recipeService:RecipeService,
              private router:Router){}

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        this.editMode = params['id']==null ? false : true;
        this.initForm();
      }
    )
  }

  onSubmit(){
    // const newRecipe = new Recipe( 
    //   this.recipeForm.value.name,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.ingredients);

    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    console.log(this.recipeForm);
    console.log(this.recipeForm.value.ingredients);

    this.router.navigate(['../'],{relativeTo:this.route});
   
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }


  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null,Validators.required),
        'amount' : new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }


  onX(ingrId:number){
    // console.log(ingrId,this.id);
    // this.recipeService.deleteIngredientById(this.id,ingrId);
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingrId);
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe['ingredients']){
        for(let ingr of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingr.name,Validators.required),
            'amount' : new FormControl(ingr.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath' : new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  

}
