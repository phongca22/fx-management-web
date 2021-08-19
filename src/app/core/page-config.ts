export interface IPage {
  id: number;
  url: string;
  name?: string;
}

let currentPageId = 1000;

function generate(url: string, name?: string): IPage {
  return {
    id: currentPageId++,
    url: url,
    name: name
  };
}

export const LOGIN: IPage = generate('login');
export const USER_PROFILE: IPage = generate('main/profile');
export const USER_CREATE: IPage = generate('main/user-create');
export const DENIED: IPage = generate('denied');
