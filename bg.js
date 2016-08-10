


/*var dvalue;
chrome.storage.local.get('datevalue', function(result){

    dvalue = result.datevalue;
    //alert(dvalue);
    
    if( dvalue == undefined){
        var d1 = new Date();
        chrome.storage.local.set({'datevalue': d1.getTime()}, ab);
        function ab(){    
        }
    }else{
        var newdate = new Date();
        var timeDiff = Math.abs(newdate.getTime() - dvalue);
        var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        if (diffDays > 0){
            var seconds = 0;
            chrome.storage.local.set({'sValue': seconds}, function() {
            });
        }
    }
});*/




var dt = new Date();
var d = dt.getDate();
var m = dt.getMonth();
var y = dt.getYear();
var keyName = d+"/"+m+"/"+y;
var seconds; 
chrome.storage.local.get(keyName, function(result){
    
    seconds = result.sValue;
    
    if( seconds == undefined){
        seconds = 0;
        chrome.storage.local.set({keyName: seconds}, function() {
                dt.setDate(d.getDate() - 1);
                var d = dt.getDate();
                var m = dt.getMonth();
                var y = dt.getYear();
                var keyNameOld = d+"/"+m+"/"+y;
                    chrome.storage.local.remove(keyNameOld);
                });
    }else{
        var min = Math.floor(seconds / 60);
        chrome.browserAction.setBadgeText({
        text: (min).toString()+"m"});
    }
});





var refreshIntervalId = -1;
//On Change in URL
chrome.tabs.onActivated.addListener(function(tab) {         
    chrome.tabs.getSelected(null,function(tab) {
        var url = tab.url;
        if(url.indexOf("youtube") > -1){
            if (refreshIntervalId == -1){               
                refreshIntervalId = setInterval(function(){abc(tab.id)}, 1000);
            }
        }else{
            chrome.storage.local.set({'sValue': seconds}, function() {
                });
            clearInterval(refreshIntervalId);
            refreshIntervalId = -1;
        }
   });
});

//On browser close
chrome.windows.onRemoved.addListener(function(windowId){
    chrome.storage.local.set({'sValue': seconds}, function() {
                });
    clearInterval(refreshIntervalId);
            refreshIntervalId = -1;
});

function abc(tabid){

    seconds++;
    var min = Math.floor(seconds / 60);
    
    var now = new Date();
    h = now.getHours();
    var maxtime = 0;
    if (h < 20){
        maxtime = 60;
    }else{
        maxtime = 60;
    }
    
    if (min > maxtime){
         chrome.tabs.update(tabid, {url: './stop.html'}); 
         clearInterval(refreshIntervalId);
         refreshIntervalId = -1;
    }else{
        chrome.browserAction.setBadgeText({
            text: (min).toString()+"m"
        }); 
    }
    
}


        


