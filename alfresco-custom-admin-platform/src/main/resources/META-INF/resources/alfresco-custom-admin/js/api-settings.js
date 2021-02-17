var ECMArchAdmin = {};

(function()
{
    ECMArchAdmin.request = function(config) {
        var req = new XMLHttpRequest();
        var data = config.data || {};
        if (req.overrideMimeType) req.overrideMimeType((config.responseContentType ? config.responseContentType : "application/json") + "; charset=utf-8");
        req.open(config.method ? config.method : "GET", config.url);
        if ((config.method === "POST" || config.method === "PUT") && Admin.CSRF.enabled) {
            req.setRequestHeader(Admin.CSRF.getHeader(), Admin.CSRFToken());
        }
        req.setRequestHeader("Accept", config.responseContentType ? config.responseContentType : "application/json");
        req.setRequestHeader("Content-type", config.requestContentType ? config.requestContentType : "application/json");
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    // success - call handler
                    if (config.fnSuccess) {
                        var json;
                        try {
                            json = !config.responseContentType || config.responseContentType === "application/json" ? JSON.parse(req.responseText) : null;
                        } catch (e) {
                            // Developer JSON response error (e.g. malformed response text)
                            alert(e + "\n" + req.status + "\n" + req.responseText);
                        }
                        config.fnSuccess.call(this, {
                            responseText: req.responseText,
                            responseStatus: req.status,
                            responseJSON: json
                        });
                    }
                } else {
                    // failure - call handler
                    if (config.fnFailure) {
                        config.fnFailure.call(this, {
                            responseText: req.responseText,
                            responseStatus: req.status
                        });
                    } else {
                        // default error handler
                        alert("We couldn't complete your request. Try again.\n\n" + req.responseText + "\n\n" + req.responseStatus);
                    }
                }
            }
        };
        if (config.method === "POST" || config.method === "PUT") {
            // TODO: support form url encoded
            req.send(JSON.stringify(data));
        } else {
            req.send(null);
        }
    }

    ECMArchAdmin.onSuccess = function(response) {
        var messageEl = document.getElementById("message");
        if (messageEl) {
            messageEl.classList.remove("hidden");
        }
    }

    ECMArchAdmin.onFailure = function(response) {
        alert("Failure saving settings");
    }

    ECMArchAdmin.saveSettings = function() {
        var config = {
            method: "POST",
            url: "/alfresco/s/ecmarchitect/api-settings",
            data: {
                projectsApiUrl: document.getElementById("projectsApiUrl").value
            },
            requestContentType: "application/json",
            responseContentType: "application/json",
            fnSuccess: this.onSuccess,
            fnFailure: this.onFailure
        };
        this.request(config); // Use our own request func instead of the one in Admin due to content-type bug
    }
}());