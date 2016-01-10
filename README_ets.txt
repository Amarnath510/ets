- NOTE: For installation of Node, Express, MongoDB please visit ets_docs folder

- Project Name: ets (Electronic Tools Store)
- Project Line: A store for all your tools.
- URL suggestions: www.etoolsstore.in
- Technologies used: HTML5 (with jade as view engine) + BOOTSTRAP + ANGULARJS + NODEJS + EXPRESSJS + MONGODB
				HTML5 + BOOTSTRAP   ==> Front end view
				ANGULARJS 			==> Front end Javasccript (JS framework)
				NODEJS 				==> Server side Code
				EXPRESSJS			==> Framework
				MONGODB 			==> Mongo DB for backend operations



- Quotes Page: 
	We will keep all the quotes in a property file and retrieve each quote per day sequencially.
	We can also use DB for the same but I think properties file would be best.

- How to include css and javascript in Jade?
  There are two ways doing this,
  	1) 	extends layout
		block content
			link(rel='stylesheet', href='/stylesheets/ets.css')
			script(src='/javascripts/lib/angular.min.js')
			body(ng-app)
			div(ng-controller="QuoteCtrl")	
				div(class="row")
	
	2) 	doctype html
		html
			head
				style
					include ../public/stylesheets/lib/bootstrap.css	
					include ../public/stylesheets/style.css	
				script
					include ../public/javascripts/lib/angular.min.js
					include ../public/javascripts/ets.js	
			body
				h1(class="color-para").
					My Site
				p.
					Welcome to my super lame site.

- How to include angularjs?
  Include the angular js as shown in quote.jade file.
  Now we need to define a directive to initialize angular js. 
  Let the directive name be "myApp". 
  Define this in the html tag as below,
  	html(ng-app="myApp")
  Now we need to define a controller. A controller is like a scope. What ever we define in the controller function we can use those in that tag.
  etsApp.controller('QuoteCtrl', function($scope) {
	$scope.name = 'chandana';
  });
  But what is etsApp? etsApp is nothing but the reference to the 'myApp' which we defined above to initialize the angular js.
  var etsApp = angular.module('myApp', []);

- Standard Template: (See Tags_Usage.gif in references folder)
	Actually, you are quite right when it comes to header/footer. Here is some basic information on how each of the major HTML5 tags can/should be used (I suggest reading the full source linked at the bottom):

	section – Used for grouping together thematically-related content. Sounds like a div element, but it’s not. The div has no semantic meaning. Before replacing all your div’s with section elements, always ask yourself: “Is all of the content related?”

	aside – Used for tangentially related content. Just because some content appears to the left or right of the main content isn’t enough reason to use the aside element. Ask yourself if the content within the aside can be removed without reducing the meaning of the main content. Pullquotes are an example of tangentially related content.

	header – There is a crucial difference between the header element and the general accepted usage of header (or masthead). There’s usually only one header or ‘masthead’ in a page. In HTML5 you can have as many as you want. The spec defines it as “a group of introductory or navigational aids”. You can use a header in any section on your site. In fact, you probably should use a header within most of your sections. The spec describes the section element as “a thematic grouping of content, typically with a heading.”

	nav – Intended for major navigation information. A group of links grouped together isn’t enough reason to use the nav element. Site-wide navigation, on the other hand belongs in a nav element.

	footer – Sounds like its a description of the position, but its not. Footer elements contain informations about its containing element: who wrote it, copyright, links to related content, etc. Whereas we usually have one footer for an entire document, HTML5 allows us to also have footer within sections.

- NAMING CONVENTIONS:
	HTML or CSS ==> For id names use underscore as naming convention.
	Example: section_header, section_footer

	CSS classes ==> For classes use hyphen in the class name. 
	Example: header-font-size, header-bg-color

- What colors should I use for font, background bla bla ..?
	Link: http://www.lavishbootstrap.com/
	Here they have given colors for each of the elements in detail.

- How to place header, body, footer on the web page?
	Refer w3schools Bootstrap tutorial for more details.
	Link: http://www.w3schools.com/bootstrap/bootstrap_navbar.asp

- How to divide the div horizontally?
	Link: http://stackoverflow.com/questions/24175998/meaning-of-numbers-in-col-md-4-col-xs-1-col-lg-2-in-bootstrap
	Total width is divided into 12 parts. So to divide the div into two parts we need make each half to 6 + 6.
	Suppose we have one row, and we need two columns.
	<div class="row">
		<div class="col-md-6">
			---
		</div>
		<div class="col-md-6">
			---
		</div>
	</div>		

- How to make a footer to the bottom of the page?
	NOTE: If using bootstrap then the footer will be fixed. Frankly speaking that looks weird on the screen. So go for CSS.
	Using bootstrap we can use the class "navbar-fixed-bottom".
	<div id="footer" class="navbar-fixed-bottom">
		----
	<div>

	Using CSS, (I have done using CSS since the footer is fixed when I used the above approach.)
	.footer-style {
		  position: absolute;
		  bottom: 0;
		  width: 100%;
		  /* Set the fixed height of the footer here */
		  height: 60px;
		  background-color: #332C2F;
	}

- How to use glyphicon in CSS?
	First we need to import anything in the file.
	Secondly take the fonts from the Bootstrap (downloaded one). Create a folder fonts (NOTE: This fonts should be exactly at the same level as your CSS folder.) We created fonts under public folder and place the font contents from downloaded folder.
	That's it now we can use the glyphicon as,
		span(class="glyphicon glyphicon-copyright-mark"). 
			Microsoft

	We have many glyphicon @ http://getbootstrap.com/components/

- How to include one jade file in another file?
	Use include. But you should be able to give the correct path.
	In this case, as we are running in the current folder of views so we can give directly by stating,
			include header.jade
	But what if we need to give some other path ==> So its better to know where we give the full path by mentioning the parent directory as,
			include ../views/header.jade		

- How to divide the screen in to equal parts? Ex: header, footer, navigation, body.
	Let the 
			header be 50px, 
			footer be 50px, 
			navigation be 25px;
	so remaing is body which is we don't know. Actually we no need to know.
	#body_section {
		top: 75px; ==> It means from top we need to be at a distance of 75px.
		bottom: 50px; ==> It means from bottom we need to be at a distance of 50px.
	}

	Also make their position as absolute. 
	Check each of these tags and also together in ets.css.
		#header_section, #nav_section, #body_section, #footer_section

- When I resize my window all the elements are getting scattered. How to stop this?
	We need to set a minimum width to our body (whole body) such that they won't get scattered immediately unless it is less than the minimum mentioned width.
	body {
		min-width: 700px;
	}

- How to set image widhth and height?
	In simple, we can do it using inline styling.
	Ex: img(src="../images/xxx.png" style="width=100px; height=100px;")

	BUT WHAT IF WE NEED THIS IMAGE IN LOT OF PLACES. WE CAN'T CHANGE THE IMAGE SETTINGS ALL THE TIME. SO,
	delcare a class for settings and we will give the settings there.

	img(class="feature-btn-img" src="xxx.png")

	Now go to css and give settings for this image using feature class.
	img.feature-btn-img {
		height: 100px;
		width: 100px;
	}

- Suppose if we want to make the elements horizontally. 
	Search "How to divide the div horizontally?" It is present in this page.
	In simple, you can div by usign class row and adding columns for each.

- Drop down menu. Bootstrap and Angularjs way.
	Bootstrap:
	<div class="btn-group">
		<a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#">
			{{selectedItem}}
			<span class="caret"></span>
		</a>
		<ul class="dropdown-menu">
			<li ng-repeat="item in items" class="cursor">
				<a ng-click="selectDropDown(item)">{{item}}</a>
			</li>
			<li class="divider"></li>
			<li class="cursor">
				<a ng-click="selectDropDown('Miscellaneous')">Miscellaneous</a>
			</li> 
		</ul>
	</div>

	Angularjs:
	$scope.items = ["Fuel", "Grocery", "Entertainment", "Reimbursement", "House Rent", "Electricity Bill"];
	$scope.lastItem = ["Miscellaneous"];
	$scope.selectedItem = "Type";
	$scope.selectDropDown = function(item) {
		$scope.selectedItem = item;
	};

- Similar to bootstrap buttons we can have the same colors as well in your backgrounds.
	<p class="bg-primary">...</p> (same color as primary btn color)
	<p class="bg-success">...</p>
	<p class="bg-info">...</p>
	<p class="bg-warning">...</p>
	<p class="bg-danger">...</p>s

- Date or DatePicker example:


- Modal:
	For loading bootstrap modal we need bootstrap.js and jquery.js.
	Else it won't load.

- How to make modal not closable when cliking outside of the modal?
	Use data-backdrop="static" in the modal div.
	<div class="modal bs-example-modal-sm" id="incomeModal" data-backdrop="static">	

- Select All functionality.
	// for check box in header
	$scope.checkAll = function() {
		angular.forEach($scope.records, function(value, key) {
			value.active = $scope.selectAll;
		});
	};

	// for each row check box.
	$scope.eachCheck = function() {
		var count = 0;
		angular.forEach($scope.records, function(value, key){
			if(value.active) {
				count++;
			}
		});	
		if(count == $scope.records.length) {
			$scope.selectAll = true;
		} else {
			$scope.selectAll = false;
		}
	};

- How to share data between controllers? or How to pass data from one controller to another?
	Don't think much. The best way to do this is to use service. 
	Say we have three controller's ctrl-1, ctrl-2, ctrl-3. Suppose we need to pass data from ctrl-1 to ctrl-2 and ctr-2 will pass it to ctrl-3.
	Create a service and inject it in all the three controllers. ctrl-1 will save the data in using setter method in service and ctrl-2 will call the getter method in service do some logic and save back either in the same variable or in a new new variable (for this new variable add setters and getters also.). So ctrl-3 will call the service to get the value. So there is no need to pass the values from one controller to another.

- How to make the date fixed only to one month?	
	Given date D,
		Get Year, ==> D.getYear();
		Get Month, ==> D.getMonth(); // Month starts from 0 to 11.
		Get day, ==> D.getDate();
		Given year, month and day create date ==> new Date(year, month, day);
		Given year, month create min-date to 1st day of the month and max-date to last day of the month,
			First day, Create a date with month and year and some random day say 0, var D = new Date(year, month, 0);
						Now set the date to first day of the month as, D.setDate(1);
			Last Day, var D = new Date(year, month, 0); // last day of month either 30 or 31 or Feb last day.

- How AngularJS directries work?


- Site design references and colors.
http://www.creativetempest.com/category/graphic-design/
http://www.mr-cup.com/shop.html
http://www.highcharts.com/demo


- Background image settings.
body { 
        background: url('http://www.androidtapp.com/wp-content/uploads/2012/11/Angry-Birds-Star-Wars-Menu.png') no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
}


- AngularJS Promise:
	Promise provide a way to execute asynchronous functions in series by registering them with a promise object.
	Promises in AngularJS are provided by the built-in $q service.

- AngularJS Deferred:
	A deferred object is simply an object that exposes a promise as well as the associated methods for resolving that promise. It is constructed using the $q.deferred().
	
