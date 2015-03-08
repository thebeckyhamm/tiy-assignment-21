var Employee = Backbone.Model.extend({});

var Employees = Backbone.Collection.extend({
    url: "js/data.json",
    model: Employee
});


var Dept = Backbone.Model.extend({});
var Departments = Backbone.Collection.extend({
    model: Dept
});

var FilteredEmployees = Employees.extend({


});


var Heading = (function() {

    var template = JST["th"];

    function Heading(data) {
        this.data = data;
        this.$tr = $("<tr />");
    };

    Heading.prototype = {

        mapping: function() {
            return _.map(this.data, function(value) {
                return {"key": value};
            });
        },

        render: function() {
            var app = this;

            var columnNames = app.mapping();
            _.each(columnNames, function(name) {
                app.$tr.append( template(name) );   
            });

            $("thead").html(app.$tr);
        }

    };

    return Heading;
})();

var Row = Backbone.View.extend({

    template: JST["tr"],
    tagName: "tr",

    initialize: function() {
       this.listenTo(this.model, "change", this.render);
     },

    render: function() {
        this.$el.append( this.template(this.model.toJSON()) );
        return this;
    }

});


var Filter = Backbone.View.extend({

//     template: JST["filter"],

//     render: function() {
//          this.$el.html( this.template(this.model.toJSON()) );
//          return this;
//      }

 });


var employees = new FilteredEmployees();


$(function(){


    employees.on("add", function(employee) {
        var row = new Row({model: employee});
        console.log(row);
        $("tbody").append(row.render().el);
    });

    employees.fetch().done(function() {
        var allKeys = []
        var uniqKeys;
        var depts = [];

        employees.each(function(employee) {
            allKeys.push(employee.keys());
        });

        uniqKeys = _.uniq(_.flatten(allKeys));

        var heading = new Heading(uniqKeys);
        heading.render();


        depts = employees.pluck("Dept");
        depts = _.uniq(depts);
        depts = _.map(depts, function(dept) {
            return {filter: dept};
        });

        // _.each(depts, function(dept){
        //     var filter = new Filter({model: dept});
        //     $(".filters").append(filter.render().el);
            
        // });


    });

});