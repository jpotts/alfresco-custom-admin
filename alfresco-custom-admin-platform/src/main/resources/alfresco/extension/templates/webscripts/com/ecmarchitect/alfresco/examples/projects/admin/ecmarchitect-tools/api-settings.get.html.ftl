<#include "/org/alfresco/enterprise/repository/admin/admin-template.ftl" />

<@page title=msg("project-api-settings-console.title") readonly=false>

    <div class="column-full">
        <@section label=msg("project-api-settings-console.column") />
        <#-- Example - Retrieve keys - which are attribute names - use to index into attribute hash -->
        <#-- You can index directly by attribute name e.g. <@control attribute=attributes["Subject"] /> -->
        <#list attributes?keys as a>
            <@control attribute=attributes[a] />
        </#list>
    </div>

</@page>