var Employee = Backbone.Model.extend({});

var Employees = Backbone.Collection.extend({
    url: "js/data.json",
    model: Employee
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


var Row = (function(){

    var template = JST["tr"];

    function Row(model) {
        this.model = model;
        this.$tbody = $("tbody");
    };

    Row.prototype = {

        render: function() {
            return this.$tbody.append( template(this.model.toJSON()) );
        }
    };

    return Row;
})();


var employees = new Employees();


$(function(){

    employees.on("add", function(employee) {
        var row = new Row(employee);
        row.render();
    });

    employees.fetch().done(function() {
        var allKeys = [], uniqKeys;

        employees.each(function(employee) {
            allKeys.push(employee.keys());
        });

        uniqKeys = _.uniq(_.flatten(allKeys));

        var heading = new Heading(uniqKeys);
        heading.render();
    });

});