// const LS = {
//     getAllItems: () => chrome.storage.local.get(),
//     getItem: async key => (await chrome.storage.local.get(key))[key],
//     setItem: (key, val) => chrome.storage.local.set({[key]: val}),
//     removeItem: keys => chrome.storage.local.remove(keys),
//     clear : () => chrome.storage.local.clear(),
//   };
// $(document).ready(async function () {
//     var globalobj = {

//         "SCRIPT METADATA ID": "",
//         "SCRIPT ID1": "",
//         "SCRIPT NUMBER1": "",
//         "LINE NUMBER": "",
//         "STEP DESCRIPTION": "",
//         "INPUT PARAMETER": "",
//         "INPUT VALUE": "",
//         "ACTION": ""
//     };

//     var duplicateData = [];
//     var hasNumber = /\d/;
//     var header1 = await LS.getItem("header1")
//     var header2 = await LS.getItem("header2")

//     /*
//      *  When we click on any element on the oracle cloud fusion instance
//         Then this function get Triggered 
//     */
//     document.onclick = async function (e) {
//         await watsScripter(e);
//     }

//     async function watsScripter(e) {
//         debugger;
//         //to avoid the un necessary headers for nearest header param
//         if ($($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 2) {

//             var popup_headers = ($(e.target).parents("*:has('h1, h2, h3, h4, h5, h6')").find('h1,h2')).slice(-2);
//             if (popup_headers.length > 1) {
//                 var popup_header1 = popup_headers[0].innerText;
//                 var popup_header2 = popup_headers[1].innerText;
//                 console.log(popup_header1, popup_header2)
//                 if (popup_header1 == "Search" || popup_header2 == "" || popup_header2 == "Search" || popup_header1 == "") {
//                     var header1 = popup_headers[0].className;
//                     var header2 = popup_headers[1].className;

//                     if ((header1 == "xvd" && header2 == "x1f9") || (header1 == "x1f9" && header2 == "xvd")) {
//                         await LS.setItem("header1", header1)
//                         await LS.setItem("header2", header2)
//                     }

//                 }

//             }

//         }
        
//         // stop recording for popup
//         if (($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[aria-label])')).first().find("a").parent().siblings().find('h2').text().trim() == "Search" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1) || ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[aria-label])')).first().find("a").parent().siblings().find('h2').text().trim() == "Search" && $(e.target).prop("tagName") == "BUTTON") || ($($(e.target).parents("table").parents('div:has(*[aria-label])')).first().find("a").parent().siblings().find('h2').text().trim() == "Search" && $(e.target).prop("tagName") == "BUTTON" && $(e.target).text().trim() == "Cancel")) {
//             var popupdivname = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//             if (!popupdivname.includes("Search and Select")) {
//                 chrome.runtime.sendMessage({
//                     "action": "setStatus1",
//                     "data": "resume"
//                 });
//             } else {
//                 chrome.runtime.sendMessage({
//                     "action": "setStatus1",
//                     "data": "pause"
//                 });
//             }


//         } else {
//             let currStatus = await LS.getItem('wats-status');
//             if (currStatus === 'pause'){
//                 chrome.runtime.sendMessage({
//                     "action": "setStatus1",
//                     "data": "resume"
//                 });
//             } 
//         }
//         var getStatus = async function (status) {

//             if (status == "start" || status == "resume") {
//                 debugger;
//                 var tableImgTags = [];
//                 var tableAtextElements = [];
//                 //For SelectAValue and SelectAValueClickImage and clickTableLink filtercode
//                 if ((e.target.nodeName == "A" || e.target.nodeName == "IMG") && ($($(e.target).parents()[1]).prop('tagName') == "TD" || $($(e.target).parents()[2]).prop('tagName') == "TD" || ($($(e.target).parents()[3]).prop('tagName') == "TD"))) {
                  
//                     if(e.target.nodeName == "A"){
//                         var totalTabAList;

//                     var tableAlist = $($(e.target).parents('table')[0]).find('a');
//                     var tableAlist1 = $($(e.target).parents('table')[1]).find('a');
//                     if (tableAlist.length > 8) {
//                         totalTabAList = tableAlist;
//                     }
//                     else {
//                         totalTabAList = tableAlist1;
//                     }
//                     for (let i = 0; i < totalTabAList.length; i++) {
//                         if (totalTabAList[i].innerText != "") {
//                             let totalTabAListText=totalTabAList[i].innerText;
//                             if(totalTabAListText!="View"&&totalTabAListText!="Detach"){
//                                 tableAtextElements.push(totalTabAListText)
//                             }
                            
//                         }

//                     }

//                     }
                    

//                     if(e.target.nodeName == "IMG"){
//                         var totalTabImageList;

//                         var tableImagelist = $($(e.target).parents('table')[0]).find('img');
//                         var tableImagelist1 = $($(e.target).parents('table')[1]).find('img');
//                         if (tableImagelist.length > 8) {
//                             totalTabImageList = tableImagelist;
//                         }
//                         else {
//                             totalTabImageList = tableImagelist1;
//                         }
    
//                         for (let i = 0; i < totalTabImageList.length; i++) {
                            
//                             if(totalTabImageList[i].src.includes('arrow')){
//                                 tableImgTags.push(totalTabImageList[i].src)
//                             }
    
//                         }
//                     }
//                     console.log("tableAtextElements", tableAtextElements)
//                     console.log("tableImgTags", tableImgTags)
//                 }
//                 var hasNumber = /\d/;

//                 //If we switched from main frame to othere iframe component
//                 //For switchToFrame
//                 if (window.frameElement != null) {
//                     debugger;
//                     var frameobj = $.extend({}, globalobj);
//                     frameobj["ACTION"] = "switchToFrame";
//                     frameobj["INPUT PARAMETER"] = "Output";
//                     frameobj["STEP DESCRIPTION"] = "Click on frame"
//                     if (window.frameElement.getAttribute("title") != null) {
//                         frameobj["INPUT PARAMETER"] = window.frameElement.getAttribute("title")
//                     }
//                     let frameId = window.frameElement.getAttribute("id");
//                     if (frameId.includes('ExecBinding')) {
//                         frameobj["INPUT PARAMETER"] = "ExecBinding";

//                     }
//                     // let frameIdparam = frameId.split("::")[1];
//                     var frameIdparam = frameId.split("::");

//                     // if (frameIdparam != undefined && !hasNumber.test(frameIdparam)) {
//                     //     frameobj["INPUT PARAMETER"] = frameIdparam;
//                     // }
//                     if (frameIdparam) {
//                         for (let i = 0; i < frameIdparam.length; i++) {
//                             if (!hasNumber.test(frameIdparam[i])) {
//                                 frameIdparam = frameIdparam[i];
//                                 frameobj["INPUT PARAMETER"] = frameIdparam;

//                             }
//                         }
//                     }
//                     frameobj["INPUT PARAMETER"] = frameobj["INPUT PARAMETER"].replace(/[0-9]/g, '');
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": frameobj
//                     });

//                 }
//                 //when we click on textarea tag then take nearest label as param2 and nearest header as param1
//                 //textarea
//                 if (window.frameElement) {
//                     var FrameHeader = $(window.frameElement).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     if ($(e.target).prop("tagName") == "BODY") {
//                         var frametextAreaobj = $.extend({}, globalobj);
//                         if ($(window.frameElement).parent().siblings("label").text() != "") {
//                             frametextAreaobj["ACTION"] = "textarea";
//                             frametextAreaobj["INPUT PARAMETER"] = $(window.frameElement).parent().siblings("label").text();
//                             frametextAreaobj["INPUT VALUE"] = $(e.target).text();
//                         }
//                         if (FrameHeader && FrameHeader != "") {
//                             frametextAreaobj["ACTION"] = "textarea";
//                             frametextAreaobj["INPUT PARAMETER"] = $(window.frameElement).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                             frametextAreaobj["INPUT VALUE"] = $(e.target).text();
//                         }
//                         // Define the element we wish to bind to.
//                         var bind_to = ':input';

//                         // Prevent double-binding.
//                         $(document.body).off('change', bind_to);

//                         // Bind the event to all body descendants matching the "bind_to" selector.
//                         $(document.body).on('change', bind_to, function (e) {
//                             frametextAreaobj["INPUT VALUE"] = $(e.target).val();
//                             chrome.runtime.sendMessage({
//                                 "action": "addAction",
//                                 "data": frametextAreaobj
//                             });
//                         });
//                         if (e.type == "click" && $(e.target).val() != "") {
//                             frametextAreaobj["INPUT VALUE"] = $(e.target).val();
//                             chrome.runtime.sendMessage({
//                                 "action": "addAction",
//                                 "data": frametextAreaobj
//                             });
//                         }

//                     }
//                     //when we click on input tag and it has "a" tag with no text as an sibling then we take this action as dropdownvalues and sibling label as param2 and nearest header as param1
//                     //Dropdown Values
//                     if (e.target.nodeName == "INPUT" && $(e.target).next().prop('tagName') == "IMG") {
//                         var frameDropdownobj = $.extend({}, globalobj);
//                         if (FrameHeader && FrameHeader != "") {
//                             if ($($(e.target).parents('td')[1]).siblings('td').find('label').text() != "") {
//                                 frameDropdownobj["ACTION"] = "Dropdown Values";
//                                 frameDropdownobj["INPUT PARAMETER"] = FrameHeader + ">" + $($(e.target).parents('td')[1]).siblings('td').find('label').text();
//                             }
//                         }
//                         // Define the element we wish to bind to.
//                         var bind_to = ':input';

//                         // Prevent double-binding.
//                         $(document.body).off('change', bind_to);

//                         // Bind the event to all body descendants matching the "bind_to" selector.
//                         $(document.body).on('change', bind_to, function (e) {
//                             frameDropdownobj["INPUT VALUE"] = $(e.target).val();
//                             chrome.runtime.sendMessage({
//                                 "action": "addAction",
//                                 "data": frameDropdownobj
//                             });
//                         });
//                         if (e.type == "click" && $(e.target).val() != "") {
//                             frameDropdownobj["INPUT VALUE"] = $(e.target).val();
//                             chrome.runtime.sendMessage({
//                                 "action": "addAction",
//                                 "data": frameDropdownobj
//                             });
//                         }

//                     }
//                     //when we click on input tag and type as button and we take value inside input tag as param
//                     //clickButton
//                     if ($(e.target).prop('tagName') == "INPUT" && $(e.target).attr('type') == "button") {
//                         debugger;
//                         var frameButtonobj = $.extend({}, globalobj);
//                         frameButtonobj["ACTION"] = "clickButton";
//                         frameButtonobj["INPUT PARAMETER"] = $(e.target).attr('value');
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": frameButtonobj
//                         });
//                     }
//                     //when we click on TD tag  and parent role as menuitem we take text inside TD tag as param
//                     if (e.target.nodeName == "TD" && $($(e.target).parents('a')[0]).attr('role') == "menuitem") {
//                         debugger;
//                         var frameButtonobj = $.extend({}, globalobj);
//                         frameButtonobj["ACTION"] = "clickButton";
//                         frameButtonobj["INPUT PARAMETER"] = $(e.target).text();
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": frameButtonobj
//                         });

//                     }

//                 }
//                 //if we switched from other iframe component to main frame
//                 //switchToDefaultFrame
//                 if (window.frameElement == null) {

//                     var frameobj = $.extend({}, globalobj);
//                     frameobj["ACTION"] = "switchToDefaultFrame";
//                     frameobj["INPUT PARAMETER"] = "";
//                     frameobj["STEP DESCRIPTION"] = "Click outside frame"
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": frameobj
//                     });
//                 }



//                 // when we click on Sign In button we take it as  Login into Application action with UserId param
//                 //Login into Application
//                 if (e.target.nodeName === "BUTTON" && ($(e.target).text().trim() === "Sign In" || $(e.target).text().trim() === 'Login' )) {
//                     debugger;
//                     var LogInobj = $.extend({}, globalobj);
//                     LogInobj["ACTION"] = "Login into Application";
//                     LogInobj["INPUT PARAMETER"] = "User ID";
//                     if ($($(e.target).parents('div')[0]).siblings('#userid').val()) {
//                         LogInobj["INPUT VALUE"] = $($(e.target).parents('div')[0]).siblings('#userid').val().trim();
//                     }
//                     else {
//                         LogInobj["INPUT VALUE"] = $(e.target).siblings('#userid').val().trim();
//                     }
//                     LogInobj["STEP DESCRIPTION"] = "Log into Oracle Application";
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": LogInobj,
//                         "isLoggedIN": true

//                     });
//                 }


//                 //if the tag is "A" and text is Sign Out then it is logout action
//                 //Logout
//                 if (e.target.nodeName == "A" && (e.target.innerText == "Sign Out" || $(e.target).text().trim() === "Logout")) {

//                     var Logoutobj = $.extend({}, globalobj);
//                     Logoutobj["ACTION"] = "Logout";
//                     Logoutobj["STEP DESCRIPTION"] = "Log Out From Oracle application"
//                     duplicateLogic();
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": Logoutobj
//                     });
//                 }

//                 //udg theme navigation
//                 if (($($(e.target).parents("div:has(*[class^='navmenu-header'])")).first().find("span").first().text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1) && (e.target.nodeName == "path" || e.target.nodeName == "A" || e.target.nodeName == "SPAN" || e.target.nodeName == "svg") || ( $(e.target).parentsUntil("*:has('a')").last().attr("class") != undefined && $(e.target).parentsUntil("*:has('a')").last().attr("class").includes("navmenu") === true)) {
//                     debugger
//                     var NavigateObj = $.extend({}, globalobj);
//                     NavigateObj["ACTION"] = "Navigate";
//                     var naviagteParam1 = $($(e.target).parents("div:has(*[class^='navmenu-header'])")).first().find("span").first().text().trim();
//                     if (naviagteParam1.length >40){
//                         naviagteParam1 = $($(e.target).parents("div:has(*[class^='navmenu-header'])")).first().children('div').children('div').first().attr('title');
//                     }
//                     if (!naviagteParam1.includes('Home') && !naviagteParam1.includes('Search')) {
//                         naviagteParam2 = $(e.target).text().trim();
//                         if (naviagteParam2 === ''){
//                             naviagteParam2 = $(e.target).siblings('span').text();
//                         } 
//                         if (naviagteParam2 === '' || naviagteParam2.length > 40){
//                             naviagteParam2 = $(e.target).parentsUntil(":has('a')").last().attr('title');
//                         }


//                         NavigateObj["INPUT PARAMETER"] = naviagteParam1 + ">" + naviagteParam2 ;
//                         NavigateObj["STEP DESCRIPTION"] = "Navigate to " + naviagteParam2 ;
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": NavigateObj
//                         });
//                     }
//                 }

//                 //Verisure theme navigation
//                 if ($(e.target).prop("tagName") == "A" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1 && $(e.target).parent().prev().find('img').length > 0) {
//                     debugger;
//                     var NavigateObj = $.extend({}, globalobj);
//                     NavigateObj["ACTION"] = "Navigate";
//                     NavigateObj["INPUT PARAMETER"] = $($($(e.target).parents("div").first()).prevAll().find("span")).last().text().trim() + ">" + $(e.target).text().trim()
//                     NavigateObj["STEP DESCRIPTION"] = "Navigate to " + $(e.target).text().trim()
//                     if ($($($(e.target).parents("div").first()).prevAll().find("span")).last().text().trim() == "") {
//                         if ($($(e.target).parents("td")[1]).prev().find("span").last().text().trim() != "") {
//                             NavigateObj["INPUT PARAMETER"] = $($(e.target).parents("td")[1]).prev().find("span").text().trim() + ">" + $(e.target).text().trim()
//                         }
//                         else {
//                             NavigateObj["INPUT PARAMETER"] = $($(e.target).parents("td")[1]).prev().prev().find("span").last().text().trim() + ">" + $(e.target).text().trim()
//                         }
//                     }
//                     if ($(e.target).text().trim() == "More...") {
//                         NavigateObj = undefined;
//                     }
//                     if (NavigateObj) {
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": NavigateObj
//                         });
//                     }

//                     await LS.removeItem("header1");
//                     await LS.removeItem("header2");
//                 }

//                 if (e.target.nodeName == "A" && $(e.target).parent().prop("tagName") == "LI" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1 && e.target.innerText != "") {
//                     var taskObj = $.extend({}, globalobj);
//                     taskObj["ACTION"] = "openTask";
//                     taskObj["INPUT PARAMETER"] = $(e.target).text().trim()
//                     taskObj["STEP DESCRIPTION"] = "Navigate to " + $(e.target).text().trim()

//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": taskObj
//                     });
//                 }
                

//                 if ((e.target.nodeName == "BUTTON" && $(e.target).text().trim() != "Sign In" && $(e.target).text().trim() != "Confirm") || (e.target.parentElement !== undefined && e.target.parentElement.nodeName == "BUTTON" && e.target.parentElement.textContent == "OK")){
//                     debugger;
//                     var taskObj = $.extend({}, globalobj);
//                     taskObj["ACTION"] = "clickButton";
//                     taskObj["INPUT PARAMETER"] = $(e.target).text().trim()

//                     // normal Header
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         taskObj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() + ">" + $(e.target).text().trim()
//                         taskObj["STEP DESCRIPTION"] = "Click on " + $(e.target).text().trim()

//                     }
//                     // var normalHeader = getNormalHeader(e, header1, header2);

//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" || $($(e.target).parents("table")).find("tr").first().find("div").text().trim() != "") {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader == "Warning" && popupHeader == "Error" && popupHeader == "Information" && popupHeader == "Confirmation") {
//                             taskObj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).text().trim();
//                             taskObj["STEP DESCRIPTION"] = "Click on " + $(e.target).text().trim()
//                         }
//                         if ($($(e.target).parents("table")).find("tr").first().find("div").text().trim() == "Error") {
//                             taskObj["INPUT PARAMETER"] = "Error" + ">" + $(e.target).text().trim();
//                             taskObj["STEP DESCRIPTION"] = "Click on " + $(e.target).text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() == "Search") {
//                             taskObj["INPUT PARAMETER"] = "Search" + ">" + $(e.target).text().trim()
//                             taskObj["STEP DESCRIPTION"] = "Click on " + $(e.target).text().trim()
//                         }

//                         if (popupHeader !== undefined && popupHeader !== '' && taskObj['INPUT PARAMETER'].split('>').length !== 2 && popupHeader.length <= 30){
//                             if ($(e.target).text().length > 1){
//                                 taskObj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).text().trim();
//                             } else {
//                                 taskObj['INPUT PARAMETER'] = popupHeader + '>' + $(e.target).parent().text().trim();
//                             }
                            
//                         }
//                     }


//                     var paramLength = taskObj["INPUT PARAMETER"];
//                     if (paramLength.length > 80 && $(e.target).text().trim() == "OK" && paramLength.includes('Information')) {
//                         taskObj["INPUT PARAMETER"] = "Information>OK"
//                     }
//                     if ($($(e.target).parents("tr")[1]).siblings().find('div').text().includes('Confirmation') && $(e.target).text().trim() == "OK" ) {
//                         if ($(e.target).text().trim() !== "View Accounting")
//                             taskObj["INPUT PARAMETER"] = "Confirmation>OK";
//                     }
//                     if ($($(e.target).parents("tr")[1]).siblings().find('div').text().includes('Information') && $(e.target).text().trim() == "OK" ) {
//                         taskObj["INPUT PARAMETER"] = "Information>OK"
//                     }
//                     if ($($(e.target).parents("tr")[1]).siblings().find('div').text().includes('Error') && $(e.target).text().trim() == "OK" ) {
//                         taskObj["INPUT PARAMETER"] = "Error>OK"
//                     }
//                     if ($($(e.target).parents("tr")[1]).siblings().find('div').text().includes('Warning') && $(e.target).text().trim() == "OK"  ) {
//                         taskObj["INPUT PARAMETER"] = "Warning>OK"
//                     }
//                     //popup popupHeader with class
//                     if ($($(e.target).parents("table").find(".xkz")[0]).text() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 0 && taskObj["INPUT PARAMETER"] !== undefined && taskObj["INPUT PARAMETER"].split(">").length < 2) {
//                         debugger;
//                         var popupHeader = $($(e.target).parents("table").find(".xkz")[0]).text();

//                         // if (popupHeader == "Warning" || popupHeader == "Error" || popupHeader == "Information" || popupHeader == "Confirmation") {
//                         taskObj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).text().trim();
//                         taskObj["STEP DESCRIPTION"] = "Click on " + $(e.target).text().trim()
//                         // }
//                         taskObj["STEP DESCRIPTION"] = "Click on " + $(e.target).text().trim()
//                     }
//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((taskObj["INPUT PARAMETER"]==""&&anchorHeader != "" && anchorHeader != undefined) || (taskObj["INPUT PARAMETER"].includes("Edit Document")&&anchorHeader != "" && anchorHeader != undefined)) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         taskObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                             $(e.target).text().trim()

//                     }
//                     //if tag is span and parent is button
//                     if (e.target.nodeName == "SPAN" && $(e.target).parents('button').first().text() != "") {
//                         taskObj["INPUT PARAMETER"] = $(e.target).parents('button').first().text();
//                     }
//                     if (taskObj["INPUT PARAMETER"].split('>').length < 2){
//                         siblingHeader = getSiblingHeader(e, header1, header2);
//                         if (siblingHeader !== ''){
//                             taskObj["INPUT PARAMETER"] = siblingHeader + '>' + taskObj["INPUT PARAMETER"];
//                         }
//                     }
//                     duplicateLogic();
//                     if (taskObj != undefined) {
//                         duplicateData.push(taskObj);

//                     }
//                     taskObj["STEP DESCRIPTION"] = "Click On " + taskObj["INPUT PARAMETER"].split('>')[taskObj['INPUT PARAMETER'].split('>').length - 1];
//                     console.log("duplicateData::", duplicateData)
//                     if($($(e.target).parents("tr")[1]).siblings().find('div').text() != 'Select Date' || $($(e.target).parents("tr")[1]).siblings().find('div').text() != "Select Date and Time"){
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": taskObj
//                         });
//                     }
//                 }

//                 if (e.target.ariaLabel == "Expand " || e.target.ariaLabel == "Collapse " || e.target.ariaLabel == "Expand Search" || e.target.ariaLabel == "Collapse Search") {
//                     debugger;
//                     var collapseobj = $.extend({}, globalobj);
//                     collapseobj["ACTION"] = "clickExpandorcollapse";
//                     let expandHeader = $(e.target).parent().siblings("td").find("h1, h2, h3, h4, h5, h6").text().trim();
//                     if (!(e.target.ariaLabel.includes("Expand"))) {
//                         collapseobj["INPUT PARAMETER"] = expandHeader + ">Expand " + expandHeader
//                     }
//                     else {
//                         collapseobj["INPUT PARAMETER"] = expandHeader + ">Collapse " + expandHeader

//                     }

//                     collapseobj["STEP DESCRIPTION"] = "Click or expand on " + expandHeader;
//                     duplicateLogic();
//                    if(collapseobj){
//                        duplicateData.push(collapseobj);
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": collapseobj
//                     });
//                    }

//                 }
//                 if (($(e.target).prop("tagName") == "A" && $(e.target).attr("title") == "Expand") || ($(e.target).prop("tagName") == "A" && $(e.target).attr("title") == "Collapse")) {
//                     debugger
//                     var collapseobj = $.extend({}, globalobj);
//                     collapseobj["ACTION"] = "clickExpandorcollapse";


//                     //normal Header
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         collapseobj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() + ">" + $(e.target).attr("title")
//                         collapseobj["STEP DESCRIPTION"] = "Click or expand on " + $(e.target).attr("title");

//                     }
//                     duplicateLogic();
//                     if (clickLinkobj != undefined) {
//                         duplicateData.push(clickLinkobj);

//                     }

//                     console.log("duplicateData::", duplicateData)
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": collapseobj
//                     });
//                 }

//                 //Invoices Scanned number links in invoices dashboard
//                 var x = Number($(e.target).text())
//                 if (e.target.nodeName == 'SPAN' && !isNaN(x)) {
//                     debugger;
//                     var clikcLinkobj = $.extend({}, globalobj);
//                     clikcLinkobj["ACTION"] = "clickLink";
//                     clikcLinkobj["INPUT PARAMETER"] = $($(e.target).parents('div')[12]).siblings().find('a').attr('title');
//                     clikcLinkobj["STEP DESCRIPTION"] = "Click On " + clikcLinkobj["INPUT PARAMETER"].split('>')[clikcLinkobj['INPUT PARAMETER'].split('>').length - 1]
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clikcLinkobj
//                     });
//                 }
//                 //clicklink
//                 if (((e.target.nodeName == "A" && $(e.target).parent().attr('_afrpopid') && $(e.target).attr('title') != "") || (e.target.nodeName == "A" && $(e.target).parent().attr('_afrndtxt') && $(e.target).text() != "") || ($(e.target).text() == "Show All")) || (e.target.nodeName === 'IMG' && e.target.parentElement.nodeName === 'A' && e.target.parentElement.id.endsWith("popEl"))) {
//                     debugger;
//                     var clickLinkobj = $.extend({}, globalobj);
//                     clickLinkobj["INPUT PARAMETER"] = $(e.target).attr('title');
//                     if ($(e.target).text() != "")
//                         clickLinkobj["INPUT PARAMETER"] = $(e.target).text().trim().replace(/ *\([^)]*\) */g, "")

//                     clickLinkobj["ACTION"] = "clickLink";
//                     duplicateLogic();
//                     duplicateData.push(clickLinkobj);
//                     clickLinkobj["STEP DESCRIPTION"] = "Click On " + clickLinkobj["INPUT PARAMETER"].split('>')[clickLinkobj['INPUT PARAMETER'].split('>').length - 1];
//                     console.log("duplicateData::", duplicateData)
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clickLinkobj
//                     });

//                 }
                
//                 //clickLinkaction
//                 if (e.target.nodeName == "IMG" && $(e.target).attr('title') == "Add to Cart" && $(e.target).parents("div").first().siblings().find('A').text() != "") {
//                     debugger
//                     var clickLinkobj = $.extend({}, globalobj);
//                     clickLinkobj["ACTION"] = "clickLinkAction";
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //for normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         clickLinkobj["INPUT PARAMETER"] = correctHeaderName + ">" + $(e.target).attr('title')

//                     }
//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             clickLinkobj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).attr('title')

//                         }

//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }

//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 ) {
//                                 clickLinkobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" + $(e.target).attr('title')
//                             }
//                             break;
//                         }

//                     }
//                     let siblingheader = $($($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[20]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6")[1]).text();
//                     if (siblingheader != "") {
//                         clickLinkobj["INPUT PARAMETER"] = siblingheader + ">" + $(e.target).attr('title')
//                     }

//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((clickLinkobj["INPUT PARAMETER"]=="" || clickLinkobj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         clickLinkobj["INPUT PARAMETER"] = anchorHeader + ">" + $(e.target).attr('title')
//                     }

//                     duplicateLogic();
//                     clickLinkobj["STEP DESCRIPTION"] = "Click On " + clickLinkobj["INPUT PARAMETER"].split('>')[clickLinkobj['INPUT PARAMETER'].split('>').length - 1];
//                     if (clickLinkobj != undefined) {
//                         clickLinkobj["INPUT PARAMETER"] = clickLinkobj["INPUT PARAMETER"].replace(/ *\([^)]*\) */g, "");
//                         clickLinkobj["INPUT VALUE"] = $(e.target).parents("div").first().siblings().find('A').text().trim();
//                         duplicateData.push(clickLinkobj);


//                         console.log("duplicateData::", duplicateData)
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": clickLinkobj
//                         });
//                     }

//                 }
                
//                 if(e.target.nodeName == "A"&&$($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length>2&&$(e.target).parent().prop("tagName") == "DIV"){
//                     debugger
//                     var clickLinkobj = $.extend({}, globalobj);
//                     clickLinkobj["ACTION"] = "clickLink";
//                     clickLinkobj["INPUT PARAMETER"] = $(e.target).text();
                    
//                     //Fixing more... click link
//                     if ($(e.target).text().trim() == "More...") {
//                         clickLinkobj = undefined;
//                     }
//                     clickLinkobj["STEP DESCRIPTION"] = "Click On " + clickLinkobj["INPUT PARAMETER"].split('>')[clickLinkobj['INPUT PARAMETER'].split('>').length - 1];
//                     if (clikcLinkobj){
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": clickLinkobj
//                         });
//                     }
//                 }
//                 var tablesummary = $($(e.target).parents("table")[0]).attr("summary");
//                 var tablesummary1 = $($(e.target).parents("table")[1]).attr("summary");
//                 var tablesummary2 = $($(e.target).parents("table")[2]).attr("summary");
//                 if ((e.target.nodeName == "A" && tableAtextElements && tableAtextElements.length < 2 && e.target.innerText != "Sign Out" && $(e.target).text().trim() != "Search..." && e.target.innerText != "") && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length <= 1 && $(e.target).parentsUntil("*:has('input')").last().prevUntil('input').first().find("input").attr("placeholder") != "Enter search terms" && $(e.target).parentsUntil("*:has('input')").last().prevUntil('input').first().find("input").attr("placeholder") != "Search" && ($($(e.target).parents("div:has(*[class^='navmenu-header'])")).length <= 0 || $($(e.target).parents("div:has(*[class^='navmenu-header'])")).length == 6) && $(e.target).next().prop("tagName") != "svg") {
//                     debugger

//                     var clickLinkobj = $.extend({}, globalobj);

//                     if (((tablesummary != "" && tablesummary != undefined) || (tablesummary1 != "" && tablesummary1 != undefined) || (tablesummary2 != "" && tablesummary2 != undefined))) {
//                         clickLinkobj["INPUT PARAMETER"] = "";
//                         clickLinkobj["ACTION"] = "clickTableLink";
//                     }
//                     if (clickLinkobj["INPUT PARAMETER"] == "" && clickLinkobj["ACTION"] != "clickTableLink") {
//                         clickLinkobj["ACTION"] = "clickLink";
//                         clickLinkobj["INPUT PARAMETER"] = $(e.target).text().trim().replace(/ *\([^)]*\) */g, "")
//                         clickLinkobj["STEP DESCRIPTION"] = "Click on " + $(e.target).text().trim()

//                     }
//                     if ($(e.target).text().trim() == "Entertainment") {
//                         clickLinkobj["INPUT PARAMETER"] = "Top Categories>" + $(e.target).text().trim()
//                     }

//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //for normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         clickLinkobj["INPUT PARAMETER"] = correctHeaderName + ">" + $(e.target).text().trim()

//                     }
//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             clickLinkobj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).text().trim()

//                         }

//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50) {
//                                 clickLinkobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" + $(e.target).text().trim()
//                             }
//                             break;
//                         }
//                     }


//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((clickLinkobj["INPUT PARAMETER"]=="" || clickLinkobj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         clickLinkobj["INPUT PARAMETER"] = anchorHeader + ">" + $(e.target).text().trim()
//                     }
//                     if($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()=="Attachment"){
//                         clickLinkobj["INPUT PARAMETER"]=clickLinkobj["INPUT PARAMETER"].split(">")[0]+"> Attachment"
//                     }

//                     duplicateLogic();
//                     if (clickLinkobj["ACTION"] == "clickTableLink") {
//                         clickLinkobj = undefined
//                     }
                    
//                     if ($(e.target).attr('role') !== undefined && $(e.target).attr("role") == 'button'){
//                         clickLinkobj["ACTION"] = "clickButton";
//                     }
//                     if (clickLinkobj != undefined) {
//                         clickLinkobj["INPUT PARAMETER"] = clickLinkobj["INPUT PARAMETER"].replace(/ *\([^)]*\) */g, "");
//                        if(clickLinkobj["INPUT PARAMETER"]&&clickLinkobj["INPUT PARAMETER"].includes("Log")&&hasNumber.test(clickLinkobj["INPUT PARAMETER"])){
//                         clickLinkobj["INPUT PARAMETER"]=clickLinkobj["INPUT PARAMETER"].split(">")[0]+"> Attachment"
//                        }
//                        clickLinkobj["STEP DESCRIPTION"] = "Click On " + clickLinkobj["INPUT PARAMETER"].split('>')[clickLinkobj['INPUT PARAMETER'].split('>').length - 1];
//                         duplicateData.push(clickLinkobj);


//                         console.log("duplicateData::", duplicateData)
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": clickLinkobj
//                         });
//                     }
//                 }
//                 //when we click on  link("a" tag with text inside it) then we take it as clicklink action and text inside in it as param
//                 //clicklink
//                 if ($(e.target).find("img").length > 0 && $(e.target).parent().siblings().find("a").text() != "" && $(e.target).parent().siblings().find("a").text().length < 20 && $(e.target).parent().siblings().find("a").text() !== 'Show More' && !taskObj) {
//                     debugger
//                     var clickLinkobj = $.extend({}, globalobj);
//                     clickLinkobj["ACTION"] = "clickLink";
//                     clickLinkobj["INPUT PARAMETER"] = $(e.target).parent().siblings().find("a").text().replace(/ *\([^)]*\) */g, "")
//                     clickLinkobj["STEP DESCRIPTION"] = "Click on " + clickLinkobj["INPUT PARAMETER"]

//                     duplicateLogic();
//                     if (clickLinkobj != undefined) {
//                         duplicateData.push(clickLinkobj);
//                     }
//                     clickLinkobj["STEP DESCRIPTION"] = "Click On " + clickLinkobj["INPUT PARAMETER"].split('>')[clickLinkobj['INPUT PARAMETER'].split('>').length - 1];
//                     console.log("duplicateData::", duplicateData)
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clickLinkobj
//                     });
//                 }
//                 //when we click on image tag or svg elemets then we take it as clickimage action with title as param
//                 //clickimage
//                 if (e.target.nodeName == "IMG" && $(e.target).attr('title') == "Search") {
//                     debugger;
//                     var clickLinkobj = $.extend({}, globalobj);
//                     clickLinkobj["ACTION"] = "clickImage";
//                     clickLinkobj["INPUT PARAMETER"] = "Search";
//                     clickLinkobj["STEP DESCRIPTION"] = "Click On " + clickLinkobj["INPUT PARAMETER"].split('>')[clickLinkobj['INPUT PARAMETER'].split('>').length - 1];
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clickLinkobj
//                     });

//                 }
//                 //Assets Home page Select cards

//                 if ($(e.target).attr('title') && $(e.target).attr('title').includes('Select')
//                     && ((e.target.nodeName == "IMG" && $(e.target).parent().prop("tagName") == "A")
//                         || (e.target.nodeName == "A" && $(e.target).find('img').length > 0))) {
//                             debugger
//                     var assetCardLinkObj = $.extend({}, globalobj);
//                     assetCardLinkObj["ACTION"] = "clickImage";
//                     assetCardLinkObj["INPUT PARAMETER"] =  $(e.target).attr('title').split(":")[$(e.target).attr('title').split(":").length - 1].trim();
//                     assetCardLinkObj["STEP DESCRIPTION"] = "Click On " + assetCardLinkObj["INPUT PARAMETER"].split('>')[assetCardLinkObj['INPUT PARAMETER'].split('>').length - 1];
//                     if ($(e.target).attr("title") != "Hierarchical Selector") {
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": assetCardLinkObj
//                         });
//                     }
                    

//                 }
//                 //when we click on image tag or svg elemets then we take it as clickimage action with title as param
//                 if ((e.target.nodeName == "IMG" && tableImgTags && tableImgTags.length < 2
//                     && $(e.target).parents("div").first().siblings().find('A').text() == ""
//                     && $($(e.target).parents('td')[0]).prev().find('span').text() == "" && e.target.alt != "Tasks"
//                     && $(e.target).parent().prop('tagName') == "A" && !assetCardLinkObj) || (e.target.nodeName == "A" && e.target.innerText == ""
//                     && $($(e.target).children()[0]).prop('tagName') == "IMG" 
//                     && $($(e.target)).prop('id') !== undefined && !$($(e.target)).prop('id').includes("lovIconId") && !assetCardLinkObj)) {
//                     debugger
//                     var clickLinkobj = $.extend({}, globalobj);
//                     if (e.target.nodeName == "IMG") {
//                         clickLinkobj["ACTION"] = "clickImage";
//                     }
//                     else {
//                         clickLinkobj["ACTION"] = "clickLink";
//                     }

//                     var a_title = $(e.target).attr('title');
//                     if (a_title !== undefined){
//                         var a_title1 = a_title.split(":");
//                         if (a_title1.length > 1) {
//                             var a_inputparam = a_title1[1];
//                         }
//                         else {
//                             var a_inputparam = a_title;
//                         }
//                         clickLinkobj["INPUT PARAMETER"] = a_inputparam
                        
//                     } else {
//                         var a_inputparam = 'drop';
//                     }
                    
                    
//                     clickLinkobj["STEP DESCRIPTION"] = "Click on " + a_inputparam
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //for normal popupHeader
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         clickLinkobj["INPUT PARAMETER"] = correctHeaderName + ">" + a_inputparam

//                     }
//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             clickLinkobj["INPUT PARAMETER"] = popupHeader + ">" + a_inputparam

//                         }

//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     siblingHeaderElementCount = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").length
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {
//                             siblingHeaderElementCount = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").length
//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (siblingHeaderElementCount > 1){
//                                 siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i - 1]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").first().text().trim()
//                             }
//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50) {

//                                 clickLinkobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" + a_inputparam

//                             }
//                             break;
//                         }
//                     }


//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((clickLinkobj["INPUT PARAMETER"]=="" || clickLinkobj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         clickLinkobj["INPUT PARAMETER"] = anchorHeader + ">" + a_inputparam

//                     }
//                     //for reports and analytics page
//                     if ($(e.target).attr("title") == "Hierarchical Selector") {
//                         clickLinkobj["INPUT PARAMETER"] = $($($(e.target).parents("td")[0]).prevUntil('A')[1]).find('A').text() + ">" + $(e.target).attr("title");
//                         clickLinkobj["STEP DESCRIPTION"] = "Click on Image of " + $(e.target).attr("title");

//                     }
//                     //if Query By Example then action as clickFilter
//                     if ($(e.target).attr('title') == "Query By Example") {
//                         clickLinkobj["ACTION"] = "clickFilter";
//                         clickLinkobj["INPUT PARAMETER"] = $(e.target).attr('title')
//                         clickLinkobj["STEP DESCRIPTION"] = "Click On Filter " + $(e.target).attr("title");

//                     }

//                     if (a_inputparam !== 'drop'){
//                         duplicateLogic();
//                     }
                    
//                     //for verisure logout image issue
//                     if ($($($(e.target).parents('td')[0]).siblings('td')[1]).find('a') && $($($(e.target).parents('td')[0]).siblings('td')[1]).find('a').attr('title') == "Settings and Actions Menu") {
//                         clickLinkobj = undefined
//                     }
//                     //if header has number in it to take only param2
//                     let clickImageParam1=clickLinkobj["INPUT PARAMETER"].split(">")[0];
//                     if(hasNumber.test(clickImageParam1)){
//                         clickLinkobj["INPUT PARAMETER"]=clickLinkobj["INPUT PARAMETER"].split(">")[1]
//                     }

//                     if (clickLinkobj["INPUT PARAMETER"].includes('Collapse')  || clickLinkobj["INPUT PARAMETER"].includes('Expand')){
//                         clickLinkobj["ACTION"] = 'clickExpandorcollapse'
//                     }

//                     if (clickLinkobj) {
//                         clickLinkobj["INPUT PARAMETER"] = clickLinkobj["INPUT PARAMETER"].replace(/ *\([^)]*\) */g, "");
//                         clickLinkobj["STEP DESCRIPTION"] = "Click On " + clickLinkobj["INPUT PARAMETER"].split('>')[clickLinkobj['INPUT PARAMETER'].split('>').length - 1];
//                         duplicateData.push(clickLinkobj);
//                         console.log("duplicateData::", duplicateData)
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": clickLinkobj
//                         });
//                     }

//                 }
//                 if (e.target.nodeName === "SPAN" && $(e.target).parent().prop("tagName") === "A" && $(e.target).parent("[role='button']").length <= 0 && $($(e.target).parents("div:has(*[class^='navmenu-header'])")).length <= 0 && $(e.target).next().prop("tagName") !== "svg") {
//                     debugger
//                     var clickLinkobj = $.extend({}, globalobj);
//                     clickLinkobj["ACTION"] = "clickLink";
//                     clickLinkobj["INPUT PARAMETER"] = $(e.target).text().trim().replace(/ *\([^)]*\) */g, "")
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';

//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             clickLinkobj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).text().trim()
//                             //param2 number and nearest label is text
//                             if (hasNumber.test($(e.target).text().trim()) && $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                 clickLinkobj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();

//                             }

//                         }

//                     }


//                     //for normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         clickLinkobj["INPUT PARAMETER"] = correctHeaderName + ">" + $(e.target).text().trim()
//                         //param2 number and nearest label is text
//                         if (hasNumber.test($(e.target).text().trim()) && $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             clickLinkobj["INPUT PARAMETER"] = correctHeaderName + ">" + $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();

//                         }

//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 ) {

//                                 clickLinkobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" + $(e.target).text().trim()

//                             }
//                             //param2 number and nearest label is text
//                             if (hasNumber.test($(e.target).text().trim()) && $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                 clickLinkobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" + $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();

//                             }
//                             break;
//                         }
//                     }

//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((clickLinkobj["INPUT PARAMETER"]=="" || clickLinkobj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         clickLinkobj["INPUT PARAMETER"] = anchorHeader + ">" + $(e.target).text().trim()
//                         //param2 number and nearest label is text
//                         if (hasNumber.test($(e.target).text().trim()) && $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             clickLinkobj["INPUT PARAMETER"] = anchorHeader + ">" + $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();

//                         }
//                     }

                    

//                     duplicateLogic();

//                     if (e.target.parentElement.id.includes('_UIS')){
//                         clickLinkobj = undefined;
//                     }

//                     if (clickLinkobj) {
//                         let clickLinkParams = clickLinkobj["INPUT PARAMETER"].split('>')[0];
//                         if (clickLinkParams.length > 50) {
//                             clickLinkobj["INPUT PARAMETER"] = clickLinkobj["INPUT PARAMETER"].split('>')[1];
//                         }
//                         clickLinkobj["STEP DESCRIPTION"] = "Click On " + clickLinkobj["INPUT PARAMETER"].split('>')[clickLinkobj['INPUT PARAMETER'].split('>').length - 1];
//                         duplicateData.push(clickLinkobj);
//                         console.log("duplicateData::", duplicateData)

//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": clickLinkobj
//                         });
//                     }

//                 }
//                 //Collections spl button
//                 if ($(e.target).attr('role') == "button" &&$(e.target).attr('aria-label')!= undefined && $(e.target).attr('aria-label') != "" && !collapseobj  && !clickLinkobj) {
//                     debugger;
//                     var clickButtonTDobj = $.extend({}, globalobj);
//                     clickButtonTDobj["ACTION"] = "clickButton";
//                     var buttonAria_lebel = $(e.target).attr('aria-label');
//                     clickButtonTDobj["INPUT PARAMETER"] = buttonAria_lebel;
//                     if (buttonAria_lebel == "Previous Month" || buttonAria_lebel == "Next Month") {
//                         clickButtonTDobj = undefined;
//                     }
//                     if(e.target.nodeName=="A"){
//                         clickButtonTDobj["ACTION"] = "clickLink";
//                         clickButtonTDobj["INPUT PARAMETER"] = $(e.target).attr('title');
//                     }

//                     if (clickButtonTDobj["INPUT PARAMETER"] === undefined && $(e.target).attr("role") !== undefined && $(e.target).attr("role") ==='button' && $(e.target).attr('id') !== undefined && $(e.target).attr('id').endsWith("drop")){
//                         clickButtonTDobj= undefined;
//                     }  
//                     clickButtonTDobj["STEP DESCRIPTION"] = "Click On " + clickButtonTDobj["INPUT PARAMETER"].split('>')[clickButtonTDobj['INPUT PARAMETER'].split('>').length - 1];
//                     if (clickButtonTDobj) {
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": clickButtonTDobj
//                         });
//                     }

//                 }
//                 if ((e.target.nodeName == "TD" && e.target.innerText != "" && $(e.target).parent("[role='menuitem']").length > 0) || (e.target.nodeName === 'SPAN' && e.target.parentElement.nodeName === 'TD'  && $(e.target).parent().parent("[role='menuitem']").length > 1 && e.target.parentElement.innerText !== '') ){
//                     debugger;
//                     var clickButtonTDobj = $.extend({}, globalobj);
//                     clickButtonTDobj["ACTION"] = "clickButton";
//                     clickButtonTDobj["INPUT PARAMETER"] = $(e.target).text().trim()
//                     clickButtonTDobj["STEP DESCRIPTION"] = "Click on " + $(e.target).text().trim()




//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';

//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             clickButtonTDobj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).text().trim()

//                         }

//                     }


//                     //for normal popupHeader
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         clickButtonTDobj["INPUT PARAMETER"] = correctHeaderName + ">" + $(e.target).text().trim()

//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 ) {

//                                 clickButtonTDobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" + $(e.target).text().trim()

//                             }
//                             break;
//                         }
//                     }
//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((clickButtonTDobj["INPUT PARAMETER"]=="" || clickButtonTDobj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         clickButtonTDobj["INPUT PARAMETER"] = anchorHeader + ">" + $(e.target).text().trim()
//                     }
//                     duplicateLogic();
//                     clickButtonTDobj["STEP DESCRIPTION"] = "Click On " + clickButtonTDobj["INPUT PARAMETER"].split('>')[clickButtonTDobj['INPUT PARAMETER'].split('>').length - 1];
//                     if (clickButtonTDobj != undefined)
//                         duplicateData.push(clickButtonTDobj);
//                     console.log("duplicateData::", duplicateData)
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clickButtonTDobj
//                     });
//                 }
//                 if(e.target.nodeName == "SPAN"&&$(e.target).parent().prop("tagName")=="BUTTON"){
//                     debugger
//                     var clickButtonSpanobj = $.extend({}, globalobj);
//                     clickButtonSpanobj["ACTION"] = "clickButton";
//                     clickButtonSpanobj["INPUT PARAMETER"] = $(e.target).parent().text()
//                     duplicateLogic();
//                     if (clickButtonSpanobj != undefined)
//                         duplicateData.push(clickButtonSpanobj);
//                     console.log("duplicateData::", duplicateData)
//                     clickButtonSpanobj["STEP DESCRIPTION"] = "Click On " + clickButtonSpanobj["INPUT PARAMETER"].split('>')[clickButtonSpanobj['INPUT PARAMETER'].split('>').length - 1];
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clickButtonSpanobj
//                     });

//                 }

//                 if (($(e.target).parent("[role='button']").length > 0 && e.target.innerText != "" && e.target.nodeName == "SPAN") || ($(e.target).parent().parent("[role='button']").length > 0 && e.target.nodeName == "SPAN")
//                 ||(e.target.nodeName == "DIV" && $(e.target).children().length === 1 && $(e.target).children().attr('role') === 'button')||($(e.target).attr('role') === 'button' && $(e.target).children().length === 1 && e.target.childNodes[0].nodeName === "SPAN" )) {
//                     debugger;
//                     var clickButtonSpanobj = $.extend({}, globalobj);
//                     clickButtonSpanobj["ACTION"] = "clickButton";
//                     clickButtonSpanobj["INPUT PARAMETER"] = $(e.target).text().trim()
//                     clickButtonSpanobj["STEP DESCRIPTION"] = "Click on " + $(e.target).text().trim();
//                     if ($(e.target).parent().parent("[role='button']").length > 0) {
//                         clickButtonSpanobj["INPUT PARAMETER"] = $(e.target).parent().parent("[role='button']").text()
//                         clickButtonSpanobj["STEP DESCRIPTION"] = "Click on " + $(e.target).parent().parent("[role='button']").text()
//                     }

//                     if ($(e.target).parent("[role='button']").length > 0 && $(e.target).parent("[aria-haspopup='true']").length > 0 && e.target.innerText != "" && e.target.nodeName == "SPAN" && $($(e.target).parents("td")[0]).siblings("td").find("a").attr("tabindex") == "-1") {
//                         clickButtonSpanobj["ACTION"] = "clickButton Dropdown";
//                         var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                         //for popupHeader
//                         if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1 && clickButtonSpanobj["INPUT PARAMETER"] !== undefined && clickButtonSpanobj["INPUT PARAMETER"].split(">").length < 2) {
//                             var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                             if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                                 clickButtonSpanobj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).text().trim()
//                                 if ($(e.target).parent().parent("[role='button']").length > 0) {
//                                     clickButtonSpanobj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).parent().text().trim()

//                                 }
//                             }

//                         }
//                         //for normal popupHeader
//                         if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                             var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                             var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                             if (normalHeaderName.length > 1) {

//                                 if ($(normalHeaderName[0]).text() != "") {
//                                     correctHeaderName = $(normalHeaderName[0]).text().trim();


//                                 }
//                                 else if ($(normalHeaderName[1]).text() != "") {
//                                     correctHeaderName = $(normalHeaderName[1]).text().trim();


//                                 }
//                                 else {
//                                     correctHeaderName = $(normalHeaderName).text().trim();

//                                 }

//                             }
//                             clickButtonSpanobj["INPUT PARAMETER"] = correctHeaderName + ">" + $(e.target).text().trim()
//                             if ($(e.target).parent().parent("[role='button']").length > 0) {
//                                 clickButtonSpanobj["INPUT PARAMETER"] = correctHeaderName + ">" + $(e.target).parent().text().trim()

//                             }

//                         }
//                         //Header in siblingdivheaderInForLoop
//                         var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         //to get correct Header when firstHeader is batch or search
//                         let firstHeaderParams = firstHeader.split(":")
//                         var firstHeader_hasNumber = false;
//                         if (firstHeaderParams.length == 1) {
//                             firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                         }
//                         if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                             firstHeader = "";
//                         }
//                         for (let i = 1; i <= 20; i++) {
//                             if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                                 siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                             }
//                             else {

//                                 if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 && clickButtonSpanobj["INPUT PARAMETER"] === '') {

//                                     clickButtonSpanobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" + $(e.target).text().trim()
//                                     if ($(e.target).parent().parent("[role='button']").length > 0) {
//                                         clickButtonSpanobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" + $(e.target).parent().text().trim()

//                                     }
//                                 }
//                                 break;
//                             }
//                         }
//                     }

//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';

//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1 && clickButtonSpanobj["INPUT PARAMETER"] !== undefined && clickButtonSpanobj["INPUT PARAMETER"].split(">").length < 2) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             clickButtonSpanobj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).text().trim()
//                             if ($(e.target).parent().parent("[role='button']").length > 0) {
//                                 clickButtonSpanobj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).parent().text().trim()

//                             }
//                         }

//                     }
//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((clickButtonSpanobj["INPUT PARAMETER"]=="" || clickButtonSpanobj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         clickButtonSpanobj["INPUT PARAMETER"] = anchorHeader + ">" + $(e.target).text().trim()
//                         if ($(e.target).parent().parent("[role='button']").length > 0) {
//                             clickButtonSpanobj["INPUT PARAMETER"] = anchorHeader + ">" + $(e.target).parent().text().trim()

//                         }
//                     }
//                     duplicateLogic();
//                     if (clickButtonSpanobj["INPUT PARAMETER"].split('>').length < 2 ){
//                         clickButtonSpanobj["INPUT PARAMETER"] = clickButtonSpanobj["INPUT PARAMETER"].split('>')[0];
//                     }
//                     clickButtonSpanobj["STEP DESCRIPTION"] = "Click On " + clickButtonSpanobj["INPUT PARAMETER"].split('>')[clickButtonSpanobj['INPUT PARAMETER'].split('>').length - 1];
//                     if (clickButtonSpanobj != undefined)
//                         duplicateData.push(clickButtonSpanobj);
//                     console.log("duplicateData::", duplicateData)
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clickButtonSpanobj
//                     });
//                 }

//                 //GL Buttons
//                 if ((e.target.nodeName == "DIV" && $(e.target).children().length == 1 && $(e.target).children().prop("tagName") == "TABLE") || (e.target.nodeName == "TD" && $(e.target).text().trim() != "" && $($(e.target).parents("div")[2]).attr("data-afrrk") != undefined) || (e.target.nodeName == "DIV" && $(e.target).attr("data-afrrk") != undefined)) {
//                     debugger
//                     var clickButtonDivobj = $.extend({}, globalobj);
//                     clickButtonDivobj["ACTION"] = "clickButton";
//                     clickButtonDivobj["INPUT PARAMETER"] = $(e.target).text().trim();
//                     clickButtonDivobj["STEP DESCRIPTION"] = "Click on " + $(e.target).text().trim();
//                     if (clickButtonDivobj["INPUT PARAMETER"].length < 25) {
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": clickButtonDivobj
//                         });
//                     }

//                 }

//                 //clickImage 
//                 //when we click on image tag or svg elemets then we take it as clickimage action with title as param

//                 if ((e.target.nodeName ==='SPAN' && e.target.title !== undefined && e.target.title.includes('Notification')) 
//                 ||e.target.nodeName == "IMG" && e.target.alt != "Tasks" && $(e.target).parent().prop('tagName') != "A" 
//                 || e.target.nodeName == "path" && $(e.target).parentsUntil("*:has('a')").last().attr("title") != "Navigator" 
//                 && $(e.target).parentsUntil("*:has('a')").last().attr("title") != "Settings and Actions Menu" 
//                 && $(e.target).parentsUntil("*:has('a')").last().attr("class") !== undefined 
//                 && !$(e.target).parentsUntil("*:has('a')").last().attr("class").includes("navmenu")) {
//                     debugger
//                     var clickImageobj = $.extend({}, globalobj);
//                     clickImageobj["ACTION"] = "clickImage";
//                     clickImageobj["INPUT PARAMETER"] =
//                         $(e.target).attr("title")
//                     clickImageobj["STEP DESCRIPTION"] = "Click on Image of " + $(e.target).attr("title")


//                     if ($(e.target).prop("tagName") == "path") {
//                         clickImageobj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('a')").last().attr("title")
//                         clickImageobj["STEP DESCRIPTION"] = "Click on Image of " + $(e.target).parentsUntil("*:has('a')").last().attr("title")

//                         var title = $(e.target).parentsUntil("*:has('a')").last().attr("title");
//                         if (title !== undefined && title.includes("Notifications")) {
//                             clickImageobj["INPUT PARAMETER"] = "Notifications";
//                             clickImageobj["STEP DESCRIPTION"] = "Click on Image of Notifications";
//                         }
//                     }




//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             clickImageobj["INPUT PARAMETER"] = popupHeader + ">" + $(e.target).attr("title")
//                         }
//                     }


//                     //for normal popupHeader
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {
//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();
//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();
//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }
//                         }
//                         clickImageobj["INPUT PARAMETER"] = correctHeaderName + ">" + $(e.target).attr("title")

//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 ) {

//                                 clickImageobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" + $(e.target).attr("title")

//                             }
//                             break;
//                         }
//                     }
//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((clickImageobj["INPUT PARAMETER"]=="" || clickImageobj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         clickImageobj["INPUT PARAMETER"] = anchorHeader + ">" + $(e.target).attr("title")
//                     }
//                     if ($(e.target).attr("title") == "Hierarchical Selector") {
//                         clickImageobj["INPUT PARAMETER"] = $($($(e.target).parents("td")[0]).prevUntil('A')[1]).find('A').text() + ">" + $(e.target).attr("title");
//                         clickImageobj["STEP DESCRIPTION"] = "Click on Image of " + $(e.target).attr("title");

//                     }
//                     if (e.target.nodeName ==='SPAN' && e.target.title !== undefined && e.target.title.includes('Notification')){
//                         clickImageobj["INPUT PARAMETER"] = "Notifications";
//                         clickImageobj["STEP DESCRIPTION"] = "Click on Image of Notifications";
//                     }
//                     //for selectAValue image type(go image)
//                     if ($($(e.target).parents('td')[0]).prev().find('span').text().includes('Go') || $($(e.target).parents('td')[0]).prev().find('span').text().includes('go')) {
//                         clickImageobj = undefined
//                     }
//                     duplicateLogic();
//                     clickImageobj["STEP DESCRIPTION"] = "Click On " + clickImageobj["INPUT PARAMETER"].split('>')[clickImageobj['INPUT PARAMETER'].split('>').length - 1];
//                     if ((e.target.parentElement.id.includes('_UIS'))){
//                         clickImageobj = undefined;
//                     }
//                     if (clickImageobj != undefined)
//                         duplicateData.push(clickImageobj);
//                     console.log("duplicateData::", duplicateData)
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clickImageobj
//                     });
//                 }

//                 if (e.target.nodeName == "SELECT" && !$(e.target).siblings('label').text().includes('Month') && !$(e.target).siblings('label').text().includes('Year') && !$(e.target).siblings('label').text().includes('Day')) {
//                     debugger;
//                     var selectByTextobj = $.extend({}, globalobj);
//                     selectByTextobj["ACTION"] = "selectByText";
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //for normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();
//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();
//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();
//                             }

//                         }
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             selectByTextobj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             selectByTextobj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             selectByTextobj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }

//                     }
//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1) {

//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                 if (popupHeader.length < 50){
//                                     selectByTextobj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parent().siblings("label").text().trim();
//                                 } else {
//                                     selectByTextobj["INPUT PARAMETER"] = $(e.target).parent().siblings("label").text().trim();
//                                 }
                                
//                             }
//                             if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                 if (popupHeader.length < 50){
//                                     selectByTextobj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();
//                                 } else {
//                                     selectByTextobj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();
//                                 }
//                             }
//                             if ($(e.target).siblings("label").text().trim() != "") {
//                                 if (popupHeader.length < 50){
//                                     selectByTextobj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).siblings("label").text().trim() ;
//                                 } else {
//                                     selectByTextobj["INPUT PARAMETER"] = $(e.target).siblings("label").text().trim() ;
//                                 }
//                             }

//                         }

//                     }

//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[1]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 ) {
//                                 if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                     selectByTextobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parent().siblings("label").text().trim()
//                                 }
//                                 if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                     selectByTextobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                                 }
//                                 if ($(e.target).siblings("label").text().trim() != "") {
//                                     selectByTextobj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).siblings("label").text().trim()
//                                 }
//                             }
//                             break;
//                         }
//                     }


//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((selectByTextobj["INPUT PARAMETER"]=="" || selectByTextobj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             selectByTextobj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             selectByTextobj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             selectByTextobj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                     }
//                     //opentask select in InventryManagement
//                     if (selectByTextobj["INPUT PARAMETER"]==""&&$($(e.target).parents('td')[0]).siblings('td').find('label').text() != "" && $($(e.target).parents('td')[0]).siblings('td').find('label').text().length < 30) {
//                         selectByTextobj["INPUT PARAMETER"] = $($(e.target).parents('td')[0]).siblings('td').find('label').text()
//                     }
//                     duplicateLogic();
//                     selectByTextobj["STEP DESCRIPTION"] = "Click On " + selectByTextobj["INPUT PARAMETER"].split('>')[selectByTextobj['INPUT PARAMETER'].split('>').length - 1]
//                     if (selectByTextobj != undefined)
//                         duplicateData.push(selectByTextobj);
//                     console.log("duplicateData::", duplicateData)
//                     // Define the element we wish to bind to.
//                     var bind_to = ':input';

//                     // Prevent double-binding.
//                     $(document.body).off('change', bind_to);

//                     // Bind the event to all body descendants matching the "bind_to" selector.
//                     $(document.body).on('change', bind_to, function (e) {
//                         selectByTextobj["INPUT VALUE"] = $(e.target).attr("title");
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": selectByTextobj
//                         });
//                     });
//                     if (e.type == "click" && selectByTextobj["INPUT VALUE"] == "" && selectByTextobj["INPUT PARAMETER"] != "") {
//                         selectByTextobj["INPUT VALUE"] = $(e.target).attr("title");
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": selectByTextobj
//                         });
//                     }

                    
//                 }
//                 if (e.target.nodeName == "A" && $(e.target).attr("aria-haspopup") == "true" ) {
//                     debugger
//                     var DropdownValuesObj = $.extend({}, globalobj);
//                     DropdownValuesObj["ACTION"] = "Dropdown Values";
//                     //for normal Header
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         DropdownValuesObj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim()
//                         DropdownValuesObj["STEP DESCRIPTION"] = "Select " + $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     }
                    
//                     if ($(e.target).attr("role") !== undefined && $(e.target).attr("role") ==='button' && $(e.target).attr('id') !== undefined && $(e.target).attr('id').endsWith("drop") && DropdownValuesObj["INPUT PARAMETER"] !== undefined && DropdownValuesObj["INPUT PARAMETER"].includes("Setup") ){
//                         DropdownValuesObj["ACTION"] = "clickButton";
//                         DropdownValuesObj["STEP DESCRIPTION"] = "Click On Setup";
//                         DropdownValuesObj["INPUT PARAMETER"] = "Setup";
//                     }

//                     duplicateLogic();
//                     if (DropdownValuesObj["INPUT PARAMETER"].split('>').length < 2){
//                         DropdownValuesObj["INPUT PARAMETER"] = DropdownValuesObj["INPUT PARAMETER"].split('>')[0];
//                     }
//                     if (DropdownValuesObj != undefined)
//                         duplicateData.push(DropdownValuesObj);
//                     console.log("duplicateData::", duplicateData)
//                     // Define the element we wish to bind to.
//                     var bind_to = ':input';

//                     // Prevent double-binding.
//                     $(document.body).off('change', bind_to);

//                     // Bind the event to all body descendants matching the "bind_to" selector.
//                     $(document.body).on('change', bind_to, function (e) {
//                         DropdownValuesObj["INPUT VALUE"] = $(e.target).val();
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": DropdownValuesObj
//                         });
//                     });


//                     if (DropdownValuesObj["ACTION"]==="clickButton"){
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": DropdownValuesObj
//                         });
//                     }
                    
//                 }
//                 if (e.target.nodeName === "LI" && ($(e.target).attr("_adfiv") !== "" || $(e.target).attr("_adfiv") !== undefined)) {
//                     debugger
//                     duplicateLogic();
//                     if (DropdownValuesObj != undefined || duplicateData[duplicateData.length - 1]["ACTION"] == "Dropdown Values")
//                         duplicateData.push(DropdownValuesObj);
//                     else {
//                         if ($(e.target).prop("tagName") === 'LI' && $(e.target).prop("class") !== undefined && $(e.target).prop("class").includes('p_AFSelected')){
//                             var liButtonobj = $.extend({}, globalobj);
//                             liButtonobj["ACTION"] = "clickButton";
//                             liButtonobj["INPUT PARAMETER"] = $(e.target).text().trim();
//                             liButtonobj["STEP DESCRIPTION"] = "Click On " +$(e.target).text().trim();
//                             chrome.runtime.sendMessage({
//                                 "action": "addAction",
//                                 "data": liButtonobj
//                         });
//                         }
                        
//                     }
//                     console.log("duplicateData::", duplicateData)
//                 }
//                 if ((e.target.href == "" && e.target.innerText == "" && $(e.target).attr("title") != "Select Date" && $(e.target).attr("title") != "Select Date and Time" 
//                 && $($(e.target).parents()[1]).siblings("label").prop("tagName") != "LABEL") || 
//                 (e.target.nodeName == "INPUT" && $(e.target).attr("type") == "text" && $(e.target).siblings("a").length > 0 && 
//                 $(e.target).attr("placeholder") != "User ID" && $(e.target).next().prop("tagName") != "LABEL" && $(e.target).next().prop("tagName") != "IMG" 
//                 && $(e.target).parent().siblings("img").length <= 0) || (e.target.nodeName == "INPUT" 
//                 && $(e.target).attr("type") == "text" && $(e.target).siblings().find("a").length == 1
//                 && $(e.target).next().prop("tagName") != "LABEL" && $(e.target).next().prop("tagName") != "IMG"
//                 && $(e.target).parent().siblings("img").length <= 0 && $(e.target).parent().parent().siblings('img').length<=0) 
//                 || (($(e.target).attr("id") != undefined) && ($(e.target).attr("id").includes("::lovIconId") && !$(e.target).attr("id").includes("table") && !$(e.target).attr("id").includes("_ATp")) && ($(e.target).siblings("div").length == 0 && $(e.target).prop("tabindex") === -1)) 
//                 || ($(e.target).prop("nodeName") === 'IMG' && $(e.target).parent().prop("nodeName") === 'A' && $(e.target).parent().prop("tabindex") === -1
//                 && $(e.target).parent().attr("id")!==undefined && $(e.target).parent().attr("id").includes("::lovIconId") && !$(e.target).parent().attr("id").includes("_ATp"))) {
//                     debugger
//                     var DropdownValuesObj = $.extend({}, globalobj);
//                     DropdownValuesObj["ACTION"] = "Dropdown Values";
//                     //for normal Header
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             DropdownValuesObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parent().siblings("label").text().trim();
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             DropdownValuesObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             DropdownValuesObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).siblings("label").text().trim();
//                         }

//                         if ($(e.target).parents('td').first().siblings("td:has('label')").first().text() !== ''){
//                             DropdownValuesObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                             $(e.target).parents('td').first().siblings("td:has('label')").first().text();
//                         }

//                         if ($(e.target).parents("span:has('input')").children('label').first().text().trim() !== ''){
//                             DropdownValuesObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                             $(e.target).parents("span:has('input')").children('label').first().text().trim() ;
//                         }

//                     }
//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1  && DropdownValuesObj["INPUT PARAMETER"] !== undefined && DropdownValuesObj["INPUT PARAMETER"].split(">").length < 2 ) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                 DropdownValuesObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parent().siblings("label").text().trim()
//                             }
//                             if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                 DropdownValuesObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                             }
//                             if ($(e.target).siblings("label").text().trim() != "") {
//                                 DropdownValuesObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).siblings("label").text().trim()
//                             }
//                             if ($(e.target).parents("span:has('input')").children('label').first().text().trim() !== ''){
//                                 DropdownValuesObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                 $(e.target).parents("span:has('input')").children('label').first().text().trim() ;
//                             }
//                         }

//                     }

//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {

//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 && DropdownValuesObj["INPUT PARAMETER"] === '') {
//                                 if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                     DropdownValuesObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parent().siblings("label").text().trim()
//                                 }
//                                 if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                     DropdownValuesObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                                 }
//                                 if ($(e.target).siblings("label").text().trim() != "") {
//                                     DropdownValuesObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).siblings("label").text().trim()
//                                 }
//                                 if ($(e.target).parents("span:has('input')").children('label').first().text().trim() !== ''){
//                                     DropdownValuesObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                     $(e.target).parents("span:has('input')").children('label').first().text().trim() ;
//                                 }
//                             }
//                             break;
//                         }
//                     }


//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if (DropdownValuesObj["INPUT PARAMETER"]===""&&anchorHeader !== "" && anchorHeader !== undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             DropdownValuesObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             DropdownValuesObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             DropdownValuesObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                     }
//                     if (e.target.nodeName == "A" && $(e.target).text().trim() == "" && $(e.target).attr("title") != "" && $(e.target).attr("title") !== undefined && DropdownValuesObj["INPUT PARAMETER"] == "") {
//                         DropdownValuesObj["ACTION"] = "clickLink";
//                         DropdownValuesObj["INPUT PARAMETER"] = $(e.target).attr("title").replace(/ *\([^)]*\) */g, "");
//                     }
//                     duplicateLogic();
//                     let userID = $(e.target).attr('id')
//                     if (userID == "userid" || userID == "password") {
//                         DropdownValuesObj = undefined;
//                     }
//                     if (DropdownValuesObj != undefined)
//                         duplicateData.push(DropdownValuesObj);
//                     console.log("duplicateData::", duplicateData)
//                     // Define the element we wish to bind to.
//                     var bind_to = ':input';

//                     // Prevent double-binding.
//                     $(document.body).off('change', bind_to);

//                     // Bind the event to all body descendants matching the "bind_to" selector.
//                     $(document.body).on('change', bind_to, function (e) {
//                         DropdownValuesObj["INPUT VALUE"] = $(e.target).val();
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": DropdownValuesObj
//                         });
//                     });
//                     if ((e.type == "click" && $(e.target).val() != "") || ($(e.target).parent().find('a').length === 1 && e.target.nodeName === 'INPUT')) {
//                         DropdownValuesObj["INPUT VALUE"] = $(e.target).val();
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": DropdownValuesObj
//                         });
//                     }
//                     if (e.target.nodeName == "A" && e.type == "click") {
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": TableDropdownValuesObj
//                         });
                    
//                     }
//                     if (e.target.nodeName == "A" && e.type == "click" && !TableDropdownValuesObj && DropdownValuesObj) {
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": DropdownValuesObj
//                         });
//                     }

//                 }
//                 if ((e.target.nodeName == "A" && e.target.href == "" && e.target.innerText == "" && $(e.target).attr("title") != "Select Date" 
//                 && $(e.target).attr("title") != "Select Date and Time" && $($(e.target).parents()[1]).siblings("label").length == 1 && !DropdownValuesObj) 
//                 || (e.target.href == "" && e.target.innerText == "" && $(e.target).siblings("label").length == 1 && $(e.target).next().prop("tagName") != "IMG" 
//                 && $(e.target).attr("title")!="Select Date" && $(e.target).attr("title")!="Select Date and Time" && !DropdownValuesObj)
//                 || (e.target.nodeName == "INPUT" && $(e.target).attr("type") == "text" && $(e.target).next().prop("tagName") == "LABEL"
//                 && $(e.target).siblings().find("a").length == 1 && $(e.target).siblings().find("img").length <= 0
//                 && $(e.target).siblings("img").length <= 0 && !DropdownValuesObj || 
//                 (e.target.nodeName == "INPUT" && $(e.target).attr("type") == "text" && $(e.target).next().prop("tagName") == "LABEL" && $(e.target).siblings("a").length == 1
//                 && $(e.target).siblings().find("img").length <= 0 && $(e.target).siblings("img").length <= 0 && !DropdownValuesObj))
//                 || ($(e.target).prop("nodeName") === 'IMG' && $(e.target).parent().prop("nodeName") === 'A' && $(e.target).parent().prop("tabindex") === -1 
//                 && $(e.target).parent().attr("id")!==undefined && $(e.target).parent().attr("id").includes("::lovIconId") && !DropdownValuesObj)) {
//                     debugger;
//                     var TableDropdownValuesObj = $.extend({}, globalobj);
//                     TableDropdownValuesObj["ACTION"] = "Table Dropdown Values";
//                     var tabledropLabel = $($(e.target).parents("table")[0]).parent().siblings("td").find("label").text().trim();
//                     var tabledropLabel1 = $($(e.target).parents("table")[1]).parent().siblings("td").find("label").text().trim();
//                     var tabledropLabel2 = $($(e.target).parents("td")[0]).siblings("td").find("label").text().trim();
//                     var tabledropLabel3 = $($(e.target).parents("div")[0]).siblings("div").find("label").text().trim();

//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //for normal table dropdownvalues
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         TableDropdownValuesObj["ACTION"] = "Table Dropdown Values";
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             TableDropdownValuesObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             TableDropdownValuesObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             TableDropdownValuesObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                         if (e.target.nodeName == "A" && $($(e.target).parents()[1]).siblings("label").text().trim() != "") {
//                             TableDropdownValuesObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $($(e.target).parents()[1]).siblings("label").text().trim()
//                         }
//                         if (e.target.nodeName == "A" && $($(e.target).parents()[1]).siblings("label").text().trim() != "" && $($(e.target).parents("td")[0]).siblings().find("label").text().trim().length < 20) {
//                             TableDropdownValuesObj["ACTION"] = "Dropdown Values";
//                             TableDropdownValuesObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $($(e.target).parents()[1]).siblings("label").text().trim()
//                         }
//                         if ((tabledropLabel != "" && tabledropLabel.length < 25) || (tabledropLabel1 != "" && tabledropLabel1.length < 25) || (tabledropLabel2 != "" && tabledropLabel2.length < 25) || (tabledropLabel3 != "" && tabledropLabel3.length < 25) || (tabledropLabel3 != "" && tabledropLabel3.length < 25)) {
//                             TableDropdownValuesObj["ACTION"] = "Dropdown Values";

//                         }
//                     }


//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1 && TableDropdownValuesObj["INPUT PARAMETER"] === '') {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {
//                             TableDropdownValuesObj["ACTION"] = "Dropdown Values";

//                             if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                 TableDropdownValuesObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parent().siblings("label").text().trim()
//                             }
//                             if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                 TableDropdownValuesObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                             }
//                             if ($(e.target).siblings("label").text().trim() != "") {
//                                 TableDropdownValuesObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).siblings("label").text().trim()
//                             }
//                             if (e.target.nodeName == "A" && $($(e.target).parents()[1]).siblings("label").text().trim() != "") {
//                                 TableDropdownValuesObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $($(e.target).parents()[1]).siblings("label").text().trim()
//                             }
//                             if (e.target.nodeName == "A" && $($(e.target).parents()[1]).siblings("label").text().trim() != "" && $($(e.target).parents("td")[0]).siblings().find("label").text().trim().length < 20) {
//                                 TableDropdownValuesObj["ACTION"] = "Dropdown Values";
//                                 TableDropdownValuesObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $($(e.target).parents()[1]).siblings("label").text().trim()
//                             }
//                             if ((tabledropLabel != "" && tabledropLabel.length < 25) || (tabledropLabel1 != "" && tabledropLabel1.length < 25) || (tabledropLabel2 != "" && tabledropLabel2.length < 25) || (tabledropLabel3 != "" && tabledropLabel3.length < 25) || (tabledropLabel3 != "" && tabledropLabel3.length < 25) || (tabledropLabel3 != "" && tabledropLabel3.length < 25)) {
//                                 TableDropdownValuesObj["ACTION"] = "Dropdown Values";

//                             }
//                         }

//                     }

//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50  && TableDropdownValuesObj["INPUT PARAMETER"] === '') {
//                                 if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                     TableDropdownValuesObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parent().siblings("label").text().trim()
//                                 }
//                                 if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                     TableDropdownValuesObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                                 }
//                                 if ($(e.target).siblings("label").text().trim() != "") {
//                                     TableDropdownValuesObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).siblings("label").text().trim()
//                                 }
//                                 if (e.target.nodeName == "A" && $($(e.target).parents()[1]).siblings("label").text().trim() != "") {
//                                     TableDropdownValuesObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $($(e.target).parents()[1]).siblings("label").text().trim()
//                                 }
//                                 if (e.target.nodeName == "A" && $($(e.target).parents()[1]).siblings("label").text().trim() != "" && $($(e.target).parents("td")[0]).siblings().find("label").text().trim().length < 20) {
//                                     TableDropdownValuesObj["ACTION"] = "Dropdown Values";
//                                     TableDropdownValuesObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $($(e.target).parents()[1]).siblings("label").text().trim()
//                                 }
//                                 if ((tabledropLabel != "" && tabledropLabel.length < 25) || (tabledropLabel1 != "" && tabledropLabel1.length < 25) || (tabledropLabel2 != "" && tabledropLabel2.length < 25) || (tabledropLabel3 != "" && tabledropLabel3.length < 25) || (tabledropLabel3 != "" && tabledropLabel3.length < 25) || (tabledropLabel3 != "" && tabledropLabel3.length < 25)) {
//                                     TableDropdownValuesObj["ACTION"] = "Dropdown Values";

//                                 }
//                             }
//                             break;
//                         }
//                     }



//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((TableDropdownValuesObj["INPUT PARAMETER"]=="" || TableDropdownValuesObj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             TableDropdownValuesObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             TableDropdownValuesObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             TableDropdownValuesObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                         if (e.target.nodeName == "A" && $($(e.target).parents()[1]).siblings("label").text().trim() != "") {
//                             TableDropdownValuesObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $($(e.target).parents()[1]).siblings("label").text().trim()
//                         }
//                         if (e.target.nodeName == "A" && $($(e.target).parents()[1]).siblings("label").text().trim() != "" && $($(e.target).parents("td")[0]).siblings().find("label").text().trim().length < 20) {
//                             TableDropdownValuesObj["ACTION"] = "Dropdown Values";
//                             TableDropdownValuesObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $($(e.target).parents()[1]).siblings("label").text().trim()
//                         }
//                         if ((tabledropLabel != "" && tabledropLabel.length < 25) || (tabledropLabel1 != "" && tabledropLabel1.length < 25) || (tabledropLabel2 != "" && tabledropLabel2.length < 25) || (tabledropLabel3 != "" && tabledropLabel3.length < 25) || (tabledropLabel3 != "" && tabledropLabel3.length < 25) || (tabledropLabel3 != "" && tabledropLabel3.length < 25)) {
//                             TableDropdownValuesObj["ACTION"] = "Dropdown Values";

//                         }

//                     }
//                     duplicateLogic();
//                     //Inventory management viewBy dropdown
//                     if(TableDropdownValuesObj["INPUT PARAMETER"].length>60){
//                         if($(e.target).parents('div').first().siblings('div').find('span').first().text()!=""){
//                             TableDropdownValuesObj["INPUT PARAMETER"]=$(e.target).parents('div').first().siblings('div').find('span').first().text()+">"+$($(e.target).parents('div').first().siblings('div').find('span')[1]).text();
//                         }
//                     }
//                     if (TableDropdownValuesObj != undefined)
//                         duplicateData.push(TableDropdownValuesObj);
//                     console.log("duplicateData::", duplicateData)
//                     // Define the element we wish to bind to.
//                     var bind_to = ':input';

//                     // Prevent double-binding.
//                     $(document.body).off('change', bind_to);

//                     // Bind the event to all body descendants matching the "bind_to" selector.
//                     $(document.body).on('change', bind_to, function (e) {
//                         TableDropdownValuesObj["INPUT VALUE"] = $(e.target).val();
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": TableDropdownValuesObj
//                         });
//                     });
//                     if (e.type == "click" && $(e.target).val() != "") {
//                         TableDropdownValuesObj["INPUT VALUE"] = $(e.target).val();
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": TableDropdownValuesObj
//                         });
//                     }
//                     if (e.target.nodeName == "A" && e.type == "click") {
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": TableDropdownValuesObj
//                         });
//                     }

//                 }
//                 if ($(e.target).prev().attr('type') == "radio") {
//                     debugger;
//                     var clickRadioObj = $.extend({}, globalobj);
//                     clickRadioObj["ACTION"] = "clickRadiobutton";
//                     clickRadioObj["INPUT PARAMETER"] = $($(e.target).parents("td")[0]).prev().find("label").text().trim();
//                     clickRadioObj["STEP DESCRIPTION"] = "Click on RadioButton of " + $($(e.target).parents('td')[1]).prev().find('label').text();
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != ""  && clickRadioObj["INPUT PARAMETER"] !== '') {

//                         if ($($(e.target).parents('td')[1]).prev().find('label').text() !== undefined && $($(e.target).parents('td')[1]).prev().find('label').text() !== ''){
//                         clickRadioObj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() + ">" + $($(e.target).parents('td')[1]).prev().find('label').text();
//                         } else {
//                             clickRadioObj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() + ">" + $($(e.target).parents('td')[0]).prev().find('label').text();
//                         }
//                         if ($(e.target).parent().siblings('legend').text() != "") {
//                             clickRadioObj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() + ">" + $(e.target).parent().siblings('legend').text();
//                             clickRadioObj["STEP DESCRIPTION"] = "Click on RadioButton of " + $(e.target).parent().siblings('legend').text();

//                         }
//                     }
//                     if ($(e.target).text() != "") {
//                         clickRadioObj["INPUT VALUE"] = $(e.target).text();
//                     }
//                     else if ($(e.target).next().text() != "") {
//                         clickRadioObj["INPUT VALUE"] = $(e.target).next().text();

//                     }
                        
//                     if(clickRadioObj){
//                         duplicateData.push(clickRadioObj)
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": clickRadioObj
//                         });
//                     }

//                 }
//                 if ((e.target.nodeName == "LABEL" && $(e.target).prev().attr("type") == "checkbox") || (e.target.nodeName == "INPUT" && $(e.target).attr("type") == "checkbox")) {
//                     debugger;
//                     var clickcheckboxObj = $.extend({}, globalobj);
//                     clickcheckboxObj["ACTION"] = "clickCheckbox";
//                     clickcheckboxObj["INPUT PARAMETER"] = $($(e.target).parents("td")[0]).prev().find("label").text().trim();
//                     clickcheckboxObj["STEP DESCRIPTION"] = "Click on checkbox of " + $($(e.target).parents("td")[0]).prev().find("label").text().trim();
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     if ($($(e.target).parents("td")[0]).prev().find("label").text().trim() != "") {
//                         clickcheckboxObj["INPUT PARAMETER"] = $($(e.target).parents("td")[0]).prev().find("label").text().trim();

//                     }

//                     //normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {

//                         clickcheckboxObj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim()

//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 ) {
//                                 clickcheckboxObj["INPUT PARAMETER"] = siblingdivheaderInForLoop

//                             }
//                             break;
//                         }
//                     }
//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1 && clickcheckboxObj["INPUT PARAMETER"] !== undefined  && clickcheckboxObj["INPUT PARAMETER"].split(">").length < 2) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         clickcheckboxObj["INPUT PARAMETER"] = popupHeader;

//                     }
//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((clickcheckboxObj["INPUT PARAMETER"]=="" || clickcheckboxObj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         clickcheckboxObj["INPUT PARAMETER"] = anchorHeader

//                     }

//                     if (e.target.nodeName == "LABEL") {
//                         clickcheckboxObj["INPUT VALUE"] = $(e.target).text();
//                     }
//                     if ($(e.target).siblings('label').text() != "") {
//                         clickcheckboxObj["INPUT VALUE"] = $(e.target).siblings('label').text();
//                     }
//                     //Create Invoice checkbox value
//                     if ($($(e.target).parents('tr').first().prev().find('th')[1]).text() != "") {
//                         clickcheckboxObj["INPUT VALUE"] = $($(e.target).parents('tr').first().prev().find('th')[1]).text();
//                     }
//                     duplicateLogic();
//                     if ($(e.target).text() != "") {
//                         clickcheckboxObj["INPUT VALUE"] = $(e.target).text();
//                     }
//                     else if ($(e.target).next().text() != "") {
//                         clickcheckboxObj["INPUT VALUE"] = $(e.target).next().text();
//                     }

//                     if (clickcheckboxObj["INPUT PARAMETER"].includes(":")){
//                         clickcheckboxObj["INPUT PARAMETER"] = clickcheckboxObj["INPUT PARAMETER"].split(':')[0];
//                     }

//                     if(clickcheckboxObj){
//                         duplicateData.push(clickcheckboxObj);
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": clickcheckboxObj
//                         });
//                     }
                    
//                 }
//                 if (e.target.nodeName == "TEXTAREA") {
//                     debugger;
//                     var textAreaObj = $.extend({}, globalobj);
//                     textAreaObj["ACTION"] = "textarea";
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';

//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1  && textAreaObj["INPUT PARAMETER"] !== undefined && textAreaObj["INPUT PARAMETER"].split(">").length < 2) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                 textAreaObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parent().siblings("label").text().trim()
//                             }
//                             if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                 textAreaObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                             }
//                             if ($(e.target).siblings("label").text().trim() != "") {
//                                 textAreaObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).siblings("label").text().trim()
//                             }
//                         }

//                     }


//                     //normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {

//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             textAreaObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             textAreaObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             textAreaObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }

//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 && textAreaObj["INPUT PARAMETER"] === '') {
//                                 if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                     textAreaObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parent().siblings("label").text().trim()
//                                 }
//                                 if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                     textAreaObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                                 }
//                                 if ($(e.target).siblings("label").text().trim() != "") {
//                                     textAreaObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).siblings("label").text().trim()
//                                 }
//                             }
//                             break;
//                         }
//                     }



//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if (textAreaObj["INPUT PARAMETER"] ==""&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             textAreaObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             textAreaObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             textAreaObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                     }

//                     duplicateLogic();
//                     if (textAreaObj != undefined)
//                         duplicateData.push(textAreaObj);
//                     console.log("duplicateData::", duplicateData)
//                     // Define the element we wish to bind to.
//                     var bind_to = ':input';

//                     // Prevent double-binding.
//                     $(document.body).off('change', bind_to);

//                     // Bind the event to all body descendants matching the "bind_to" selector.
//                     $(document.body).on('change', bind_to, function (e) {
//                         textAreaObj["INPUT VALUE"] = $(e.target).val();
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": textAreaObj
//                         });
//                     });
//                     if (e.type == "click" && $(e.target).val() != "") {
//                         textAreaObj["INPUT VALUE"] = $(e.target).val();

//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": textAreaObj
//                         });
//                     }
//                 }

//                 if ((e.target.nodeName == "TD" && !DropdownValuesObj && !TableDropdownValuesObj && $(e.target).attr("tabindex") != undefined) || (e.target.nodeName == "SPAN" && $($(e.target).parents("td")[0]).attr("tabindex") != undefined)) {
//                     debugger;
//                     var tableRowSelectObj = $.extend({}, globalobj);
//                     tableRowSelectObj["ACTION"] = "tableRowSelect"
//                     tableRowSelectObj["INPUT PARAMETER"] = $($(e.target).parents("table")[0]).attr("summary")

//                     var hasNumber = /\d/;
//                     var inputParam = tableRowSelectObj["INPUT PARAMETER"];
//                     if (hasNumber.test(inputParam)) {
//                         tableRowSelectObj["ACTION"] = "tableRowSelect"
//                         tableRowSelectObj["INPUT PARAMETER"] = "";
//                     }
//                     if (tableRowSelectObj["INPUT PARAMETER"] == "Invoice Lines") {
//                         tableRowSelectObj["INPUT PARAMETER"] = "";

//                     }
//                     duplicateLogic();
//                     if (tableRowSelectObj &&tableRowSelectObj["INPUT PARAMETER"]&& tableRowSelectObj["INPUT PARAMETER"] != "") {
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": tableRowSelectObj
//                         });
//                     }
                    

//                 }




//                 //SelectAValue
//                 // if ((e.target.nodeName == "A" && $($(e.target).parents('table')[0]).find('a').length > 5 && $(e.target).text().trim() != "") && ($($(e.target).parents()[1]).prop('tagName') == "TD")) {

//                     if (((e.target.nodeName == "A"&&!clickLinkobj && !DropdownValuesObj && !TableDropdownValuesObj && tableAtextElements && tableAtextElements.length > 2 && !clickButtonSpanobj) || (e.target.nodeName == "IMG"&&tableImgTags&&tableImgTags.length>1))) {
//                     debugger;
//                     var selectAValueObj = $.extend({}, globalobj);
//                     selectAValueObj["ACTION"] = "selectAValue"
//                     if (e.target.nodeName == "A") {
//                         selectAValueObj["INPUT VALUE"] = $(e.target).text().trim();
//                     }
//                     else {
//                         if ($($(e.target).parents('td')[0]).prev().find('span').text() != "") {
//                             selectAValueObj["INPUT VALUE"] = $(e.target).attr("title");
//                         }
//                         if(e.target.nodeName == "IMG"){
//                             selectAValueObj["INPUT VALUE"] = $(e.target).attr("title");
//                             if($(e.target).parents('td').first().siblings('td').first().text()!=""){
//                                 selectAValueObj["INPUT VALUE"] =$(e.target).parents('td').first().siblings('td').first().text();
//                             }
//                         }

//                     }






//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //for normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         selectAValueObj["INPUT PARAMETER"] = correctHeaderName

//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 && selectAValueObj["INPUT PARAMETER"] === '') {

//                                 selectAValueObj["INPUT PARAMETER"] = siblingdivheaderInForLoop

//                             }
//                             break;
//                         }
//                     }
//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     // }

//                     if ((selectAValueObj["INPUT PARAMETER"]=="" || selectAValueObj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         selectAValueObj["INPUT PARAMETER"] = anchorHeader
//                     }
//                     duplicateLogic();

//                     if ($(e.target).text().trim() == "More...") {
//                         selectAValueObj = undefined;
//                     }
                    
//                     if(e.target.nodeName=="IMG" || $(e.target).parent().find('a').length > 1){
//                         if ($(e.target).parent().find('a').length > 1){
//                             selectAValueObj["INPUT PARAMETER"] = selectAValueObj["INPUT PARAMETER"] + ">" + selectAValueObj["INPUT VALUE"];
//                             selectAValueObj["INPUT VALUE"] = undefined;
//                         } else {
//                             selectAValueObj["INPUT PARAMETER"] =selectAValueObj["INPUT PARAMETER"] +">"+$(e.target).attr("title");
//                         }
//                     }

//                     if (e.target.nodeName === 'A' && $(e.target).attr("role") === 'button'){
//                         selectAValueObj["ACTION"] = "clickButton";
//                         if (selectAValueObj["INPUT VALUE"] && selectAValueObj["INPUT PARAMETER"].split('>').length < 2){
//                             selectAValueObj["INPUT PARAMETER"] = selectAValueObj["INPUT PARAMETER"] + ">" + selectAValueObj["INPUT VALUE"];
//                             selectAValueObj["INPUT VALUE"] = undefined;
//                         }
                        
//                     }
//                     if (selectAValueObj["INPUT PARAMETER"].split('>').length < 2 && ($(e.target).text().trim() !== undefined || $(e.target).text().trim() !== '' ) && !hasNumber.test($(e.target).text().trim()) ){
//                         selectAValueObj["INPUT PARAMETER"] = selectAValueObj["INPUT PARAMETER"] + ">" +$(e.target).text().trim();
//                         selectAValueObj["INPUT VALUE"] = undefined;
//                     }
//                     if (selectAValueObj) {

//                         duplicateData.push(selectAValueObj);
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": selectAValueObj
//                         });
//                     }

//                 }
//                 // && tableAtextElements && tableAtextElements.length < 2
//                 if ((e.target.nodeName == "A" && !clickLinkobj && !DropdownValuesObj && !TableDropdownValuesObj && !selectAValueObj && (tablesummary || tablesummary1 || tablesummary2))) {
//                     debugger;
//                     var clickTableLinkObj = $.extend({}, globalobj);
//                     clickTableLinkObj["ACTION"] = "clickTableLink"
//                     clickTableLinkObj["INPUT PARAMETER"] = tablesummary
//                     if (tablesummary1 != undefined && tablesummary1.trim() != "") {
//                         clickTableLinkObj["ACTION"] = "clickTableLink"
//                         clickTableLinkObj["INPUT PARAMETER"] = tablesummary1
//                     }
//                     if (tablesummary2 != undefined && tablesummary2.trim() != "") {
//                         clickTableLinkObj["ACTION"] = "clickTableLink"
//                         clickTableLinkObj["INPUT PARAMETER"] = tablesummary2
//                     }
//                     if ((clickTableLinkObj["INPUT PARAMETER"] != undefined && clickTableLinkObj["INPUT PARAMETER"] != "") && (clickTableLinkObj["INPUT PARAMETER"] == "Tasks" || clickTableLinkObj["INPUT PARAMETER"] == "Compensation History" || clickTableLinkObj["INPUT PARAMETER"] == "Search" || clickTableLinkObj["INPUT PARAMETER"] == "Invoice Lines")) {
//                         clickTableLinkObj["ACTION"] = "clickLink";
//                         clickTableLinkObj["INPUT PARAMETER"] = $(e.target).text().trim().replace(/ *\([^)]*\) */g, "")
//                         clickTableLinkObj["STEP DESCRIPTION"] = "Click on " + $(e.target).text().trim()
//                     }
//                     if (clickTableLinkObj["INPUT PARAMETER"] != undefined && clickTableLinkObj["INPUT PARAMETER"] == "Lines") {
//                         clickTableLinkObj = undefined;
//                     }
//                     if($(e.target).attr('title')&&$(e.target).attr('title').includes('Search')){
//                         clickTableLinkObj=undefined;
//                     }
//                     if (clickTableLinkObj != undefined) {

//                         duplicateData.push(clickTableLinkObj);
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": clickTableLinkObj
//                         });
//                     }
//                     console.log("duplicateData::", duplicateData)


//                 }
//                 //FilterPage sendkeys which does'nt have label
//                 if (!TableDropdownValuesObj&&e.target.nodeName == "INPUT" && $(e.target).attr('type') == "text" && $($($(e.target).parents('tr')[0]).find('input')).length > 2 && $($(e.target).parents('tr')[0]).siblings('tr').find('span').length > 1) {
//                     debugger
//                     var sendkeysObj = $.extend({}, globalobj);
//                     // sendkeysObj["ACTION"] = "clickFilter"
//                     sendkeysObj["ACTION"] = "Table SendKeys"
//                     let inputCount = 0;
//                     let inputHiddenCount = 0;
//                     var inputId = $(e.target).attr('id');
//                     var inputList = $($(e.target).parents('tr')[0]).find('input');
//                     for (let i = 0; i < inputList.length; i++) {
//                         if (inputId == inputList[i].id) {
//                             inputCount = i;
//                             break;
//                         }
//                         if (inputList[i].type == "hidden") {
//                             inputHiddenCount++;

//                         }


//                     }

//                     if (inputCount != undefined) {
//                         inputCount = inputCount - inputHiddenCount;
//                         var spanList = $($(e.target).parents('tr')[0]).siblings('tr').find('span')
//                         var spanName = $(spanList[inputCount]).text().trim()
//                     }
//                     if (inputId.includes('journalBatch')) {
//                         var spanName = "Journal Batch";
//                     }

//                     if (spanName === ''){
//                         inputList = $(e.target).parents('tr').first().find('td:has(span)') ;
//                         for (let i = 0; i < inputList.length ; i++){
//                             if (inputId === $(inputList[i]).find('input').prop('id')){
//                                 inputCount = i ;
//                                 break;
//                             }
//                         }
//                         spanName = $($(e.target).parents('table:has(th)').first().find('th:has(span)')[inputCount]).text().trim();

//                     }




//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {
//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         if (spanName != undefined && spanName != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" + spanName

//                         }

//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 && sendkeysObj["INPUT PARAMETER"] === '') {
//                                 if (spanName != undefined && spanName != "") {
//                                     sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" + spanName

//                                 }
//                             }
//                             break;
//                         }
//                     }



//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((sendkeysObj["INPUT PARAMETER"]=="" || sendkeysObj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         if (spanName != undefined && spanName != "") {
//                             sendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" + spanName

//                         }
//                     }
//                     if (($(e.target).attr("title") == "Select Date") || ($(e.target).attr("title") == "Select Date and Time")) {
//                         sendkeysObj["ACTION"] = "SendKeysDate"
//                     }
//                     duplicateLogic();
//                     if (sendkeysObj != undefined) {
//                         duplicateData.push(sendkeysObj);
//                     }
//                     console.log("duplicateData::", duplicateData)
//                     // Define the element we wish to bind to.
//                     var bind_to = ':input';

//                     // Prevent double-binding.
//                     $(document.body).off('change', bind_to);

//                     // Bind the event to all body descendants matching the "bind_to" selector.
//                     $(document.body).on('change', bind_to, function (e) {
//                         sendkeysObj["INPUT VALUE"] = $(e.target).val();
//                         if (sendkeysObj["ACTION"] != "SendKeysDate") {
//                             chrome.runtime.sendMessage({
//                                 "action": "addAction",
//                                 "data": sendkeysObj
//                             });
//                         }
//                     });
//                     if (e.type == "click" && $(e.target).val() != "") {
//                         sendkeysObj["INPUT VALUE"] = $(e.target).val();

//                         if (sendkeysObj["ACTION"] != "SendKeysDate") {
//                             chrome.runtime.sendMessage({
//                                 "action": "addAction",
//                                 "data": sendkeysObj
//                             });
//                         }
//                     }
//                 }
//                 if ((e.target.nodeName == "INPUT" && $(e.target).attr("placeholder") == "m/d/yy") 
//                 || (e.target.nodeName == "INPUT" && $(e.target).next().text().trim() == "Press down arrow to access Calendar") 
//                 || ($(e.target).attr("title")=="Select Date" || $(e.target).attr("title")=="Select Date and Time") 
//                 || ($(e.target).attr("id") != undefined && $(e.target).attr("id").includes("::glyph"))
//                 || (e.target.nodeName == "INPUT" && $(e.target).attr('type') == "text" && $(e.target).attr('aria-live')=='off')) {
//                     debugger
//                     var sendkeysObj = $.extend({}, globalobj);
//                     sendkeysObj["ACTION"] = "SendKeys"



//                     //conflict between date type sendkeys and tablesendkeys
//                     var tableLabel = $($(e.target).parents("table")[0]).parent().siblings("td").find("label").text().trim();
//                     var tableLabel1 = $($(e.target).parents("table")[1]).parent().siblings("td").find("label").text().trim();
//                     var tableLabel2 = $($(e.target).parents("td")[0]).siblings("td").find("label").text().trim();
//                     if ((tableLabel.length != 0 && tableLabel.length < 25) || (tableLabel1.length != 0 && tableLabel1.length < 25) || (tableLabel2.length != 0 && tableLabel2.length < 25)) {
//                         sendkeysObj["ACTION"] = "SendKeys"
//                     }
//                     else {
//                         sendkeysObj["ACTION"] = "Table SendKeys"
//                     }
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1 && sendkeysObj["INPUT PARAMETER"] !== undefined && sendkeysObj["INPUT PARAMETER"].split(">").length < 2) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                 sendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parent().siblings("label").text().trim()
//                             }
//                             if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                 sendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                             }
//                             if ($(e.target).siblings("label").text().trim() != "") {
//                                 sendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).siblings("label").text().trim()
//                             }
//                         }

//                     }

//                     //normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != ""
//                     || $(e.target).parents('*:has("h1,h2,h3,h4,h5,h6")').find('h1,h2,h3,h4,h5,h6').length>0 ) {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {
//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         if (normalHeaderName.length === 0){
//                             normalHeaderName = $(e.target).parents('*:has("h1,h2,h3,h4,h5,h6")').find('h1,h2,h3,h4,h5,h6');
//                             correctHeaderName = $(e.target).parents('*:has("h1,h2,h3,h4,h5,h6")').find('h1,h2,h3,h4,h5,h6').text().trim();
//                             if (normalHeaderName.length > 1) {
//                                 if ($(normalHeaderName[0]).text() != "") {
//                                     correctHeaderName = $(normalHeaderName[0]).text().trim();
    
    
//                                 }
//                                 else if ($(normalHeaderName[1]).text() != "") {
//                                     correctHeaderName = $(normalHeaderName[1]).text().trim();
    
    
//                                 }
//                                 else {
//                                     correctHeaderName = $(normalHeaderName).text().trim();
    
//                                 }
    
//                             }
//                         }
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                     }



//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 && sendkeysObj["INPUT PARAMETER"] === '') {
//                                 if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                     sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parent().siblings("label").text().trim()
//                                 }
//                                 if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                     sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                                 }
//                                 if ($(e.target).siblings("label").text().trim() != "") {
//                                     sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).siblings("label").text().trim()
//                                 }
//                             }
//                             break;
//                         }
//                     }



//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((sendkeysObj["INPUT PARAMETER"]=="" || sendkeysObj["INPUT PARAMETER"].includes("Edit Document"))&&anchorHeader != "" && anchorHeader != undefined) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                     }
//                     if (($(e.target).attr("title") == "Select Date") || ($(e.target).attr("title") == "Select Date and Time")) {
//                         sendkeysObj["ACTION"] = "SendKeysDate"
//                     }
//                     duplicateLogic();
//                     if (sendkeysObj != undefined) {
//                         duplicateData.push(sendkeysObj);
//                     } console.log("duplicateData::", duplicateData)
//                     // Define the element we wish to bind to.
//                     var bind_to = ':input';

//                     // Prevent double-binding.
//                     $(document.body).off('change', bind_to);

//                     // Bind the event to all body descendants matching the "bind_to" selector.
//                     $(document.body).on('change', bind_to, function (e) {
//                         sendkeysObj["INPUT VALUE"] = $(e.target).val();
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": sendkeysObj
//                         });
//                     });
//                     if (e.type == "click" && $(e.target).val() != "") {
//                         sendkeysObj["INPUT VALUE"] = $(e.target).val();

//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": sendkeysObj
//                         });
//                     }
//                     if (e.target.title !== undefined && e.target.title.includes("Select Date")){
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": sendkeysObj
//                         });
//                     }
//                 }
//                 // if (e.target.nodeName == "A" && $(e.target).prev().prop("tagName") == "IMG") {

//                 // }

//                 //sendkeys
//                 if ((e.target.nodeName == "INPUT" && $(e.target).siblings("IMG").length == 1 && !sendkeysObj) 
//                 || (e.target.nodeName == "INPUT" && $(e.target).parent().siblings("IMG").length == 1) 
//                 || ((e.target.nodeName == "INPUT" && $($(e.target).parents()[1]).siblings("IMG").length == 1)) 
//                 || (e.target.nodeName == "A" && $(e.target).prev().prop("tagName") == "IMG")
//                 || $(e.target).prop("tagName") === 'INPUT' && $(e.target).attr("role") === 'combobox' && e.target.type === 'text' && !DropdownValuesObj && !TableDropdownValuesObj) {
//                     debugger;
//                     var sendkeysObj = $.extend({}, globalobj);
//                     sendkeysObj["ACTION"] = "SendKeys"


//                     //conflict between date type sendkeys and tablesendkeys
//                     var tableLabel = $($(e.target).parents("table")[0]).parent().siblings("td").find("label").text().trim();
//                     var tableLabel1 = $($(e.target).parents("table")[1]).parent().siblings("td").find("label").text().trim();
//                     var tableLabel2 = $($(e.target).parents("td")[0]).siblings("td").find("label").text().trim();
//                     if ((tableLabel.length != 0 && tableLabel.length < 30) || (tableLabel1.length != 0 && tableLabel1.length < 30) || (tableLabel2.length != 0 && tableLabel2.length < 30)) {
//                         sendkeysObj["ACTION"] = "SendKeys"
//                     }
//                     else {
//                         sendkeysObj["ACTION"] = "Table SendKeys"
//                     }
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1 && sendkeysObj["INPUT PARAMETER"] !== undefined && sendkeysObj["INPUT PARAMETER"].split(">").length < 2) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                 sendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parent().siblings("label").text().trim()
//                             }
//                             if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                 sendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                             }
//                             if ($(e.target).siblings("label").text().trim() != "") {
//                                 sendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).siblings("label").text().trim()
//                             }
//                             //inside frames we have text inside span instead of label
//                             if (window.frameElement && $($(e.target).parents("td")[1]).siblings('td').find('span').text().trim() != "") {
//                                 sendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $($(e.target).parents("td")[1]).siblings('td').find('span').text().trim()
//                             }
//                         }

//                     }

//                     //for normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != ""
//                     || $(e.target).parents('*:has("h1,h2,h3,h4,h5,h6")').find('h1,h2,h3,h4,h5,h6').length>0 ) {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {
//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
                        
//                         if (normalHeaderName.length === 0){
//                             normalHeaderName = $(e.target).parents('*:has("h1,h2,h3,h4,h5,h6")').find('h1,h2,h3,h4,h5,h6');
//                             correctHeaderName = $(e.target).parents('*:has("h1,h2,h3,h4,h5,h6")').find('h1,h2,h3,h4,h5,h6').text().trim();
//                             if (normalHeaderName.length > 1) {
//                                 if ($(normalHeaderName[0]).text() != "") {
//                                     correctHeaderName = $(normalHeaderName[0]).text().trim();
    
    
//                                 }
//                                 else if ($(normalHeaderName[1]).text() != "") {
//                                     correctHeaderName = $(normalHeaderName[1]).text().trim();
    
    
//                                 }
//                                 else {
//                                     correctHeaderName = $(normalHeaderName).text().trim();
    
//                                 }
    
//                             }
//                         }

//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();
//                         }
//                         if (sendkeysObj["INPUT PARAMETER"] == "" && $($(e.target).parents("td")[0]).siblings("td").find("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $($(e.target).parents("td")[0]).siblings("td").find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                         //inside frames we have text inside span instead of label
//                         if (window.frameElement && $($(e.target).parents("td")[1]).siblings('td').find('span').text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $($(e.target).parents("td")[1]).siblings('td').find('span').text().trim()
//                         }

//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 && sendkeysObj["INPUT PARAMETER"] === '') {
//                                 if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                     sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parent().siblings("label").text().trim();
//                                 }
//                                 if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                     sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();
//                                 }
//                                 if ($(e.target).siblings("label").text().trim() != "") {
//                                     sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).siblings("label").text().trim();
//                                 }

                                
//                                 //inside frames we have text inside span instead of label
//                                 if (window.frameElement && $($(e.target).parents("td")[1]).siblings('td').find('span').text().trim() != "") {
//                                     sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $($(e.target).parents("td")[1]).siblings('td').find('span').text().trim();
//                                 }
//                             }
//                             break;
//                         }
//                     }


//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((sendkeysObj["INPUT PARAMETER"]==""&&anchorHeader != "" && anchorHeader != undefined) || (sendkeysObj["INPUT PARAMETER"].includes("Edit Document")&&anchorHeader != "" && anchorHeader != undefined)) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                     }
//                     if (e.target.nodeName === 'INPUT' && e.target.placeholder !== undefined && sendkeysObj["INPUT PARAMETER"] === ''){
//                         sendkeysObj["INPUT PARAMETER"] = e.target.placeholder ;
//                     }
//                     duplicateLogic();
//                     if (sendkeysObj != undefined) {
//                         duplicateData.push(sendkeysObj);
//                     }
//                     console.log("duplicateData::", duplicateData)
//                     // Define the element we wish to bind to.
//                     var bind_to = ':input';

//                     // Prevent double-binding.
//                     $(document.body).off('change', bind_to);

//                     // Bind the event to all body descendants matching the "bind_to" selector.
//                     $(document.body).on('change', bind_to, function (e) {
//                         sendkeysObj["INPUT VALUE"] = $(e.target).val();
//                         if (sendkeysObj["ACTION"] != "SendKeysDate") {
//                             chrome.runtime.sendMessage({
//                                 "action": "addAction",
//                                 "data": sendkeysObj
//                             });
//                         }
//                     });
//                     if (e.type == "click" && ($(e.target).val() != "" || $(e.target).attr('placeholder')!== '')) {
//                         sendkeysObj["INPUT VALUE"] = $(e.target).val();

//                         if (sendkeysObj["ACTION"] != "SendKeysDate") {
//                             chrome.runtime.sendMessage({
//                                 "action": "addAction",
//                                 "data": sendkeysObj
//                             });
//                         }
//                     }

//                 }
//                 if (e.target.nodeName == "INPUT" && $(e.target).attr("type") == "search") {
//                     debugger
//                     var sendkeysObj = $.extend({}, globalobj);
//                     sendkeysObj["ACTION"] = "SendKeys"
//                     sendkeysObj["INPUT PARAMETER"] = $(e.target).attr("placeholder")

//                     duplicateLogic();
//                     if (sendkeysObj != undefined) {
//                         duplicateData.push(sendkeysObj);
//                     }
//                     console.log("duplicateData::", duplicateData)
//                     // Define the element we wish to bind to.
//                     var bind_to = ':input';

//                     // Prevent double-binding.
//                     $(document.body).off('change', bind_to);

//                     // Bind the event to all body descendants matching the "bind_to" selector.
//                     $(document.body).on('change', bind_to, function (e) {
//                         let duplicateObj = duplicateData[duplicateData.length - 1];
//                         // if (duplicateObj["ACTION"] != "enter") {
//                         sendkeysObj["INPUT VALUE"] = $(e.target).val();
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": sendkeysObj
//                         });
//                         // }

//                     });
//                     if (e.type == "click" && $(e.target).val() != "") {
//                         let duplicateObj = duplicateData[duplicateData.length - 1];
//                         // if (duplicateObj["ACTION"] != "enter") {
//                         sendkeysObj["INPUT VALUE"] = $(e.target).val();
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": sendkeysObj
//                         });
//                         // }
//                     }
//                 }

//                 if (e.target.nodeName == "INPUT" && $($($(e.target).parents('tr')[0]).find('input')).length < 2 && $(e.target).siblings().find("a").length != 1 && $(e.target).attr("type") == "text" && $(e.target).next().length == 0 && $(e.target).next().prop("tagName") != "LABEL") {
//                     debugger;
//                     var sendkeysObj = $.extend({}, globalobj);
//                     sendkeysObj["ACTION"] = "SendKeys"




//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //for normal Header
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {
//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();

//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                         if (sendkeysObj["INPUT PARAMETER"] == "" && $($(e.target).parents("div")[0]).siblings("div").find("label").text() != "") {
//                             sendkeysObj["ACTION"] = "Table SendKeys";
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" + $($(e.target).parents("div")[0]).siblings("div").find("label").text();
//                         }
//                     }
//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1 && sendkeysObj["INPUT PARAMETER"] !== undefined && sendkeysObj["INPUT PARAMETER"].split(">").length < 2) {
//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                 sendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parent().siblings("label").text().trim()
//                             }
//                             if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                 sendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                             }
//                             if ($(e.target).siblings("label").text().trim() != "") {
//                                 sendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).siblings("label").text().trim()
//                             }
//                         }

//                     }
//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 && sendkeysObj["INPUT PARAMETER"] === '') {
//                                 if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                     sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parent().siblings("label").text().trim()
//                                 }
//                                 if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                     sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                                 }
//                                 if ($(e.target).siblings("label").text().trim() != "") {
//                                     sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).siblings("label").text().trim()
//                                 }
//                             }
//                             break;
//                         }
//                     }


//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((sendkeysObj["INPUT PARAMETER"]==""&&anchorHeader != "" && anchorHeader != undefined) || (sendkeysObj["INPUT PARAMETER"].includes("Edit Document")&&anchorHeader != "" && anchorHeader != undefined)) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             sendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                     }

//                     //for clickFilter tablesendkeys special case
//                     if ($($(e.target).parents()[1]).prop('tagName') == 'TH' && $($($(e.target).parents('tr')[0]).siblings('tr').find('span')[1]).text() != "") {
//                         sendkeysObj["ACTION"] = "Table SendKeys";
//                         if (correctHeaderName)
//                             sendkeysObj["INPUT PARAMETER"] = correctHeaderName + '>' + $($($(e.target).parents('tr')[0]).siblings('tr').find('span')[1]).text();
//                         else
//                             sendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + '>' + $($($(e.target).parents('tr')[0]).siblings('tr').find('span')[1]).text();

//                     }
//                     if (e.target.nodeName === 'INPUT' && e.target.placeholder !== undefined && sendkeysObj["INPUT PARAMETER"] === ''){
//                         sendkeysObj["INPUT PARAMETER"] = e.target.placeholder ;
//                     }
//                     duplicateLogic();
//                     if (sendkeysObj != undefined) {
//                         duplicateData.push(sendkeysObj);
//                     }
                    
//                     console.log("duplicateData::", duplicateData)
//                     // Define the element we wish to bind to.
//                     var bind_to = ':input';

//                     // Prevent double-binding.
//                     $(document.body).off('change', bind_to);

//                     // Bind the event to all body descendants matching the "bind_to" selector.
//                     $(document.body).on('change', bind_to, function (e) {
//                         sendkeysObj["INPUT VALUE"] = $(e.target).val();
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": sendkeysObj
//                         });
//                     });

//                     if (e.type == "click" && $(e.target).val() != "") {
//                         sendkeysObj["INPUT VALUE"] = $(e.target).val();

//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": sendkeysObj
//                         });
//                     }
//                 }
//                 if (e.target.nodeName == "INPUT" && $(e.target).siblings().find("a").length < 1 && $(e.target).siblings("a").length < 1 && $(e.target).attr("type") == "text" && $(e.target).next().length == 1 && $(e.target).next().prop("tagName") == "LABEL") {
//                     debugger;
//                     var tablesendkeysObj = $.extend({}, globalobj);
//                     tablesendkeysObj["ACTION"] = "Table SendKeys";



//                     var tableLabel = $($(e.target).parents("table")[0]).parent().siblings("td").find("label").text().trim();
//                     var tableLabel1 = $($(e.target).parents("table")[1]).parent().siblings("td").find("label").text().trim();
//                     var tableLabel2 = $($(e.target).parents("td")[0]).siblings("td").find("label").text().trim();
//                     // $(":input").on("keyup change", function (e) {
//                     //     alert("ok")
//                     // })
//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     //for normal table sendkeys
//                     if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {

//                         var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//                         var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                         if (normalHeaderName.length > 1) {

//                             if ($(normalHeaderName[0]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[0]).text().trim();


//                             }
//                             else if ($(normalHeaderName[1]).text() != "") {
//                                 correctHeaderName = $(normalHeaderName[1]).text().trim();


//                             }
//                             else {
//                                 correctHeaderName = $(normalHeaderName).text().trim();

//                             }

//                         }
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             tablesendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             tablesendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             tablesendkeysObj["INPUT PARAMETER"] = correctHeaderName + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                         if ((tableLabel != "" && tableLabel.length < 25) || (tableLabel1 != "" && tableLabel1.length < 25) || (tableLabel2 != "" && tableLabel2.length < 25)) {
//                             tablesendkeysObj["ACTION"] = "SendKeys";

//                         }

//                     }

//                     //for popupHeader
//                     if ($($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "" && $($(e.target).parents("table").parents('div:has(*[data-afr-popupid])')).length > 1 && tablesendkeysObj["INPUT PARAMETER"] !== undefined && tablesendkeysObj["INPUT PARAMETER"].split(">").length < 2) {

//                         var popupHeader = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim();

//                         if (popupHeader != "Warning" && popupHeader != "Error" && popupHeader != "Information" && popupHeader != "Confirmation") {

//                             if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                 tablesendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parent().siblings("label").text().trim()
//                             }
//                             if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                 tablesendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                             }
//                             if ($(e.target).siblings("label").text().trim() != "") {
//                                 tablesendkeysObj["INPUT PARAMETER"] = popupHeader + ">" +
//                                     $(e.target).siblings("label").text().trim()
//                             }
//                             if ((tableLabel != "" && tableLabel.length < 25) || (tableLabel1 != "" && tableLabel1.length < 25) || (tableLabel2 != "" && tableLabel2.length < 25)) {
//                                 tablesendkeysObj["ACTION"] = "SendKeys";

//                             }
//                         }

//                     }


//                     //Header in siblingdivheaderInForLoop
//                     var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                     var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//                     //to get correct Header when firstHeader is batch or search
//                     let firstHeaderParams = firstHeader.split(":")
//                     var firstHeader_hasNumber = false;
//                     if (firstHeaderParams.length == 1) {
//                         firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//                     }
//                     if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//                         firstHeader = "";
//                     }
//                     for (let i = 1; i <= 20; i++) {
//                         if (firstHeader == "" && siblingdivheaderInForLoop == "") {

//                             siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();

//                         }
//                         else {

//                             if (firstHeader == "" && siblingdivheaderInForLoop != "" && siblingdivheaderInForLoop.length < 50 ) {
//                                 if ($(e.target).parent().siblings("label").text().trim() != "") {
//                                     tablesendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parent().siblings("label").text().trim()
//                                 }
//                                 if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                                     tablesendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                                 }
//                                 if ($(e.target).siblings("label").text().trim() != "") {
//                                     tablesendkeysObj["INPUT PARAMETER"] = siblingdivheaderInForLoop + ">" +
//                                         $(e.target).siblings("label").text().trim()
//                                 }
//                                 if ((tableLabel != "" && tableLabel.length < 25) || (tableLabel1 != "" && tableLabel1.length < 25) || (tableLabel2 != "" && tableLabel2.length < 25)) {
//                                     tablesendkeysObj["ACTION"] = "SendKeys";

//                                 }
//                             }
//                             break;
//                         }
//                     }


//                     //Atag as param1 instead of popupHeader
//                     var atags = $($(e.target).parents('table')).prevUntil('A').first().find("A")
//                     if (atags.length > 1) {
//                         for (let i = 0; i < atags.length; i++) {
//                             if (atags[i].classList.contains('p_AFSelected') && atags[i].text != "") {
//                                 var anchorHeader = $(atags[i]).text().trim();
//                                 break;
//                             }


//                         }
//                     }
//                     if ((tablesendkeysObj["INPUT PARAMETER"]==""&&anchorHeader != "" && anchorHeader != undefined)||(tablesendkeysObj["INPUT PARAMETER"].includes("Edit Document")&&anchorHeader != "" && anchorHeader != undefined)) {

//                         //to remove (number)
//                         anchorHeader = anchorHeader.replace(/ *\([^)]*\) */g, "");
//                         anchorHeader = anchorHeader.split(':')[0];
//                         if ($(e.target).parent().siblings("label").text().trim() != "") {
//                             tablesendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parent().siblings("label").text().trim()
//                         }
//                         if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                             tablesendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         }
//                         if ($(e.target).siblings("label").text().trim() != "") {
//                             tablesendkeysObj["INPUT PARAMETER"] = anchorHeader + ">" +
//                                 $(e.target).siblings("label").text().trim()
//                         }
//                         if ((tableLabel != "" && tableLabel.length < 25) || (tableLabel1 != "" && tableLabel1.length < 25) || (tableLabel2 != "" && tableLabel2.length < 25)) {
//                             tablesendkeysObj["ACTION"] = "SendKeys";

//                         }
//                     }
//                     if ($(e.target).parents('td').first().siblings().find('label').text() == "Search") {
//                         tablesendkeysObj["ACTION"] = "SendKeys";
//                         tablesendkeysObj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().siblings().find('h1, h2, h3, h4, h5, h6').text()
//                             + ">" + "Search";
//                     }
//                     //MultipleSendKeys ex:PTP.PO.210 conflict with same condition Po.257 so added anchorHeader==""
//                     if (anchorHeader == "" && e.target.nodeName == "INPUT" && $(e.target).siblings("label").text().trim() == "Quantity") {
//                         debugger
//                         // var multiSendkeysobj = $.extend({}, globalobj);
//                         if ($($(e.target).parents('table')[1]).find('input') && $($(e.target).parents('table')[1]).find('input').length > 1) {


//                             var multiSendkeysThs = $($(e.target).parents('div')[1]).prev().find('th');
//                             for (let i = 0; i < multiSendkeysThs.length; i++) {
//                                 if ($(multiSendkeysThs[i]).text().includes('Description')) {
//                                     debugger;
//                                     // multiSendkeysobj["ACTION"] = "multipleSendKeys";
//                                     tablesendkeysObj["ACTION"] = "multipleSendKeys";

//                                 }
//                             }
//                             if (correctHeaderName != "") {
//                                 tablesendkeysObj["INPUT PARAMETER"] = correctHeaderName;
//                             }
//                             //for description text as input value
//                             if ($($($(e.target).parents('td')[0]).siblings('td')[1]).text() != "") {
//                                 tablesendkeysObj["INPUT VALUE"] = $($($(e.target).parents('td')[0]).siblings('td')[1]).text() + '>' + $(e.target).val().trim();

//                             }
//                         }
//                     }
//                     duplicateLogic();
//                     if (tablesendkeysObj != undefined) {
//                         duplicateData.push(tablesendkeysObj);
//                     } console.log("duplicateData::", duplicateData)
//                     var bind_to = ':input';

//                     // Prevent double-binding.
//                     $(document.body).off('change', bind_to);

//                     // Bind the event to all body descendants matching the "bind_to" selector.
//                     $(document.body).on('change', bind_to, function (e) {
//                         if (tablesendkeysObj["ACTION"] != "multipleSendKeys") {
//                             tablesendkeysObj["INPUT VALUE"] = $(e.target).val();
//                         }
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": tablesendkeysObj
//                         });
//                     });
//                     if (e.type == "click" && $(e.target).val() != "") {
//                         if (tablesendkeysObj["ACTION"] != "multipleSendKeys") {
//                             tablesendkeysObj["INPUT VALUE"] = $(e.target).val();
//                         }
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": tablesendkeysObj
//                         });
//                     }

//                 }

//                 if (($(e.target).prop("tagName") == "DIV" && $($(e.target).parents("table")[1]).attr("summary") == "Publish Account Hierarchies") || ($(e.target).prop("tagName") == "SPAN" && $($(e.target).parents("table")[1]).attr("summary") == "Publish Account Hierarchies")) {
//                     var selectAValueObj = $.extend({}, globalobj);
//                     selectAValueObj["ACTION"] = "selectAValue";
//                     selectAValueObj["INPUT PARAMETER"] = "Publish Account Hierarchies";
//                     selectAValueObj["STEP DESCRIPTION"] = "selectAValue"
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": selectAValueObj
//                     });
//                 }
//                 //clickNotification
//                 let noficationSearch = $($(e.target).parentsUntil("*:has('input')").last().parents("div")).first().find('input').attr('placeholder');
//                 if (e.target.nodeName == "A" && !clickLinkobj && noficationSearch && noficationSearch.includes('earch') && Logoutobj && taskObj) {

//                     debugger
//                     let notiHeader = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")).first().find('h1, h2, h3, h4, h5, h6').text();

//                     var clickNotificationLinkObj = $.extend({}, globalobj);
//                     clickNotificationLinkObj["ACTION"] = "clickNotificationLink";
//                     clickNotificationLinkObj["INPUT PARAMETER"] = "Enter search terms";
//                     clickNotificationLinkObj["STEP DESCRIPTION"] = "Enter search terms"
//                     if (notiHeader.includes('Notification')) {
//                         clickNotificationLinkObj["INPUT PARAMETER"] = "Notifications>Search";
//                     }
//                     let buttonText = $(e.target).text().trim();
//                     console.log("we are in click notification and button text is ", buttonText);
//                     if (buttonText == "Approve" || buttonText == "Reject") {
//                         clickNotificationLinkObj["ACTION"] = "clickLink";
//                         clickNotificationLinkObj["INPUT PARAMETER"] = buttonText;


//                     }
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clickNotificationLinkObj
//                     });




//                 }

//                 if ( e.target.childElementCount === 1 && ($(e.target).children()[0]).nodeName === 'IMG'  && !DropdownValuesObj && !TableDropdownValuesObj  && !clickLinkobj && !assetCardLinkObj){
//                     debugger
//                     var clickImageobj = $.extend({}, globalobj);
//                     clickImageobj["ACTION"] = "clickImage";
//                     clickImageobj["INPUT PARAMETER"] = e.target.parentElement.parentElement.childNodes[0].childNodes[0].title;
//                     clickImageobj["STEP DESCRIPTION"] = "Click on Image of " + e.target.parentElement.parentElement.childNodes[0].childNodes[0].title;
//                     console.log("create dropdown", clickImageobj)
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clickImageobj
//                     });
//                 }

//                 if ($(e.target).parents("a").first().children('div').length === 1 && $(e.target).parents("a").first().children('div').attr("class").includes('task-button tb-button') && !clickButtonSpanobj && !clickButtonDivObj){
//                     debugger
//                     var clickButtonDivObj = $.extend({}, globalobj);
//                     clickButtonDivObj["ACTION"] = "clickButton";
//                     clickButtonDivObj["INPUT PARAMETER"] = $(e.target).text().trim();
//                     clickButtonDivObj["STEP DESCRIPTION"] = "Click on Button " + clickButtonDivObj["INPUT PARAMETER"];
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clickButtonDivObj
//                     });
//                 }
                
//                 if ((e.target.nodeName === 'path'|| e.target.nodeName === 'svg') && (
//                     $(e.target).parents('a').first().children('svg').length === 1 && $(e.target).parents('a').first().attr('role') === 'button'
//                 ) ){
//                     debugger
//                     var clickButtonSvgObj = $.extend({}, globalobj);
//                     clickButtonSvgObj["ACTION"] = "clickButton";
//                     var param1 = ''
//                     var normHeader = getNormalHeader(e, header1, header2);
//                     var siblingHeader = getSiblingHeader(e, header1, header2);
//                     var tableHeader = getTableHeader(e);
//                     if (normHeader !== ''){
//                         param1 = normHeader;
//                     } else if (tableHeader !== ''){
//                         param1 = tableHeader;
//                     } else if (siblingHeader !== '') {
//                         param1 = siblingHeader;
//                     }
//                     var param2 = ''
//                     if ($(e.target).parents('a').first().text()){
//                         param2 = $(e.target).parents('a').first().text();
//                     }
//                     if (param1 !== ''){
//                         clickButtonSvgObj["INPUT PARAMETER"] = param1 + '>' + param2 ;

//                     } else {
//                         clickButtonSvgObj["INPUT PARAMETER"] =  param2;
//                     }
                    
//                     clickButtonSvgObj["STEP DESCRIPTION"] = "Click on Button " + param2;
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": clickButtonSvgObj
//                     });
//                 }

//             }
//         }
//         if (chrome && chrome.runtime) {
//             getStatus(await LS.getItem('wats-status'));
//         }
        
//     }

//     //It will get The Normal Header For The Element
//     function getNormalHeader(e, header1, header2){
//         debugger
//         var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//         //for normal table sendkeys
//         if ($(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() != "") {

//             var normalHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6");
//             var correctHeaderName = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//             if (normalHeaderName.length > 1) {
//                 if ($(normalHeaderName[0]).text() != "") {
//                     correctHeaderName = $(normalHeaderName[0]).text().trim();
//                 }else if ($(normalHeaderName[1]).text() != "") {
//                     correctHeaderName = $(normalHeaderName[1]).text().trim();
//                 }else {
//                     correctHeaderName = $(normalHeaderName).text().trim();
//                 }
//             }
//         } else {
//             return '';
//         }
//         return correctHeaderName;
//     }

//     function getSiblingHeader(e,header1, header2){
//         debugger
//         var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//         var siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[0]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//         var firstHeader = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//         //to get correct Header when firstHeader is batch or search
//         let firstHeaderParams = firstHeader.split(":")
//         var firstHeader_hasNumber = false;
//         if (firstHeaderParams.length == 1) {
//             firstHeader_hasNumber = hasNumber.test(firstHeaderParams[0]);
//         }
//         if (firstHeader.includes("Batch") || firstHeader.includes("Search") || firstHeader_hasNumber) {
//             firstHeader = "";
//         }
//         for (let i = 1; i <= 20; i++) {
//             if (firstHeader == "" && siblingdivheaderInForLoop == "") {
//                 siblingdivheaderInForLoop = $($(e.target).parentsUntil("*:has('h1, h2, h3, h4, h5, h6')").last().parents("div")[i]).prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim();
//             }else{
//                 break;
//             }
//         }
//         return ((siblingdivheaderInForLoop !== undefined || siblingdivheaderInForLoop !== '') ? siblingdivheaderInForLoop : '');
//     }
//     function getTableHeader(e){
//         debugger
//         var tableHeader = ''
//         for (let i = 0; i < 3 ; i ++){
//             if (tableHeader === ''){
//                 tableHeader = $($(e.target).parents('table')[i]).find('h1,h2,h3,h4,h5,h6').text();
//             } else {
//                 break;
//             }
//         }
//         return  (tableHeader.length < 30 ? tableHeader : '');
//     }

//     function duplicateLogic() {
//         debugger
//         if (duplicateData.length > 0) {
//             var duplicateObj = duplicateData[duplicateData.length - 1];

//             if (duplicateObj == undefined)
//                 duplicateObj = duplicateData[duplicateData.length - 2]
//             if (duplicateObj != undefined && (duplicateObj["ACTION"] == "Dropdown Values" || duplicateObj["ACTION"] == "Table Dropdown Values" || duplicateObj["ACTION"] == "SendKeysDate")) {
//                 var last_param = duplicateObj["INPUT PARAMETER"]
//                 var last_param1 = last_param.split(">")[1];
//                 if (duplicateObj["ACTION"] == "Dropdown Values") {
//                     var input = $($($("label:contains(" + last_param1 + ")")[0]).parents('td')[0]).siblings().find("input[type='text']").val();
//                     if ($($($("label:contains(" + last_param1 + ")")[0]).parents('td')[0]).siblings().find("input[type='text']").length > 1 && $($($("label:contains(" + last_param1 + ")")[0]).parents('td')[0]).siblings().find("input[type='text']").last().attr("title")){
//                         input = $($($("label:contains(" + last_param1 + ")")[0]).parents('td')[0]).siblings().find("input[type='text']").last().attr("title");
//                     }
//                     duplicateObj["INPUT VALUE"] = input;
//                 }
//                 else if (duplicateObj["ACTION"] == "Table Dropdown Values") {
//                     var input = $("label:contains(" + last_param1 + ")").siblings("input").val();
//                     if ($("label:contains(" + last_param1 + ")").siblings().find("input").val() && $("label:contains(" + last_param1 + ")").siblings().find("input").val() != "") {
//                         var input = $("label:contains(" + last_param1 + ")").siblings().find("input").val();

//                     } 
//                     duplicateObj["INPUT VALUE"] = input;
//                 }
//                 else if (duplicateObj["ACTION"] == "SendKeysDate") {
//                     var input = $($($("label:contains(" + last_param1 + ")")[0]).parents('td')[0]).siblings().find("input[placeholder='m/d/yy']").val();
//                     if(!input){
//                         var input =$($($("label:contains(" + last_param1 + ")")[0]).parents('td')[0]).siblings().find("input[placeholder='dd/mm/yy']").val();
//                     }
//                     duplicateObj["INPUT VALUE"] = input;
//                     duplicateObj["ACTION"] = "SendKeys"
//                 }
//                 if (duplicateObj["INPUT PARAMETER"] !=='' ){
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": duplicateObj
//                     });
//                 }
                
//             }
//         }
//     }
//     document.onkeyup = async function (e) {
//         if (e.ctrlKey && e.altKey && e.which == 80) {
//             chrome.runtime.sendMessage({
//                 "action": "setStatus",
//                 "data": "pause"
//             });
//         } else if (e.ctrlKey && e.altKey && e.which == 82) {
//             chrome.runtime.sendMessage({
//                 "action": "setStatus",
//                 "data": "resume"
//             });

//         }
//         else if (e.ctrlKey && e.altKey && e.which == 67) {
//             chrome.runtime.sendMessage({
//                 "action": "clear"
//             });

//         }
//         var getStatus = function (status) {
//             if (status && status == "start" || status && status == "resume") {
//                 //ctrl+backspace
//                 if (e.ctrlKey && e.which == 8) {
//                     debugger;
//                     if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                         var pasteobj = $.extend({}, globalobj);
//                         pasteobj["ACTION"] = "Clear";
//                         pasteobj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                         pasteobj["STEP DESCRIPTION"] = "Clear at " + $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();
//                     }
//                     if ($(e.target).siblings("label").text().trim() != "") {
//                         var pasteobj = $.extend({}, globalobj);
//                         pasteobj["ACTION"] = "Clear";
//                         pasteobj["INPUT PARAMETER"] = $(e.target).siblings("label").text().trim()
//                         pasteobj["STEP DESCRIPTION"] = "Clear at " + $(e.target).siblings("label").text().trim();

//                     }

//                     if ($(e.target).parents("span:has('input')").children('label').first().text().trim() !== "") {
//                         var pasteobj = $.extend({}, globalobj);
//                         pasteobj["ACTION"] = "Clear";
//                         pasteobj["INPUT PARAMETER"] = $(e.target).parents("span:has('input')").children('label').first().text().trim();
//                         pasteobj["STEP DESCRIPTION"] = "Clear at " + $(e.target).parents("span:has('input')").children('label').first().text().trim();

//                     }
//                     chrome.runtime.sendMessage({
//                         "action": "addAction",
//                         "data": pasteobj
//                     });
//                 }
//                 //for tab
//                 if (e.which === 9 && e.which !== 18) {
//                     debugger;
//                     // watsScripter(e);

//                     var copyobj = $.extend({}, globalobj);
//                     copyobj["ACTION"] = "tab";
//                     copyobj["STEP DESCRIPTION"] = "Click Tab"
//                     duplicateLogic();
//                     if (copyobj) {
//                         duplicateData.push(copyobj);
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": copyobj
//                         });
//                     }


//                 }
//                 //for enter key
//                 if (e.which == 13) {

//                     var copyobj = $.extend({}, globalobj);
//                     copyobj["ACTION"] = "enter";
//                     copyobj["STEP DESCRIPTION"] = "Click Enter"
//                     duplicateLogic();
//                     if (copyobj) {
//                         duplicateData.push(copyobj);
//                         chrome.runtime.sendMessage({
//                             "action": "addAction",
//                             "data": copyobj
//                         });
//                     }

//                 }
//             }
//         }
//         getStatus(await LS.getItem('wats-status'));
//     }

//     document.oncopy = async function (e) {
//         console.log("oncopy")
//         var getStatus = function (status) {
//             if (status && status == "start" || status && status == "resume") {

//                 debugger;
//                 if ($($(e.target).parents("div")[0]).prev().find("span").text().trim() != "") {





//                     var head = 'h1:not(.' + header1 + ',.' + header2 + '), h2:not(.' + header1 + ',.' + header2 + '), h3:not(.' + header1 + ',.' + header2 + '), h4:not(.' + header1 + ',.' + header2 + '), h5:not(.' + header1 + ',.' + header2 + '), h6:not(.' + header1 + ',.' + header2 + ')';
//                     var copyobj = $.extend({}, globalobj);
//                     copyobj["ACTION"] = "copynumber";
//                     copyobj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('" + head + "')").last().prevUntil('h1, h2, h3, h4, h5, h6').first().find("h1, h2, h3, h4, h5, h6").text().trim() + ">" +
//                         $($(e.target).parents("div")[0]).prev().find("span").text().trim();
//                     copyobj["STEP DESCRIPTION"] = "Copy " + $($(e.target).parents("div")[0]).prev().find("span").text().trim();
//                 }
//                 if (e.target.nodeName == "LABEL" && $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "") {
//                     var title = $(e.target).text().trim()
//                     if (title.includes("Process")) {
//                         var copyobj = $.extend({}, globalobj);
//                         copyobj["ACTION"] = "copynumber";
//                         copyobj["INPUT PARAMETER"] = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() + ">" + "Process"
//                         copyobj["STEP DESCRIPTION"] = "Copy  Process";

//                     }

//                 }
//                 if (e.target.nodeName == "DIV" && $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() != "") {
//                     var title = $(e.target).text().trim()

//                     if (title.includes("Transaction")) {
//                         var copyobj = $.extend({}, globalobj);
//                         copyobj["ACTION"] = "copynumber";
//                         copyobj["INPUT PARAMETER"] = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() + ">" + "Transaction"
//                         copyobj["STEP DESCRIPTION"] = "Copy  Transaction ";

//                     }
//                     if (title.includes('Adjustment')) {
//                         var copyobj = $.extend({}, globalobj);
//                         copyobj["ACTION"] = "copynumber";
//                         copyobj["INPUT PARAMETER"] = $($(e.target).parents("table").slice(-2, -1)).find("tr").first().find("div").text().trim() + ">" + 'Adjustment'
//                         copyobj["STEP DESCRIPTION"] = "Copy  Adjustment ";

//                     }
//                 }
//                 if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                     var copyobj = $.extend({}, globalobj);
//                     copyobj["ACTION"] = "copynumber";
//                     copyobj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                     copyobj["STEP DESCRIPTION"] = "Copy " + $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();

//                 }
//                 if ($(e.target).siblings("label").text().trim() != "") {
//                     var copyobj = $.extend({}, globalobj);
//                     copyobj["ACTION"] = "copynumber";
//                     copyobj["INPUT PARAMETER"] = $(e.target).siblings("label").text().trim()
//                     copyobj["STEP DESCRIPTION"] = "Copy " + $(e.target).siblings("label").text().trim();

//                 }
//                 if ($(e.target).prop("tagName") == "H1") {
//                     var copyobj = $.extend({}, globalobj);
//                     copyobj["ACTION"] = "copynumber";
//                     var h1Text = $(e.target).text();
//                     var h1Name = h1Text.split(":");
//                     copyobj["INPUT PARAMETER"] = h1Name[0];
//                     copyobj["STEP DESCRIPTION"] = "Copy " + h1Name[0];

//                 }

//                 chrome.runtime.sendMessage({
//                     "action": "addAction",
//                     "data": copyobj
//                 });
//             }
//         }
//         getStatus(await LS.getItem('wats-status'));
//     }
//     document.onpaste = async function (e) {
//         var getStatus = function (status) {
//             if (status && status == "start" || status && status == "resume") {
//                 debugger;
//                 if ($(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim() != "") {
//                     var pasteobj = $.extend({}, globalobj);
//                     pasteobj["ACTION"] = "paste";
//                     pasteobj["INPUT PARAMETER"] = $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim()
//                     pasteobj["STEP DESCRIPTION"] = "Paste at " + $(e.target).parentsUntil("*:has('label')").last().prevUntil('label').first().find("label").text().trim();
//                 }
//                 if ($(e.target).siblings("label").text().trim() != "") {
//                     var pasteobj = $.extend({}, globalobj);
//                     pasteobj["ACTION"] = "paste";
//                     pasteobj["INPUT PARAMETER"] = $(e.target).siblings("label").text().trim()
//                     pasteobj["STEP DESCRIPTION"] = "Paste at " + $(e.target).siblings("label").text().trim();

//                 }
//                 if (e.target.nodeName == "INPUT" && $(e.target).attr("type") == "search") {
//                     var pasteobj = $.extend({}, globalobj);
//                     pasteobj["ACTION"] = "paste";
//                     pasteobj["INPUT PARAMETER"] = $(e.target).attr("placeholder")
//                     pasteobj["STEP DESCRIPTION"] = "Paste in " + $(e.target).attr("placeholder");
//                 }
//                 if (pasteobj != undefined && pasteobj["INPUT PARAMETER"] == "Account") {
//                     pasteobj["ACTION"] = "Table SendKeys";
//                     pasteobj["INPUT PARAMETER"] = "Journal Lines>Account"
//                     pasteobj["INPUT VALUE"] = "101.10.60540.000.000.000";

//                 }
//                 chrome.runtime.sendMessage({
//                     "action": "addAction",
//                     "data": pasteobj
//                 });
//             }
//         }
//         getStatus(await LS.getItem('wats-status'));

//     }

// });