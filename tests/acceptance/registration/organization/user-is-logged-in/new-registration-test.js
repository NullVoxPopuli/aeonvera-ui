import Ember from 'ember';
import { module, test, skip } from 'qunit';
import testSelector from 'ember-test-selectors';
import { withChai } from 'ember-cli-chai/qunit';

import {
  authenticateSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';
import startApp from 'aeonvera/tests/helpers/start-app';
import destroyApp from 'aeonvera/tests/helpers/destroy-app';

let application;
let organization;

let orgId = 'testorg';

moduleForAcceptance(
  `Acceptance |
   Registration |
   Organization |
   User is Logged In |
   New Registration`, {

    beforeEach() {
      application = startApp();
      server.logging = true;
      const user = server.create('user', {
        id: 'current-user',
        email: 'test@test.test',
        password: 'some-password'
      });

      organization = server.create('organization', {
        id: orgId,
        name: 'Test Org',
        domain: 'testorg'
      });

      server.post('/api/orders', function(schema, request) {
        const order = schema.orders.create({});

        return this.serialize(order);
      });

      server.get('/api/organizations/:id');

      server.get('/api/hosts/:host',
        (schema, request) => {
          return schema.organizations.findBy({ id: orgId });
        }
      );

      server.logging = true;

      authenticateSession(application, {
        email: 'test@test.test',
        token: 'abc123'
      });
    },

    afterEach() {
      destroyApp(application);
    }
});

test('can view the registration page', withChai(expect => {
  visit('/testorg');

  andThen(() => {
    expect(currentURL()).to.equal('/testorg/community/testorg/register');
    expect(currentRouteName()).to.equal('register.community-registration.register.index');
  });
}));

skip('can view the name of the org', assert => {
  visit('/testorg');
  andThen(() => {
    const h2s = find('h2');

    expect(h2s.text()).to.include('Register for Test Org');
  });
});

test('does not show the name and email fields', withChai(expect => {
  visit('/testorg');
  andThen(() => {
    const labels = find('.row .columns.medium-4 label');

    expect(labels.text()).to.not.include('Name');
    expect(labels.text()).to.not.include('Email');
  });
}));

skip('shows the membership options', withChai(expect => {
  server.create('membership-option', {
    name: 'Some Membership',
    organization: organization
  });

  visit('/testorg/community/testorg/register');

  const selector = 'table td';
  const elements = find(selector);

  andThen(() => {
    expect(elements.text()).to.contain('Some Membership');
  });
}));

test('does not show membership options if there are none', withChai(expect => {
  expect(true).to.equal(true);
}));

test('creates an order', withChai(expect => {
  expect(true).to.equal(true);
}));

test('cancels an order before submitting', withChai(expect => {
  expect(true).to.equal(true);
}));
