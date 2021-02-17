<import resource="classpath:alfresco/templates/webscripts/org/alfresco/repository/admin/admin-common.lib.js">

/*
    In Alfresco Enterprise, the above import is different and you can just call Admin.initModel.
    But in Community Edition, we have to do more work to grab the Project Service bean.
*/
/*
Admin.initModel(
    "ecmarchitect:name=Projects",
    ["ProjectsApiUrl"],
    "ecmarchitect-projects"
);
*/

ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
projectService = ctxt.getBean('project-service', Packages.com.ecmarchitect.alfresco.examples.projects.services.ProjectService);

model.projectsApiUrl = projectService.getProjectsApiUrl();

model.tools = Admin.getConsoleTools("api-settings");
model.metadata = Admin.getServerMetaData();
