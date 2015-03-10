var HeadingView = Backbone.View.extend({

    template: JST["th"],
    tagName: "tr",

    mapping: function() {
        return _.map(this.model, function(value) {
            return {"key": value};
        });
    },

    render: function() {
        var columnNames = this.mapping();
        _.each(columnNames, function(name) {
            this.$el.append( this.template(name) );   
        }, this);

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


var EmployeeCollectionView = Backbone.View.extend({

    template: JST["table"],

    initialize: function() {
        this.listenTo(this.collection, "reset", this.render);
    },

    buildHeader: function() {
        var allKeys = [];
        var uniqKeys = [];

        this.collection.each(function(model){
            allKeys.push(model.keys());    
        });

        uniqKeys = _.uniq(_.flatten(allKeys));

        return uniqKeys;

    },

    render: function() {
        this.$el.html( this.template() );

        var headingView = new HeadingView({model: this.buildHeader()});
        this.$("thead").append(headingView.render().el);

        // for each item in the collection, create an single row
        this.collection.each( this.appendView );

        return this;
    },
    // create a single row and append
    appendView: function(model) {
        var employeeView = new EmployeeView({model: model});
        this.$("tbody").append( employeeView.render().el );
    }


});


var CheckboxView = Backbone.View.extend({

    template: JST["checkbox"],

    render: function() {
         this.$el.html( this.template( this.model ) );
         return this;
     }
 });

var CheckboxesView = Backbone.View.extend({

    template: JST["checkboxes"],

    events: {
        "change input[type='checkbox']" : "onCheck"
    },

    renderData: function() {
        var allDepts = [];
        var uniqDepts =[];

        allDepts = this.collection.pluck("Dept");

        uniqDepts = _.uniq(allDepts, function(dept) {
            return JSON.stringify(dept);
        });

        return uniqDepts;

    },

    render: function() {
       this.$el.html( this.template() );
 

        _.each(this.renderData(), function(model) {
            var checkboxView = new CheckboxView({model: model});
            this.$(".filters").append( checkboxView.render().el );
        });

        return this;
    },

    onCheck: function(e) {
        var checked = [];

        $node = this.$(e.currentTarget);

        $nodes = this.$("input");

        $nodes.each(function() {
            var $node = $(this);
            if( $node.is(":checked") ) {
                checked.push($node.data("name"));
            }
        });

        this.trigger("dept:filter", checked);
        
    }


});