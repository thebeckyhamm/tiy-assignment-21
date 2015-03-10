// creates <th></th> from each key in the data
var HeaderView = Backbone.View.extend({

    template: JST["th"],
    tagName: "tr",

    // map object keys
    mapping: function() {
        return _.map(this.model, function(value) {
            return {"key": value};
        });
    },
    // for each header title, append to a th
    render: function() {
        var headerNames = this.mapping();
        _.each(headerNames, function(name) {
            this.$el.append( this.template(name) );   
        }, this);
        // return this so it's chainable
        return this;
    }

});

var EmployeeView = Backbone.View.extend({

    template: JST["tr"],
    tagName: "tr",

    render: function() {
        this.$el.html( this.template(this.model.toJSON()) );
        return this;
    }

});

// entire table view
var EmployeeCollectionView = Backbone.View.extend({

    template: JST["table"],

    // if the employee collection changes, re-render
    initialize: function() {
        this.listenTo(this.collection, "reset", this.render);
    },

    // process the data for the header
    buildHeader: function() {
        var allKeys = [];
        var uniqKeys = [];

        // get the keys
        this.collection.each(function(model){
            allKeys.push(model.keys());    
        });
        // flatten the array and uniq it
        uniqKeys = _.uniq(_.flatten(allKeys));

        return uniqKeys;

    },

    render: function() {
        // render the empty <table> template
        // so we can append things to <thead>
        // and <tbody>
        this.$el.html( this.template() );

        // create a header view using the data 
        // transformed in buildHeader
        var headerView = new HeaderView({model: this.buildHeader()});

        // render the headerView
        this.$("thead").append(headerView.render().el);

        // for each employee in the collection, create an single row
        this.collection.each( this.appendView );

        return this;
    },
    // create a single row and append
    appendView: function(model) {
        // model is provided by the each function above
        var employeeView = new EmployeeView({model: model});

        // render the single row and append it
        this.$("tbody").append( employeeView.render().el );
    }


});


var CheckboxView = Backbone.View.extend({

    template: JST["checkbox"],

    render: function() {
        // not this.model.toJSON here because passing in a 
        // raw object that is {Name: "Sales", Icon: "whatever"}
        this.$el.html( this.template( this.model ) );
        return this;
     }
 });

// container for all of the checkbox options
var CheckboxesView = Backbone.View.extend({

    template: JST["checkboxes"],

    // if checkboxes are checked or unchecked,
    // fire the onCheck method
    events: {
        "change input[type='checkbox']" : "onCheck"
    },

    // gets data ready for checkbox view
    renderData: function() {
        var allDepts = [];
        var uniqDepts =[];

        // pluck all the departments
        allDepts = this.collection.pluck("Dept");

        // uniq the departments down
        uniqDepts = _.uniq(allDepts, function(dept) {
            return JSON.stringify(dept);
        });

        // this raw array gets used in _.each below
        return uniqDepts;

    },

    render: function() {
        // render the empty .filters div
       this.$el.html( this.template() );
 
        // for each of the 4 departments,
        // make an individual checkbox
        _.each(this.renderData(), function(model) {
            var checkboxView = new CheckboxView({model: model});
            // render the checkbox on the .filters div
            this.$(".filters").append( checkboxView.render().el );
        });

        return this;
    },

    onCheck: function(e) {
        // set an empty array
        var checked = [];

        // get all nodes
        $nodes = this.$("input");

        // for each node, if it's checked, add to checked array
        $nodes.each(function() {
            var $node = $(this);
            if( $node.is(":checked") ) {
                checked.push($node.data("name"));
            }
        });

        // if there is nothing in checked, then add
        // each data name into checked
        if (checked.length === 0) {

            $nodes.each(function() {
                var $node = $(this);
                checked.push($node.data("name"));
            });
        }

        // trigger dept:filter
        this.trigger("dept:filter", checked);
        
    }


});