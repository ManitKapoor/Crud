import Ember from 'ember';

export default Ember.Component.extend({
	step: 1,
	listmetadata: null,
	metadata: null,
	data: null,
	metaname: '',
	envser: Ember.inject.service(),
	ajax: Ember.inject.service(),

	init() {
		this._super(...arguments);
		this.get('ajax').request(this.get('envser').get('url')+'/CRUD/MetaDataListAction').then((result) => this.set('listmetadata',result));
	},

	actions: {

		createMeta() {
			this.set('step',2);
			this.set('metadata',[ { 'id': 0, 'name': 'name', 'type':'text'},{ 'id': 1, 'name': 'age', 'type':'number'}]);
			this.set('metaname','test');
		},

		loadMeta(name) {
			this.set('metaname',name);
			this.set('step',2);
	    },

	    SaveMeta() {
	    	this.get('ajax').request(
	    		this.get('envser').get('url')+'/CRUD/LoadAction',{ 
	    			method: 'POST', 
	    			data: { "name": this.get('metaname') } 
	    		}).then((result) => {
	    		 this.set('metadata',result.metadata); 
	    		 this.get('ajax').request(this.get('envser').get('url')+'/CRUD/DataAction',{
	    		  method: 'POST',
	    		   data: { name: this.get('metaname') } 
	    		}).then((result) => { 
	    			this.set('dat',result); 
	    			this.set('data',result); 
	    			this.set('step',3); } );
	    	});
	    },

	    QuitNow() {
	    	this.set('step',1);
	    	this.get('ajax').request(this.get('envser').get('url')+'/CRUD/MetaDataListAction').then((result) => this.set('listmetadata',result));
	    },

	    delmeta(namex){
	    	this.get('ajax').request(this.get('envser').get('url')+'/CRUD/DropMetaDataAction',{ method: 'POST', data: { "name": namex }}).then( (res) => {
	    		this.get('ajax').request(this.get('envser').get('url')+'/CRUD/MetaDataListAction').then((result) => this.set('listmetadata',result));
	    	});
	    }
	}
});
