const LS = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({[key]: val}),
    removeItem: keys => chrome.storage.local.remove(keys),
    clear : () => chrome.storage.local.clear(),
  };
$(document).ready(async function () {
    debugger;
    var isLogin = await LS.getItem("isLogin");
    var propData = "";
    var baseURL = "";
    $.get('properties.json', function (data) {
        propData = data;
        $(".groups").html("");
        for (var i = 0; i < data.groups.length; i++) {
            $(".group").append("<option>" + data.groups[i].name + "</option>");
        }
    });

    $('#showpassword').click(async function(){
        var toChange = $('.password').attr('type') !== 'text' ? 'text' : 'password' ;
        if (toChange !== 'text'){
            $('#showpassword').text('Show');
        } else {
            $('#showpassword').text('Hide');
        }
        $('.password').attr('type',toChange);
    });

    if (isLogin) {
        $(".loginView").hide();
        $(".btnView").show();
        baseURL = await LS.getItem("baseURL");

    } else {
        await LS.clear();
        $(".loginView").show();
        $(".btnView").hide();
        $(".loginBtn").click(async function () {
            debugger
            console.log("Login button")
            let group = $(".group").val();
            let userName = $(".userName").val();
            let password = $(".password").val();
            var logindata = {};
            if ($(".username").val()) {
                logindata.username = $(".username").val();
            } else {
                $('#alert').empty().show().html("Enter username");
                setTimeout(function () {
                    $("#alert").hide();
                }, 2000);
                return;

            }
            if ($(".password").val()) {
                logindata.password = $(".password").val();
            } else {
                $('#alert').empty().show().html("Enter password");
                setTimeout(function () {
                    $("#alert").hide();
                }, 2000);
                return;
            }
            let loginUrl = "";

            for (let i = 0; i < propData.groups.length; i++) {
                if (propData.groups[i].name == group) {
                    loginUrl = propData.groups[i].baseURL;
                }
            }

            $.ajax({
                type: "POST",
                cache: false,
                url: loginUrl + '/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                error: function (err) {

                    console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
                    $('#alert').empty().show().html("Please Check VPN/Internet");
                    setTimeout(function () {
                        $("#alert").hide();
                    }, 3000);
                },
                data: JSON.stringify(logindata),
                dataType: 'json',
                success: async function (response) {
                    console.log(response)
                    if (response.status == 200) {
                        console.log(response)
                        await LS.setItem("isLogin", true);
                        await LS.setItem("baseURL", loginUrl);
                        await LS.setItem("username", logindata.username);

                        $('#alert').empty().show().html(response.statusMessage);
                        setTimeout(function () {
                            $("#alert").hide();
                        }, 2000);
                        setTimeout(function () {
                            alert("Dont open any other Tabs")


                        }, 3000);
                        $(".loginView").hide();
                        $(".btnView").show();
                        $("html").height($("#mainDiv").height());
                    }
                    else {
                        $('#alert').empty().show().html(response.statusMessage);
                        setTimeout(function () {
                            $("#alert").hide();
                        }, 2000);
                    }

                }
            });
        });
    }
    var status = await LS.getItem("wats-status");
    if (status && status == "start") {
        $(".wats-pause").show();
        $(".wats-clear").show();
        $(".wats-submit").show();
        $(".wats-start").hide();
        $(".wats-resume").hide();

    } else if (status && status == "resume") {
        $(".wats-submit").show();
        $(".wats-clear").show();
        $(".wats-pause").show();
        $(".wats-start").hide();
        $(".wats-resume").hide();
    }
    else if (status && status == "pause") {
        $(".wats-submit").hide();
        $(".wats-pause").hide();
        $(".wats-start").hide();
        $(".wats-clear").hide();
        $(".wats-resume").show();
    }
    else if (status && status == "clear") {
        $(".wats-submit").hide();
        $(".wats-pause").hide();
        $(".wats-clear").hide();
        $(".wats-start").show();
        $(".wats-resume").hide();
    }
    else {
        $(".wats-submit").hide();
        $(".wats-pause").hide();
        $(".wats-clear").hide();
        $(".wats-start").show();
        $(".wats-resume").hide();
    }
    setTimeout(function () {
        $("html").height($("#mainDiv").height());
    }, 100);
    $(".wats-logout").click(async function () {
        $('#alert').empty().show().html("Logout Successfully");
        setTimeout(function () {
            $("#alert").hide();
            window.close()
        }, 2000);
        await LS.removeItem("isLogin");
        await LS.removeItem("baseURL");
        $("html").height($("#mainDiv").height());
    });
    $(".wats-start").click(async function () {

        $('#alert').empty().show().html("WATS Script Assistant Started");
        setTimeout(function () {
            $("#alert").hide();
            window.close()
        }, 2000);
        $(".wats-pause").show();
        $(".wats-submit").show();
        $(".wats-start").hide();
        $(".wats-clear").show();
        $(".wats-resume").hide();
        await LS.setItem("wats-status", "start");
        await LS.removeItem("wats-status1");

        $("html").height($("#mainDiv").height());
    });
    $(".wats-pause").click(async function () {
        $('#alert').empty().show().html("WATS Script Assistant Paused");
        setTimeout(function () {
            $("#alert").hide();
            window.close()
        }, 2000);
        $(".wats-pause").hide();
        $(".wats-start").hide();
        $(".wats-submit").hide();
        $(".wats-clear").hide();
        $(".wats-resume").show();

        await LS.setItem("wats-status", "pause");
        await LS.setItem("wats-status1", "pause");
        $("html").height($("#mainDiv").height());
    });
    $(".wats-clear").click(async function () {
        $('#alert').empty().show().html("WATS Script Assistant data Cleared");
        setTimeout(function () {
            $("#alert").hide();
            window.close()
        }, 2000);
        $(".wats-pause").hide();
        $(".wats-start").show();
        $(".wats-submit").hide();
        $(".wats-clear").hide();
        $(".wats-resume").hide();
        await LS.removeItem("wats-actions");
        await LS.removeItem("DefaultContent")
        await LS.removeItem("ToFrame")
        await LS.removeItem("iscopy")
        await LS.removeItem("wats-status1");

        await LS.setItem("wats-status", "clear");
        await LS.removeItem("wats-actions");
        $("html").height($("#mainDiv").height());
    });
    $(".wats-resume").click(async function () {
        $('#alert').empty().show().html("WATS Script Assistant Resumed");
        setTimeout(function () {
            $("#alert").hide();
            window.close()
        }, 2000);
        $(".wats-pause").show();
        $(".wats-clear").show();
        $(".wats-start").hide();
        $(".wats-submit").show();
        $(".wats-resume").hide();
        await LS.setItem("wats-status", "resume");
        await LS.setItem("wats-status1", "resume");
        $("html").height($("#mainDiv").height());
    });
    $(".wats-submit").click(function () {
        $(".wats-pause").hide();
        $(".wats-clear").hide();
        $(".wats-start").hide();
        $(".wats-submit").hide();
        $(".wats-resume").hide();
        $("#form").show();
        $("html").height($("#mainDiv").height());

    });
    $('.process-area').click(function(){
        ResetOptions('subprocess');
        ResetOptions('module');
        ResetOptions('role');
        ResetOptions('prdversion')
        populateForm('process');
    });
    $('.sub-process-area').click(function(){
        populateForm('subprocess')
    });
    $('.module').click(function(){
        ResetOptions('role');
        populateForm('module');
    });
    $('.role').click(function(){
        populateForm('role');
    });
    $('.product-version').click(function(){
        populateForm('prdversion');
    });
    function populateForm(name){
        var populateFormData = {
            "lookup_name": "process",
            "process": ""
        }
        var nameOfClass =  ".process-area";
        if (name === 'prdversion'){
            populateFormData.lookup_name = "PRODUCT_VERSION";
            if ($('.process-area').val() !== ''){
                populateFormData.process = $('.process-area').val();
            } else {
                return;
            }           
            nameOfClass = '.product-version'
        } else if (name === 'subprocess'){
            populateFormData.lookup_name = "SUB_PROCESS_AREA";
            console.log($('.process-area').val())
            if ($('.process-area').val() !== ''){
                populateFormData.process = $('.process-area').val();
            } else {
                return ;
            }  
            nameOfClass = '.sub-process-area'
        } else if (name === 'role'){
            populateFormData.lookup_name = "ROLE";
            if ($('.module').val() !== ''){
                populateFormData.process = $('.module').val();
            } else {
                return ;
            }  
            nameOfClass = '.role';
        } else if (name === 'module'){
            populateFormData.lookup_name = "module";
            if ($('.process-area').val() !== ''){
                populateFormData.process = $('.process-area').val();
            } else {
                $(".validate-process-area").show();
                return ;
            }  
            nameOfClass = '.module';
        }
       console.log(populateFormData,nameOfClass);
        $.post(baseURL+'/lookup', populateFormData, function(result){
            console.log(name," : ", result);
            data = JSON.parse(result)["data"]
            console.log(name," : ", data);
            if (data.length === 0) {
                if (nameOfClass.includes('role')){
                    alert("There Is No Roles Added To The Module");
                    setTimeout(function () {
                        $('#alert').hide();
                    }, 2000);
                    
                } else {
                    alert("Please provide Process Area which has lookup " + populateFormData.lookup_name)
                    setTimeout(function () {
                        $('#alert').hide();
                    }, 2000);
                }
            }

            if ($(nameOfClass).find('option').length === 1 ){
                for (var option = 0; option < data.length ; option++){
                    $(nameOfClass).append('<option>' + data[option] + "</option>");
                }
            }
        });
    }

    function ResetOptions(name){
        var nameOfClass = ''
        if (name === 'subprocess') 
            nameOfClass = '.sub-process-area'
        else if (name === 'role')
            nameOfClass = '.role'
        else if (name === 'prdversion')
            nameOfClass = '.product-version'
        else if  (name === 'module')
            nameOfClass = '.module'
        console.log(name + " is Reseted");
        var opt = $($(nameOfClass).find('option')[0]).text();
        $(nameOfClass).html('')
        $(nameOfClass).append('<option>' + opt + "</option>")
    }
    function alphabetizeList(listField) {
        var sel = $(listField);
        var selected = sel.val(); // cache selected value, before reordering
        var opts_list = sel.find('option');
        opts_list.sort(function (a, b) {
            return $(a).text() > $(b).text() ? 1 : -1;
        });
        sel.html('').append(opts_list);
        sel.val(selected); // set cached selected value
    }
    $(".wats-form-submit").click(async function () {
        var formdata = {};
        $(".validate-process-area").hide();
        $(".validate-sub-process-area").hide();
        $(".validate-module").hide();
        $(".validate-role").hide();
        $(".validate-scenario-name").hide();
        $(".validate-scenario-description").hide();
        $(".validate-product-version").hide();
        $(".validate-priority").hide();
        $(".validate-standard-custom").hide();

        if ($(".process-area").val()) {
            formdata.processarea = $(".process-area").val();
        }
        else {
            $(".validate-process-area").show();
            return;
        }
        if ($(".sub-process-area").val()) {
            formdata.subprocessarea = $(".sub-process-area").val();
        } else {
            $(".validate-sub-process-area").show();
            return;
        }
        if ($(".module").val()) {
            formdata.module = $(".module").val();
        } else {
            $(".validate-module").show();
            return;
        }
        if ($(".role").val()) {
            formdata.role = $(".role").val();
        } else {
            $(".validate-role").show();
            return;
        }
        if ($(".scenario-name").val()) {

            formdata.scenarioname = $(".scenario-name").val();
        } else {
            $(".validate-scenario-name").show();
            return;
        }
        if ($(".scenario-description").val()) {
            formdata.scenariodescription = $(".scenario-description").val();
        } else {
            $(".validate-scenario-description").show();
            return;
        }
        if ($(".priority").val()) {
            formdata.priority = $(".priority").val();
        } else {
            $(".validate-priority").show();
            return;
        }
        if ($(".product-version").val()) {
            formdata.productversion = $(".product-version").val();
        } else {
            $(".validate-product-version").show();
            return;

        }
        if ($(".standard-custom").val()) {
            formdata.standardcustom = $(".standard-custom").val();
        } else {
            $(".validate-standard-custom").show();
            return;
        }
        if ($(".standard-custom").val()) {
            formdata.standardcustom = $(".standard-custom").val();
        } else {
            $(".validate-standard-custom").show();
            return;
        }
        if ($(".application").val()) {
            formdata.application = $(".application").val();
        }else {
            $(".validate-application").show();
            return;
        }
        formdata.status = "submit";
        var message = formdata;
        var data = await LS.getItem("wats-actions");
        if (!data) {
            data = [];
            $('.wats-form-submit').prop('disabled', true);
            $('.wats-form-cancel').prop('disabled', true);
            $('#alert').empty().show().html("Data Not Available");
            setTimeout(function () {
                $("#alert").hide();
                window.close()
            }, 2000);

        } else {
            $('.wats-form-submit').prop('disabled', true);
            $('.wats-form-cancel').prop('disabled', true);

            data = JSON.parse(data);

            debugger
            for (var i = 0; i < data.length; i++) {
                debugger
                if (data[0]["ACTION"] == "windowhandle" || data[0]["ACTION"] == "switchToParentWindow") {
                    data.splice(i, 1);
                    i--;
                    continue;
                }
                if (i > 0 && data[i] == null) {
                    data.splice(i, 1);
                    i--;
                } else {
                    var nextEl_e = i + 1;
                    if (i > 0) {
                        var prevEl_e = i - 1;
                    }
                    var temp = {};
                    //swapping of enters
                    if (i > 0 && nextEl_e < data.length && data[i]["ACTION"] == "enter" && (data[nextEl_e]["ACTION"] == "Dropdown Values" || data[nextEl_e]["ACTION"] == "textarea" || data[nextEl_e]["ACTION"] == "Table Dropdown Values" || data[nextEl_e]["ACTION"] == "SendKeys" || data[nextEl_e]["ACTION"] == "clickFilter" || data[nextEl_e]["ACTION"] == "Table SendKeys")) {
                        temp = data[i];
                        data[i] = data[nextEl_e];
                        data[nextEl_e] = temp;
                        // data[i]=data[nextEl_e];
                    }
                    if (i > 0 && (data[i]["ACTION"] == "clear" || data[i]["ACTION"] == "copynumber" || data[i]["ACTION"] == "paste"
                    || data[i]["ACTION"] == "selectByText" || data[i]["ACTION"] == "clickImage" ||data[i]["ACTION"] == "selectByText" ||data[i]["ACTION"] == "Dropdown Values" || data[i]["ACTION"] == "textarea" 
                    || data[i]["ACTION"] == "Table Dropdown Values" || data[i]["ACTION"] == "SendKeys" || data[i]["ACTION"] == "Table SendKeys")) {
                        let prevEl = i - 1;
                        let pasteparams = data[i]["INPUT PARAMETER"];
                        let prevElparams = data[prevEl]["INPUT PARAMETER"];
                        if (prevElparams.includes(pasteparams) && (data[prevEl]["ACTION"] == "clickImage" ||data[prevEl]["ACTION"] == "selectByText" 
                        ||data[prevEl]["ACTION"] == "Dropdown Values" || data[prevEl]["ACTION"] == "textarea" 
                        || data[prevEl]["ACTION"] == "Table Dropdown Values" || data[prevEl]["ACTION"] == "SendKeys" 
                        || data[prevEl]["ACTION"] == "Table SendKeys")) {

                            data.splice(prevEl, 1);
                            i--;
                        }
                        var nextEl = i + 1;
                        if (i > 0 && nextEl != undefined && nextEl < data.length) {
                            let params1 = data[nextEl]["INPUT PARAMETER"];
                            if (params1.includes(pasteparams) && (data[nextEl]["ACTION"] == "clickImage" 
                            || data[nextEl]["ACTION"] == "selectByText" 
                            || data[nextEl]["ACTION"] == "Dropdown Values" 
                            || data[nextEl]["ACTION"] == "textarea" 
                            || data[nextEl]["ACTION"] == "Table Dropdown Values" 
                            || data[nextEl]["ACTION"] == "SendKeys" || data[nextEl]["ACTION"] == "Table SendKeys" )) {

                                data.splice(nextEl, 1);
                                i--;
                            }
                        }
                    }
                   
                    if (i > 0 && data[i]["ACTION"] != "clickImage") {
                        var c = i - 1;
                        if (i > 0 && (data[i]["ACTION"] == data[c]["ACTION"] && data[i]["INPUT PARAMETER"] == data[c]["INPUT PARAMETER"])) {
                            data.splice(c, 1);
                            i--;

                        }
                    }
                    //when tab in between duplicates
                    if (i > 0 && (data[i]["ACTION"] == "tab" || data[i]["ACTION"] == "clear")) {
                        if (nextEl_e < data.length && data[prevEl_e]["ACTION"] == data[nextEl_e]["ACTION"] && data[prevEl_e]["INPUT PARAMETER"] == data[nextEl_e]["INPUT PARAMETER"]) {
                            data.splice(nextEl_e, 1);
                            i--;
                        }

                    }
                    if (i > 0 && (data[i]["ACTION"] == "SendKeysDate")) {
                        data.splice(i, 1);
                        i--;
                    }
                    if (i > 0 && (data[i]["INPUT PARAMETER"] == undefined || !data[i]["ACTION"] || data[i]["ACTION"] == "")) {
                        data.splice(i, 1);
                        i--;
                    }

                    if (i > 0) {
                        var input_length = data[i]["INPUT PARAMETER"].toString().length
                        if (input_length > 110) {
                            data.splice(i, 1);
                            i--;
                        }
                    }
                    if (i > 0 && ((data[i]["ACTION"] != "tab" && data[i]["ACTION"] != "enter" && data[i]["ACTION"] != "Logout" && data[i]["ACTION"] != "switchToFrame" && data[i]["ACTION"] != "switchToDefaultFrame" & data[i]["ACTION"] != "windowhandle" && data[i]["ACTION"] != "switchToParentWindow"))) {

                        if (data[i]["INPUT PARAMETER"] == "") {
                            data.splice(i, 1);
                            i--;
                        }

                    }
                    if (i > 0 && data[i]["ACTION"] == "clickFilter") {
                        let clickFilterParams = data[i]["INPUT PARAMETER"].split(">")
                        if (clickFilterParams.length > 2) {
                            data.splice(i, 1);

                        }
                    }
                    if (i > 0 && (data[i]["INPUT PARAMETER"] != undefined || data[i]["INPUT PARAMETER"] != "")) {
                        var inputdata = data[i]["INPUT PARAMETER"];
                        var res = inputdata.split(">");
                        if (res) {
                            var hasNum = /\d/;
                            var newparam1 = "";
                            newparam1 = res[0].split(":")[0];
                            if (res.length > 1 && hasNum.test(res[0])) {

                                let resparams = res[0].split(":");
                                if (resparams.length > 1) {
                                    for (let r = 0; r < resparams.length; r++) {
                                        if (!hasNum.test(resparams[r])) {
                                            newparam1 = resparams[r];
                                            newparam1 = newparam1.split(':')[0];
                                        }
                                    }
                                }


                            }
                            if (newparam1 != "" && res[1]) {
                                data[i]["INPUT PARAMETER"] = newparam1 + ">" + res[1];
                            }

                            let action = data[i]["ACTION"];
                            let resLength = res[0].length;
                            if (resLength > 50) {
                                data[i]["INPUT PARAMETER"] = res[1];
                            }
                            if (action == "Dropdown Values" || action == "Table Dropdown Values" || action == "selectByText") {
                                if (res[1] != undefined) {
                                    data[i]["STEP DESCRIPTION"] = "Select " + res[1];
                                }
                                else {
                                    data[i]["STEP DESCRIPTION"] = "Select " + res[0];
                                }

                            }
                            if (action == "SendKeys" || action == "Table SendKeys" || action == "textarea") {
                                data[i]["STEP DESCRIPTION"] = "Enter " + res[1];

                            }
                            if (action == "clickLink" || action == "clickButton" || action == "clickTableLink" || action == "tableRowSelect") {
                                if (res[1] != undefined) {
                                    data[i]["STEP DESCRIPTION"] = "Click " + res[1];
                                }
                                else {
                                    data[i]["STEP DESCRIPTION"] = "Click " + res[0];
                                }


                            }


                        }
                    }
                    //Create Journal issue
                    if (i > 0 && data[i]["INPUT PARAMETER"] == "Journal Lines>Description" && data[i]["INPUT VALUE"] == "101.10.60540.000.000.000") {
                        data.splice(i, 1);
                        i--;

                    }
                    if(i>0&&data[i]["INPUT VALUE"]=="t"){
                        data.splice(i, 1);
                        i--;
                    }
                    if (i >= 0) {
                        if (message.scriptnumber) {
                            data[i]["SCRIPT NUMBER"] = message.scriptnumber;
                            data[i]["SCRIPT NUMBER1"] = message.scriptnumber;
                        }
                        if (message.processarea) {
                            data[i]["PROCESS AREA"] = message.processarea;
                        }
                        if (message.subprocessarea) {
                            data[i]["SUB PROCESS AREA"] = message.subprocessarea;
                        }
                        if (message.module) {
                            data[i]["MODULE"] = message.module;
                        }
                        if (message.role) {
                            data[i]["ROLE"] = message.role;
                        }
                        if (message.scenarioname) {
                            data[i]["SCENARIO NAME"] = message.scenarioname;
                        }
                        if (message.scenariodescription) {
                            data[i]["SCENARIO DESCRIPTION"] = message.scenariodescription;
                        }
                        if (message.priority) {
                            data[i]["PRIORITY"] = message.priority;
                        }
                        if (message.productversion) {
                            data[i]["PRODUCT VERSION"] = message.productversion;
                        }
                        if (message.standardcustom) {
                            data[i]["STANDARD CUSTOM"] = message.standardcustom;
                        }
                        data[i]["TEST SCRIPT STATUS"] = "Valid";


                        if (message.module) {
                            var module = message.module;
                            var newmodule = "";
                            var newModData = {
                                "lookup_name": "module_srt",
                                "process": module
                            }
                            $.post(baseURL + '/lookup', newModData, function(result, status){
                                if (status === 'success') {
                                    newmodule = JSON.parse(result).data[0];
                                    console.log("newmodoule "+ newmodule)
                                }
                                else {
                                    alert('No Lookup Code For Given Module');
                                    return;
                                }
                            })
                            console.log('new module: ', newmodule);
                            data[i]["MODULE_SRT"] = newmodule;
                        }
                        data[i]["LINE NUMBER"] = (i + 1) * 10;
                    }
                }
            }
            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [year, month, day].join('-');
            }
            console.log(message.application)
            debugger
            var currentDate = formatDate(new Date());
            var creadetedBy = await LS.getItem("username")
            console.log(formatDate(new Date()));
            var master = {
                "SCRIPT ID": "",
                "SCRIPT NUMBER": "",
                "PROCESS AREA": message.processarea,
                "SUB PROCESS AREA": message.subprocessarea,
                "MODULE": message.module,
                "ROLE": message.role,
                "SCENARIO NAME": message.scenarioname,
                "SCENARIO DESCRIPTION": message.scenariodescription,
                "EXPECTED RESULT": "",
                "SELENIUM TEST SCRIPT_NAME": "",
                "DEPENDENCY": "N",
                "PRODUCT VERSION": message.productversion,
                "STANDARD CUSTOM": message.standardcustom,
                "TEST SCRIPT STATUS": "Valid",
                "CREATION_DATE": currentDate,
                "UPDATE_DATE": currentDate,
                "CREATED_BY": creadetedBy,
                "AUTHOR": "",
                "CUSTOMER ID": "",
                "CUSTOMISATION REFERENCE": "",
                "ATTRIBUTE1": "",
                "ATTRIBUTE2": "",
                "ATTRIBUTE3": "",
                "ATTRIBUTE4": "",
                "ATTRIBUTE5": "",
                "ATTRIBUTE6": "",
                "ATTRIBUTE7": "",
                "ATTRIBUTE8": "",
                "ATTRIBUTE9": "",
                "ATTRIBUTE10": "",
                "PRIORITY": message.priority,
                "MODULE_SRT": newmodule,
                "TARGET APPLICATION" : message.application,
                "MetaDataList": data
            }
            console.log(JSON.stringify(master))
            $.ajax({
                type: "POST",
                cache: false,
                // url: baseURL + '/testrunData',
                url: baseURL + '/pluginData',
                // url: 'http://watsuata01.winfosolutions.com:8080/wats/pluginData',
                //url: 'http://watsdev01.winfosolutions.com:8080/wats/pluginData',
                error:function (err) {
                    $('#alert').empty().show().html("Please Check VPN/Internet");
                    setTimeout(function () {
                        $("#alert").hide();

                        // window.close()
                    }, 3000);
                },
                data: JSON.stringify(master),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: async function (response) {
                    if (response.status == 200) {
                        await LS.removeItem("wats-actions");
                        await LS.removeItem("DefaultContent")
                        await LS.removeItem("ToFrame")
                        await LS.removeItem("iscopy")
                        await LS.removeItem("wats-status1");
                        console.log(response);

                        // $(".script-number").val("");
                        $(".process-area").val("");
                        $(".sub-process-area").val("");
                        $(".module").val("");
                        $(".role").val("");
                        $(".scenarion-name").val("");

                        $(".wats-pause").hide();
                        $(".wats-start").show();
                        $(".wats-submit").hide();
                        $("#form").hide();
                        $("html").height($("#mainDiv").height());
                        await LS.setItem("wats-status", "submit");
                        $('#alert').empty().show().html(response.statusMessage);
                        setTimeout(function () {
                            $("#alert").hide();

                            window.close()
                        }, 10000);

                    }
                    else {

                        $('#alert').empty().show().html("ScriptNumber already exists");
                        setTimeout(function () {
                            $("#alert").hide();
                            $("#form").show();
                            $("html").height($("#mainDiv").height());

                        }, 6000);
                    }

                }
            });

        }

        // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //     chrome.tabs.sendMessage(tabs[0].id, formdata);
        // });

    });
    $(".wats-form-cancel").click(function () {
        $(".script-number").val("");
        $(".process-area").val("");
        $(".sub-process-area").val("");
        $(".module").val("");
        $(".role").val("");
        $(".scenarion-name").val("");
        $(".wats-pause").show();
        $(".wats-start").hide();
        $(".wats-submit").show();
        $("#form").hide();
        $("html").height($("#mainDiv").height());
    });
});
var globalobj = {
    "SCRIPT METADATA ID": "",
    "SCRIPT ID1": "",
    "SCRIPT NUMBER1": "",
    "LINE NUMBER": "",
    "STEP DESCRIPTION": "",
    "INPUT PARAMETER": "",
    "ACTION": ""
};
chrome.windows.onCreated.addListener(async function () {
    debugger
    var LogInobj = $.extend({}, globalobj);
    LogInobj["ACTION"] = "windowhandle";
    LogInobj["INPUT PARAMETER"] = "";
    var data = await LS.getItem("wats-actions");
    if (!data) {
        data = [];
    } else {
        data = JSON.parse(data);
    }
    data.push(LogInobj);
    await LS.setItem("wats-actions", JSON.stringify(data));
});
chrome.windows.onRemoved.addListener(async function () {
    debugger
    var LogInobj = $.extend({}, globalobj);
    LogInobj["ACTION"] = "switchToParentWindow";
    LogInobj["INPUT PARAMETER"] = "";
    var data = await LS.getItem("wats-actions");
    if (!data) {
        data = [];
    } else {
        data = JSON.parse(data);
    }
    data.push(LogInobj);
    await LS.setItem("wats-actions", JSON.stringify(data));
})

//excel download

let myExcelXML = (function () {
    let Workbook, WorkbookStart = '<?xml version="1.0"?><ss:Workbook  xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">';
    const WorkbookEnd = '</ss:Workbook>';
    let fs, SheetName = 'SHEET 1',
        styleID = 1, columnWidth = 80,
        fileName = "wats-actions", uri, link;

    class myExcelXML {
        constructor(o) {
            let respArray = JSON.parse(o);
            let finalDataArray = [];

            for (let i = 0; i < respArray.length; i++) {
                finalDataArray.push(flatten(respArray[i]));
            }

            let s = JSON.stringify(finalDataArray);
            fs = s.replace(/&/gi, '&amp;');
        }

        downLoad() {
            const Worksheet = myXMLWorkSheet(SheetName, fs);

            WorkbookStart += myXMLStyles(styleID);

            Workbook = WorkbookStart + Worksheet + WorkbookEnd;

            uri = 'data:text/xls;charset=utf-8,' + encodeURIComponent(Workbook);
            link = document.createElement("a");
            link.href = uri;
            link.style = "visibility:hidden";
            link.download = fileName + ".xls";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        get fileName() {
            return fileName;
        }

        set fileName(n) {
            fileName = n;
        }

        get SheetName() {
            return SheetName;
        }

        set SheetName(n) {
            SheetName = n;
        }

        get styleID() {
            return styleID;
        }

        set styleID(n) {
            styleID = n;
        }
    }

    const myXMLStyles = function (id) {
        let Styles = '<ss:Styles><ss:Style ss:ID="' + id + '"><ss:Font ss:Bold="1"/></ss:Style></ss:Styles>';

        return Styles;
    }

    const myXMLWorkSheet = function (name, o) {
        const Table = myXMLTable(o);
        let WorksheetStart = '<ss:Worksheet ss:Name="' + name + '">';
        const WorksheetEnd = '</ss:Worksheet>';

        return WorksheetStart + Table + WorksheetEnd;
    }

    const myXMLTable = function (o) {
        let TableStart = '<ss:Table>';
        const TableEnd = '</ss:Table>';

        const tableData = JSON.parse(o);
        if (tableData.length > 0) {
            const columnHeader = Object.keys(tableData[0]);
            let rowData;
            for (let i = 0; i < columnHeader.length; i++) {
                TableStart += myXMLColumn(columnWidth);

            }
            TableStart += '<ss:Row ss:StyleID="1"><ss:Cell ss:MergeAcross="6"><ss:Data ss:Type="String">Winfo Test Automation MetaData Download </ss:Data> </ss:Cell></ss:Row>';

            for (let j = 0; j < tableData.length; j++) {
                rowData += myXMLRow(tableData[j], columnHeader);
            }
            TableStart += myXMLHead(1, columnHeader);
            TableStart += rowData;
        }

        return TableStart + TableEnd;
    }

    const myXMLColumn = function (w) {
        return '<ss:Column ss:AutoFitWidth="0" ss:Width="' + w + '"/>';
    }


    const myXMLHead = function (id, h) {
        let HeadStart = '<ss:Row ss:StyleID="' + id + '">';
        const HeadEnd = '</ss:Row>';

        for (let i = 0; i < h.length; i++) {
            hkey = h[i];
            if (hkey == "SCRIPT ID1") {
                hkey = "SCRIPT ID";
            }
            if (hkey == "SCRIPT NUMBER1") {
                hkey = "SCRIPT NUMBER";
            }
            const Cell = myXMLCell(hkey.toUpperCase());
            HeadStart += Cell;
        }

        return HeadStart + HeadEnd;
    }

    const myXMLRow = function (r, h) {
        let RowStart = '<ss:Row>';
        const RowEnd = '</ss:Row>';
        for (let i = 0; i < h.length; i++) {
            const Cell = myXMLCell(r[h[i]]);
            RowStart += Cell;
        }

        return RowStart + RowEnd;
    }

    const myXMLCell = function (n) {
        let CellStart = '<ss:Cell>';
        const CellEnd = '</ss:Cell>';

        const Data = myXMLData(n);
        CellStart += Data;

        return CellStart + CellEnd;
    }

    const myXMLData = function (d) {
        let DataStart = '<ss:Data ss:Type="String">';
        const DataEnd = '</ss:Data>';

        return DataStart + d + DataEnd;
    }

    const flatten = function (obj) {
        var obj1 = JSON.parse(JSON.stringify(obj));
        const obj2 = JSON.parse(JSON.stringify(obj));
        if (typeof obj === 'object') {
            for (var k1 in obj2) {
                if (obj2.hasOwnProperty(k1)) {
                    if (typeof obj2[k1] === 'object' && obj2[k1] !== null) {
                        delete obj1[k1]
                        for (var k2 in obj2[k1]) {
                            if (obj2[k1].hasOwnProperty(k2)) {
                                obj1[k1 + '-' + k2] = obj2[k1][k2];
                            }
                        }
                    }
                }
            }
            var hasObject = false;
            for (var key in obj1) {
                if (obj1.hasOwnProperty(key)) {
                    if (typeof obj1[key] === 'object' && obj1[key] !== null) {
                        hasObject = true;
                    }
                }
            }
            if (hasObject) {
                return flatten(obj1);
            } else {
                return obj1;
            }
        } else {
            return obj1;
        }
    }

    return myExcelXML;
})();