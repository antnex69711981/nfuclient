/**
 *
 * Application AppTool
 * Singleton that contains base webservice url and outputs
 * version number
 * Jack Wen 2018-3-20
 */

Ext.define('antnex.AppTool', {
    singleton: true,

    requires: [

    ],

    config: {

    },

    constructor: function(config) {
        this.initConfig(config);
        return this;
    },





    isWindowCryptoPresent: function() {
      return  (window.crypto || window.msCrypto);
    },


    /**
     * distinct array elements
     * @name stringtoArray
     * @function
     * @param array
     * @return {Array}
     */
    distinctArray: function(arr) {
		   return [...new Set(arr)];
		},

    /**
     * convert a string to an array of character codes
     * @name stringtoArray
     * @function
     * @param {String} s
     * @return {Array of Numbers}
     */
    stringtoArray: function(s) {
        var a = new Array();
        for (var i = 0; i < s.length; i++) {
    			a[i] = s.charCodeAt(i);
        }
        return a;
    },

    /**
     * convert an array of character codes to a string
     * @name arraytostring
     * @function
     * @param {Array of Numbers} a array of character codes
     * @return {String} s
     */
    arraytostring: function(a) {
        var s = "";
        for (var i = 0; i < a.length; i++) {
    	s = s + String.fromCharCode(a[i]);
        }
        return s;
    },

    // https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
    // TextEncoder.encode() Returns a Uint8Array containing utf-8 encoded text.
    encodeArrayBuffer: function(string) {
      return  new TextEncoder("utf-8").encode(string);
    },

    /*
    TextDecoder.decode() Returns a DOMString containing the text decoded with the method of the specific TextDecoder object.
    let win1251decoder = new TextDecoder('windows-1251');
    let bytes = new Uint8Array([207, 240, 232, 226, 229, 242, 44, 32, 236, 232, 240, 33]);
    console.log(win1251decoder.decode(bytes)); // Привет, мир!
    */
    decodeArrayBuffer: function(array){
      return  new TextDecoder("utf-8").decode(array);
    },

    // arraybuffer to utf-8 string  盡量採用上方 decodeArrayBuffer 方法
    arraybuffer2string: function(buf) {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    },

    // utf-8 string convert to arraybuffer 盡量採用上方 encodeArrayBuffer 方法
    string2arraybuffer: function(str) {
      var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
      var bufView = new Uint16Array(buf);
      for (var i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    },


    // bytes unpack to Hex String
    arrayToHexString: function(byteArray) {
      return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
      }).join('')
    },


    hexString2Array: function(hexstring){
      let arr = [];
      for (var i = 0; i < hexstring.length; i += 2) {
        arr.push(parseInt(hexstring.substr(i, 2), 16));
      }
      return arr;
    },


    // unpack ASCII char string to hex string
    unpackToHexstring: function(str){
    	var arr1 = [];
    	for (var n = 0, l = str.length; n < l; n ++)
    	   {
    		var hex = Number(str.charCodeAt(n)).toString(16);
    		arr1.push(hex);
    	 }
    	return arr1.join('');
    },

    // pack Hex String to ASCII char String
    packFromHexString: function(hex) {
        var string = '';
        //console.log("hex:" + hex);
        for (var i = 0; i < hex.length; i += 2) {
          //console.log("i:" + hex.substr(i, 2));
          string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));

        }
        //console.log("packFromHexString:" + string);
        return string;
    },


    // ArrayBuffer to Base64
    ArrayBuffer2Base64: function(arrayBuffer){
      var tmp;

      tmp = (new TextDecoder("utf-8")).decode(arrayBuffer); //to UTF-8 text.
      tmp = unescape(encodeURIComponent(tmp));         //to binary-string.
      tmp = btoa(tmp);                                 //BASE64.
      return tmp;

    },



    randomInt: function(min, max) {
      Math.floor(Math.random() * (max - min + 1)) + min;
    },

/*
    randomInt: function(min, max){
      if (max === undefined) {
    		max = min;
    		min = 0;
    	}

    	if (typeof min !== 'number' || typeof max !== 'number') {
    		throw new TypeError('Expected all arguments to be numbers');
    	}

    	return Math.floor(Math.random() * (max - min + 1) + min);
    },
*/

    randomBytes: function(size) {
      let array = new Int8Array(size);
      window.crypto.getRandomValues(array);
      return array;

    },

    nanoid: function(size) {
      let alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
      var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1
      var step = Math.ceil(1.6 * mask * size / alphabet.length)

      var id = ''
      while (true) {
        var bytes = this.randomBytes(step);
        for (var i = 0; i < step; i++) {
          var byte = bytes[i] & mask
          if (alphabet[byte]) {
            id += alphabet[byte]
            if (id.length === size) return id
          }
        }
      }
    },




    randomString: function(size) {
      return this.arrayToHexString(secureRandom(size));
    },


    exportCryptoKey: function(k){
      return new Promise(resolve => {
    		var exportPromise = window.crypto.subtle.exportKey('raw',k); //jwk
        exportPromise
        .then(function(d){
          let v = new TextDecoder("utf-8").decode(d);
          //console.log("exportCryptoKey:" +  v);
          resolve(v);
     		});
      });
    },

    syncExportCryptoKey: async function(k){
      let d = await window.crypto.subtle.exportKey('raw',k);
    	let v = new TextDecoder("utf-8").decode(d);
    	console.log("syncExportCryptoKey:" +  v);
    	return v;
    },

    genIV: function() {
      return window.crypto.getRandomValues(new Uint8Array(16));
    },


    importCryptoKey: function(key, ivalue) {
      var alg = { name: 'AES-CBC', iv: ivalue };
      window.crypto.subtle.importKey("raw", pwUtf8  ,alg, true,  ["encrypt", "decrypt"])
    	.then(function(key){
        	//returns the symmetric key
        	console.log(key);
    	})
    	.catch(function(err){
        	console.error(err);
    	});
    },


    /*
    add by Jack 2020-Dec-8
    SHA256 DIGEST
    return Bytes convert to Hex Value String
     */
    sha256: async function(str) {
      let buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder("utf-8").encode(str));
      let v = Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
      return v;
    },

    encryptAES: function(alg, cryptokey, plainText) {
      let iv = '0123456789abcdef';
      encrypt_promise = window.crypto.subtle.encrypt(alg, cryptokey, plainText, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });

      encrypt_promise.then(
          function(result){
          	//console.log(new Uint8Array(result));
          	encrypted_data = new Uint8Array(result);
          	//console.log(this.arrayToHexString(encrypted_data));
          },
          function(e){
              console.log(e.message);
          }
      );

    },

    decryptAES: function(alg, cryptokey, encryptdata) {
      let iv = '0123456789abcdef';
      decrypt_promise = window.crypto.subtle.decrypt(alg, cryptokey, encryptdata, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

      decrypt_promise.then(
        function(result){
            decrypted_data = new Uint8Array(result);
            //console.log("decrypted_data:" + this.convertArrayBufferViewtoString(decrypted_data));
        },
        function(e){
            console.log(e.message);
        }
      );


    },

    // Converts a hexadecimally encoded ciphertext string to a cipher params object.
    // @param {string} input The hexadecimally encoded string.
    parseHex: function(hexstring) {
      //return CryptoJS.enc.Hex.parse(hexstr);
      return CryptoJS.format.Hex.parse(hexstring);
    },

    // Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
    stringifyHex: function(words) {
      //return CryptoJS.enc.Hex.stringify(wordArray);
      return CryptoJS.format.Hex.stringify(words);
    },

    // string to wordarray
    parseUTF8: function(str) {
        return CryptoJS.enc.Utf8.parse(str);
    },
    // WordArray to string
    stringifyUTF8: function(wordArray) {
      return CryptoJS.enc.Utf8.stringify(wordArray);
    },

    // Encode String to Base64
    parseBase64: function(base64string) {
        return CryptoJS.enc.Base64.parse(base64string);
    },

    // Decode String from Base64 Enconding
    stringifyBase64: function(words) {
        return CryptoJS.enc.Base64.stringify(words);
    },

    /**
     * convert a Base64 encoded string to a Base64URL encoded string.<br/>
     * @name b64toBase64url
     * @function
     * @param {String} s Base64 encoded string
     * @return {String} Base64URL encoded string
     * @example
     * b64tob64u("ab+c3f/==") &rarr; "ab-c3f_"
     */
    b64toBase64url: function(b64){
        //encodedSource = CryptoJS.enc.Base64.stringify(base64string);
        //encodedSource = base64string.replace(/=+$/, '');
        //encodedSource = encodedSource.replace(/\-/g, "+")
        //encodedSource = encodedSource.replace(/_/g, "/");
        let s = b64;
        //s = s.replace(/\=/g, "");
        s = s.replace(/=+$/, "");
        s = s.replace(/\+/g, "-");
        s = s.replace(/\//g, "_");

        return s;
    },

    /**
     * convert a Base64URL encoded string to a Base64 encoded string.<br/>
     * @name b64urltob64
     * @function
     * @param {String} s Base64URL encoded string
     * @return {String} Base64 encoded string
     * @example
     * b64utob64("ab-c3f_") &rarr; "ab+c3f/=="
     */
    b64urltob64: function(b64u){
      let s = b64u;
      if (s.length % 4 == 2)
        s = s + "==";
      else if (s.length % 4 == 3) s = s + "=";
      s = s.replace(/-/g, "+");
      s = s.replace(/_/g, "/");
      return s;

    },

    padString: function(input){
        let segmentLength = 4;
        let stringLength = input.length;
        let diff = stringLength % segmentLength;

        if (!diff) {
            return input;
        }

        let position = stringLength;
        let padLength = segmentLength - diff;
        let paddedStringLength = stringLength + padLength;
        let buffer = Buffer.alloc(paddedStringLength);

        buffer.write(input);

        while (padLength--) {
            buffer.write("=", position++);
        }

        return buffer.toString();
    },


    encryptTripleDES: function(message, keys) {
      let kwords = CryptoJS.enc.Utf8.parse(keys);
      let msgwords = CryptoJS.enc.Utf8.parse(message);
      let encrypted = CryptoJS.TripleDES.encrypt(msgwords, kwords, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      //console.log("encryptTripleDES:" + encrypted);
      return encrypted;
    },

    // param: encryptedwords base64 string
    decryptTripleDES: function(encryptedwords, keys) {
      let kwords = CryptoJS.enc.Utf8.parse(keys);
      let decrypted = CryptoJS.TripleDES.decrypt(encryptedwords, kwords, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      //console.log("decryptTripleDES:" + decrypted.toString(CryptoJS.enc.Utf8));
      return decrypted.toString(CryptoJS.enc.Utf8);
    },




    createJWTToken: function(header, payload, password) {
      let token = "";
      try{
          let oheader = base64_encode(JSON.stringify(header));
          oheader = this.b64toBase64url(oheader);
          let oPayload = base64_encode(JSON.stringify(payload));
          //console.log("oPayload:\n" + oPayload);
          oPayload = this.b64toBase64url(oPayload);
          //console.log("b64toBase64url:\n" + oPayload);
          let unsigntoken = oheader + "." + oPayload;

          //console.log("base64url_encode:" + unsigntoken);

          let signature = CryptoJS.HmacSHA256(unsigntoken, password);
          let base64 = CryptoJS.enc.Base64.stringify(signature);
          signature = this.b64toBase64url(base64);
          token = unsigntoken + "." + signature;
          //console.log("jwt token:\n" + token);
      }catch(e){
        throw "無法建立 JWT/ TOKEN/err:" + e;
      }

      return token;
    },

    verifyJWTToken: function(token, password){
      //console.log("verifyJWTToken:" + password);
      let message = "";
      try{
        let sa = S(token).splitLeft(".");
        let header = sa[0];
        let payload = sa[1];
        let signature = sa[2];
        //console.log("header: " + header);
        //console.log("payload: " + payload);
        //console.log("signature: " + signature);
        let unsigntoken = header + "." + payload;
        let chksignature = CryptoJS.HmacSHA256(unsigntoken, password);
        let base64 = CryptoJS.enc.Base64.stringify(chksignature);
        chksignature = this.b64toBase64url(base64);
        //console.log("chksignature: " + chksignature);
        if(chksignature != signature) {
          throw "無法驗證 JWT/ TOKEN"
        }

        content = base64_decode(this.b64urltob64(payload));
        //console.log("content[base64_decode]:" + content);
        let newToken = JSON.parse(content);
        message = JSON.stringify(newToken.content);
        //console.log("message:" + message);
      }catch(e){
        throw e;
      }

      return message;
    },


     checkNonSecurityTxcode: function(txcode) {
        let ret = false;
        let codes = ["SYS1001", "SYSD0001", "SYS1003"];
        let find = codes.indexOf(txcode);
        if(find > -1){
          ret = true;
        }

        return ret;
      },

    decryptSessionKey: function (sessionkey, key) {
      let k = "";
      // encrypt sessionkey
      let tk = this.b64urltob64(sessionkey);
      k = this.decryptTripleDES(tk, key);
      return k;
    }




});
