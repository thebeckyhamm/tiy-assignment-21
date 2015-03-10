var EmployeeModel = Backbone.Model.extend({});

var EmployeesCollection = Backbone.Collection.extend({
    url: "js/data.json",
    model: EmployeeModel
});
