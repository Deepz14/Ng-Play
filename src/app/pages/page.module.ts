import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PageComponent } from './page.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
    {
        path: '',
        component: PageComponent,
        children: [
            {path: 'product', component: ProductComponent},
            {path: '', redirectTo: 'product', pathMatch: 'full'}
        ]
    }
]

@NgModule({
    declarations: [PageComponent, ProductComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class PageModule {}