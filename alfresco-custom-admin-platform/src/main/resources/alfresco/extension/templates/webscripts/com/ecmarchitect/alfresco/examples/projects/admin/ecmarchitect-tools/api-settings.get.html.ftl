<#include "/org/alfresco/repository/admin/admin-template.ftl" />

<@page title=msg("project-api-settings-console.title") readonly=true>
    <link rel="stylesheet" type="text/css" href="${url.context}/alfresco-custom-admin/css/api-settings.css" />
    <script type="text/javascript" src="${url.context}/alfresco-custom-admin/js/api-settings.js"></script>
    <div id="message" class="message hidden">Successfully saved values.
        <a href="#" onclick="this.parentElement.classList.add('hidden');" title="Close">[X]</a>
    </div>
    <form id="api-settings-form">
        <div class="column-full">
            <h2>${msg("project-api-settings-console.column")}</h2>
            <div class="section">
            </div>
            <div class="control text">
                <span class="label">ProjectsApiUrl:</span>
                <span class="value"><input id="projectsApiUrl" name="ecmarchitect:name=Projects|ProjectsApiUrl" value="${projectsApiUrl}" maxlength="255" tabindex="0"></span>
            </div>
        </div>
        <div class="submission buttons">
            <input type="button" value="Save" onclick="ECMArchAdmin.saveSettings()">
        </div>
    </form>
</@page>