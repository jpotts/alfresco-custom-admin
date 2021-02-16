(function () {
    YAHOO.Bubbling.fire("registerAction",
        {
            actionName: "onActionGetProjects",
            fn: function ecmarchitect_onActionGetProjects(file) {
                this.modules.actions.genericAction(
                    {
                        success: {
                            callback: {
                                fn: function ecmarchitect_onActionGetProjectsSuccess(response) {
                                    var promptText = "<b>Projects:</b> ";
                                    var projects = "";
                                    for (var i = 0; i < response.json.length; i++) {
                                        projects = projects + response.json[i].projectName + " (" +
                                                   response.json[i].projectId + ")<br/>";
                                    }
                                    Alfresco.util.PopupManager.displayPrompt(
                                        {
                                            title: this.msg("ecmarchitect.doclib.action.getProjects.msg.title"),
                                            text: promptText + projects,
                                            noEscape: true,
                                            buttons: [
                                                {
                                                    text: this.msg("button.ok"),
                                                    handler: function ecmarchitect_onActionGetProjectsSuccess_success_ok() {
                                                        this.destroy();
                                                    },
                                                    isDefault: true
                                                }]
                                        });

                                },
                                scope: this
                            }
                        },
                        failure: {
                            message: this.msg("ecmarchitect.doclib.action.getProjects.msg.failure",
                                file.displayName, Alfresco.constants.USERNAME)
                        },
                        webscript: {
                            name: "ecmarchitect/projects?nodeRef={nodeRef}",
                            stem: Alfresco.constants.PROXY_URI,
                            method: Alfresco.util.Ajax.GET,
                            params: {
                                nodeRef: file.nodeRef
                            }
                        },
                        config: {}
                    });
            }
        });
})();