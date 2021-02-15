package com.ecmarchitect.alfresco.examples.projects.services;

import com.ecmarchitect.alfresco.examples.projects.model.Project;
import com.ecmarchitect.alfresco.examples.projects.model.ProjectResults;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jpotts, Metaversant on 2/15/21.
 */
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

    public void setProjectsApiUrl(String projectsApiUrl) {
        this.projectsApiUrl = projectsApiUrl;
    }
}
