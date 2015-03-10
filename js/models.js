
// individual employee
var EmployeeModel = Backbone.Model.extend({});

// pass in employee model and url
var EmployeesCollection = Backbone.Collection.extend({
    url: "js/data.json",
    model: EmployeeModel
});
