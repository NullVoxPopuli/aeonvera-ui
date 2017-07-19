import Ember from 'ember';

const { isPresent, isBlank } = Ember;

const defaultTemplate = (title, detail) => `${title} ${detail}`;

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
  }

  // else, return the error - adjust this method as needed.
  return error;
}

function parseAdapterError(error, msgTemplate) {
  return error.errors.map(e => {
    const status = e.code;
    const { detail, source } = e;
    const { pointer } = source || {};

    if (status >= 500) return msgTemplate(e.title, Ember.String.htmlSafe(e.detail));

    if (status === undefined || (status < 500 && status >= 400) && pointer) {
      const attribute = pointer.split('/').pop();

      return msgTemplate(error.message, `${attribute} ${detail}`);
    }

    // default?
    return msgTemplate(e.title, e.detail);
  });
}

export default Ember.Helper.helper(messageFromError);
