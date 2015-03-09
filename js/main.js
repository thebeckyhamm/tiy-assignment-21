


var employees = new Employees();


$(function(){





    employees.on("add remove", function(employee) {
        var row = new EmployeeView({model: employee});
        $("tbody").append(row.render().el);
    });


    employees.fetch().done(function() {
        var allKeys = []
        var uniqKeys;
        var allDepts = [];


        employees.each(function(employee) {
            allKeys.push(employee.keys());
        });
        uniqKeys = _.uniq(_.flatten(allKeys));

        var heading = new HeadingView({ model:uniqKeys});
        $("thead").html(heading.render().el);



        allDepts = employees.pluck("Dept");
        // found this on stack overflow
        allDepts = _.uniq(allDepts, function(dept){
            return JSON.stringify(dept);
        });

        var depts = new Departments(allDepts);

        depts.each(function(dept) {
            var checkboxView = new CheckboxView({model: dept});
            $(".filters").append(checkboxView.render().el);

            employees.listenTo(checkboxView, "refilter", function(checkedDept) {
                var newEmployees = employees.filter(function(employee) {
                    //console.log(employee.get("Dept").Name);
                    return checkedDept === employee.get("Dept").Name;
                });
                console.log(newEmployees);
            });
        });

    });

});