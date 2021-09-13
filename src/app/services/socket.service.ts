import { Injectable } from '@angular/core';
import { isEqual } from 'lodash';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ROOM } from '../core/room.enum';
import { User } from '../modules/store/user/user';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  instance: Socket;
  emergencyMessage: Subject<boolean>;

  constructor() {
    this.emergencyMessage = new Subject();
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
      this.instance.on('disconnect', () => {});
    });
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
