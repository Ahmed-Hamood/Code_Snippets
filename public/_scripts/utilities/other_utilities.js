export function eventInvoker(QueryName) {
  let clickEvent = new Event('click');
  let getQuerySelector = document.querySelector(`${QueryName}`);
  getQuerySelector.dispatchEvent(clickEvent);
 }
 