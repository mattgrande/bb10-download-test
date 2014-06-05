/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.downloadImageViaFileTransfer();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    downloadImage: function() {
        // blackberry.io.sandbox = false;

        var url = 'http://cordova.apache.org/images/cordova_bot.png';
        alert('Downloading: ' + url);

        window.webkitRequestFileSystem(
            window.PERSISTENT, 1024*1024, 
            function(fs) {
                console.log("requestFileSystem", arguments);
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'blob';
                
                xhr.onerror = function () {
                    console.log("xhr.onError", arguments);
                };
        
                xhr.onload = function(e) {
                    console.log("xhr.onLoad", arguments);
                    if (this.status === 200) {
                        fs.root.getFile(
                            "cordova_bot.png", 
                            {create: true}, 
                            function (fileEntry) {
                                console.log("getFile", arguments);
            
                                fileEntry.createWriter(function(writer) {
                                    console.log("createWriter", arguments);
                                    writer.onwriteend = function(e) {
                                        console.log("onWriteEnd", arguments);
                                        var img = document.createElement("img");
                                        img.src = blackberry.io.home + "data/webviews/webfs/persistent/local__0/cordova_bot.png";
                                        document.body.appendChild(img);
                                    };
            
                                    var blob = new Blob([xhr.response], {type: 'image/png'});
                                    writer.write(blob);
                                });
                            },
                            function () {
                                console.log("getFileError", arguments);
                            }
                        );
                    }
                };
        
                xhr.send();
            }
        );
    },

    downloadImageViaFileTransfer: function() {

        var url = 'http://weeversites.cloudapp.net/streetsmarts/videos/SpecApp_Awstin_2500.mp4';
        alert('Downloading: ' + url);

        window.webkitRequestFileSystem(
            window.PERSISTENT, 1024*1024, 
            function(fs) {
                console.log("requestFileSystem", arguments);

                fs.root.getFile(
                    "cordova_bot.png", 
                    {create: true}, 
                    function (fileEntry) {
                        var destination = blackberry.io.home + "data/webviews/webfs/persistent/local__0/cordova_bot.png";

                        var fileTransfer = new FileTransfer();
                        fileTransfer.download(
                            url,
                            destination,
                            function( entry ) {
                                alert('FILE DOWNLOADED');
                            },
                            function( error ) {
                                console.log( error );
                                alert( 'ERROR WHILE DOWNLOADING!' );
                            }
                        )
                    }
                );
            }
        );
    }
};
