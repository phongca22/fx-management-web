import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { filter as filterLd, isNil, isString } from 'lodash';
import { of } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Agent } from 'src/app/core/agent';
import { USER_PROFILE } from 'src/app/core/page-config';
import { Response } from 'src/app/core/response';
import { removeAccents } from 'src/app/core/utility';
import { AgentService } from 'src/app/services/agent.service';
import { DestroyService } from 'src/app/services/destroy.service';
import { RouterService } from 'src/app/services/router.service';
import { AlertService } from '../alert/alert.service';
import { AgentEditComponent } from './agent-edit/agent-edit.component';

@Component({
  selector: 'app-agent-management',
  templateUrl: './agent-management.component.html',
  styleUrls: ['./agent-management.component.scss']
})
export class AgentManagementComponent implements OnInit {
  agents: Agent[];
  isOpen: boolean;
  keyword: FormControl;
  @ViewChild('input') set keywordInput(element: ElementRef) {
    if (this.isOpen) {
      element.nativeElement.focus();
      this.cdr.detectChanges();
    }
  }
  filtered: Agent[];

  constructor(
    private service: AgentService,
    private alert: AlertService,
    private readonly $destroy: DestroyService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private router: RouterService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.keyword = new FormControl();
    this.keyword.valueChanges
      .pipe(
        switchMap((val: string) => {
          if (val) {
            return of(
              filterLd(this.agents, (item: Agent) =>
                removeAccents(item.info.name.toLowerCase()).includes(removeAccents(val?.toLowerCase()))
              )
            );
          } else {
            return of(this.agents);
          }
        }),
        takeUntil(this.$destroy)
      )
      .subscribe((data: Agent[]) => (this.filtered = data));
  }

  open(): void {
    this.isOpen = !this.isOpen;
  }

  getData(): void {
    this.service
      .getAgents()
      .pipe(takeUntil(this.$destroy))
      .subscribe((res: Response) => {
        if (res.ok) {
          this.agents = res.data.map((val: any) => new Agent(val));
          this.keyword.setValue('');
        } else {
          this.alert.error();
        }
      });
  }

  setActive(event: MatSlideToggleChange, data: Agent) {
    data.active = event.checked;
    this.service.setActive(data.info.id, event.checked).subscribe((res: Response) => {
      if (!res.ok) {
        this.alert.error();
        data.active = !data.active;
      }
    });
  }

  edit(data: Agent): void {
    this.dialog
      .open(AgentEditComponent, {
        data: data,
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .pipe(filter((result: any) => !isNil(result) && !isString(result)))
      .subscribe((result: any) => {
        data.info.name = result.name;
        data.info.gender = result.gender.id;
      });
  }

  add(): void {
    this.dialog
      .open(AgentEditComponent, {
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => this.getData());
  }

  close(): void {
    this.isOpen = false;
  }

  back(): void {
    this.router.go(USER_PROFILE);
  }
}
