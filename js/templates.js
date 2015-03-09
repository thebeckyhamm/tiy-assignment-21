this["JST"] = this["JST"] || {};
this["JST"]["checkbox"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<label>\n    <input type=\"checkbox\">&emsp;<span class=\"fa fa-"
    + escapeExpression(((helper = (helper = helpers.Icon || (depth0 != null ? depth0.Icon : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Icon","hash":{},"data":data}) : helper)))
    + "\"></span>&emsp;"
    + escapeExpression(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Name","hash":{},"data":data}) : helper)))
    + "\n</label>\n";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["th"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<th>"
    + escapeExpression(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"key","hash":{},"data":data}) : helper)))
    + "</th>";
},"useData":true});
this["JST"] = this["JST"] || {};
this["JST"]["tr"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "    <td>"
    + escapeExpression(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Name","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + escapeExpression(((helper = (helper = helpers.Role || (depth0 != null ? depth0.Role : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Role","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + escapeExpression(((helper = (helper = helpers.Manager || (depth0 != null ? depth0.Manager : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Manager","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + escapeExpression(((helper = (helper = helpers.Phone || (depth0 != null ? depth0.Phone : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Phone","hash":{},"data":data}) : helper)))
    + "</td>\n    <td><span class=\"fa fa-"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.Dept : depth0)) != null ? stack1.Icon : stack1), depth0))
    + "\"></span>&emsp;"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.Dept : depth0)) != null ? stack1.Name : stack1), depth0))
    + "</td>\n";
},"useData":true});