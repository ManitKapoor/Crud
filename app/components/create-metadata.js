import Ember from 'ember';

export default Ember.Component.extend({
	nmetadata: null,
	lastid: null,
	ajax: Ember.inject.service(),
	envser: Ember.inject.service(),
	init() {
		this._super(...arguments);
		this.get('ajax').request(this.get('envser').get('url')+'/CRUD/LoadAction',{method: 'POST', data: { "name": this.get('metaname') }}).then((result) => { if(result.metadata != 'Undefined Name') { this.set('nmetadata',result.metadata);  this.set('lastid',this.get('nmetadata').length); } } );
	},
	actions: {
		delcol(id){
			this.get('nmetadata').removeAt(id);
			for(var x=id;x<this.get('nmetadata').length;x++)
				this.get('nmetadata')[x].id=x;
			this.set('lastid',this.get('nmetadata').length);
		},
		newcol(){
			this.get('nmetadata').addObjects([{ "id": this.get('lastid'), name: "text", type: "text" }]);
			this.set('lastid',this.get('lastid')+1);
		},
		save(){
			this.get('ajax').request(this.get('envser').get('url')+'/CRUD/SaveAction',{method: 'POST', data: { "name": this.get('metaname'), "metadata": JSON.stringify(this.get('nmetadata')) }});
		}
	}
});
