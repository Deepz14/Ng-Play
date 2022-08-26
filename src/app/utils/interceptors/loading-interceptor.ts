import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { AppLoaderService } from '../app-loader.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{

    private totalRequests = 0;

    constructor(private loaderService: AppLoaderService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.totalRequests++;
        this.loaderService.setLoading(true);
        return next.handle(request).pipe(
            finalize(() => {
                this.totalRequests--;
                if(this.totalRequests === 0){
                    this.loaderService.setLoading(false);
                }
            })
        )
    }

}