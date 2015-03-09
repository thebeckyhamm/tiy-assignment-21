var Employee = Backbone.Model.extend({});

var Employees = Backbone.Collection.extend({
    url: "js/data.json",
    model: Employee
});

var Dept = Backbone.Model.extend({});

var Departments = Backbone.Collection.extend({
    model: Dept
});