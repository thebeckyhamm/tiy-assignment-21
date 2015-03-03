var Employee = Backbone.Model.extend({});

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


$(function(){

    $.ajax("js/data.json").done(function(data) {
        var models = [];
        var allKeys = [];
        var uniqKeys;


        // make new employees, add them to the model,
        // and render each row per employee
        _.each(data, function(datum) {
            var employee = new Employee(datum);
            models.push(employee);

            var row = new Row(employee);
            row.render();
        });


        // push all keys to an array,
        // flatten and uniq it,
        _.each(models, function(employee) {
            allKeys.push(employee.keys());
        });
        uniqKeys = _.uniq(_.flatten(allKeys));
        
        // then render the heading with
        // the uniq keys
        var heading = new Heading(uniqKeys);
        heading.render();

        
    });
});