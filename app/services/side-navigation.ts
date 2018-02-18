import Service from '@ember/service';

export default class SideNavigation extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
  open: boolean;
  isEnabled: boolean = true;

  toggle(): void {
    this.set('open', !this.get('open'));
  }

  disable(): void {
    this.set('isEnabled', false);
  }

  enable(): void {
    this.set('isEnabled', true);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'side-navigation': SideNavigation;
  }
}
