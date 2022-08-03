const LS = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({[key]: val}),
    removeItem: keys => chrome.storage.local.remove(keys),
    clear : () => chrome.storage.local.clear(),
  };
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

    var duplicateData = [];
    var hasNumber = /\d/;
    var header1 = await LS.getItem("header1")
    var header2 = await LS.getItem("header2")

    /*
     *  When we click on any element on the oracle cloud fusion instance
        Then this function get Triggered 
    */
    document.onclick = async function (e) {
        await watsScripter(e);
    }

    async function watsScripter(e) {
        debugger;
        if ($(e.target).attr('id') === 'Login' && $(e.target).attr('type') === 'submit'){
            alert("Login");
           console.log( $(e.target).parents().find('#username').first().val());
           
        }
        if($(e.target).text().trim() === "Log Out")  {
            alert("Log out button clicked");
        }
        
       if ($(e.target).text().trim()==="Account"){
            alert("account label in project");
       }
       if ($(e.target).prop("tagName")==="SPAN" && $(e.target).parent().prop("tagName")==="A" && $(e.target).prop("role")!=="button" &&  $(e.target).parent().prop("tagName")!=="H1"){
            alert("click link");
       }
       if(($(e.target).prop('tagName')==="INPUT" && $(e.target).prop('type') === "button"  &&  $(e.target).prop("role")=="button")|| (($(e.target).prop('tagName') === 'SPAN' && $(e.target).parent().prop('tagName') === 'BUTTON') || ($(e.target).prop('tagName') === 'BUTTON'))) {
        alert("user Buttons");
       }
       if($(e.target).prop("tagName")==="DIV" && $(e.target).children().find("button").prop("controls")!==undefined ){
        alert("dropdown values");
       }
       if($(e.target).prop("tagName")==="SPAN" && $(e.target).parent().prop("tagName")==="H1"){
        alert("Click Button Dropdown");
       }
       if ($(e.target).prop("tagName")==="A" && $(e.target).parent().prop("tagName")==="SPAN" && $(e.target).parent().parent().prop("tagName")==="TD"){
        alert("clickTableLink");
       }
       if($(e.target).prev().prop("type")==="checkbox"){
        alert("Click Checkbox");
       }
    }



    //It will get The Normal Header For The Elements
    function getNormalHeader(e, header1, header2){
        debugger;
    }

    function getSiblingHeader(e,header1, header2){
        debugger;
        
    }

    function getTableHeader(e){
        debugger;
        
    }

    function duplicateLogic() {
        debugger;
       
    }

    document.onkeyup = async function (e) {
        
    }

    document.oncopy = async function (e) {
      
    }
    
    document.onpaste = async function (e) {
       
    }

});

//&& $(e.target).children().find("button").prop("controls").includes("dropdown-element")
//$(e.target).parents('td').first().next().text()