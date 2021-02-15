package com.ecmarchitect.alfresco.examples.projects.webscripts;

import com.ecmarchitect.alfresco.examples.projects.model.Project;
import com.ecmarchitect.alfresco.examples.projects.services.ProjectService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.extensions.webscripts.AbstractWebScript;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.extensions.webscripts.WebScriptResponse;

import java.io.IOException;
import java.util.List;

/**
 * Created by jpotts, Metaversant on 2/15/21.
 */
public class GetProjects extends AbstractWebScript {

    @Autowired
    ProjectService projectService;

    ObjectMapper mapper = new ObjectMapper();

    @Override
    public void execute(WebScriptRequest webScriptRequest, WebScriptResponse webScriptResponse) throws IOException {
        try {
            List<Project> projects = projectService.getProjects();

            // Return the list of projects
            String json = mapper.writeValueAsString(projects);
            webScriptResponse.setContentType("application/json");
            webScriptResponse.getWriter().write(json);
        } catch (Exception e) {
            throw new IOException("Error invoking project service: " + e.getMessage());
        }
    }

    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }
}
