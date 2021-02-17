<import resource="classpath:alfresco/enterprise/webscripts/org/alfresco/enterprise/repository/admin/admin-common.lib.js">

/*
    In Alfresco Enterprise, the above import is different and you can just call Admin.initModel.
    But in Community Edition, we have to do more work to grab the Project Service bean.
*/
Admin.initModel(
    "ecmarchitect:name=Projects",
    ["ProjectsApiUrl"],
    "ecmarchitect-projects"
);
