import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes,RouteReuseStrategy } from '@angular/router';
import { CommonModule,DatePipe,DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SuiValidatorModule } from '@op/smile/components/validator/sui-validator';
import { ModalModule } from '@op/smile/components/modal/modal.module';
import { CommonDirectivesModule } from '@op/smile/directives/groups/common-directives.module';
import { SuiAreaModule } from "@op/smile/business-components/base/area/sui-area.module"
// import { MainListComponent } from '../main/main-list/main-list.component'
import { CommonService }  from './services/common.service';
import { LoginService } from './login/login.service';
import { ListService } from './main/list/list.service';
import { EditService } from './control/edit/edit.service';
import { SuiCookieService } from '@op/smile/services/storage/sui-cookie.service';
import { EditComponent } from './control/edit/edit.component';
import { ListComponent } from './main/list/list.component';
import { LoginComponent } from './login/login.component'
import { NgxEchartsModule } from 'ngx-echarts';
import { LinkChartComponent } from './components/link-chart/link-chart.component';
import { MapChartComponent } from './components/map-chart/map-chart.component';
// import { Modal } from '@op/smile/components/modal/modal';
import { ListDataComponent } from './components/list-data/list-data.component';
import { ListBarCharComponent } from './components/list-bar-char/list-bar-char.component';
import { ListBarNoframeChartComponent } from  './components/list-bar-noframe-chart/list-bar-noframe-chart.component';
import { ListBarVerticalCharComponent } from './components/list-bar-vertical-char/list-bar-vertical-char.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { SetModelComponent } from './components/model/set-model/set-model.component';
import { ClockComponent } from './components/clock/clock.component';
import { ListRightDataComponent } from './components/list-right-data/list-right-data.component'
 
// const appName = 'login';
// const root = `/apps/logins/`;

const routers: Routes = [
    // { path: appName, loadChildren: './login.module#LoginModule' },
    // { path: 'testMain', component:  MainListComponent },
    {path : 'login',component:  LoginComponent,data:{reload:false}},
    { path: 'edit', component:  EditComponent,data:{reload:false} },
    { path: 'main', component:  ListComponent,data:{reload:false} }
];
 

@NgModule({
    declarations: [
        EditComponent,
        ListComponent,
        LoginComponent,
        LinkChartComponent,
        MapChartComponent,
        ListDataComponent,
        ListBarCharComponent,
        ListBarNoframeChartComponent,
        ListBarVerticalCharComponent,
        ListCardComponent,
        SetModelComponent,
        ClockComponent,
        ListRightDataComponent,
        
    ],
    imports: [
        CommonModule,
        SuiValidatorModule,
        RouterModule.forChild(routers),
        FormsModule,
        NgxEchartsModule,
        HttpClientModule,
        ModalModule,
        CommonDirectivesModule,
        SuiAreaModule
         
    ],
    exports: [
    ],
    providers: [
        CommonService,
        LoginService,
        ListService,
        DatePipe,
        DecimalPipe,
        EditService,
        SuiCookieService,
        
    ]
})
export class RootRouterModule    {
    constructor(){}
 }  
 