export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');

  const spinner = document.querySelector('.app-spinner');
  console.log(spinner);
  if (spinner) {
    spinner.style.display = 'none';
  }
}

export default {
  initialize
};
