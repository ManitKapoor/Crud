import Ember from 'ember';

export default Ember.Component.extend({

  lastid: null,
  add: {},
  envser: Ember.inject.service(),
  ajax: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.set('lastid',this.get('dat').length);
    this.set('add',{});
  },

  actions: {

    addrow(){
      this.get('add')["id"]=this.get('lastid');
      this.get('dat').addObjects([this.get('add')]);
      this.set('lastid',this.get('dat').length);
      this.set('add',{});
    },

    delrow(id){
      this.get('dat').removeAt(id);
      for(var x=id;x<this.get('dat').length;x++)
          this.get('dat')[x].id=x;
    },

    loadVal(name){
      this.get('add')[name]=this.$("#adr"+name).val();
    },

    SaveNow() {
      this.get('ajax').request(this.get('envser').get('url')+'/CRUD/SaveDataAction',{ method: 'post', data: { name: this.get('metaname'), rdata: JSON.stringify(this.get('dat'))}});
    }

  }
});
