import { Template } from 'meteor/templating';
import './homePage.html';
import '../../components/search/search';

Template.homePage.onCreated(function(){
  var data = this.data;
  console.log( "onCreated: ", data );
});
