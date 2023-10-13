/**
 * HTML5 API 程式庫
 * Author: Jack Wen, 2013.
 *
 */
var htmlGeoOptions = { maximumAge:10000, timeout:5000, enableHighAccuracy:false};
var html5Object = new Object();
var gpsStatus = '';

html5Object.coords = null;
var Html5Support = {
     gps:false,
     sessionStorage: false,
     notification: false,
     localStorage:false,
     SqlStorage:false,
     network: false,
     webSocket:false,
     permission:{
         notification: '',
         gps: ''
     }
};

var html5Info = {
	longitude: 0,
	latitude : 0,
	accuracy: 0,
	altitude:0,
	altitudeAccuracy:0,
	heading: 0,
	speed:0,
	timestamp:0,
	watchId:0
};

/*
 * HTML5 初始化
 */
var initHtml5 = function() {
	//logger.debug("initHtml5()");
	try{
		Html5Support.gps = checkGeolocationSupport();
		Html5Support.sessionStorage = checkSessionStorageSupport();
		Html5Support.localStorage = checkLocalStorageSupport();
		Html5Support.webSocket = checkWebSocketStorageSupport();
    //Html5Support.notification = checkNotificationSupport();
    Html5Support.network = checkNetworkSupport();
	}catch(err){
		log(err);
	}
};


function log(msg) {
	 try{
		 //console.log(msg);
         logger.error('html5 err:' + msg);
	 }catch(err){

	 }
 };

var checkSessionStorageSupport = function() {
	var present = false;
	try{
		if(window.sessionStorage) {
			present = true;
		}
	}catch(err){
		log(err);
	}finally{

	}
	return present;
};


var checkNetworkSupport = function() {
	var present = false;
	try{
		if(navigator.network) {
			present = true;
		}
	}catch(err){
		log(err);
	}finally{

	}
	return present;
}

var checkLocalStorageSupport = function() {
	var present = false;

	if(window.localStorage) {
		present = true;
	}

	return present;
};

var checkWebSocketStorageSupport = function() {
	var present = false;

	try{
		if(window.WebSocket) {
			present = true;
		}
	}catch(err){
		log(err);
	}finally{

	}
	return present;
};

var checkGeolocationSupport = function() {
	var present = false;

	try{
		if(navigator.geolocation) {
			present = true;
		}
	}catch(err){
		log(err);
	}finally{

	}
	return present;
};

function isSecure(){
   return window.location.protocol == 'https:';
}


function redirect(urls) {
   window.location=urls;
}


var checkNotificationSupport = function() {
	var present = false;
	try{
        if (("Notification" in window)) {
            present = true;
            Notification.requestPermission(function(result) {
              if (result === 'granted') {
                //logger.debug('Notification:' + result);
                return;
              } else if (result === 'denied') {
                logger.warn('Permission wasn\'t granted. Allow a retry.');
                return;
              } else if (result === 'default') {
                logger.error('The permission request was dismissed.');
                return;
              }
              //Do something with the granted permission.
            });

            Html5Support.permission.notification = Notification.permission;
        }else{
            logger.error("This browser does not support desktop notification");
        }
	}catch(err){
		log('html5 err:' + err);
	}finally{

	}
	return present;
}



var updateLocationInfo = function(position) {
	try{
		html5Object.coords = position.coords;

		html5Info.longitude = html5Object.coords.longitude;
		html5Info.latitude = html5Object.coords.latitude;
		html5Info.accuracy = html5Object.coords.accuracy;
		html5Info.altitude = html5Object.coords.altitude;
		html5Info.altitudeAccuracy = html5Object.coords.altitudeAccuracy;
		html5Info.heading = html5Object.coords.heading;
		html5Info.speed = html5Object.coords.speed;
		html5Info.timestamp = position.timestamp;



		if(position.coords.longitude > 0 ) {
			html5Info.longitude = position.coords.longitude;
			//setSessionItem(GPSlongitude, html5Info.longitude);
		}

		if(position.coords.latitude > 0 ) {
			html5Info.latitude = position.coords.latitude;
			//setSessionItem(GPSlatitude, html5Info.latitude);
		}
	}catch(err){
		logger.error('updateLocationInfo:' + err);
	}finally{

	}
};

var handleLocationError = function(error) {
	try{
		gpsStatus='';
		switch(error.code){
		case error.PERMISSION_DENIED :
			gpsStatus = 'PERMISSION_DENIED';
			logger.debug('PERMISSION_DENIED: ' + error.message);
			break;
		case error.POSITION_UNAVAILABLE:
			gpsStatus = 'POSITION_UNAVAILABLE';
			logger.debug('POSITION_UNAVAILABLE: ' + error.message);
			break;
		case error.TIMEOUT:
			gpsStatus = 'TIMEOUT';
			logger.debug('TIMEOUT: ' + error.message);
			break;
		default:
			gpsStatus = 'GPS UNKNOWN ERROR';
			logger.debug(error.message);
			break;
		}

	}catch(err){
		log(err);
	}finally{

	}
};

var refreshLocation = function(watch) {
	try{
		if(checkGeolocationSupport()) {
			if(watch){
				var watchId = navigator.geolocation.watchPosition(updateLocationInfo, handleLocationError, htmlGeoOptions);
				html5Info.watchId = watchId;
                navigator.geolocation.clearWatch(watchId);
			}else{
				navigator.geolocation.getCurrentPosition(updateLocationInfo, handleLocationError, htmlGeoOptions);
			}
		}else{
			throw 'GeolocationSupport not present.';
		}
	}catch(err){
		log(err);
	}finally{

	}
};


var clearWatchLocation = function(watchId) {
	try{
		if(checkGeolocationSupport()) {
			navigator.geolocation.clearWatch(watchId);
		}else{
			throw 'GeolocationSupport not present.';
		}
	}catch(err){
		log(err);
	}finally{

	}
};

//*****************************************************
// sessionstorage
//*****************************************************
var setSessionItem = function(name, value) {
	try{
		if(checkSessionStorageSupport()) {
			if(typeof(name) == 'undefined' && name == null){
				throw "name is null";
			}else{
				window.sessionStorage.setItem(name, value);
			}
		}else{
			throw 'SessionStorage not present.';
		}
	}catch(err){
		log('Html5 setSessionItem:' + err);
	}finally{

	}
};

var getSessionItem = function(name) {
	var value = '';
	try{
		if(checkSessionStorageSupport()) {
			value = window.sessionStorage.getItem(name);
		}else{
			throw 'SessionStorage not present.';
		}
	}catch(err){
		log(err);
	}finally{

	}

	return value;
};

var removeSessionItem = function(name) {
	try{
		if(checkSessionStorageSupport()) {
			window.sessionStorage.removeItem(name);
		}else{
			throw 'SessionStorage not present.';
		}
	}catch(err){
		log(err);
	}finally{

	}

};

var clearAllSessionItem = function() {
	try{
		if(checkSessionStorageSupport()) {
			window.sessionStorage.clear();
		}else{
			throw 'SessionStorage not present.';
		}
	}catch(err){
		log(err);
	}finally{

	}

};


//*****************************************************
// localstorage
//*****************************************************
var setLocalItem = function(name, value) {
	try{
		if(checkLocalStorageSupport()) {
			if(typeof(name) == 'undefined' && name == null){
				throw "name is null";
			}else{
				window.localStorage.setItem(name, value);
			}

		}else{
			throw 'LocalStorage not present.';
		}
	}catch(err){
		log('Html5 setLocalItem:' + err);
	}finally{

	}
};

var getLocalItem = function(name) {
	var value = '';
	try{
		if(checkLocalStorageSupport()) {
			value = window.localStorage.getItem(name);
		}else{
			throw 'LocalStorage not present.';
		}
	}catch(err){
		log(err);
	}finally{

	}

	return value;
};

var removeLocalItem = function(name) {
	try{
		if(checkLocalStorageSupport()) {
			window.localStorage.removeItem(name);
		}else{
			throw 'LocalStorage not present.';
		}
	}catch(err){
		log(err);
	}finally{

	}

};

var clearAllLocalItem = function() {
	try{
		if(checkLocalStorageSupport()) {
			window.localStorage.clear();
		}else{
			throw 'LocalStorage not present.';
		}
	}catch(err){
		log(err);
	}finally{

	}

};


var showNotication = function(message, title) {
    try{
		var notification = new Notification(title,{body:message, dir:'auto', lang:'zh_tw', icon:'resources/icon32/comment.png'});
        setTimeout(function(){
            notification.close(); //closes the notification
        },5000);
	}catch(err){
		log(err);
	}finally{

	}
}



var showAlertNotication = function(message, title) {
    try{
		var notification = new Notification(title,{body:message, dir:'auto', lang:'zh_tw', icon:'resources/icon32/Button Close.png'});
        setTimeout(function(){
            notification.close(); //closes the notification
        },10000);
	}catch(err){
		log(err);
	}finally{

	}
}



    function IsStringEmpty(str) {
        if(str && str !='')
            return false;
        else
            return true;
    }


    function getAppUrlHash(d) {
      //console.log('getAppUrlHash in');
         var hash = d;
         if (!IsStringEmpty(hash)) {
             if(hash === 'ss3c') {
                 hash = 'pm';
             }
             return hash;
         } else {
             //logger.debug('no hash');
         }
         return hash;
     }


     	/*function dateFormat(date, format) {
     		format = format.replace("SS", (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()); // Pad with '0' if needed
     		format = format.replace("MM", (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()); // Pad with '0' if needed
     		format = format.replace("HH", (date.getHours() < 10 ? '0' : '') + date.getHours()); // Pad with '0' if needed
     	    format = format.replace("DD", (date.getDate() < 10 ? '0' : '') + date.getDate()); // Pad with '0' if needed
     	    format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)); // Months are zero-based
     	    format = format.replace("YYYY", date.getFullYear());
     	    return format;
     	}*/



          function calcStrength(p) {
      			var intScore = 0;

      			// PASSWORD LENGTH
      			intScore += p.length;

      			if(p.length > 0 && p.length <= 4) {                    // length 4 or less
      				intScore += p.length;
      			}
      			else if (p.length >= 5 && p.length <= 7) {	// length between 5 and 7
      				intScore += 6;
      			}
      			else if (p.length >= 8 && p.length <= 15) {	// length between 8 and 15
      				intScore += 12;
      			}
      			else if (p.length >= 16) {               // length 16 or more
      				intScore += 18;
      			}

      			// LETTERS (Not exactly implemented as dictacted above because of my limited understanding of Regex)
      			if (p.match(/[a-z]/)) {              // [verified] at least one lower case letter
      				intScore += 1;
      			}
      			if (p.match(/[A-Z]/)) {              // [verified] at least one upper case letter
      				intScore += 5;
      			}
      			// NUMBERS
      			if (p.match(/\d/)) {             	// [verified] at least one number
      				intScore += 5;
      			}
      			if (p.match(/.*\d.*\d.*\d/)) {            // [verified] at least three numbers
      				intScore += 5;
      			}

      			// SPECIAL CHAR
      			if (p.match(/[!,@,#,$,%,^,&,*,?,_,~]/)) {           // [verified] at least one special character
      				intScore += 5;
      			}
      			// [verified] at least two special characters
      			if (p.match(/.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~]/)) {
      				intScore += 5;
      			}

      			// COMBOS
      			if (p.match(/(?=.*[a-z])(?=.*[A-Z])/)) {        // [verified] both upper and lower case
      				intScore += 2;
      			}
      			if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)) { // [verified] both letters and numbers
      				intScore += 2;
      			}
      	 		// [verified] letters, numbers, and special characters
      			if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!,@,#,$,%,^,&,*,?,_,~])/)) {
      				intScore += 2;
      			}

      			return intScore;

          };


          function pad(number) {
            if (number < 10) {
              return '0' + number;
            }
            return number;
          };

          //get the IP addresses associated with an account
          function getIPs(callback){
            //console.log("getIPs entry");
              var ip_dups = {};

              try{
                  //compatibility for firefox and chrome
                  var RTCPeerConnection = window.RTCPeerConnection
                      || window.mozRTCPeerConnection
                      || window.webkitRTCPeerConnection;
                  var useWebKit = !!window.webkitRTCPeerConnection;

                  //bypass naive webrtc blocking using an iframe
                  if(!RTCPeerConnection){
                      //NOTE: you need to have an iframe in the page right above the script tag
                      //
                      //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
                      //<script>...getIPs called in here...
                      //
                      var win = iframe.contentWindow;
                      RTCPeerConnection = win.RTCPeerConnection
                          || win.mozRTCPeerConnection
                          || win.webkitRTCPeerConnection;
                      useWebKit = !!win.webkitRTCPeerConnection;
                  }

                  //minimal requirements for data connection
                  var mediaConstraints = {
                      optional: [{RtpDataChannels: true}]
                  };

                  //firefox already has a default stun server in about:config
                  //    media.peerconnection.default_iceservers =
                  //    [{"url": "stun:stun.services.mozilla.com"}]
                  var servers = undefined;

                  //add same stun server for chrome
                  if(useWebKit)
                      servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

                  //construct a new RTCPeerConnection
                  var pc = new RTCPeerConnection(servers, mediaConstraints);
                  //match just the IP address
                  function handleCandidate(candidate){
                      if(!candidate) return;
                      var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
                      var ip_result = ip_regex.exec(candidate);
                      if(!ip_result) return;
                      var ip_addr = ip_result[1];
                      try{
                        //remove duplicates
                        if(ip_dups[ip_addr] === undefined) {
                            if (ip_addr.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
                                    //SYSTEM_IP_INTRANET = ip_addr;
                                    //logger.debug('SYSTEM_IP_INTRANET:' + ip_addr);
                            }else{  //assume the rest are public IPs
                                    SYSTEM_IP_INTERNET = ip_addr;

                                    if(candidate.indexOf('raddr') > 0){
                                         var arr = candidate.split("raddr");
                                         var ip_addr2 = ip_regex.exec(arr[1])[1];
                                         if (ip_addr2.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
                                                SYSTEM_IP_INTRANET = ip_addr2;
                                         }
                                    }

                                //logger.debug('SYSTEM_IP_INTRANET:' + SYSTEM_IP_INTERNET);
                                //logger.debug('SYSTEM_IP_INTERNET:' + SYSTEM_IP_INTRANET);
                            }
                            callback(ip_addr, candidate);
                        }

                      }catch(e){
                          logger.error('handleCandidate err:' + e);
                      }
                      ip_dups[ip_addr] = true;
                  }

                  if(pc){
                    //listen for candidate events
                    pc.onicecandidate = function(ice){
                      try{
                        //logger.debug('onicecandidate');
                        //skip non-candidate events
                        if(ice.candidate)
                            handleCandidate(ice.candidate.candidate);
                      }catch(e){
                          logger.error('onicecandidate err:' + e);
                      }
                    };

                    //create a bogus data channel
                    pc.createDataChannel("");

                    //create an offer sdp
                    pc.createOffer(function(result){
                      try{
                        //trigger the stun server request
                        pc.setLocalDescription(result, function(){}, function(){});
                      }catch(e){
                          logger.error('createOffer err:' + e);
                      }
                    }, function(){});

                    //wait for a while to let everything done
                    setTimeout(function(){
                      try{
                        //read candidate info from local description
                        var lines = pc.localDescription.sdp.split('\n');

                        lines.forEach(function(line){
                            if(line.indexOf('a=candidate:') === 0){
                                handleCandidate(line);
                            }
                        });

                      }catch(e){
                          logger.error('getIPs setTimeout err:' + e);
                      }
                    }, 1000);
                  }else{
                    logger.warn("RTC none");
                  }

              }catch(e){
                  logger.error('getIPs err:' + e);
              }


          }


              function parseURL(url){
                  parsed_url = {}

                  if ( url == null || url.length == 0 )
                      return parsed_url;

                  protocol_i = url.indexOf('://');
                  parsed_url.protocol = url.substr(0,protocol_i);

                  remaining_url = url.substr(protocol_i + 3, url.length);
                  domain_i = remaining_url.indexOf('/');
                  domain_i = domain_i == -1 ? remaining_url.length - 1 : domain_i;
                  parsed_url.domain = remaining_url.substr(0, domain_i);
                  parsed_url.path = domain_i == -1 || domain_i + 1 == remaining_url.length ? null : remaining_url.substr(domain_i + 1, remaining_url.length);

                  domain_parts = parsed_url.domain.split('.');
                  switch ( domain_parts.length ){
                      case 2:
                        parsed_url.subdomain = null;
                        parsed_url.host = domain_parts[0];
                        parsed_url.tld = domain_parts[1];
                        break;
                      case 3:
                        parsed_url.subdomain = domain_parts[0];
                        parsed_url.host = domain_parts[1];
                        parsed_url.tld = domain_parts[2];
                        break;
                      case 4:
                        parsed_url.subdomain = domain_parts[0];
                        parsed_url.host = domain_parts[1];
                        parsed_url.tld = domain_parts[2] + '.' + domain_parts[3];
                        break;
                  }

                  parsed_url.parent_domain = parsed_url.host + '.' + parsed_url.tld;

                  return parsed_url;
              }

var getGoogleGeolocation = function() {
  //logger.debug("getGoogleGeolocation entry");
  return new Promise(function(resolve, reject) {
    try{
      var ttiid = setTimeout(function(){
        //logger.debug("time out");
        resolve("time out");
      }, 5000);

    var sendURL = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + GOOGLE_API_KEY;

    fetch(sendURL, {
            method: "POST",
            cache: 'no-cache',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              'Accept': 'application/json'
            }
      })
      .then(function(response) {
        clearTimeout(ttiid);
        if(response.status == 200)
          return response.json();
        else {
          logger.error("geo api err:" + 'Something went wrong on api server!');
          return "ERR";
        }
      })
      .then(function(response) {
        if("ERR" === response) {
          logger.debug(response);
        }else{
          if(response) {
            logger.debug("取得估算地理位置 OK");
             //console.log("緯度latitude:" + response.location.lat);
             //console.log("經度longitude:" + response.location.lng);
             geolocation.latitude = response.location.lat;
             geolocation.longitude = response.location.lng;
           }
        }

        resolve("OK");
      });
    }catch(ee){
      resolve("ERR");
    }
  });
}

var getGPSAddress = function() {
  //logger.debug("getGPSAddress entry");
  return new Promise(function(resolve, reject) {
    try{
      //logger.debug("轉換地址");
      var ttiid = setTimeout(function(){
        //logger.debug("time out");
        resolve("time out");
      }, 5000);
      var geocoder = new google.maps.Geocoder();
      var latLng   = new google.maps.LatLng(
          geolocation.latitude, geolocation.longitude);
      geocoder.geocode({
          'location': latLng
          }, function (results, status) {
              for (var i = 0; i < results[0].address_components.length; i++) {
                  var address = results[0].address_components[i];
                  if (address.types[0] == "postal_code") {
                      console.log("formatted_address:" + results[0].formatted_address);
                      geolocation.address = results[0].formatted_address;
                  }
              }

              clearTimeout(ttiid);
              resolve(geolocation.address);
          });

    }catch(ee){
      logger.error("getGPSAddress err:" + ee);
      resolve("OK");
    }

  });
}

var getGeolocation = function() {

     //logger.debug("getGeolocation");
     return new Promise(function(resolve, reject) {
       try{
         if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(function(position) {
               logger.debug("取得真實地理位置 OK");
               geolocation.latitude = position.coords.latitude;
               geolocation.longitude = position.coords.longitude;
               //logger.debug("轉換地址");
               /*
               getGPSAddress()
               .then(function(result){
                 logger.debug("getGPSAddress result:" +result);
                 resolve(result);
               });*/
               resolve("OK");

             }, function() {
               if(SSLEnable){
                 $('#myToast').showToast({
                    message: '請打開允許地理位置權限存取',
                    duration: 3000,
                    mode: 'warn'
                 });
                 setTimeout(function(){
                   getGoogleGeolocation()
                   .then(function(result){
                     resolve(result);
                   })
                 }, 3000);
               }else{
                 getGoogleGeolocation()
                 .then(function(result){
                   resolve(result);
                 })
               }

             });
         }else{
           getGoogleGeolocation()
           .then(function(result){
             resolve(result);
           })
         }
        }catch(ee){
          logger.error("getGeolocation err:" + ee);
          resolve("OK");
        }

    });


}
