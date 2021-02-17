package com.ecmarchitect.alfresco.examples.projects.services;

import com.ecmarchitect.alfresco.examples.projects.model.Project;
import com.ecmarchitect.alfresco.examples.projects.model.ProjectResults;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.alfresco.service.namespace.NamespaceService;
import org.alfresco.service.namespace.QName;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jmx.export.annotation.ManagedAttribute;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.jmx.export.annotation.ManagedResource;

import java.util.List;

/**
 * Created by jpotts, Metaversant on 2/15/21.
 */
@ManagedResource
public class ProjectService {
    private final static Logger logger = LoggerFactory.getLogger(ProjectService.class);

    ObjectMapper mapper = new ObjectMapper();

    // Dependencies
    String projectsApiUrl;

    public List<Project> getProjects() throws Exception {
        // Invoke the projects API URL
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(projectsApiUrl);
        HttpResponse response = httpClient.execute(httpGet);
        int status = response.getStatusLine().getStatusCode();
        logger.info("Projects API response status code: " + status);
        ProjectResults projectResults = mapper.readValue(response.getEntity().getContent(), ProjectResults.class);

        return projectResults.getResults();
    }

    @ManagedAttribute( description = "URL where the projects API is hosted" )
    public String getProjectsApiUrl() {
        return this.projectsApiUrl;
    }

    @ManagedAttribute
    @ManagedOperation
    public void setProjectsApiUrl(String projectsApiUrl) {
        this.projectsApiUrl = projectsApiUrl;
    }
}
