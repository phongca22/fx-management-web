import { Injectable } from '@angular/core';
import { isEqual } from 'lodash';
import { EMPTY, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ROOM } from '../core/room.enum';
import { User } from '../modules/store/user/user';
import { StorageService } from './storage.service';
import { StoreService } from './store.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  instance: Socket;
  emergencyMessage: Subject<boolean>;

  constructor(private store: StoreService, private storage: StorageService) {
    this.emergencyMessage = new Subject();
    this.store.selectUser().subscribe((user: User) => {
      if (user.id) {
        this.init(this.storage.get('token'), user);
      } else {
        this.instance?.disconnect();
      }
    });
  }

  init(token: string, user: User | null) {
    if (!user?.rooms) {
      return;
    }

    this.instance = io({
      auth: {
        token: token
      }
    });

    this.instance.on('connect', () => {
      this.setupListener(user.rooms);
    });

    this.instance.on('disconnect', () => {});
  }

  setupListener(data: string[]): void {
    if (data.includes(ROOM.EMERGENCY)) {
      this.instance.on(ROOM.EMERGENCY, () => {
        this.emergencyMessage.next(true);
      });
    }
  }

  listen(type: ROOM): Observable<any> {
    if (isEqual(ROOM.EMERGENCY, type)) {
      return this.emergencyMessage.asObservable();
    } else {
      return EMPTY;
    }
  }
}
