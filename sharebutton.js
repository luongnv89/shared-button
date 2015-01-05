sharebutton = {
	styleURL:'',
	shareButtonTemplate:'<div id="share-button-template"><a class="btnTwitter btnShare"><i class="fa fa-twitter"></i><span class="btnLabel">Twitter</span></a><a class="btnFacebook btnShare"><i class="fa fa-facebook"></i><span class="btnLabel">Facebook</span></a><a class="btnGooglePlus btnShare"><i class="fa fa-google-plus"></i><span class="btnLabel">Google+</span></a><a class="btnEmail btnShare"><i class="fa fa-send"></i><span class="btnLabel">Email</span></a><a class="btnLinkedin btnShare"><i class="fa fa-linkedin"></i><span class="btnLabel">Linkedin</span></a></div>',
	config:{
		/**
		 * URL to share
		 * Default: window.location.href
		 */
		 url:window.location.href,
		/**
		 * Title to share
		 * Default: window.document.title
		 */
		 title:window.document.title,
		/**
		 * Description of the sharing like the message to share
		 * Default: window.document.title
		 */
		 desc:window.document.title,
		/**
		 * Config for twitter
		 */
		 twitter:{
		 	url:window.location.href,
		 	text:window.document.title,
		 	via:'',
		 	hashtags:'',
		 	related:''
		 },
		/**
		 * Config for facebook
		 */
		 facebook:{
		 	url:window.location.href,
		 	text:window.document.title
		 },
		 /**
		  * Linkedin button
		  * @type {Object}
		  */
		  linkedin:{
		  	url:window.location.href,
		  	title:window.document.title,
		  	summary:window.document.title,
		  	source:window.location.href
		  },
		 /**
		  * Google plus button
		  * @type {Object}
		  */
		  googleplus:{
		  	url:window.location.href
		  },
		  /**
		   * Email button
		   */
		  email:{
		  	url:window.location.href,
		  	subject:window.document.title,
		  	body:window.document.title,
		  	receiver:''
		  }
	},
	framesize:{
		width:520,
		height:350,
	},
	createShareButton:function () {},
	loadCSS:function () {},
	getShareButtonTemplate:function() {},
	createTwitterHREF:function(){},
	createFacebookHREF:function () {},
	createGooglePlusHREF:function(){},
	createLinkedinHREF:function(){},
	createEmailHREF:function(){},
	configFrame:function() {},
	configSharebutton:function(config){}
}

sharebutton.configSharebutton = function (config) {
	if(!config.title){
		config.title = window.document.title;
	}

	if(config.desc){
		config.desc=config.desc.replace('|',',');
	}

	if(!config.desc){
		config.desc = window.document.title;
	}

	if(config.desc){
		config.desc=config.desc.replace('|',',');
	}

	sharebutton.config.url =config.url||window.location.href;
	sharebutton.config.title = config.title||window.document.title;
	sharebutton.config.desc = config.desc||window.document.title;
	
	if(config.twitter){
		sharebutton.config.twitter=config.twitter;
		sharebutton.config.twitter.url = config.twitter.url||sharebutton.config.url;
		sharebutton.config.twitter.text=config.twitter.text||sharebutton.config.desc;
	}else{
		sharebutton.config.twitter.url = sharebutton.config.url;
		sharebutton.config.twitter.text=sharebutton.config.desc;
	}

	if(config.facebook){
		sharebutton.config.facebook = config.facebook;
		sharebutton.config.facebook.url=config.facebook.url||sharebutton.config.url;
		sharebutton.config.facebook.text = config.facebook.text||sharebutton.config.desc;
	}else{
		sharebutton.config.facebook.url=sharebutton.config.url;
		sharebutton.config.facebook.text = sharebutton.config.desc;
	}

	if(config.googleplus){
		sharebutton.config.googleplus = config.googleplus;
		sharebutton.config.googleplus.url=config.googleplus.url||sharebutton.config.url;
	}else{
		sharebutton.config.googleplus.url=sharebutton.config.url;
	}

	if(config.linkedin){
		sharebutton.config.linkedin = config.linkedin;
		sharebutton.config.linkedin.url = config.linkedin.url||sharebutton.config.url;
		sharebutton.config.linkedin.title =config.linkedin.title||sharebutton.config.title;
		sharebutton.config.linkedin.summary=config.linkedin.summary||sharebutton.config.desc;
		sharebutton.config.linkedin.source = config.linkedin.source||window.location.href;
	}else{
		sharebutton.config.linkedin.url = sharebutton.config.url;
		sharebutton.config.linkedin.title =sharebutton.config.title;
		sharebutton.config.linkedin.summary=sharebutton.config.desc;
		sharebutton.config.linkedin.source = window.location.href;
	}

	if(config.email){
		sharebutton.config.email = config.email;
		sharebutton.config.email.url = config.email.url||sharebutton.config.url;
		sharebutton.config.email.subject =config.email.subject||sharebutton.config.title;
		sharebutton.config.email.body=config.email.body||sharebutton.config.desc;
	}else{
		sharebutton.config.email.url = sharebutton.config.url;
		sharebutton.config.email.subject =sharebutton.config.title;
		sharebutton.config.email.body=sharebutton.config.desc;
	}

}


sharebutton.loadCSS = function () {
	if(sharebutton.styleURL){
		var newStyle = document.createElement('link');
		newStyle.setAttribute('rel','stylesheet');
		newStyle.setAttribute('href',sharebutton.styleURL);
		window.document.head.appendChild(newStyle);
	}
}

sharebutton.getShareButtonTemplate = function () {
	var mParser = new DOMParser();
	var htmlTemplateParser = mParser.parseFromString(sharebutton.shareButtonTemplate,'text/html');
	return htmlTemplateParser.querySelector('#share-button-template');
}

sharebutton.createShareButton = function (config) {	
	if(config){
		sharebutton.configSharebutton(config);
	}
	sharebutton.loadCSS();
	var btnShares = document.querySelectorAll('.share-button');
	for(var i=0;i<btnShares.length;i++){
		var currentButtonShare = btnShares[i];
		currentButtonShare.innerHTML="";
		var shareButtonTemp = sharebutton.getShareButtonTemplate();
		var btnTwitter = shareButtonTemp.querySelector('.btnTwitter');
		var btnFacebook = shareButtonTemp.querySelector('.btnFacebook');
		var btnGooglePlus = shareButtonTemp.querySelector('.btnGooglePlus');
		var btnEmail = shareButtonTemp.querySelector('.btnEmail');
		var btnLinkedin = shareButtonTemp.querySelector('.btnLinkedin');
		if(btnTwitter){
			btnTwitter.setAttribute('href',sharebutton.createTwitterHREF());
			btnTwitter.setAttribute('onclick',sharebutton.configFrame(sharebutton.framesize.width,sharebutton.framesize.height));
			currentButtonShare.appendChild(btnTwitter);
		}
		if(btnFacebook){
			btnFacebook.setAttribute('href',sharebutton.createFacebookHREF());
			btnFacebook.setAttribute('onclick',sharebutton.configFrame(sharebutton.framesize.width,sharebutton.framesize.height));
			currentButtonShare.appendChild(btnFacebook);
		}
		if(btnGooglePlus){
			btnGooglePlus.setAttribute('href',sharebutton.createGooglePlusHREF());
			btnGooglePlus.setAttribute('onclick',sharebutton.configFrame(sharebutton.framesize.width,sharebutton.framesize.height));
			currentButtonShare.appendChild(btnGooglePlus);
		}
		if(btnEmail){
			btnEmail.setAttribute('href',sharebutton.createEmailHREF());
			btnEmail.setAttribute('onclick',sharebutton.configFrame(sharebutton.framesize.width,sharebutton.framesize.height));
			currentButtonShare.appendChild(btnEmail);
		}
		if(btnLinkedin){
			btnLinkedin.setAttribute('href',sharebutton.createLinkedinHREF());
			btnLinkedin.setAttribute('onclick',sharebutton.configFrame(sharebutton.framesize.width,sharebutton.framesize.height));
			currentButtonShare.appendChild(btnLinkedin);
		}
	}
}


/**
 * Create twitter href to share
 * Config:
 * twitter:{
		 	url:sharebutton.config.url,
		 	text:sharebutton.config.desc,
		 	via:'',
		 	hashtags:'',
		 	related:''
		 },
 * @return {String} url
 */
sharebutton.createTwitterHREF=function () {
	var url = 'https://twitter.com/intent/tweet?';
	var conf = sharebutton.config.twitter;
	if(conf.text){
		url+='text='+conf.text;
	}
	if(conf.related){
		url+='&related='+conf.related;
	}
	if(conf.via){
		url+='&via='+conf.via;
	}
	if(conf.url){
		url+='&url='+conf.url;
	}
	if(conf.hashtags){
		url+='&hashtags='+conf.hashtags;
	}
	return url;
}
/**
 * Create facebook href
 * Config:
 * facebook:{
		 	url:sharebutton.config.url,
		 	text:sharebutton.config.desc
		 },
 * @return {String} facebook href
 */
sharebutton.createFacebookHREF = function () {
	var url = 'https://www.facebook.com/sharer/sharer.php?';
	var conf = sharebutton.config.facebook;
	if(conf.url){
		url+='u='+conf.url;
	}
	if(conf.text){
		url+='&t='+conf.text;
	}
	return url;
}

/**
 * Create linkedin href
 * Config:
		 linkedin:{
		  	url:sharebutton.config.url,
		  	title:window.document.title,
		  	summary:sharebutton.config.desc,
		  	source:sharebutton.config.url
		  },
 * @return {String} Linkedin href
 */
sharebutton.createLinkedinHREF = function () {
	var url = "https://www.linkedin.com/shareArticle?mini=true";
	var conf = sharebutton.config.linkedin;
	if(conf.url){
		url+='&url='+conf.url;
	}
	if(conf.title){
		url+='&title='+conf.title;
	}
	if(conf.summary){
		url+='&summary='+conf.summary;
	}
	if(conf.source){
		url+='&source='+conf.source;
	}
	return url;
}

/**
 * Create google plus href
 * Config:
 * googleplus:{
		  	url:sharebutton.config.url
		  },
 * @return {String} Google plus href
 */
sharebutton.createGooglePlusHREF = function () {
	var url = "https://plus.google.com/share?";
	var conf = sharebutton.config.googleplus;
	if(conf.url){
		url+='url='+conf.url;
	}
	return url;
}

/**
 * Create email href
 * Config:
 * email:{
		  	url:sharebutton.config.url,
		  	subject:sharebutton.config.title,
		  	body:sharebutton.config.desc,
		  	receiver:''
		  }
 * @return {String} Email href
 */
sharebutton.createEmailHREF = function () {
	var url="mailto:";
	var conf = sharebutton.config.email;
	if(conf.receiver){
		url+=conf.receiver;
	}
	if(conf.subject){
		url+='?subject='+conf.subject;
	}else{
		url+='?subject=I want to share you a link';
	}
	if(conf.body){
		url+='&body='+conf.body;
	}
	if(conf.url){
		url+='\n This is the sharing link: '+conf.url;
	}
	return url;
}
/**
 * Set size for frame
 * @param  {Number} winWidth  Width of frame
 * @param  {Number} winHeight Height of frame
 * @return {String}           The string to set for onclick attribute of link
 */
sharebutton.configFrame=function (winWidth,winHeight) {
	var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    var str = "javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,"+"height="+winHeight+",width="+winWidth+",top="+winTop+",left="+winLeft+"');return false;";
    return str;
}