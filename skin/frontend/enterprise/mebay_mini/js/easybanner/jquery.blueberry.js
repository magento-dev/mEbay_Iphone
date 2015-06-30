/*
 * jQuery Blueberry Slider v0.4 BETA
 * http://marktyrrell.com/labs/blueberry/
 *
 * Copyright (C) 2011, Mark Tyrrell <me@marktyrrell.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

var $bnmini = jQuery.noConflict();

(function(){
	$bnmini.fn.extend({
		blueberry: function(options) {

			//default values for plugin options
			var defaults = {
				interval: 5000,
				duration: 500,
				lineheight: 1,
				height: 'auto', //reserved
				hoverpause: false,
				pager: true,
				nav: true, //reserved
				keynav: true
			}
			var options =  $bnmini.extend(defaults, options);
 
			return this.each(function() {
				var o = options;
				var obj = $bnmini(this);

				//store the slide and pager li
				var slides = $bnmini('.slides li', obj);
				
				//set initial current and next slide index values
				var current = 0;
				var next = current+1;

				//get height and width of initial slide image and calculate size ratio
				var imgHeight = 348;
				var imgWidth = slides.eq(current).find('img').width();
				var imgRatio = imgWidth/imgHeight;

				//define vars for setsize function
				var sliderWidth = 0;
				var cropHeight = 0;

				//calculate and set height based on image width/height ratio and specified line height
				var setsize = function(){
					sliderWidth = $bnmini('.slides', obj).width();
					cropHeight = Math.floor(((sliderWidth/imgRatio)/o.lineheight))*o.lineheight;

					$bnmini('.slides', obj).css({height: cropHeight});
				};
				setsize();

				//bind setsize function to window resize event
				$bnmini(window).resize(function(){
					setsize();
				});
				
				

				//Add keyboard navigation

				if(o.keynav){
					$bnmini(document).keyup(function(e){

						switch (e.which) {

							case 39: case 32: //right arrow & space

								clearTimeout(obj.play);

								rotate();

								break;


							case 37: // left arrow
								clearTimeout(obj.play);
								next = current - 1;
								rotate();

								break;
						}

					});
				}
			});
		}
	});
})(jQuery);
