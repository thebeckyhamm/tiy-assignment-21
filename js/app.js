var App = (function(){
    
    function App() {
        var allDepts;
        _.extend(this, Backbone.Events);

        this.allEmployees = new Employees();

        this.filteredEmployees = new Employees();

        this.allEmployees.on("add remove", function(employee){
            this.employeeView = new EmployeeView({model: employee});
            $("tbody").append(this.employeeView.render().el);
        });

        this.allEmployees.fetch();




        // _.each(this.getDepartments, function(dept) {
        //     this.checkboxView = new CheckboxView({model: dept});
        //     console.log(this.checkboxView);
        //     $(".filters").append(checkboxView.render().el);
        // });
        // this.checkboxView = new CheckboxView({
        //     model: this.getDepartments()
        // });
        // // $(".filters").append(checkboxView.render().el);


        // this.listenTo(checkboxView, "refilter", function(checkedDept) {
        //     return checkedDept;
        // });
        



    }



    return App;

})();