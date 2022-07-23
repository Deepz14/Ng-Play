import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { ProductComponent } from './product/product.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'product', component: ProductComponent},
            {path: '', redirectTo: 'product', pathMatch: 'full'}
        ]
    }
]

@NgModule({
    declarations: [PagesComponent, ProductComponent, SideNavComponent, FooterComponent, HeaderComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class PageModule {}