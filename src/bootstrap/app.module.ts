import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SUI_HTTP_CONFIG } from "@op/smile/services/https/sui-http-config";
 
import { MainEntryModule } from "@op/smile/main-entry/main-entry.module";
import { ErrorComponent } from "@op/smile/main-entry/error/error.component";
//登录模块
import { RootRouterModule  } from '../apps/bigdata/Bigdata.module';
import  {AppComponent } from '../apps/bigdata/app.component';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MainEntryModule,
        RouterModule.forChild([{ path: '', redirectTo: '/login', pathMatch: 'full' }]),
        RootRouterModule,
    ],
    exports: [],
    providers: [
        { provide: SUI_HTTP_CONFIG, useValue: { businessHeaders: { "content-type": "application/json" } }}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}