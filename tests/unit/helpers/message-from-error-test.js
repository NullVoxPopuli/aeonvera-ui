import DS from 'ember-data';
import { module, test } from 'qunit';
import { withChai } from 'ember-cli-chai/qunit';

import { messageFromError } from 'aeonvera/helpers/message-from-error';

module('Unit | Helper | message from error');

// Replace this with your real tests.
test('maps JSONAPI errors', withChai(expect => {
  const error = {
    status: '422',
    source: { pointer: '/data/attributes/first-name' },
    title: 'Invalid Attribute',
    detail: 'First name must contain at least three characters.'
  };

  const result = messageFromError({ errors: [error] });

  expect(result).to.equal([error.detail]);
}));

test('returns the param if the error passed is just a string', withChai(expect => {
  const neckbeardError = '<tips hat> m\'error';
  const result = messageFromError(neckbeardError);

  expect(result).to.equal(neckbeardError);
}));

test('when error is an Error, but only a message is present, return that message', withChai(expect => {
  const errorMsg = 'some error msg';
  const error = new Error(errorMsg);
  const result = messageFromError(error);

  expect(result).to.equal(errorMsg);
}));

test('when error is an Object, but only a message is present, return that message', withChai(expect => {
  const errorMsg = 'some error msg';
  const error = { message: errorMsg };
  const result = messageFromError(error);

  expect(result).to.equal(errorMsg);
}));

test('when error is an AdapterError, it is parsed', withChai(expect => {
  const errorObject = {
    status: '422',
    source: { pointer: '/data/attributes/first-name' },
    title: 'Invalid Attribute',
    detail: 'must contain at least three characters.'
  };
  const error = new DS.AdapterError([errorObject]);
  const result = messageFromError(error);

  expect(result.length).to.equal(1);
  expect(result[0]).to.include('first-name must contain at least three characters.');
}));

test('when error is an object with an errors hash, it is treated as an adapter error', withChai(expect => {
  const errorObject = {
    status: '422',
    source: { pointer: '/data/attributes/first-name' },
    title: 'Invalid Attribute',
    detail: 'must contain at least three characters.'
  };
  const error = { errors: [errorObject] };
  const result = messageFromError(error);

  expect(result.length).to.equal(1);
  expect(result[0]).to.include('first-name must contain at least three characters.');
}));

test('when an error has a status code of 500, the title and htmlSafe detail are returned', withChai(expect => {
  const errorObject = {
    code: '500',
    title: 'Server Error',
    detail: 'some <i>server-side</i> exception'
  };
  const error = { errors: [errorObject] };
  const result = messageFromError(error);

  expect(result.length).to.equal(1);
  expect(result[0]).to.equal(`${errorObject.title} ${errorObject.detail}`);
}));

test('when an error has a status code below 400, use the default template', withChai(expect => {
  const errorObject = {
    code: '345',
    title: 'eh?',
    detail: 'why?'
  };
  const error = { errors: [errorObject] };
  const result = messageFromError(error);

  expect(result.length).to.equal(1);
  expect(result[0]).to.equal(`${errorObject.title} ${errorObject.detail}`);
}));
