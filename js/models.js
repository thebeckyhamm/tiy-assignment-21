var EmployeeModel = Backbone.Model.extend({});

var EmployeesCollection = Backbone.Collection.extend({
    url: "js/data.json",
    model: EmployeeModel
});

var DeptModel = Backbone.Model.extend({});

var DepartmentsCollection = Backbone.Collection.extend({
    model: DeptModel
});