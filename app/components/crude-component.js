import Ember from 'ember';

export default Ember.Component.extend({
	step: 1,
	listmetadata: null,
	metadata: null,
	data: null,
	ajax: Ember.inject.service(),
	init() {
		this._super(...arguments);
		if(ENV.environment == 'production')
			this.get('ajax').request('/CRUD/MetaDataListAction').then((result) => this.set('listmetadata'.result));
		else
			this.set('listmetadata',[ { "name": "Student"}, { "name": "Animals" } ]);
	},
	actions: {
		create() {
			this.set('step',2);
			this.set('metadata',[]);
			this.set('data',[]);
		},
		load(name) {
			if(ENV.environment == 'production'){
				this.set('step',2);
				this.get('ajax').request('/CRUD/LoadAction',
				{
					method: 'POST', 
					"data": { "name": name }
				}).then((result) => {
				 this.set('metadata',result.metadata);
				 this.set('data',result.data);
				});
			} else {
				this.set('step',2);
				this.set('metadata',[]);
				this.set('data',[]);
			}
	    }
	}
});
