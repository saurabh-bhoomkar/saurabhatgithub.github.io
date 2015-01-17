(function() {
  // class name applied to <html> immediately after executing this JS
  // helps to hide elements much more quickly than ".dom .element"
  document.documentElement.className = 'js';
})();

var HSPL = {
  start: function() {
    this.warmUpEngine();
    this.enableCarousel();
    this.enablePanes();
  },
  warmUpEngine: function(){
    // additional class added to <html> after firing DOMContentLoaded
    $('html').addClass('dom');
    
    // based on Modernizer.js by Aruk Fates and Paul Irish (http://modernizr.com)    
    var properties = ['box-shadow'];
    var test_element = document.createElement('span');
    
    var test_properties = function(properties) {
      for (var i=0; i < properties.length; i += 1) {
        if (test_element.style[properties[i]] !== undefined) {
          return true;
        }
      }
    };
    
    var test_properties_all = function(property) { 
      property = property.replace(/-([a-z])/ig, function(all, letter) {
        return letter.toUpperCase();
      });
      var vendor_property = property.charAt(0).toUpperCase() + property.slice(1),
      properties = [
        property,
            'Moz' + vendor_property,
            'moz' + vendor_property,
             'ms' + vendor_property,
              'o' + vendor_property,
         'webkit' + vendor_property
      ];
      return !!test_properties(properties);
    };
    
    for (var i=0; i < properties.length; i += 1) {
      if (!test_properties_all(properties[i])) {
        $('body').addClass('no-' + properties[i]);
      }
    }
    
    if ($.browser.msie) {
      $('iframe').attr('frameborder', '0');
    }
    
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      $('body').addClass('chrome');
    }
    
  },
  
  enableCarousel: function(){
    
    var settings = {
      'placeholder-path': 'content/a11y.png',
      'duration': '50'
    };
    
    $('.carousel').each(function() {
      var $container = $(this);
      var $section = $container.parents('.section').eq(0);
      var $nav_container = $section.children('footer');
      var $nav = $('<ul class="carousel-nav"></ul>').prependTo($nav_container);

      // wrap carousel items into additional div
      $container.wrapInner('<div class="wrap"></div>');
      
      var $items_wrapper = $container.children('div');
      var $items = $container.find('.item');
      var items_count = $items.length;
      var item_selected = $items.filter('.selected').index();
      
      // get value of item width (auto)
      var item_width = $container.width();
      // resize wrapper
      $items_wrapper.css('width', item_width * items_count);
      // apply width to each item
      $items.css('width', item_width);
      
      // global function checking if animation is possible
      var is_valid = function(delta) {
        var valid = false;
        if ((current + delta >= 0) && (current + delta < items_count)) { 
          valid = true;
        }
        return valid;
      };

      // switch view
      var current = item_selected;
      var activate_item = function(index, animate) {
        var position = 0 - (index * item_width);
        
        var callback = function() {
          current = index;
          // toggle selected link
          $nav.find('li').removeClass('selected');
          $nav.find('a[data-index="' + index + '"]').parent().addClass('selected'); 
          // toggle prev/next links
          $nav_prev[(is_valid(-1) ? 'remove' : 'add') + 'Class']('disabled');
          $nav_next[(is_valid(1) ? 'remove' : 'add') + 'Class']('disabled');          
        };
        
        if (animate) {
          $items_wrapper.animate({
            'margin-left': position
          }, settings['duration'], callback);
        } else {
          $items_wrapper.css('margin-left', position);
          callback();
        }
      };
      
      // make navigation links
      var make_nav_link = function(index, selected) {
        var $nav_link = $('<li><a href="#news-' + index + '" data-index="' + index + '">' + (index + 1) + '</a></li>');
        if (selected) { $nav_link.addClass('selected'); }
        $nav_link.find('a').bind('click', function(e) {
          var index = parseInt($(this).attr('data-index'), 10);
          activate_item(index, true);
          e.preventDefault();
        });
        return $nav_link;
      };
      
      for (var i=0; i < items_count; i++) {
        $nav.append(make_nav_link(i, (item_selected === i ? true : false)));
      }
      
      // make prev / next links
      var make_special_nav_link = function(delta) {
        var label = (delta === 1) ? 'Next' : 'Previous';
        var short_label = label.slice(0, 4).toLowerCase();
        var $nav_link = $('<li><a href=""><img src="' + settings['placeholder-path'] + '" alt=""></a></li>');
        
        $nav_link.addClass(short_label);
        
        if (!is_valid(delta)) {
          $nav_link.addClass('disabled');
        }
        
        $nav_link.find('a').bind('click', function(e) {
          if (is_valid(delta)) {
            activate_item(current + delta, true);
          }
          e.preventDefault();
        });
        return $nav_link;
      };
      
      var $nav_prev = make_special_nav_link(-1).prependTo($nav);
      var $nav_next = make_special_nav_link(1).appendTo($nav);
      
      // activate selected item (it can be other than first!) without animation
      activate_item(item_selected, false);
      
    });
    
  },
  
  enablePanes: function(){
	  
	$("#contest-edit-btn").click(function(){
		$("#contest-edit").toggle('fast');
	});
	  
    $('.panes').each(function() {
      
      var $container = $(this);
      var $section = $container.parents('.section').eq(0);
      var $section_heading = $section.find(' > header > h1');
      var $nav_container = $section.children('footer');
      var $nav = $('<ul class="panes-nav"></ul>').prependTo($nav_container);
      
      var $items = $container.find('.pane');
      var items_count = $items.length;
      var item_selected = $items.filter('.selected').index();
      
      var change_heading = function(index) {
        $section_heading.text($items.eq(index).find(' > h1').text());        
      };
      
      var activate_pane = function(index) {
        $items.hide();
        $items.eq(index).show();
        $nav.find('li').removeClass('selected');
        $nav.find('a[data-index="' + index + '"]').parent().addClass('selected');
        change_heading(index);
      };
      
      var make_nav_link = function(index, selected) {
        var label = $items.eq(index).find('.outline').attr('data-pane-label');
        var $nav_link = $('<li><a href="#pane-' + index + '" data-index="' + index + '">' + label + '</a></li>');
        if (selected) { $nav_link.addClass('selected'); }
        $nav_link.find('a').bind('click', function(e) {
          var index = parseInt($(this).attr('data-index'), 10);
          activate_pane(index);
          e.preventDefault();
        });
        return $nav_link;
      };
      
      for (var i=0; i < items_count; i++) {
        $nav.append(make_nav_link(i, (item_selected === i ? true : false)));
      }
      
      change_heading(item_selected);
      
    });
  }
};

$(function() {
  HSPL.start();
});