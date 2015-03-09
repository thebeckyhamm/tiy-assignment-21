var Employee = Backbone.Model.extend({});

var Employees = Backbone.Collection.extend({
    url: "js/data.json",
    model: Employee
});


var Dept = Backbone.Model.extend({});
var Departments = Backbone.Collection.extend({
    model: Dept
});

var FilteredEmployees = Employees.extend({});


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

    template: JST["filter"],

    events: {
        "click [type='checkbox']" : "updateCollection"
    },

    initialize: function() {
        this.listenTo(this.model, "change", function() {
            this.render();
        });
    },

    render: function() {
         this.$el.html( this.template(this.model.toJSON()) );
         return this;
     },

     updateCollection: function() {
        var checkedDept = this.model.get("Name");
        //alert("we want to filter " + checkedDept);
        //console.log(checkedDept);
        this.trigger("refilter", checkedDept);
     }

 });

var employees = new FilteredEmployees();

// get checkedDept from Filter view to employees, 
// filter on that for the right objects


$(function(){


    employees.on("refilter", function(checkedDept) {
        alert(checkedDept);
        // employees.filter(function(employee) {
        //     return checkedDept === employee.Dept.Name;
        // });
        // console.log(employees);
    });


    employees.on("add remove", function(employee) {
        var row = new Row({model: employee});
        $("tbody").append(row.render().el);
    });

    employees.fetch().done(function() {
        var allKeys = []
        var uniqKeys;
        var allDepts = [];


        employees.each(function(employee) {
            allKeys.push(employee.keys());
        });
        uniqKeys = _.uniq(_.flatten(allKeys));

        var heading = new Heading(uniqKeys);
        heading.render();




        allDepts = employees.pluck("Dept");
        // found this on stack overflow
        allDepts = _.uniq(allDepts, function(dept){
            return JSON.stringify(dept);
        });

        var depts = new Departments(allDepts);

        depts.each(function(dept) {
            var filter = new Filter({model: dept});
            $(".filters").append(filter.render().el);
        });

    });

});