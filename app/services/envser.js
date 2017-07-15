import Ember from 'ember';
import ENV from 'crud/config/environment'

export default Ember.Service.extend({
	url: '',
	init(){
		this._super(...arguments);
		if(ENV.environment != 'production')
			this.set('url','http://localhost:8080');
		else
			this.set('url','');
	}
});
