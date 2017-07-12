import Ember from 'ember';

export default Ember.Component.extend({
  //setting all records at init
  init() {
    this._super(...arguments);
    this.set('items',this.get('dat'));
  },

  // The page we are currently on
  page: 1,

  // The number of items to show per page
  paginateBy: 5,

  // Returns the list of items for the current page only
  paginatedItems: Ember.computed('items','page', function(){
    var i = (parseInt(this.get('page')) - 1) * parseInt(this.get('paginateBy'));
    var j = i + parseInt(this.get('paginateBy'));
    return this.get('items').slice(i, j);
  }),

  // The total number of pages that our items span
  numberOfPages: Ember.computed('items', function(){
    var n = this.get('items.length');
    var c = parseInt(this.get('paginateBy'));
    var r = Math.ceil(n/c);
    return r;
  }),

  // An array containing the number of each page: [1, 2, 3, 4, 5, ...]
  pageNumbers: Ember.computed('numberOfPages', function(){
    var n = Array(this.get('numberOfPages'));
    for(var i = 0;i < n.length;i++) {
      n[i] = i + 1;
    }
    return n;
  }),

  // Whether or not to show the "next" button
  showNext: Ember.computed('page','items', function(){
    if(this.get('items').length == 0)
       return false;
    return (this.get('page') < this.get('numberOfPages'));
  }),

  // Whether or not to show the "previous" button
  showPrevious: Ember.computed('page','items', function(){
    if(this.get('items').length == 0)
       return false;
    return (this.get('page') > 1);
  }),

  actions: {
    // Show the next page of items
    nextClicked() {
      if(this.get('page') + 1 <= this.get('numberOfPages')) {
        this.$("#d"+this.get('page').toString()).attr('class','');
        this.set('page', this.get('page') + 1);
        this.$("#d"+this.get('page').toString()).attr('class','active');
      }
    },
    // Show the previous page of items
    previousClicked() {
      if(this.get('page') > 0) {
        this.$("#d"+this.get('page').toString()).attr('class','');
        this.set('page', this.get('page') - 1);
        this.$("#d"+this.get('page').toString()).attr('class','active');
      }
    },
    // Go to the clicked page of items
    pageClicked(pageNumber){
      this.$("#d"+this.get('page').toString()).attr('class','');
      this.set('page',pageNumber);
      this.$("#d"+this.get('page').toString()).attr('class','active');
    },

    //filter records here
    filterByInput() {
      
          
      this.set('items',ansrec); 

      this.$("#d"+this.get('page').toString()).attr('class','');

      this.$("#d1").attr('class','active');
      this.set('page',1);
    },

    //display all result
    displayall(){
      this.set('items',this.get('dat'));
      this.$("#d"+this.get('page').toString()).attr('class','');
      this.$("#d1").attr('class','active');
      this.set('page',1);
    }
  }
});
