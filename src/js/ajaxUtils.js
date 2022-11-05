// Get Request:
(function (global){
    var ajaxUtils = {};
    function getRequestObject() {
        if (global.XMLHttpRequest) {
            return (new XMLHttpRequest());
        } 
    }
    ajaxUtils.sendGetRequest = function(requestUrl, responseHandler, isJsonResponse) {
        var request = getRequestObject(); //Get the request object
        request.onreadystatechange = function() { handleResponse(request, responseHandler,isJsonResponse);}; // onreadystatechange used to execute the given function for that request
        request.open("GET", requestUrl, true);
        request.send(null); // for POST only
      };
      
    //This function returns the content of the request we need
function handleResponse(request,responseHandler,isJsonResponse) {
    if ((request.readyState == 4) &&
       (request.status == 200)) {
  
      // Default to isJsonResponse = true
      if (isJsonResponse == undefined) {
        isJsonResponse = true;
      }
  
      if (isJsonResponse) {
        responseHandler(JSON.parse(request.responseText));
      }
      else {
        responseHandler(request.responseText);
      }
    }
  }
  console.log("IIFE Works")

global.$ajaxUtils = ajaxUtils;

}(window));

export var createAlert = function (string,alerttype){
  var alertDiv = document.createElement("div");
  alertDiv.className = alerttype;
  alertDiv.textContent = string;
  document.getElementById("content").appendChild(alertDiv);
  return alertDiv;
};

