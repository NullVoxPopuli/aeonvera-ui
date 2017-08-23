import Ember from 'ember';

export default class extends Ember.Service {
  title: string;
  navTitle: string;
  showSidebar: boolean;

  setAppNavTitle(title: string): void {
    this.set('navTitle', title);
    this.set('title', title);
  }

  hideSideNar(): void {
    this.set('showSidebar', false);
  }

  showSideNav(): void {
    this.set('showSidebar', true);
  }
}
