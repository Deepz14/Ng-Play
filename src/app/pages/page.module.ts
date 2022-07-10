import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
    {path: '', component: ProductComponent}
]

@NgModule({
    declarations: [ProductComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class PageModule {}