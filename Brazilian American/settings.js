
angular.module('starter.settings', [])
.constant('IONIC_APP_ID', '1b37418b')
.service('settings', function() {
    var ccid = '0272';

    var useDirectoryWebsite = "false";
    var directoryUrl = "";

    var useContextId = false;
    var contextId = 211;
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

    var primaryColor = "#ffffff";
    var secondaryColor = "#1E2453";
    var titleColor = "#ffffff";
    var textColor = "#000000";

    var logoFile = "res/logo.png";
    var backgroundFile = "res/background.png";
    var aboutFile = "res/about.png";

    var hotdealsIcon = "ion-pricetags";
    var jobsIcon = "ion-ios-briefcase";
    var searchIcon = "ion-ios-search-strong";
    var newsIcon = "ion-ios-paper";
    var eventsIcon = "ion-calendar";
    var aboutIcon = "ion-person";
    var callIcon = "ion-ios-telephone";
    var emailIcon = "ion-email";
    var websiteIcon = "ion-android-globe";
    var mapsIcon = "ion-location";
    var calendarIcon = "ion-calendar";

    var aboutContent = "The Brazilian-American Chamber of Commerce of Florida (BACCF) is an independent, non-profit business organization. As a non-governmental association, the Chamber is supported primarily by membership dues and income from fund-raising events. The growing establishment of Brazilian businesses in South Florida that commenced in the late 1970s rapidly brought about the need for a business exchange forum between Brazilian and US firms. The BACCF was founded in 1981 and is headquartered in Miami.  During the 1980s, the Chamber initiated a series of monthly luncheons featuring prominent speakers involved in Brazilian-American business issues. The luncheons quickly became popular venues for the exchange of ideas within the Brazilian-American business community. Throughout its years of operation, the BACCF expanded its range of activities to breakfasts for new members, business card exchanges, timely seminars and workshops, receptions to honor visiting dignitaries, and social events.  The Chamber’s main objective is to forge closer ties between the business communities of Brazil and Florida by assisting companies and business people seeking ways to penetrate or invest successfully in the Brazilian and US Markets. Since its founding, the BACCF has grown from a few companies to over 300 members, ranging from multinationals to individuals involved in Brazil-US relations.";

    // var tracker_id = "UA-84899403-11";
    var tracker_id = "UA-84899403-3333";
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
