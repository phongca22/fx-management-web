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
export const USER_LIST: IPage = generate('main/users');
export const SEARCH: IPage = generate('main/search');
export const DENIED: IPage = generate('denied');
export const USER_MANAGEMENT: IPage = generate('main/user-management');
export const BLANK: IPage = generate('main/blank');
export const DOCTOR_MANAGEMENT: IPage = generate('main/doctor-management');
export const AGENT_MANAGEMENT: IPage = generate('main/agent-management');
