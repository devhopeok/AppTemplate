
angular.module('starter.settings', [])

.service('settings', function() {
    var ccid = '2129';

    var useDirectoryWebsite = "false";
    var directoryUrl = "http://business.nisswa.com/list/member/";

    var useContextId = true;
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
    var secondaryColor = "#11455B";
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

    var aboutContent = "The Nisswa Chamber of Commerce serves the area as a strong non-profit professional organization whose mission is to promote our businesses, community, and quality of life. The vision of the Nisswa Chamber of Commerce is to promote the Nisswa area community as the preeminent destination to live, visit, work, and play in the Lakes Area.";

    var appID_onesingal = "c8fcabeb-9a27-4cca-94a9-725b44043dd3";
    var senderID = "840347857106";
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
    var apiMembers = "http://api.micronetonline.com/v1/associations(" + ccid + ")/members/details?$filter=StatusType eq 2 or StatusType eq 4";
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
        'appID_onesingal': appID_onesingal,
        'senderID': senderID,
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
        'contextId': contextId
    }
});
