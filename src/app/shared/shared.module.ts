import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner.component";
import { AlertComponent } from "../alert/alert.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        DropdownDirective,
        LoadingSpinnerComponent,
        AlertComponent
    ],
    imports:[
        CommonModule
    ],

    exports:[
        DropdownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        CommonModule
    ]
})

export class SharedModule{}