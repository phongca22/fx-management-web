export interface Page {
  id?: number;
  name?: string;
  icon?: string;
  url?: string;
  isHome?: boolean;
}

export interface StackedPage {
  page: Page;
  icon?: string;
  data?: any;
}
