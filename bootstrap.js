window._ = require('lodash');

try {
  window.$ = window.jQuery = require('jquery');
  require('bootstrap-sass');
} catch (e) {
}

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.$.ajaxSetup({headers: {'X-CSRF-TOKEN': token.content}});
} else {
  console.error('CSRF token not found');
}
