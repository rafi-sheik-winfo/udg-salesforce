const LS = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({ [key]: val }),
    removeItem: keys => chrome.storage.local.remove(keys),
    clear: () => chrome.storage.local.clear(),
};
if (document.referrer.includes('force.com')){
$(document).ready(async function () {
    var globalobj = {

        "SCRIPT METADATA ID": "",
        "SCRIPT ID1": "",
        "SCRIPT NUMBER1": "",
        "LINE NUMBER": "",
        "STEP DESCRIPTION": "",
        "INPUT PARAMETER": "",
        "INPUT VALUE": "",
        "ACTION": ""
    };
    let documentClickAchieved = false;
    var duplicateData = [];
    var hasNumber = /\d/;
    var header1 = await LS.getItem("header1")
    var header2 = await LS.getItem("header2")

    /*
     *  When we click on any element on the oracle cloud fusion instance
        Then this function get Triggered 
    */
    document.onmouseup = async function (e) {
        documentClickAchieved = true;
        await watsScripter(e);
    }
    // $('input').on('click', async function (e) {
    //     if (!documentClickAchieved) {
    //         alert('Hello');
    //         await watsScripter(e);
    //     }
    //     documentClickAchieved = false;
    // });

    // $('input').click(function (e) {
    //     if (!documentClickAchieved) {
    //         watsScripter(e);
    //     }
    //     console.log('input', e.target);
    //     documentClickAchieved = true;
    // });

    // $('a').click(function (e) {
    //     if (!documentClickAchieved) {
    //         watsScripter(e);
    //     }
    //     console.log('input', e.target);
    //     documentClickAchieved = true;
    // });

    

    async function watsScripter(e) {
        debugger;
        let curStatus = await LS.getItem('wats-status');

        if (curStatus === 'start' || curStatus === 'resume') {
            let currObject = $.extend({}, globalobj);
            let action = getActions(e);
            let description = getStepDescription(e, action);
            let param1 = getHeader(e);
            let param2 = getParamTwo(e);
            let inputValue = getInputValue(e, action);
            console.log(action, description, param1, param2, inputValue);

            currObject["INPUT PARAMETER"] =  param1 ? param1+ '>' +param2 : param2 ; 
            currObject["STEP DESCRIPTION"] = description + param2;
            currObject["INPUT VALUE"] = inputValue;
            currObject["ACTION"] = action;

            console.log(currObject);
            //Define the element we wish to bind to.
            var bind_to = ':input';

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

            chrome.runtime.sendMessage({
                "action": "addAction",
                "data": currObject
            });

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

    function getParamTwo(e) {
        debugger;
        let paramTwo = ''
        if ($(e.target).text().trim() !== '' && $(e.target).text().trim().length < 50) {
            paramTwo = $(e.target).text().trim();
        } else if ($(e.target).prop('title') !== undefined && $(e.target).prop('title') !== '') {
            paramTwo = $(e.target).prop('title');
        } else if ($(e.target).children('span').text().trim() !== '' && $(e.target).children('span').text().trim().length < 50) {
            paramTwo = $(e.target).children('span').text().trim();
        } else if ($(e.target).parents('*:has("label")').first().find('label').first().text() !== '' && $(e.target).parents('*:has("label")').first().find('label').first().text().length < 50) {
            paramTwo = $(e.target).parents('*:has("label")').first().find('label').first().text();
        }

        return paramTwo;
    }

    function getHeader(e) {
        debugger;
        let header = ''
        if ($(e.target).parents('div:has("h1,h2,h3,h4,h5")').first().find('h1,h2,h3,h4,h5').text() !== undefined && $(e.target).parents('div:has("h1,h2,h3,h4,h5")').first().find('h1,h2,h3,h4,h5').text().length < 50) {
            header = $(e.target).parents('div:has("h1,h2,h3,h4,h5")').first().find('h1,h2,h3,h4,h5').text();
        }
    }

    function getActions(e) {
        debugger;
        let actionName = '';
        if ($(e.target).attr('id') === 'Login' && $(e.target).attr('type') === 'submit') {
            actionName = "Login into Application";
        } else if ($(e.target).attr("class") !== undefined && $(e.target).attr("class").includes("logout") && $(e.target).text().trim() === "Log Out") {
            actionName = "Logout";
        } else if ($(e.target).prop('tagName') === "INPUT" && $(e.target).prop('type') === "button" || (($(e.target).prop('tagName') === 'SPAN' && $(e.target).parent().prop('tagName') === 'BUTTON') || ($(e.target).prop('tagName') === 'BUTTON') || ($(e.target).prop('tagName') === "A" && $(e.target).prop('role') === 'BUTTON'))) {
            actionName = "clickButton";
        } else if (($(e.target).prop("tagName") === "SPAN" && $(e.target).parent().prop("tagName") === "A") || ($(e.target).prop("tagName") === "A" && $(e.target).attr('role') === 'option')) {
            actionName = "clickLink";
        } else if ($(e.target).prop('tagName') === 'TEXTAREA') {
            actionName = 'textarea';
        } else if (($(e.target).prop("tagName") === 'DIV' && $(e.target).children('lightning-icon').length === 1) || e.target.nodeName === 'IMG' || e.target.nodeName === 'SVG'
            || ($(e.target).prop('tagName') === 'SPAN' && $(e.target).prop('class') !== undefined && $(e.target).prop('class').includes('icon'))) {
            actionName = 'clickImage';
            if ($(e.target).prop)
        } else if ($(e.target).prop("tagName") === "INPUT" && $(e.target).prop('type') === 'text') {
            actionName = 'sendKeys';
            if ($(e.target).prop("name")!== undefined && $(e.target).prop("name").includes("Date")){
            actionName = 'SendKeysDate';
        }
        
        } else if ($(e.target).prop('tagName') === 'SELECT') {
            actionName = 'selectByText';
        } else if (($(e.target).prop('tagName') === 'IMG' && $(e.target).prop('class') !== undefined && $(e.target).prop('class').includes('check')) || ($(e.target).prev().prop("type") === "checkbox")) {
            actionName = 'checkbox';
        } else if ($(e.target).prop("tagName") === "A" && $(e.target).parent().prop("tagName") === "SPAN" && $(e.target).parent().parent().prop("tagName") === "TD"){
            actionName = 'clickTableLink';
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

    }

    document.onkeyup = async function (e) {
        //Todo
    }

    document.oncopy = async function (e) {
        let currObject = $.extend({}, globalobj);
        let action = getActions(e);
        let description = getStepDescription(e, action);
        let param1 = getHeader(e);
        let param2 = getParamTwo(e);
        let inputValue = getInputValue(e, action)
        console.log(action, description, param1, param2);
    }

    document.onpaste = async function (e) {
        let currObject = $.extend({}, globalobj);
        let action = getActions(e);
        let description = getStepDescription(e, action);
        let param1 = getHeader(e);
        let param2 = getParamTwo(e);
        let inputValue = getInputValue(e, action)
        console.log(action, description, param1, param2);
    }

});

$(document.body).on('change', ':input', function (e) {
        console.log('It got Catched');
    })
}