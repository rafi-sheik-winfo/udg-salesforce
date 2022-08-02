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
        if ($(e.target).attr('id') === 'Login'  && $(e.target).attr('type') === 'submit'){
            alert("Login");
           console.log( $(e.target).parents().find('#username').first().val());
           
        }
        if($(e.target).attr("class").includes("logout") &&  $(e.target).text().trim() === "Log Out")  {
            alert("Log out button clicked");
        }
        if($(e.target).attr("class").includes("slds-truncate")){
            alert("accounts");
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


// if ($(e.target).attr('id') === 'Login'  && $(e.target).attr('type') === 'submit'){
//     console.log("Login");
//    console.log( $(e.target).parents().find('#username').first().val())
   
//$(e.target).attr("href")==="/secur/logout.jsp" && $(e.target).attr("class") === "uiOutputURL"}
// e.target.nodeName == "A" && $(e.target).text().trim() === "Log Out"