import Ember from 'ember';

const { isBlank, String: { htmlSafe } } = Ember;

const defaultTemplate = (title, detail) => (
  title && detail && `${title} ${detail}` || title || detail
);

const IGNORED_ATTRIBUTE = 'base';

// TODO: take _messageFromError from flash-notification
export function messageFromError(error, msgTemplate) {
  msgTemplate = msgTemplate || defaultTemplate;

  if (typeof error === 'string') return error;

  const isError = error instanceof Error;
  const isObject = error instanceof Object;

  if (isError || isObject) {
    if (isBlank(error.errors)) return error.message;

    // JSONAPI.org + Adapter errors
    if (error.isAdapterError) return parseAdapterError(error, msgTemplate);
    if (isObject) return parseAdapterError(error, msgTemplate);

    // no default?
  }

  // else, return the error - adjust this method as needed.
  return error;
}

function parseAdapterError(error, msgTemplate) {
  return error.errors.map(e => parseErrorFromAdapterError(e, msgTemplate));
}

function parseErrorFromAdapterError(error, msgTemplate) {
  const { title, detail, source, message } = error;
  const { pointer } = source || {};

  if (!isKnownError(error)) return msgTemplate(title, detail);
  if (isServerError(error)) return msgTemplate(title, htmlSafe(detail));

  const attribute = pointer.split('/').pop().replace('-', ' ');
  const attributeDetail = detail || message;

  // do we care about the message?
  // usually this'll say something like "AdapterError"
  if (error.message) {
    return msgTemplate(error.message, `${attribute} ${attributeDetail}`);
  }

  if (attribute === IGNORED_ATTRIBUTE) return msgTemplate(attributeDetail);

  return msgTemplate(attribute, attributeDetail);
}

// API needs to get it's act together,
// and return consistenc errors...
// coughtdevisecought
function isKnownError(error) {
  const { status, code, source } = error;
  const { pointer } = source || {};
  const errorStatus = status || code;

  return (
    isServerError(error) ||
    (errorStatus === undefined || (errorStatus >= 400 && pointer))
  );
}

function isServerError(error) {
  const { status, code } = error;
  const errorStatus = status || code;

  return errorStatus >= 500;
}

export default Ember.Helper.helper(messageFromError);
