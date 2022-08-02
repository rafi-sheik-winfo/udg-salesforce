const LS = {
   getAllItems: () => chrome.storage.local.get(),
   getItem: async key => (await chrome.storage.local.get(key))[key],
   setItem: (key, val) => chrome.storage.local.set({[key]: val}),
   removeItem: keys => chrome.storage.local.remove(keys),
   clear : () => chrome.storage.local.clear(),
 };
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
   if (request) {
      if (request.action == "setStatus") {
         await LS.setItem("wats-status", request.data)
         await LS.setItem("wats-status1", request.data)
      }
      if (request.action == "setStatus1") {
         var popupstatus = request.data;
         var data = await LS.getItem("wats-actions");
         if (!data) {
            data = [];
         } else {
            data = JSON.parse(data);
            var lastobj = data.pop();
            var lastAction = lastobj.ACTION;
            var lastParam = lastobj["INPUT PARAMETER"];
            if (lastAction == "clickImage" && lastParam.includes("Search")) {
               await LS.setItem("Search-wats-status", "resume")
            }

         }
         var status1 = await LS.getItem("wats-status");
         var popupjsstatus = await LS.getItem("wats-status1");
         var popupstatusPause = await LS.getItem("popupstatusPause");
         var popupSearchStatus = await LS.getItem("Search-wats-status");

         if (popupjsstatus == "pause" && popupstatus == "resume") {
            await LS.setItem("wats-status", "pause")

         }
         if (popupSearchStatus == "resume" && popupstatus == "pause") {
            await LS.setItem("wats-status", "resume")

         }
         if (popupSearchStatus == "resume" && popupstatus == "resume") {
            await LS.removeItem("Search-wats-status")

         }
         if (status1 == "resume" && popupstatus == "pause") {
            await LS.setItem("wats-status", "pause")
            await LS.setItem("popupstatusPause", true)

         }
         if (status1 == "start" && popupstatus == "pause") {
            await LS.setItem("wats-status", "pause")
            await LS.setItem("popupstatusPause", true)

         }
         if (popupstatusPause && popupstatus == "resume") {
            await LS.setItem("wats-status", "resume")
            await LS.removeItem("popupstatusPause")

         }
         if (status1 == "clear" || status1 == null) {
            await LS.setItem("wats-status", "clear")

         }

      }
      if (request.action == "clear") {
         await LS.removeItem("wats-actions");
         await LS.removeItem("DefaultContent")
         await LS.removeItem("ToFrame")
         await LS.removeItem("iscopy")
         await LS.setItem("wats-status", "clear");
      }

      if (request.action == "addAction" && request.data) {
         var data = await LS.getItem("wats-actions");
         if (!data) {
            data = [];
         } else {
            data = JSON.parse(data);
            await LS.setItem("dataLength", data.length);
         }


         if (request.data["ACTION"] == "switchToFrame" || request.data["ACTION"] == "switchToDefaultFrame") {
            var f = 0; var d = 0;
            var d1 = await LS.getItem("DefaultContent");
            var f1 = await LS.getItem("ToFrame");
            for (var i = 0; i < data.length; i++) {
               if (request.data["ACTION"] == "switchToFrame") {

                  if (data[i]["ACTION"] == request.data["ACTION"]) {
                     f++;
                     await LS.setItem("ToFrame", f);
                  }
               }
               if (request.data["ACTION"] == "switchToDefaultFrame") {
                  if (data[i]["ACTION"] == request.data["ACTION"]) {
                     d++;
                     await LS.setItem("DefaultContent", d);
                  }
               }
            }




            if (request.data["ACTION"] == "switchToFrame") {

               if (f1 == 0 || f == 0) {
                  data.push(request.data);
                  await LS.setItem("wats-actions", JSON.stringify(data));
                  await LS.setItem("ToFrame", ++f);

               }
               if ((f1 > 0) && (f1 == d1)) {
                  data.push(request.data);
                  await LS.setItem("wats-actions", JSON.stringify(data));
                  await LS.setItem("ToFrame", ++f);
               }
            }
            if (request.data["ACTION"] == "switchToDefaultFrame") {
               if (f1 > 0 && d == 0 && d1 == null) {
                  data.push(request.data);
                  await LS.setItem("wats-actions", JSON.stringify(data));
                  await LS.setItem("DefaultContent", ++d);
               }
               if ((d1 > 0) && (f1 > d1)) {
                  data.push(request.data);
                  await LS.setItem("wats-actions", JSON.stringify(data));
                  await LS.setItem("DefaultContent", ++d);
               }
            }


         }
         if (request.data["ACTION"] == "selectByText") {
            if (request.isCheckDuplicate && data.length > 0) {
               var i = data.length - 1;
               if (data[i]["INPUT PARAMETER"] == request.data["INPUT PARAMETER"]) {
                  return
               }
            }
            data.push(request.data);
            await LS.setItem("wats-actions", JSON.stringify(data));
         }
         if (request.data["ACTION"] != "selectByText" && request.data["ACTION"] != "switchToFrame" && request.data["ACTION"] != "switchToDefaultFrame") {
            data.push(request.data);
            await LS.setItem("wats-actions", JSON.stringify(data));
         }


      }
   }



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
   var LogInobj = {
      "SCRIPT METADATA ID": "",
      "SCRIPT ID1": "",
      "SCRIPT NUMBER1": "",
      "LINE NUMBER": "",
      "STEP DESCRIPTION": "",
      "INPUT PARAMETER": "",
      "ACTION": ""
   };
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
   var LogInobj = {
      "SCRIPT METADATA ID": "",
      "SCRIPT ID1": "",
      "SCRIPT NUMBER1": "",
      "LINE NUMBER": "",
      "STEP DESCRIPTION": "",
      "INPUT PARAMETER": "",
      "ACTION": ""
   };
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
