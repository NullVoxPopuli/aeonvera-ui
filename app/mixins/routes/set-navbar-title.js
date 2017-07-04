import Ember from 'ember';

export default Ember.Mixin.create({
  _setAppNavTitle(title) {
    const application = this.controllerFor('application');

    application.set('navTitle', title);
  },

  _setAppNavTitleFromModelName() {
    const model = this.get('currentModel');
    const name = model.get('name');

    this.set('title', name);
    this._setAppNavTitle(name);
  },

  _hideSideNav() {
    const application = this.controllerFor('application');

    application.set('showSidebar', false);
  },

  _showSideNav() {
    const application = this.controllerFor('application');

    application.set('showSidebar', true);
  }
});
