import { test, skip } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';
import testSelector from 'ember-test-selectors';

import {
  make, makeList, build,
  mockFindAll, mockFindRecord,
  mockSetup, mockTeardown
} from 'ember-data-factory-guy';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Login | Redirect After Login', {
  beforeEach() { mockSetup({ logLevel: 1, mockjaxLogLevel: 4 }); },
  afterEach() { mockTeardown(); }
});
