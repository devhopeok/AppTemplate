
angular.module('starter.settings', [])
.constant('IONIC_APP_ID', 'b4a718fa')
.service('settings', function() {
    var ccid = '1380';

    var useDirectoryWebsite = "false";
    var directoryUrl = "";
    var useContextId = true;
    var contextId = 400;
    var bannerAdsVisibility = "visible";

    var quicklinkVisibility = "disabled";
    var quicklinkACategory = "48";
    var quicklinkATitle = "Recreation";
    var quicklinkAIcon = "ion-ios-americanfootball";
    var quicklinkBCategory = "46";
    var quicklinkBTitle = "Food";
    var quicklinkBIcon = "ion-pizza";
    var quicklinkCCategory = "39";
    var quicklinkCTitle = "Lodging";
    var quicklinkCIcon = "ion-home";

    var primaryColor = "#b31720";
    var secondaryColor = "#1c2674";
    var titleColor = "#ffffff";
    var textColor = "#ffffff";

    var logoFile = "res/logo.jpg";
    var backgroundFile = "res/background.png";
    var aboutFile = "res/about.png";

    var hotdealsIcon = "ion-pricetags";
    var jobsIcon = "ion-ios-briefcase";
    var searchIcon = "ion-ios-search-strong";
    var newsIcon = "ion-document-text";
    var eventsIcon = "ion-calendar";
    var aboutIcon = "ion-person";
    var callIcon = "ion-ios-telephone";
    var emailIcon = "ion-email";
    var websiteIcon = "ion-android-globe";
    var mapsIcon = "ion-location";
    var calendarIcon = "ion-calendar";

    var aboutContent = "Founded in 1913, the Carlisle Area Chamber of Commerce has been serving the Carlisle, Pennsylvania Area for more than 100 years. Our mission is to serve as a community catalyst that encourages and supports economic growth and stability.<br /><br />\
                        We help connect people to what they need to start a business here, grow a business here -- or even move a business to Carlisle. <br /><br />\
                        We plan, host, and partner in diverse networking and professional-development events.<br /><br />\
                        We foster dialogue and communication with our members and community partners about how we can better support them. <br /></br />\
                        We offer exclusive advertising opportunities to members that showcase their business.<br /><br />\
                        ... and much, much more!";
    //var tracker_id = "UA-84899403-32";
    var tracker_id = "UA-84899403-1111";

    /*********************/
    /* DO NOT EDIT BELOW */
    /*********************/

    var currentDate = new Date().toISOString().split('T')[0];
    var members = [];

    var logoBackground = "none";

    //Declaration of API Calls
    var apiAbout = 'http://api.micronetonline.com/v1/associations(' + ccid + ')';
    var apiBannerAds = 'http://api.micronetonline.com/v1/associations(' + ccid + ')/advertisements';
    var apiEvents = "http://api.micronetonline.com/v1/associations(" + ccid + ")/events";
    var apiHotDeals = "http://api.micronetonline.com/v1/associations(" + ccid + ")/marketplace/items";
    var apiJobs = "http://api.micronetonline.com/v1/associations(" + ccid + ")/jobs";
    var apiMembers = "http://api.micronetonline.com/v1/associations(" + ccid + ")/members/details";
    var apiNews = "http://api.micronetonline.com/v1/associations(" + ccid + ")/news";
    var apiDirectory = "http://api.micronetonline.com/v1/associations(" + ccid + ")/quicklinkcategories";
    var apiDirectoryCategory = "";
    var apiQuicklinkA = 'http://api.micronetonline.com/v1/associations(' + ccid + ')/quicklinks(' + quicklinkACategory + ')/members';
    var apiQuicklinkB = 'http://api.micronetonline.com/v1/associations(' + ccid + ')/quicklinks(' + quicklinkBCategory + ')/members';
    var apiQuicklinkC = 'http://api.micronetonline.com/v1/associations(' + ccid + ')/quicklinks(' + quicklinkCCategory + ')/members';
    var apiRegistration = "http://api.micronetonline.com/v1/associations(" + ccid + ")/events/registrationUrl";
    var apiSearch = 'http://api.micronetonline.com/v1/associations(' + ccid + ')/members/details';

    //Ng-Styles
    var homeBackground = {
        'background-color': primaryColor,
        'background-image': "url(" + backgroundFile + ")",
        'background-size': '100% 100%',
        'background-repeat': 'no-repeat'
    };
    var aboutBackground = {
        'background-color': primaryColor
    };
    var cardHeader = {
        'background-color': primaryColor,
        'color': textColor
    };
    var cardArrow = {
        'color': secondaryColor
    };
    var cardButton = {
        'background-color': primaryColor,
        'color': textColor
    };
    var barHeader = {
        'background-color': secondaryColor
    };
    var iconText = {
        'color': textColor
    };
    var moduleIconCircle = {
        'border': '2px solid ' + secondaryColor
    };
    var moduleIcon = {
        'color': secondaryColor
    };
    var headerContent = {
        'color': titleColor
    };
    var logos = {
        'background-color': logoBackground
    };

    return {
        'ccid': ccid,
        'quicklinkVisibility': quicklinkVisibility,
        'quicklinkACategory': quicklinkACategory,
        'quicklinkBCategory': quicklinkBCategory,
        'quicklinkCCategory': quicklinkCCategory,
        'quicklinkATitle': quicklinkATitle,
        'quicklinkBTitle': quicklinkBTitle,
        'quicklinkCTitle': quicklinkCTitle,
        'quicklinkAIcon': quicklinkAIcon,
        'quicklinkBIcon': quicklinkBIcon,
        'quicklinkCIcon': quicklinkCIcon,
        'hotdealsIcon': hotdealsIcon,
        'jobsIcon': jobsIcon,
        'searchIcon': searchIcon,
        'newsIcon': newsIcon,
        'eventsIcon': eventsIcon,
        'aboutIcon': aboutIcon,
        'callIcon': callIcon,
        'emailIcon': emailIcon,
        'websiteIcon': websiteIcon,
        'mapsIcon': mapsIcon,
        'calendarIcon': calendarIcon,
        'apiAbout': apiAbout,
        'apiBannerAds': apiBannerAds,
        'apiDirectory': apiDirectory,
        'apiDirectoryCategory': apiDirectoryCategory,
        'apiEvents': apiEvents,
        'apiRegistration': apiRegistration,
        'apiHotDeals': apiHotDeals,
        'apiJobs': apiJobs,
        'apiNews': apiNews,
        'apiQuicklinkA': apiQuicklinkA,
        'apiQuicklinkB': apiQuicklinkB,
        'apiQuicklinkC': apiQuicklinkC,
        'apiSearch': apiSearch,
        'homeBackground': homeBackground,
        'aboutBackground': aboutBackground,
        'cardHeader': cardHeader,
        'cardArrow': cardArrow,
        'cardButton': cardButton,
        'barHeader': barHeader,
        'iconText': iconText,
        'moduleIconCircle': moduleIconCircle,
        'moduleIcon': moduleIcon,
        'headerContent': headerContent,
        'logoFile': logoFile,
        'secondaryColor': secondaryColor,
        'currentDate': currentDate,
        'aboutContent': aboutContent,
        'aboutFile': aboutFile,
        'logos': logos,
        'useDirectoryWebsite': useDirectoryWebsite,
        'directoryUrl': directoryUrl,
        'bannerAdsVisibility': bannerAdsVisibility,
        'apiMembers': apiMembers,
        'members': members,
        'useContextId': useContextId,
        'contextId': contextId,
        'tracker_id': tracker_id
    }
});
