import { OidcSecurityService } from '../auth/services/oidc.security.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {

    message: string;
    name = 'none';
    email = 'none';
    userDataSubscription: Subscription;
    userData: boolean;
    isAuthorizedSubscription: Subscription;
    isAuthorized: boolean;

    constructor(public oidcSecurityService: OidcSecurityService) {
        this.message = 'HomeComponent constructor';
    }

    ngOnInit() {
        this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
            (isAuthorized: boolean) => {
                this.isAuthorized = isAuthorized;
            });

        this.userDataSubscription = this.oidcSecurityService.getUserData().subscribe(
            (userData: any) => {

                if (userData !== '') {
                    this.name = userData.name;
                    this.email = userData.email;
                    console.log(userData);
                }

                console.log('userData getting data');
            });
    }

    ngOnDestroy(): void {
        this.userDataSubscription.unsubscribe();
        this.isAuthorizedSubscription.unsubscribe();
    }
}
