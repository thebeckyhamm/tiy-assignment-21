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
            console.log(newModels);

            this.filteredEmployees.reset(newModels);

        });



        // var models = app.allEmployees.filter(function(model) {
        //   return model.get("Dept").Name === "Corp";
        // });
        // undefined
        // models.length
        // 2
        // app.filteredEmployees.reset(models);
        // [child, child]

        //remove this
        // this.filteredEmployees.on("add", function(employee){
        //     this.employeeCollectionView = new EmployeeCollectionView({model: employee});
        //     $("tbody").append(this.employeeView.render().el);
        // });

        //this.filteredEmployees.on("reset", this.employeeGridView.render);


        // .done(function(data){
        //     var allDepts;
        //     var allKeys = [];
        //     this.data = data;

        //     this.filteredEmployees.set(this.allEmployees.models);

        //     // get the unique keys for the heading row
        //     _.each(this.data, function(employee) {
        //         allKeys.push(_.keys(employee));    
        //     });
        //     uniqKeys = _.uniq(_.flatten(allKeys));

        //     // create the heading row
        //     var heading = new HeadingView({ model:uniqKeys});
        //     $("thead").html(heading.render().el);


        //     // get the unique departments
        //     allDepts = _.pluck(this.data, "Dept");
        //     // found this on stack overflow
        //     allDepts = _.uniq(allDepts, function(dept){
        //         return JSON.stringify(dept);
        //     });

        //     var depts = new Departments(allDepts);

        //     // create each checkbox for each department
        //     // but now i don't have access to checkboxView
        //     // except in here.
        //     depts.each(function(dept) {
        //         var checkboxView = new CheckboxView({model: dept});
        //         $(".filters").append(checkboxView.render().el);

        //     });

            
        //     // this.listenTo(checkboxes, "dept:change", function(selectedDepts){
        //     //     this.filtertedCollection.set(this.maincollection.filter(function(model){
        //     //         return _.contains(selectedDepth, model.get("dept"));
        //     //     }));
        //     // })

        //}.bind(this));





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