import $ from 'jquery';
import { test, skip } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';
import testSelector from 'ember-test-selectors';

import {
  make, makeList, build,
  mockFindAll, mockFindRecord,
  mockSetup, mockTeardown
} from 'ember-data-factory-guy';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Login | Errors', {
  beforeEach() { mockSetup({ logLevel: 1, mockjaxLogLevel: 4 }); },
  afterEach() { mockTeardown(); }
});

test('shows an error', withChai(async function(expect) {
  const url = `/api/login`;

  $.mockjax({ url, responseText: { error: 'cannot do a thing' }, type: 'POST' });

  await visit('/login');

  assert.equal(currentRouteName(), 'login');

  const text = find('span').text();

  expect(text).to.include('cannot do a thing')
}));
