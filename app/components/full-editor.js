import Ember from 'ember';

export default Ember.Component.extend({
  toolbar: [
    {command: 'formatBlock', commandValue: 'h1', title: 'Header', iconClass: 'fa fa-header'},
    {command: 'bold', title: 'Bold: Ctrl+B', iconClass: 'fa fa-bold'},
    {command: 'italic', title: 'Italic: Ctrl+I', iconClass: 'fa fa-italic'},
    {command: 'underline', title: 'Underline: Ctrl+U', iconClass: 'fa fa-underline'},
    {command: 'insertUnorderedList', title: 'Unordered List', iconClass: 'fa fa-list-ul'},
    {command: 'insertOrderedList', title: 'Ordered List', iconClass: 'fa fa-list-ol'},
    {command: 'indentList', title: 'Indent', iconClass: 'fa fa-indent'},
    {command: 'outdentList', title: 'Outdent', iconClass: 'fa fa-outdent'},
    {command: 'undo', title: 'Undo', iconClass: 'fa fa-undo'},
    {command: 'redo', title: 'Repeat', iconClass: 'fa fa-repeat'},
    {command: 'formatBlock', commandValueBlank: true, title: 'Unformated Text', iconClass: 'fa fa-eraser'}
  ]
});
