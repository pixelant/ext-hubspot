(function() {
    document.addEventListener('readystatechange', function(e) {
        if (document.readyState === 'interactive') {
            loadHubspotForms();
        }
    });
    function loadHubspotForms() {
        var script = document.createElement("script");
        script.src = '//js.hsforms.net/forms/v2.js';
        if (typeof window.usercentrics !== 'undefined') {
            script.type = 'text/plain';
            script.dataset.usercentrics = 'HubSpot Forms';
        }
        document.head.appendChild(script);
    }

    window.addEventListener('load', function () {
        const hubspotFormContainers = document.querySelectorAll('.t3js-hubspot-form');
        Array.from(hubspotFormContainers).forEach(function (container) {
            const disableCss = parseInt(container.dataset.disableCss || 1, 10) === 1;
            const portalId = container.dataset.portalId;
            const formId = container.dataset.formId;
            if (portalId && formId) {
                const options = {
                    portalId: portalId,
                    formId: formId,
                    target: '#' + container.id,
                    onFormReady: function () {
                        const messageElement = document.querySelector("#hubspot-form-message");
                        messageElement.parentElement.removeChild(messageElement);
                    }
                };
                if (disableCss) {
                    options.css = '';
                }
                hbspt.forms.create(options);
            } else {
                console.log('Please validate your HubSpot Portal-ID and Form-ID.')
            }
        });
    });

})();
