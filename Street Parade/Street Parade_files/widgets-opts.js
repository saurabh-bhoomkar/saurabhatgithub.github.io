var tiny_mce_opts = {
	    theme : "advanced",
	    relative_urls : false,
	    theme_advanced_toolbar_location : "top",
	    theme_advanced_toolbar_align : "left",
	    theme_advanced_statusbar_location : "bottom",
	    theme_advanced_resizing : true,
	    theme_advanced_resize_horizontal : false,
	    plugins : "lists,style,layer,table,advhr,advimage,advlink,insertdatetime,preview,media,contextmenu,paste,directionality,fullscreen,visualchars,nonbreaking,xhtmlxtras,template",
	    skin : "o2k7",
	    skin_variant : "silver",
	    theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,fontselect,fontsizeselect,forecolor,|,removeformat,|,charmap",
	    theme_advanced_buttons2 : "undo,redo,|,cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,sub,sup,hr,|,link,unlink,anchor,image,|,code,cleanup,fullscreen,|,help",
	    theme_advanced_buttons3 : ""
	};

var calendar_opts = {
		changeMonth: true,
		changeYear: true,
		showOn: "button",
		buttonImage: MEDIA_URL + "img/icon_calendar.gif",
		buttonImageOnly: true,
		dateFormat: 'yy-mm-dd',
		timeFormat: 'hh:mm:ss'
	};