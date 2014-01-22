(function (myHplApp) {
 
    //create a nested namespace
	myHplApp.model = myHplApp.model || {};
 
 
	var config = {
			sLocale: 			'en',
			otextBundle: 		{},
			msgTerminator: 		':]',
			mainmenuView: 		'',
			cockpitView:    	'',
			pilotView:      	'',
			currentViewContent: '',
			oAbsoluteLayoutHome: {}
	};
	
	
	var music 			= [];
	var soundEffects 	= [];
	
	var assetLoader = {
		    loaded:				true,
		    loadedCount:		0, // Assets that have been loaded so far
		    totalCount:			0, // Total number of assets that need to be loaded
		    soundFileExtn:		".mp3",
		    
		    init:function(){
		    	console.log('App model....Initialising asset loader');
		    },
		    
		    loadImage:	function(url) {
		        this.totalCount++;
		        this.loaded 	= false;
		        var image 		= new Image();
		        image.src 		= url;
		        image.onload 	= loader.itemLoaded;
		        return image;
		    },
		    
		    loadSound:function(url) {
		    	console.log('Asset loading sound');
		        this.totalCount++;
		        this.loaded = false;
		        var audio 	= new Audio();
		        audio.src 	= url;
				audio.addEventListener("canplaythrough", assetLoader.itemLoaded, false);
		        return audio;   
		    },
		    
		    itemLoaded:function(){
		        assetLoader.loadedCount++;
		        if (assetLoader.loadedCount === assetLoader.totalCount){
		            // Loader has loaded completely..
		            assetLoader.loaded = true;
		            //and call the loader.onload method if it exists
		            if(assetLoader.onload){
		                assetLoader.onload();
		                assetLoader.onload = undefined;
		            }
		        }
		    }
	};
	
	
	options = {
	        outputElementId: "messageOutput",
	        delay: 0,
	        emptyDisplayString: ""
	    };
	
	var messageQueue;
	
	myHplApp.model.setConfigSlocale = function() {
		config.sLocale = sap.ui.getCore().getConfiguration().getLanguage();
	};

	
	myHplApp.model.getOtextBundle = function() {
		return config.otextBundle;
	};


		
	myHplApp.model.setConfigOtextBundle = function() {
  	    config.otextBundle = jQuery.sap.resources({url : "/assets/i18n/messagebundle.hdbtextbundle", locale: config.sLocale});
	};


	myHplApp.model.getConfigMainmenuView = function() {
  	    return config.mainmenuView;
	};


	myHplApp.model.getConfigCockpitView = function() {
  	    return config.cockpitView;
	};

	myHplApp.model.getConfigPilotView = function() {
  	    return config.pilotView;
	};

	
	myHplApp.model.initLayoutHome = function() {
		config.oAbsoluteLayoutHome = new sap.ui.commons.layout.AbsoluteLayout({width: "100%", height: "100%"});
	};
	
	
	myHplApp.model.setConfigViews = function() {
		sap.ui.localResources("mainmenu_ui_resources");
		config.mainmenuView = sap.ui.view({  
		    	id: 		"viewMainMenu",  
		    	viewName:	"mainmenu_ui_resources.mainmenu",  
		    	type: 		sap.ui.core.mvc.ViewType.JS  
		});  


		sap.ui.localResources("cockpit_ui_resources");
		config.cockpitView = sap.ui.view({  
		    	id: 		"viewCockpit",  
		    	viewName: 	"cockpit_ui_resources.cockpit",  
		    	type: 		sap.ui.core.mvc.ViewType.JS  
		});  


		sap.ui.localResources("pilot_ui_resources");
		config.pilotView = sap.ui.view({  
		    	id: 		"viewPilot",  
		    	viewName: 	"pilot_ui_resources.pilot",  
		    	type: 		sap.ui.core.mvc.ViewType.JS  
		});
	};

	
	myHplApp.model.setAssetLoaderInit = function() {
		assetLoader.init();
	};
	

	myHplApp.model.setLoadMusic = function() {
		console.log('Application model.....Loading music');
		var myMusic 	= {};
		myMusic.name 	= "Time";
		myMusic.url 	= "./assets/audio/music/Time.mp3";
		myMusic.music 	= assetLoader.loadSound(myMusic.url);
		music.push(myMusic);
	};
	

	myHplApp.model.setLoadSoundEffects = function() {
		console.log('Application model.....Loading sound effects');
		
		var myUrl = "./assets/audio/effects/cannonFire.mp3";
		var mySoundEffect = {name: 		"cannonFire",
				 url: 		myUrl,
				 sound: 	assetLoader.loadSound(myUrl)
		};
		soundEffects.push(mySoundEffect);
		
		
		var myUrl = "./assets/audio/effects/cannonSpindown.mp3";
		var mySoundEffect = {name: 		"cannonSpindown",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/powerUp.mp3";
		var mySoundEffect = {name: 		"powerUp",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/powerDown.mp3";
		var mySoundEffect = {name: 		"powerDown",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/click1.mp3";
		var mySoundEffect = {name: 		"click1",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/click2.mp3";
		var mySoundEffect = {name: 		"click2",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/click3.mp3";
		var mySoundEffect = {name: 		"click3",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/click4.mp3";
		var mySoundEffect = {name: 		"click4",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/click5.mp3";
		var mySoundEffect = {name: 		"click5",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/click6.mp3";
		var mySoundEffect = {name: 		"click6",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/click7.mp3";
		var mySoundEffect = {name: 		"click7",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/click8.mp3";
		var mySoundEffect = {name: 		"click8",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/click9.mp3";
		var mySoundEffect = {name: 		"click9",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);


		var myUrl = "./assets/audio/effects/pulse1.mp3";
		var mySoundEffect = {name: 		"pulse1",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		
		var myUrl = "./assets/audio/effects/skid1.mp3";
		var mySoundEffect = {name: 		"skid1",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/switch1.mp3";
		var mySoundEffect = {name: 		"switch1",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/voiceAllSystemsActive.mp3";
		var mySoundEffect = {name: 		"voiceallsystemsactive",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/voiceLaunchSequenceActivated.mp3";
		var mySoundEffect = {name: 		"voicelaunchsequenceactivated",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);
		
		var myUrl = "./assets/audio/effects/voiceWarning.mp3";
		var mySoundEffect = {name: 		"voicewarning",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/voiceDanger.mp3";
		var mySoundEffect = {name: 		"voicedanger",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);


		var myUrl = "./assets/audio/effects/sonarBeep1.mp3";
		var mySoundEffect = {name: 		"sonarbeep1",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/voiceHolographicsImagingActivated.mp3";
		var mySoundEffect = {name: 		"voiceholographicimagingactivated",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/laserPowerOn.mp3";
		var mySoundEffect = {name: 		"laserPowerOn",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

		var myUrl = "./assets/audio/effects/laserPowerOff.mp3";
		var mySoundEffect = {name: 		"laserPowerOff",
							 url: 		myUrl,
							 sound: 	assetLoader.loadSound(myUrl)
		};		
		soundEffects.push(mySoundEffect);

	};

	

	myHplApp.model.setMessage = function(message) {
		 messageQueue.push(message);
	};
	
	myHplApp.model.setMessageQueue = function() {
		messageQueue = new UiMessageQueue(options);
	};
	
	myHplApp.model.removeCurrentHomeContent = function(view) {
		config.oAbsoluteLayoutHome.removeContent(config.currentViewContent);
	};

	
	myHplApp.model.setLayoutHomeContent = function(view) {
		config.oAbsoluteLayoutHome.addContent(view);
	};

	myHplApp.model.getLayoutHomeContent = function(view) {
		return config.oAbsoluteLayoutHome;
	};

	myHplApp.model.setConfigCurrentViewContent = function(view) {
		config.currentViewContent = view;
	};

	myHplApp.model.getConfigCurrentViewContent = function(view) {
		return config.currentViewContent;
	};
	
	
	myHplApp.model.getConfigMsgTerminator = function(view) {
		return config.msgTerminator;
	};


	myHplApp.model.getSoundEffectByName = function(name) {
		for (var i = 0; i < soundEffects.length; i++) {
		    if (soundEffects[i].name == name){
		    	return soundEffects[i].sound;
		    }
		}
	};


} (myHplApp = window.myHplApp || {}));









