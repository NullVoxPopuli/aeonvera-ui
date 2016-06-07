import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';
import { currentSession, authenticateSession, invalidateSession } from 'aeonvera/tests/helpers/ember-simple-auth';

let application;

// fake mocha
let it = test;
let describe = function(name, tests) {
  tests();
};

let orgId = 'testorg';
let userId = 'current-user';

module('Acceptance | Registration | Organization | User is Logged In', {
  beforeEach() {
    application = startApp();

    let org = server.create('organization', {
      id: orgId,
      name: 'Test Org',
      domain: 'testorg'
    });

    // server.logging=true;
    let user = server.create('user', { id: userId });

    authenticateSession(application, {
      email: user.email,
      id: user.id,
      token: user.token
    });
  },

  afterEach() {
    Ember.run(application, 'destroy');
    server.shutdown();
  },
});

describe('User is Logged in', function() {
  describe('beginning at the registration index page', function() {
    it('can view the registration page', (assert) => {
      visit('/testorg');
      andThen(() => assert.equal(currentURL(), '/testorg'));
    });

    it('can view the name of the org', assert => {
      visit('/testorg');
      andThen(() => {
        let h2s = find('h2');
        assert.ok(h2s.text().includes('Register for Test Org'));
      });
    });

    it('does not show the name and email fields', (assert) => {
      visit('/testorg');
      andThen(() => {
        let labels = find('.row .columns.medium-4 label');
        assert.notOk(labels.text().includes('Name'));
        assert.notOk(labels.text().includes('Email'));
      });
    });

    it('shows the membership options', (assert) => {
      assert.ok(true);
    });

    it('does not show membership options if there are none', (assert) => {
      assert.ok(true);
    });

    it('creates an order', (assert) => {
      assert.ok(true);
    });

    it('cancels an order before submitting', (assert) => {
      assert.ok(true);
    });
  });

  describe('an order has already been created', function() {
    it('reviews the the order', (assert) => {
      assert.ok(true);
    });
    it('navigates back to the order', (assert) => {
      assert.ok(true);
    });
    it('starts a new order', (assert) => {
      assert.ok(true);
    });
    it('edits the order', (assert) => {
      assert.ok(true);
    });
    it('visits the edit order URL', function(assert) {
      assert.ok(true);
    });
    it('cancels an order after submitting', (assert) => {
      assert.ok(true);
    });
    it('pays for the order', (assert) => {
      assert.ok(true);
    });
  });
  describe('a paid order', () => {
    it('cannot cancel a paid order', (assert) => {
      assert.ok(true);
    });
    it('cannot edit a paid order', (assert) => {
      assert.ok(true);
    });
  });
});
