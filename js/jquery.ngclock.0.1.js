(function($){
	$.ngDateTime = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("ngDateTime", base);

        base.init = function(){
            base.options = $.extend({},$.ngDateTime.defaultOptions, options);
            
			base.run();
			
			setInterval(function() {
				base.run();
			}, 500);
        };
        
		/**
		 * Runs the clock
		 */
        base.run = function() {
	        var time = base.getTime();
            var date = base.getDate();
            base.setDateTime(time, date);        
        };
               
		/**
		 * Get the time
		 * @return The current time
		 */
        base.getTime = function() {
	    	var date = new Date(); // get current date
    	
    		// get hours, minutes, seconds
    		var h = date.getHours();
	    	var m = date.getMinutes();
    		var s = date.getSeconds();
    	
	    	var now_h = (h > 9) ? h : "0" + h;
    		var now_m = (m > 9) ? m : "0" + m;
	    	var now_s = (s > 9) ? s : "0" + s;
	 
			return now_h + base.options.seperator + now_m + base.options.seperator + now_s;
    	};
    
		/**
		 * Get the date of today
		 */
	    base.getDate = function() {
	    	var date = new Date();
	    	return base.options.days[date.getDay()] + ',&nbsp;' + date.getDate() + '&nbsp;' + base.options.months[date.getMonth()];
	    };
    	
		/**
		 * Puts the date and time into html
		 */
	    base.setDateTime = function(strTime, strDate) {
	    	$('#time', base.el).html(strTime);
	    	$('#date', base.el).html(strDate);
	    }
    
        // Run initializer
        base.init();
    };
	
	/**
	 * The default options for our clock
	 */
    $.ngDateTime.defaultOptions = {
    	seperator: ":",
    	days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    	months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };

	/**
	 * The default options for our clock
	 * @param options
	 */
    $.fn.ngDateTime = function(options){
        return this.each(function(){
            (new $.ngDateTime(this, options));
        });
    };
})(window.jQuery);