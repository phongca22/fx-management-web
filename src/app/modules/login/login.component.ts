import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from 'src/app/core/response';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { RouterService } from 'src/app/services/router.service';
import { SocketService } from 'src/app/services/socket.service';
import { AuthService } from '../auth/auth.service';

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
    private socket: SocketService
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
        this.auth.setToken(res.data.accessToken);
        this.auth.setUser(res.data.accessToken);
        this.socket.init(res.data.accessToken, this.auth.user);
        this.router.goHome();
      } else {
        this.loading = false;
        this.alert.error('login.error');
      }
    });
  }
}
