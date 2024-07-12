import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { HttpService } from "./services/http.service";

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        HttpService,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class CoreServicesModule {
}
