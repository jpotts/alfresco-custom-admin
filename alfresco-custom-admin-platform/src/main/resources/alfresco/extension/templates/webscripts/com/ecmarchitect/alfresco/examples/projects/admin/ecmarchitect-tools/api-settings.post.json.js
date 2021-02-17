var obj = JSON.parse(json.toString());
var projectsApiUrl = obj.projectsApiUrl;
logger.log('URL: ' + projectsApiUrl);

ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
projectService = ctxt.getBean('project-service', Packages.com.ecmarchitect.alfresco.examples.projects.services.ProjectService);
projectService.setProjectsApiUrl(projectsApiUrl);

model.projectsApiUrl = projectsApiUrl;