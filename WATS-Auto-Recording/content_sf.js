const LS = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({ [key]: val }),
    removeItem: keys => chrome.storage.local.remove(keys),
    clear: () => chrome.storage.local.clear(),
};
if (document.referrer.includes('force.com')) {
    $(document).ready(async function () {
        let globalobj = {

            "SCRIPT METADATA ID": "",
            "SCRIPT ID1": "",
            "SCRIPT NUMBER1": "",
            "LINE NUMBER": "",
            "STEP DESCRIPTION": "",
            "INPUT PARAMETER": "",
            "INPUT VALUE": "",
            "ACTION": ""
        };
        // let documentClickAchieved = false;
        let duplicateData = [];
        let hasNumber = /\d/;
        let header1 = await LS.getItem("header1")
        let header2 = await LS.getItem("header2")

        /*
         *  When we click on any element on the sales force instance
            Then this function get Triggered 
        */
        document.onmousedown = async function (e) {
            let curStatus = await LS.getItem('wats-status');
            if (e.button === 0)
                watsScripter(e, curStatus);
        }

        function watsScripter(e, curStatus) {
            debugger;

            if (curStatus === 'start' || curStatus === 'resume') {
                let currObject = $.extend({}, globalobj);
                let action = getActions(e);
                let description = getStepDescription(e, action);
                let param1 = getHeader(e);
                let param2 = getParamTwo(e, action);
                let inputValue = getInputValue(e, action);
                currObject["INPUT PARAMETER"] = param1 ? param1 + '>' + param2 : param2;
                currObject["STEP DESCRIPTION"] = description + param2;
                currObject["INPUT VALUE"] = inputValue;
                currObject["ACTION"] = action;
                if (action === 'Logout') {
                    currObject["INPUT PARAMETER"] = ''
                    currObject["STEP DESCRIPTION"] = 'Click Logout';
                    currObject["INPUT VALUE"] = '';
                }
                duplicateLogic();
                console.log(currObject);

                //Define the element we wish to bind to.
                let bind_to = ':input';


                if (($(e.target).prop('tagName') === 'SPAN' && $(e.target).prop('class') === 'slds-truncate')
                    || ($(e.target).text().length > 50) || ($(e.target).prop('tagName') === 'A' && $(e.target).prop('role') === 'option')) {
                    currObject = undefined;
                }
                if (currObject !== undefined && currObject['INPUT PARAMETER'] !== undefined) {
                    duplicateData.push(currObject);
                    console.log(duplicateData);
                }
                // Prevent double-binding.
                $(document.body).off('change', bind_to);
                // Bind the event to all body descendants matching the "bind_to" selector.
                $(document.body).on('change', bind_to, function (e) {
                    currObject["INPUT VALUE"] = $(e.target).val();
                    chrome.runtime.sendMessage({
                        "action": "addAction",
                        "data": currObject
                    });
                });



                if (currObject !== undefined) {
                    chrome.runtime.sendMessage({
                        "action": "addAction",
                        "data": currObject
                    });
                }


            }

        }

        function getInputValue(e, actions) {
            if (actions === 'sendKeys') {
                return $(e.target).val();
            } else if (actions === 'selectByText') {
                return $(e.target).find(':selected').text();
            } else if (actions === 'checkBox') {
                if (!$(e.target).parent().prev().text().test(hasNumber) || $(e.target).parent().prev().text() !== '') {
                    return $(e.target).parent().prev().text().trim();
                } else {
                    return $(e.target).parents('td').first().next().text();
                }
            }
        }

        function getParamTwo(e, action) {
            debugger;
            let paramTwo = ''

            if ($(e.target).prop('title') !== undefined && $(e.target).prop('title') !== '') {
                paramTwo = $(e.target).prop('title');
            } else if ($(e.target).children('span').text().trim() !== '' && $(e.target).children('span').text().trim().length < 50) {
                paramTwo = $(e.target).children('span').text().trim();
            } else if ($(e.target).parent().siblings('label').first().text() !== '') {
                paramTwo = $(e.target).parent().siblings('label').first().text();
            } else if ($(e.target).parents('label').first().text() !== '') {
                paramTwo = $(e.target).parents('label').first().text().trim();
            } else if ($(e.target).text().trim() !== '' && $(e.target).text().trim().length < 50) {
                paramTwo = $(e.target).text().trim();
            }

            if (action === 'DatePicker' || action === 'SendKeys' || action === 'checkbox' || paramTwo === '' || action === "selectByText" || action === 'paste' || action === 'copy') {
                if ($(e.target).parents('*:has("label")').first().find('label').first().text() !== '' && $(e.target).parents('*:has("label")').first().find('label').first().text().length < 50) {
                    paramTwo = $(e.target).parents('*:has("label")').first().find('label').first().text();
                }
            }

            return paramTwo;
        }

        function getHeader(e) {
            debugger;
            let header = ''
            if ($(e.target).parents('div:has("h2")').first().find('h2').text() !== undefined && $(e.target).parents('div:has("h2")').first().find('h2').text() !== '') {
                header = $(e.target).parents('div:has("h2")').first().find('h2').text().trim();
            } else if ($(e.target).parents('div:has("h1,h2,h3,h4,h5")').first().find('h1,h2,h3,h4,h5').text() !== undefined && $(e.target).parents('div:has("h1,h2,h3,h4,h5")').first().find('h1,h2,h3,h4,h5').text().length < 50) {
                header = $(e.target).parents('div:has("h1,h2,h3,h4,h5")').first().find('h1,h2,h3,h4,h5').text();
            }
            return (header.length < 50) ? header : undefined;
        }

        function getActions(e) {
            debugger;
            let actionName = '';
            if ($(e.target).attr('id') === 'Login' && $(e.target).attr('type') === 'submit') {
                actionName = "Login into Application";
            } else if ($(e.target).attr("class") !== undefined && $(e.target).attr("class").includes("logout") && $(e.target).text().trim() === "Log Out") {
                actionName = "Logout";
            } else if (($(e.target).prop('tagName') === "INPUT" && $(e.target).prop('type') === "button") || (($(e.target).prop('tagName') === 'SPAN' && $(e.target).parent().prop('tagName') === 'BUTTON') || ($(e.target).prop('tagName') === 'BUTTON' && $(e.target).attr('aria-haspopup') !== 'listbox')
                || ($(e.target).prop('tagName') === "A" && $(e.target).prop('role') === 'BUTTON')) || ($(e.target).prop('type') === 'button' && $(e.target).prop('tagName') === 'BUTTON' && $(e.target).attr('aria-haspopup') !== 'listbox')
                || ($(e.target).prop('tagName') === 'DIV' && $(e.target).parent().prop('tagName') === 'A' && $(e.target).parent().prop('role') === 'button')) {
                actionName = "clickButton";
            } else if (($(e.target).prop("tagName") === "SPAN" && $(e.target).parent().prop("tagName") === "A") || ($(e.target).prop("tagName") === "A" && $(e.target).attr('role') === 'option')) {
                actionName = "clickLink";
            } else if ($(e.target).prop('tagName') === 'TEXTAREA') {
                actionName = 'textarea';
            } else if (($(e.target).prop("tagName") === 'DIV' && $(e.target).children('lightning-icon').length === 1) || e.target.nodeName === 'IMG' || e.target.nodeName === 'SVG'
                || ($(e.target).prop('tagName') === 'SPAN' && $(e.target).prop('class') !== undefined && $(e.target).prop('class').includes('icon'))
                || ($(e.target).prop('tagName') === 'SPAN' && $(e.target).parent().find('lightning-icon').length > 0)) {
                actionName = 'clikcImage';
            } else if ($(e.target).prop("tagName") === "INPUT" && $(e.target).prop('type') === 'text') {
                actionName = 'SendKeys';
                if ($(e.target).prop('name') !== undefined && $(e.target).prop('name').includes('Date')) {
                    actionName = 'DatePicker';
                }
            } else if (($(e.target).prop('tagName') === 'IMG' && $(e.target).prop('class') !== undefined && $(e.target).prop('class').includes('check')) || ($(e.target).prev().prop("type") === "checkbox") || $(e.target).prop('type') === 'checkbox') {
                actionName = 'checkbox';
            } else if ($(e.target).prop("tagName") === "A" && $(e.target).parent().prop("tagName") === "SPAN" && $(e.target).parent().parent().prop("tagName") === "TD") {
                actionName = 'clickTableLink';
            } else if ($(e.target).prop('tagName') === 'SPAN' && $(e.target).siblings('input').first().attr('type') === 'radio' || $(e.target).attr('type') === 'radio') {
                actionName = 'clickRadiobutton';
            }
            else if ($(e.target).prop('tagName') === 'SELECT' || $(e.target).attr('aria-haspopup') === 'listbox') {
                actionName = 'selectByText';
            }
            return actionName;

        }


        function getStepDescription(e, actions) {
            debugger;
            if (actions === 'sendKeys') {
                return 'Enter Value At ';
            } else if (actions === 'selectByText') {
                return 'Select Value At ';
            } else {
                return 'Click '
            }

        }

        //It will get The Normal Header For The Elements
        function getNormalHeader(e, header1, header2) {
            debugger;
        }

        function getSiblingHeader(e, header1, header2) {
            debugger;

        }

        function getTableHeader(e) {
            debugger;

        }

        function duplicateLogic() {
            debugger;
            if (duplicateData.length > 1) {
                let duplicateObj = duplicateData[duplicateData.length - 1]
                if (duplicateObj["INPUT PARAMETER"] === undefined) {
                    duplicateObj = duplicateData[duplicateData.length - 2]
                }
                let last_param = duplicateObj["INPUT PARAMETER"]
                if (last_param !== undefined) {
                    let last_param1 = last_param.split(">")[last_param.split(">").length - 1];
                    if (duplicateObj["ACTION"] == "DatePicker" || duplicateObj["ACTION"] == "SendKeys") {
                        let value = $('label:contains(' + last_param1 + ')').parent().find("input").first().val();
                        duplicateObj["INPUT VALUE"] = value;
                    }

                    chrome.runtime.sendMessage({
                        "action": "addAction",
                        "data": duplicateObj
                    });
                }

            }
        }

        document.onkeyup = async function (e) {
            //Todo
            console.log(e.key, '------>', e.which);
            if (e.ctrlKey && e.altKey && e.which == 80) {
                chrome.runtime.sendMessage({
                    "action": "setStatus",
                    "data": "pause"
                });
            } else if (e.ctrlKey && e.altKey && e.which == 82) {
                chrome.runtime.sendMessage({
                    "action": "setStatus",
                    "data": "resume"
                });

            } else if (e.ctrlKey && e.altKey && e.which == 67) {
                chrome.runtime.sendMessage({
                    "action": "clear"
                });

            }

            let currStatus = await LS.getItem('wats-status');
            if (currStatus === 'start' || currStatus === 'resume') {
                // for clear
                if (e.ctrlKey && e.which === 8) {
                    let currObject = $.extend({}, globalobj);
                    let action = getActions(e);
                    let description = getStepDescription(e, action);
                    let param1 = getHeader(e);
                    let param2 = getParamTwo(e);
                    let inputValue = getInputValue(e, action)
                    console.log(action, description, param1, param2);
                    currObject["INPUT PARAMETER"] = param1 ? param1 + '>' + param2 : param2;
                    currObject["STEP DESCRIPTION"] = 'Clear At ' + param2;
                    currObject["INPUT VALUE"] = inputValue;
                    currObject["ACTION"] = 'Clear';
                    chrome.runtime.sendMessage({
                        "action": "addAction",
                        "data": currObject
                    });
                }

                //for tab
                if (e.which === 9 && e.which !== 18) {
                    debugger;
                    let currObject = $.extend({}, globalobj);
                    currObject["ACTION"] = "tab";
                    currObject["STEP DESCRIPTION"] = "Click Tab";
                    duplicateLogic();
                    if (currObject) {
                        duplicateData.push(currObject);
                        chrome.runtime.sendMessage({
                            "action": "addAction",
                            "data": currObject
                        });
                    }
                }

                //for enter key
                if (e.which == 13) {
                    let currObject = $.extend({}, globalobj);
                    currObject["ACTION"] = "enter";
                    currObject["STEP DESCRIPTION"] = "Click Enter";
                    duplicateLogic();
                    if (currObject) {
                        duplicateData.push(currObject);
                        chrome.runtime.sendMessage({
                            "action": "addAction",
                            "data": currObject
                        });
                    }

                }
            }
        }

        document.oncopy = async function (e) {
            let currObject = $.extend({}, globalobj);
            let action = getActions(e);
            let description = getStepDescription(e, action);
            let param1 = getHeader(e);
            let param2 = getParamTwo(e);
            let inputValue = getInputValue(e, action)
            console.log(action, description, param1, param2);
            currObject["INPUT PARAMETER"] = param1 ? param1 + '>' + param2 : param2;
            currObject["STEP DESCRIPTION"] = 'Copy Value From ' + param2;
            currObject["INPUT VALUE"] = inputValue;
            currObject["ACTION"] = 'copy';
            chrome.runtime.sendMessage({
                "action": "addAction",
                "data": currObject
            });
        }

        document.onpaste = async function (e) {
            let currObject = $.extend({}, globalobj);
            let action = getActions(e);
            let param1 = getHeader(e);
            let param2 = getParamTwo(e);
            let inputValue = getInputValue(e, action)
            console.log(action, description, param1, param2);
            currObject["INPUT PARAMETER"] = param1 ? param1 + '>' + param2 : param2;
            currObject["STEP DESCRIPTION"] = 'Paste Value At ' + param2;
            currObject["INPUT VALUE"] = inputValue;
            currObject["ACTION"] = 'paste';
            chrome.runtime.sendMessage({
                "action": "addAction",
                "data": currObject
            });
        }

    });


}