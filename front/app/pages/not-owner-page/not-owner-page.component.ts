import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

/**
 * Page shown after a owner user is successfully logged with provider but isn't set as owner
 */
@Component({
    selector: 'app-not-owner-page',
    templateUrl: 'not-owner-page.component.html',
    styles: [`.container {padding-top: 30px;} button { cursor: pointer`]
})
export class NotOwnerPageComponent implements OnInit {
    public provider: string;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.provider = params['provider'];
        });
    }

    gotToLogin() {
        this.router.navigate(['/login']);
    }
}
