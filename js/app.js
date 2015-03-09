var App = (function(){
    
    function App() {
        _.extend(this, Backbone.Events);

        this.allEmployees = new Employees();

        this.filteredEmployees = new Employees();

        this.allEmployees.on("add remove", function(employee){
            this.employeeView = new EmployeeView({model: employee});
            $("tbody").append(this.employeeView.render().el);
        });

        this.allEmployees.fetch().done(function(data){
            var allDepts;
            var allKeys = [];
            this.data = data;

            _.each(this.data, function(employee) {
                allKeys.push(_.keys(employee));    
            });
            uniqKeys = _.uniq(_.flatten(allKeys));

            var heading = new HeadingView({ model:uniqKeys});
            $("thead").html(heading.render().el);



            allDepts = _.pluck(this.data, "Dept");
            // found this on stack overflow
            allDepts = _.uniq(allDepts, function(dept){
                return JSON.stringify(dept);
            });

            var depts = new Departments(allDepts);

            depts.each(function(dept) {
                var checkboxView = new CheckboxView({model: dept});
                $(".filters").append(checkboxView.render().el);

            });











        });




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