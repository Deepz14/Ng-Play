import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DialogComponent],
    imports: [CommonModule, ReactiveFormsModule, MaterialModule],
    exports: [DialogComponent, MaterialModule]
})

export class SharedModule {}