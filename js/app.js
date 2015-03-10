var App = (function(){
    
    function App() {
        _.extend(this, Backbone.Events);

        this.allEmployees = new EmployeesCollection();

        this.filteredEmployees = new EmployeesCollection();

        this.employeeCollectionView = new EmployeeCollectionView({
            collection: this.filteredEmployees,
            el: $(".table")
        }).render();

        this.checkboxesView = new CheckboxesView({
            collection: this.allEmployees,
            el: $(".checkboxes")
        });

        var app = this;

        this.allEmployees.fetch().done(function() {
            this.filteredEmployees.reset(this.allEmployees.models);
            this.checkboxesView.render();
        }.bind(this));


        this.listenTo(this.checkboxesView, "dept:filter", function(checkedDepts) {
            var newModels = this.allEmployees.filter(function(model) {
                return _.contains(checkedDepts, model.get("Dept").Name)
            });

            this.filteredEmployees.reset(newModels);

        });


    }



    return App;

})();