var App = (function(){
    
    function App() {
        // allow the App to understand events
        _.extend(this, Backbone.Events);

        // make 2 collections: one with all, and one with filtered
        this.allEmployees = new EmployeesCollection();
        this.filteredEmployees = new EmployeesCollection();

        // create a new collection view and pass it the filtered employees
        // don't render yet since the data hasn't been fetched
        this.employeeCollectionView = new EmployeeCollectionView({
            collection: this.filteredEmployees,
            // render it on the existing .table div
            el: $(".table")
        });

        // create a new collection view for the checkboxes and pass it
        // all employees (we don't want few filters after being filtered)
        this.checkboxesView = new CheckboxesView({
            collection: this.allEmployees,
            el: $(".checkboxes")
        });

        // fetch the data
        this.allEmployees.fetch().done(function() {
            // after fetching, reset all the models in filteredEmployees
            this.filteredEmployees.reset(this.allEmployees.models);
            // render the employee collection now that data exists
            this.employeeCollectionView.render();
            // render checkboxes too
            this.checkboxesView.render();
            // bind is used to make this available to the function
        }.bind(this));

        // listens to the checkboxes view for the dept:filter event
        // passes the checked departments
        // filters the data to just those that contain the checked depts
        this.listenTo(this.checkboxesView, "dept:filter", function(checkedDepts) {
            var newModels = this.allEmployees.filter(function(model) {
                return _.contains(checkedDepts, model.get("Dept").Name)
            });
            // reset the filtered models on filtered employees
            this.filteredEmployees.reset(newModels);

        });


    }



    return App;

})();