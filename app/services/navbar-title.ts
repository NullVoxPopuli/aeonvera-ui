import Service from '@ember/service';

export default class NavbarTitle extends Service {
  title: string;
  navTitle: string;

  setAppNavTitle(title: string): void {
    this.set('navTitle', title);
    this.set('title', title);
  }
}
