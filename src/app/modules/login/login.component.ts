import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Response } from 'src/app/core/response';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { RouterService } from 'src/app/services/router.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../store/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('userInput') input: ElementRef;
  form: FormGroup;
  loading: boolean;

  constructor(
    public builder: FormBuilder,
    public alert: AlertService,
    public auth: AuthService,
    public router: RouterService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    this.setupForm();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.input?.nativeElement.click();
    this.cdr.detectChanges();
  }

  setupForm() {
    this.form = this.builder.group({
      user: ['', [Validators.required]],
      pass: ['', Validators.required]
    });
  }

  login() {
    if (this.loading || this.form.invalid) {
      return;
    }

    this.loading = true;
    this.auth.login(this.form.value.user, this.form.value.pass).subscribe((res: Response) => {
      if (res.ok) {
        this.auth.setUser(res.data.accessToken);
        this.auth.setToken(res.data.accessToken);
        this.router.goHome();
      } else {
        this.loading = false;
        this.alert.error(res.message);
      }
    });
  }

  register() {
    if (this.loading || this.form.invalid) {
      return;
    }

    this.loading = true;
    const { user, pass } = this.form.value;
    this.auth.register(user, pass).subscribe((res: Response) => {
      if (res.ok) {
        this.alert.success(this.translate.instant('login.register.ok'));
      } else {
        this.loading = false;
        if (res.errorCode === 100) {
          this.alert.error(this.translate.instant('login.error.100'));
        } else {
          this.alert.error(res.message);
        }
      }
    });
  }
}
