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
		    
		    init:function(){
		    	console.log('App model....Initialising asset loader');
		        // check for sound support
		        var mp3Support,oggSupport;
		        var audio = document.createElement('audio');
		    	if (audio.canPlayType) {
		       		// Currently canPlayType() returns: "", "maybe" or "probably" 
		      		mp3Support = "" != audio.canPlayType('audio/mpeg');
		      		oggSupport = "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
		    	} else {
		    		//The audio tag is not supported
		    		mp3Support = false;
		    		oggSupport = false;	
		    	}

		        // Check for mp3, then ogg, and finally set soundFileExtn to undefined
		        loader.soundFileExtn = mp3Support?".mp3":oggSupport?".ogg":undefined;        
		    },
		    
		    loadImage:	function(url) {
		        this.totalCount++;
		        this.loaded 	= false;
		        var image 		= new Image();
		        image.src 		= url;
		        image.onload 	= loader.itemLoaded;
		        return image;
		    },
		    
		    soundFileExtn:		".mp3",
		    
		    loadSound:function(url) {
		        this.totalCount++;
		        this.loaded = false;
		        var audio 	= new Audio();
		        audio.src 	= url+loader.soundFileExtn;
				audio.addEventListener("canplaythrough", loader.itemLoaded, false);
		        return audio;   
		    },
		    
		    itemLoaded:function(){
		        loader.loadedCount++;
		        if (loader.loadedCount === loader.totalCount){
		            // Loader has loaded completely..
		            loader.loaded = true;
		            //and call the loader.onload method if it exists
		            if(loader.onload){
		                loader.onload();
		                loader.onload = undefined;
		            }
		        }
		    }
	};
	
	
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
		var myMusic = {};
		myMusic.name = "Time";
		myMusic.url = "./assets/audio/music/Time.mp3";
		myMusic.music = assetLoader.loadSound(myMusic.url);
		music.push(myMusic);
	};
	

	myHplApp.model.setLoadSoundEffects = function() {
		var mySoundEffect = {};
		mySoundEffect.name = "mp40";
		mySoundEffect.url = "./assets/audio/effects/mp40";
		mySoundEffect.sound = assetLoader.loadSound(mySoundEffect.url);
		soundEffects.push(mySoundEffect);
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









