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

    initialize: function() {
        this.listenTo(this.model, "add remove", this.render);
     },

    render: function() {
        this.$el.append( this.template(this.model.toJSON()) );
        return this;
    }

});


var CheckboxView = Backbone.View.extend({

    template: JST["checkbox"],

    events: {
        "click [type='checkbox']" : "_updateCollection"
    },

    initialize: function() {
        this.listenTo(this.model, "change", function() {
            this.render();
        });
    },

    render: function() {
         this.$el.html( this.template( this.model.toJSON() ) );
         return this;
     },

     _updateCollection: function() {
        var checkedDept = this.model.get("Name");
        this.trigger("refilter", checkedDept);
     }

 });