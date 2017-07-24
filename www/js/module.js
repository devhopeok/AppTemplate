angular.module('starter.module', [])

.controller('AboutCtrl', function($scope, $http, $ionicPopup, settings) {
    var aboutData;
    $http.get(settings.apiAbout, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            aboutData = data;
            $scope.aboutData = data;
        })
        .error(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Error getting contact info.'
            });
        })

    $scope.aboutBackground = settings.aboutBackground;
    $scope.logoFile = settings.logoFile;
    $scope.aboutFile = settings.aboutFile;
    $scope.headerContent = settings.headerContent;
    $scope.barHeader = settings.barHeader;
    $scope.aboutContent = settings.aboutContent;
    $scope.logoBackground = settings.logos;

    //Opens association number in native calling app
    $scope.openPhone = function() {
        if (aboutData.PhoneNumber) {
            $scope.phoneNumber = 'tel:' + aboutData.PhoneNumber;
        } else {
            $scope.phoneNumber;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'An email number was not found.'
            });
        }
    }

    //Opens association email in native email app
    $scope.openEmail = function() {
        if (aboutData.EMail) {
            $scope.email = 'mailto:' + aboutData.EMail + '?subject=' + aboutData.Name;
        } else {
            $scope.email;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A phone number was not found.'
            });
        }
    }

    //Open Chamber Website through InAppBrowser
    $scope.openWebsite = function() {
        if (aboutData.Website) {
            var aboutwebsite = cordova.InAppBrowser.open(aboutData.Website, '_system', 'location = yes');
        } else {
            $scope.website;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A website was not found.'
            });
        }
    }

    //Opens Chamber Location in Google Maps
    $scope.openMaps = function() {
        if (aboutData.Address) {
            var aboutmaps = cordova.InAppBrowser.open('http://maps.google.com/?q=' + aboutData.Address + ' ' + aboutData.City + ', ' + aboutData.State, '_system', 'location = yes');
        } else {
            $scope.location;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A location was not found.'
            });
        }
    }
})

.controller('BannerAdsCtrl', function($scope, $http, $ionicPopup, $timeout, settings) {
    var adData;

    $http.get(settings.apiBannerAds, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            data.sort(function(a, b) {
                var x = a['End'];
                var y = b['End'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });

            if (settings.useContextId == true) {
                var adsWithId = [];

                for (var index = 0; index < data.length; index++) {
                    for (var sub_index = 0; sub_index < data[index].Context.length; sub_index++) {
                        if (data[index].Context[sub_index].Context == settings.contextId) {
                            adsWithId.push(data[index]);
                        }
                    }
                }

                adData = adsWithId;
                dataCheck();
            }
            else {
                adData = data;
                dataCheck();
            }
        })
        .error(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the banner ads.'
            });
        })

    //Hides bannerAdsFooter if adData is empty
    function dataCheck() {
        if (adData === '') {
            document.getElementById('bannerAdsFooter').style.display = 'none';
        } else {
            adCycle();
        }
    }

    if (settings.bannerAdsVisibility == "hidden") {
        document.getElementById('bannerAdsFooter').style.display = 'none';
    }

    //Cycles through bannerAds
    var i = 0;
    var link;

    function adCycle() {
        $scope.image = adData[i].ImageSource;
        link = adData[i].URL;
        i++;

        if (i === adData.length) {
            i = 0;
        }

        $timeout(adCycle, 7000);
    }

    //Opens URL for bannerAd
    $scope.openAd = function() {
        cordova.InAppBrowser.open(link, '_system', 'location = yes');
    }

})

.controller('EventsCtrl', function($scope, $http, $ionicPopup, settings) {
    var yearLimit = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();
    var eventsFilter = "?$filter=Pending eq false and Status eq 2 and Visibility ne 0 and Visibility ne 1 and Visibility ne 4 and Visibility ne 5 and StartTime ge DateTime'" + settings.currentDate + "'" + " and StartTime le Datetime'" + yearLimit + "'";
    $http.get(settings.apiEvents + eventsFilter, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            data.sort(function(a, b) {
                var x = a['StartTime'];
                var y = b['StartTime'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            $scope.eventData = data;
            if (i == adData.length) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'No events postings are currently available.'
                });
            }
        })
        .error(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the event postings.'
            });
        });

    $scope.calendarIcon = settings.calendarIcon;
    $scope.websiteIcon = settings.websiteIcon;
    $scope.headerContent = settings.headerContent;
    $scope.cardHeader = settings.cardHeader;
    $scope.cardArrow = settings.cardArrow;
    $scope.cardButton = settings.cardButton;
    $scope.barHeader = settings.barHeader;
    $scope.currentDate = settings.currentDate;

    //Card Limiting and Loading
    $scope.filterLimitEvents = 15;

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });

    $scope.loadMore = function() {
        $scope.filterLimitEvents += 15;
    }

    $http.get(settings.apiRegistration, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            $scope.registrationData = data;
            if (data == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'No events registrations are currently available.'
                });
            }
        })
        .error(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the event registrations.'
            });
        });

    $scope.openWebsite = function(event) {
        for (var i = 0; i < $scope.registrationData.length; i++) {
            //console.log(event.Id + "&" + $scope.registrationData[i].Id);
            if (event.Id === $scope.registrationData[i].Id) {
                var regUrl = $scope.registrationData[i].EventRegistrationURL;
                if (regUrl === '') {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sorry',
                        template: 'Event registration is not available for this event.'
                    });
                } else {
                    var registrationwebsite = cordova.InAppBrowser.open(regUrl, '_system', 'location = yes');
                }
            }
        }
    }

    //Add an Event to the Native Calendar App
    $scope.openCalendar = function (screen) {
        var title = screen.Name;
        var eventLocation = "";
        var notes = screen.Description;

        var startDate = new Date(screen.StartTime);
        startDate.setHours(startDate.getHours() + 5);

        var endDate = new Date(screen.EndTime);
        endDate.setHours(endDate.getHours() + 5);

        var success = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Success:',
                template: 'Added event to calendar.'
            });
        };

        var error = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Failed to add event to calendar.'
            });
        };
        
        window.plugins.calendar.createEvent(title, eventLocation, notes, startDate, endDate, success, error);
    }
})

.controller('HomeCtrl', function($scope, settings, $http) {
    $scope.quicklinkVisibility = settings.quicklinkVisibility;
    $scope.quicklinkAIcon = settings.quicklinkAIcon;
    $scope.quicklinkBIcon = settings.quicklinkBIcon;
    $scope.quicklinkCIcon = settings.quicklinkCIcon;
    $scope.hotdealsIcon = settings.hotdealsIcon;
    $scope.jobsIcon = settings.jobsIcon;
    $scope.searchIcon = settings.searchIcon;
    $scope.newsIcon = settings.newsIcon;
    $scope.eventsIcon = settings.eventsIcon;
    $scope.aboutIcon = settings.aboutIcon;
    $scope.quicklinkATitle = settings.quicklinkATitle;
    $scope.quicklinkBTitle = settings.quicklinkBTitle;
    $scope.quicklinkCTitle = settings.quicklinkCTitle;
    $scope.homeBackground = settings.homeBackground;
    $scope.headerContent = settings.headerContent;
    $scope.barHeader = settings.barHeader;
    $scope.logoFile = settings.logoFile;
    $scope.moduleIconCircle = settings.moduleIconCircle;
    $scope.moduleIcon = settings.moduleIcon;
    $scope.iconText = settings.iconText;
    $scope.logoBackground = settings.logos;

    $http.get(settings.apiMembers, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            data.sort(function(a, b) {
                return a.DisplayName.localeCompare(b.DisplayName);
            });

            window.localStorage.setItem('lsMembers', JSON.stringify(data));
            
            $scope.memberData = data;
            settings.members = data;

            if (data == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'There are no members in this category.'
                });
            }
        })
        .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the member postings.'
            });
        })

    //Styles NavBar / HeaderBar
    $('.bar-header').css('background-color', settings.secondaryColor);

    var onError = function(error) {
        //alert(error.message);
        var alertPopup = $ionicPopup.alert({
            title: 'Error:',
            template: "error on home" //error.message
        });
    };

})

.controller('HotDealsCtrl', function($scope, $http, $ionicPopup, settings) {
    var hotDealsFilter = "?$filter=TypeId eq 2 and Status eq 2 and StartShowing le datetime'" + settings.currentDate + "' and StopShowing ge datetime'" + settings.currentDate + "'"; // TypeId eq 2 is HotDeal, Status eq 2 is Approved
    $http.get(settings.apiHotDeals + hotDealsFilter, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            data.sort(function(a, b) {
                var x = a['End'];
                var y = b['End'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            $scope.hotDealData = data;
            if (data == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'No hot deal postings are currently available.'
                });
            }
        })
        .error(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the hot deal postings.'
            });
        })

    $scope.websiteIcon = settings.websiteIcon;
    $scope.mapsIcon = settings.mapsIcon;
    $scope.headerContent = settings.headerContent;
    $scope.cardHeader = settings.cardHeader;
    $scope.cardArrow = settings.cardArrow;
    $scope.cardButton = settings.cardButton;
    $scope.barHeader = settings.barHeader;

    //Card Limiting and Loading
    $scope.filterLimitHotDeals = 15;

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });


    $scope.loadMore = function() {
        $scope.filterLimitHotDeals += 15;
    }

    //Open Hot Deal Website through InAppBrowser
    $scope.openWebsite = function(hotDeal) {
        if (hotDeal.Website) {
            var hotdealswebsite = cordova.InAppBrowser.open(hotDeal.Website, '_system', 'location = yes');
        } else {
            $scope.website;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A website was not found for this deal.'
            });
        }
    }

    //Open Hot Deal Location in Google Maps
    $scope.openMaps = function(hotDeal) {
        if (hotDeal.DisplayName) {
            var hotdealsmaps = cordova.InAppBrowser.open('http://maps.google.com/?q=' + hotDeal.DisplayName, '_system', 'location = yes');
        } else {
            $scope.location
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A location was not found for this hot deal.'
            });
        }
    }
})

.controller('JobsCtrl', function($scope, $http, $ionicPopup, settings) {
    var jobsFilter = "?$filter=EndDate gt datetime'" + settings.currentDate + "'";
    $http.get(settings.apiJobs + jobsFilter, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            data.sort(function(a, b) {
                var x = a['StartDate'];
                var y = b['StartDate'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            $scope.jobData = data;
            if (data == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'No job postings are currently available.'
                });
            }
        })
        .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the job postings.'
            });
        });

    $scope.callIcon = settings.callIcon;
    $scope.emailIcon = settings.emailIcon;
    $scope.websiteIcon = settings.websiteIcon;
    $scope.mapsIcon = settings.mapsIcon;
    $scope.headerContent = settings.headerContent;
    $scope.cardHeader = settings.cardHeader;
    $scope.cardArrow = settings.cardArrow;
    $scope.cardButton = settings.cardButton;
    $scope.barHeader = settings.barHeader;

    //Card Limiting and Loading
    $scope.filterLimitJobs = 15;

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });


    $scope.loadMore = function() {
        $scope.filterLimitJobs += 15;
    }

    //Open Job Phone Number in Native Phone Application
    $scope.openPhone = function(job) {
        if (job.LocalPhone) {
            $scope.phoneNumber = document.location.href = 'tel:' + job.LocalPhone;
        } else {
            $scope.phoneNumber;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A phone number was not found for this job.'
            });
        }
    }

    //Open Job Email through Default Email Application
    $scope.openEmail = function(job) {
        if (job.Email) {
            $scope.email = document.location.href = 'mailto:' + job.Email + "?subject= I'm Interested in the " + job.Title + " Position You're Offering";
        } else {
            $scope.email;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'An email was not found for this job.'
            });

        }
    }

    //Open Job Website through InAppBrowser
    $scope.openWebsite = function(job) {
        if (job.WebsiteAddress) {
            var jobswebsite = cordova.InAppBrowser.open(job.WebsiteAddress, '_system', 'location = yes');
        } else {
            $scope.website;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A website was not found for this job.'
            });
        }
    }

    //Open Job Location in Google Maps
    $scope.openMaps = function(job) {
        if (job.Street) {
            var jobsmaps = cordova.InAppBrowser.open('http://maps.google.com/?q=' + job.Street + ' ' + job.City + ', ' + job.State + ' ' + job.Zip, '_system', 'location = yes');
        } else {
            $scope.location;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A location was not found for this job.'
            });
        }
    }
})

.controller('MenuCtrl', function($scope, $http, settings) {
    $scope.quicklinkVisibility = settings.quicklinkVisibility;
    $scope.quicklinkAIcon = settings.quicklinkAIcon;
    $scope.quicklinkBIcon = settings.quicklinkBIcon;
    $scope.quicklinkCIcon = settings.quicklinkCIcon;
    $scope.hotdealsIcon = settings.hotdealsIcon;
    $scope.jobsIcon = settings.jobsIcon;
    $scope.searchIcon = settings.searchIcon;
    $scope.newsIcon = settings.newsIcon;
    $scope.eventsIcon = settings.eventsIcon;
    $scope.aboutIcon = settings.aboutIcon;
    $scope.quicklinkATitle = settings.quicklinkATitle;
    $scope.quicklinkBTitle = settings.quicklinkBTitle;
    $scope.quicklinkCTitle = settings.quicklinkCTitle;
    $scope.headerContent = settings.headerContent;
    $scope.barHeader = settings.barHeader;
})

.controller('NewsCtrl', function($scope, $http, $ionicPopup, settings) {
    var newsFilter = "?$filter=EndDate gt datetime'" + settings.currentDate + "'";
    $http.get(settings.apiNews + newsFilter, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            data.sort(function(a, b) {
                var x = a['DisplayReleaseDate'];
                var y = b['DisplayReleaseDate'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            $scope.newsData = data;
            if (data == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'No news postings are currently available.'
                });
            }
        })
        .error(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the news postings.'
            });
        })

    $scope.headerContent = settings.headerContent;
    $scope.cardHeader = settings.cardHeader;
    $scope.cardArrow = settings.cardArrow;
    $scope.cardButton = settings.cardButton;

    //Card Limiting and Loading
    $scope.filterLimitNews = 15;

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });


    $scope.loadMore = function() {
        $scope.filterLimitNews += 15;
    }
})

.controller('QuicklinkACtrl', function($scope, $http, $ionicPopup, settings) {
    var filter = "?$filter=Status eq 2 or Status eq 4";
    $http.get(settings.apiQuicklinkA + filter, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            data.sort(function(a, b) {
                var x = a['DisplayName'];
                var y = b['DisplayName'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            $scope.quicklinkAData = data;
            if (data == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'No quicklink postings are currently available for this selection.'
                });
            }
        })
        .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the quicklink postings for this selection.'
            });
        });

    $scope.quicklinkATitle = settings.quicklinkATitle;
    $scope.emailIcon = settings.emailIcon;
    $scope.mapsIcon = settings.mapsIcon;
    $scope.headerContent = settings.headerContent;
    $scope.cardHeader = settings.cardHeader;
    $scope.cardArrow = settings.cardArrow;
    $scope.cardButton = settings.cardButton;
    $scope.barHeader = settings.barHeader;

    //Card Limiting and Loading
    $scope.filterLimitQuicklinkA = 15;

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });


    $scope.loadMore = function() {
        $scope.filterLimitQuicklinkA += 15;
    }

    //Open Play QuickLink Email through Default Email Application
    $scope.openEmail = function(quicklink) {
        if (quicklink.Email) {
            $scope.email = document.location.href = 'mailto:' + quicklink.Email + "?subject=" + quicklink.DisplayName + "";
        } else {
            $scope.email;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'An email was not found.'
            });
        }
    }

    //Open Member Location in Google Maps
    $scope.openMaps = function(quicklink) {
            if (quicklink.Latitude) {
                var quicklinkAMaps = cordova.InAppBrowser.open('http://maps.google.com/?q=' + quicklink.Latitude + ', ' + quicklink.Longitude, '_system');
            } else {
                $scope.location;
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'A location was not found.'
                });
            }
        }
        //Open Member Phone Number in Native Phone Application
    $scope.openPhone = function(member) {
        console.log(member);
        if (member.PrimaryPhone) {
            $scope.phoneNumber = 'tel:' + member.PrimaryPhone;
        } else {
            $scope.phoneNumber = '';
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'A phone number was not found for this business.'
            });
        }
    }

    //Open Website through InAppBrowser
    $scope.openWebsite = function(member) {
        if (settings.useDirectoryWebsite == 'true') {
            var url = settings.directoryUrl + member.Id;
            var openUrl = cordova.InAppBrowser.open(url, '_system', 'location = yes');
        } else if (member.URL) {
            var url = cordova.InAppBrowser.open(member.URL, '_system', 'location = yes');
        } else {
            $scope.website;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A website was not found for this member.'
            });
        }
    }
})

.controller('QuicklinkBCtrl', function($scope, $http, $ionicPopup, settings) {
    var filter = "?$filter=Status eq 2 or Status eq 4";
    $http.get(settings.apiQuicklinkB + filter, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            data.sort(function(a, b) {
                var x = a['DisplayName'];
                var y = b['DisplayName'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            $scope.quicklinkBData = data;
            if (data == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'No quicklink postings are currently available for this selection.'
                });
            }
        })
        .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the quicklink postings for this selection.'
            });
        });

    $scope.quicklinkBTitle = settings.quicklinkBTitle;
    $scope.emailIcon = settings.emailIcon;
    $scope.mapsIcon = settings.mapsIcon;
    $scope.headerContent = settings.headerContent;
    $scope.cardHeader = settings.cardHeader;
    $scope.cardArrow = settings.cardArrow;
    $scope.cardButton = settings.cardButton;
    $scope.barHeader = settings.barHeader;

    //Card Limiting and Loading
    $scope.filterLimitQuicklinkB = 15;

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });


    $scope.loadMore = function() {
        $scope.filterLimitQuicklinkB += 15;
    }

    //Open Play QuickLink Email through Default Email Application
    $scope.openEmail = function(quicklink) {
        if (quicklink.Email) {
            $scope.email = document.location.href = 'mailto:' + quicklink.Email + "?subject=" + quicklink.DisplayName + "";
        } else {
            $scope.email;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'An email was not found.'
            });
        }
    }

    //Open Member Location in Google Maps
    $scope.openMaps = function(quicklink) {
            if (quicklink.Latitude) {
                var quicklinkBMaps = cordova.InAppBrowser.open('http://maps.google.com/?q=' + quicklink.Latitude + ', ' + quicklink.Longitude, '_system', 'location = yes');
            } else {
                $scope.location;
                var alertPopup = $ionicPopup.alert({
                    title: 'Error:',
                    template: 'A location was not found.'
                });
            }
        }
        //Open Member Phone Number in Native Phone Application
    $scope.openPhone = function(member) {
        console.log(member);
        if (member.PrimaryPhone) {
            $scope.phoneNumber = 'tel:' + member.PrimaryPhone;
        } else {
            $scope.phoneNumber = '';
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'A phone number was not found for this business.'
            });
        }
    }

    //Open Website through InAppBrowser
    $scope.openWebsite = function(member) {
        if (settings.useDirectoryWebsite == 'true') {
            var url = settings.directoryUrl + member.Id;
            var openUrl = cordova.InAppBrowser.open(url, '_system', 'location = yes');
        } else if (member.URL) {
            var url = cordova.InAppBrowser.open(member.URL, '_system', 'location = yes');
        } else {
            $scope.website;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A website was not found for this member.'
            });
        }
    }
})

.controller('QuicklinkCCtrl', function($scope, $http, $ionicPopup, settings) {
    var filter = "?$filter=Status eq 2 or Status eq 4";
    $http.get(settings.apiQuicklinkC + filter, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            data.sort(function(a, b) {
                var x = a['DisplayName'];
                var y = b['DisplayName'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            $scope.quicklinkCData = data;
            if (data == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'No quicklink postings are currently available for this selection.'
                });
            }
        })
        .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the quicklink postings for this selection.'
            });
        });

    $scope.quicklinkCTitle = settings.quicklinkCTitle;
    $scope.emailIcon = settings.emailIcon;
    $scope.mapsIcon = settings.mapsIcon;
    $scope.cardHeader = settings.cardHeader;
    $scope.cardArrow = settings.cardArrow;
    $scope.cardButton = settings.cardButton;
    $scope.barHeader = settings.barHeader;
    $scope.headerContent = settings.headerContent;

    //Card Limiting and Loading
    $scope.filterLimitQuicklinkC = 15;

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });


    $scope.loadMore = function() {
        $scope.filterLimitQuicklinkC += 15;
    }

    //Open Play QuickLink Email through Default Email Application
    $scope.openEmail = function(quicklink) {
        if (quicklink.Email) {
            $scope.email = document.location.href = 'mailto:' + quicklink.Email + "?subject=" + quicklink.DisplayName + "";
        } else {
            $scope.email;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'An email was not found.'
            });
        }
    }

    //Open Member Location in Google Maps
    $scope.openMaps = function(quicklink) {
        if (quicklink.Latitude) {
            var quicklinkCMaps = cordova.InAppBrowser.open('http://maps.google.com/?q=' + quicklink.Latitude + ', ' + quicklink.Longitude, '_system', 'location = yes');
        } else {
            $scope.location;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A location was not found.'
            });
        }
    }

    //Open Member Phone Number in Native Phone Application
    $scope.openPhone = function(member) {
        console.log(member);
        if (member.PrimaryPhone) {
            $scope.phoneNumber = 'tel:' + member.PrimaryPhone;
        } else {
            $scope.phoneNumber = '';
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'A phone number was not found for this business.'
            });
        }
    }

    //Open Website through InAppBrowser
    $scope.openWebsite = function(member) {
        if (settings.useDirectoryWebsite == 'true') {
            var url = settings.directoryUrl + member.Id;
            var openUrl = cordova.InAppBrowser.open(url, '_system', 'location = yes');
        } else if (member.URL) {
            var url = cordova.InAppBrowser.open(member.URL, '_system', 'location = yes');
        } else {
            $scope.website;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A website was not found for this member.'
            });
        }
    }
})

.controller('MembersCtrl', function($scope, $http, $ionicPopup, settings, $ionicScrollDelegate, $timeout, $window) {
    $http.get(settings.apiDirectoryCategory, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            data.sort(function(a, b) {
                return a.DisplayName.localeCompare(b.DisplayName);
            });
            $scope.memberData = data;

            console.log($scope.memberData);
            if (data == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'There are no members in this category.'
                });
            }
        })
        .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the member postings.'
            });
        })

    $scope.callIcon = settings.callIcon;
    $scope.mapsIcon = settings.mapsIcon;
    $scope.headerContent = settings.headerContent;
    $scope.cardHeader = settings.cardHeader;
    $scope.cardArrow = settings.cardArrow;
    $scope.cardButton = settings.cardButton;
    $scope.barHeader = settings.barHeader;
    $scope.memberFilter = '';

    function onSuccess(position) {
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
    };

    function onError(error) {
        console.log(error);
    }
    // Distance from User to Member
    $scope.getDistance = function(member) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        var baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial";
        var paramsUrl = "&origins=" + $scope.latitude + "," + $scope.longitude + "&destinations=" + member.Latitude + "," + member.Longitude + "&key=AIzaSyBcBei7q2xKcvwAElQn6-Uw-pFI8JKAkPE";
        var gmUrl = baseUrl + paramsUrl;
        console.log(baseUrl + paramsUrl);
        $http.get(gmUrl)
            .success(function(response) {
                member.distanceFromUser = response.rows[0].elements[0].distance.text;
            })
            .error(function(response) {
                member.distanceFromUser = "---";
            })
    }

    //Card Limiting and Loading
    $scope.filterLimitSearch = 15;

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });


    $scope.loadMore = function() {
        $scope.filterLimitSearch += 15;
    }

    $scope.onChange = function() {
        $ionicScrollDelegate.scrollTop(true);
        $scope.filterLimitSearch = 15;
    };

    $scope.filterMembers = function(member) {
        var regex = new RegExp($scope.regexEscape($scope.memberFilter), 'i');
        // match on DisplayName, Description, PrimaryPhone, HoursOfOperation
        return (member.DisplayName !== null && member.DisplayName.match(regex)) ||
            (member.Description !== null && member.Description.match(regex)) ||
            (member.PrimaryPhone !== null && member.PrimaryPhone.match(regex)) ||
            (member.HoursOfOperation !== null && member.HoursOfOperation.match(regex)) ? true : false;
    };

    $scope.regexEscape = function(str) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    $scope.clearSearch = function() {
        $scope.memberFilter = '';
        $timeout(function() {
            var element = $window.document.getElementById('memsearch');
            if (element)
                element.focus();
        });
        $timeout(function() {
            angular.element('#memsearch').triggerHandler('click');
        });
        cordova.plugins.Keyboard.show();
    }

    //Open Member Phone Number in Native Phone Application
    $scope.openPhone = function(member) {
        console.log(member);
        if (member.PrimaryPhone) {
            $scope.phoneNumber = 'tel:' + member.PrimaryPhone;
        } else {
            $scope.phoneNumber = '';
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A phone number was not found for this business.'
            });
        }
    }

    //Open Member Location in Google Maps
    $scope.openMaps = function(member) {
        if (member.Latitude) {
            var location = cordova.InAppBrowser.open('http://maps.google.com/?q=' + member.Latitude + ', ' + member.Longitude, '_system', 'location = yes');
        } else {
            $scope.location;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A location was not found for this business.'
            });
        }
    }

    //Open Website through InAppBrowser
    $scope.openWebsite = function(member) {
        if (settings.useDirectoryWebsite == 'true') {
            var url = settings.directoryUrl + member.Id;
            var openUrl = cordova.InAppBrowser.open(url, '_system', 'location = yes');
        } else if (member.URL) {
            var url = cordova.InAppBrowser.open(member.URL, '_system', 'location = yes');
        } else {
            $scope.website;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A website was not found for this member.'
            });
        }
    }

    //Open Email through Default Email Application
    $scope.openEmail = function(member) {
        if (member.Email) {
            $scope.email = document.location.href = 'mailto:' + member.Email + "?subject=" + member.DisplayName + "";
        } else {
            $scope.email;
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'An email was not found.'
            });
        }
    }
})

.controller('SearchCtrl', function($scope, $http, $ionicPopup, settings, $ionicScrollDelegate, $timeout, $window) {
    $http.get(settings.apiDirectory, {
            headers: {
                "x-apikey": "4AF357D1-3A3E-4BD9-A89B-F6D286FA7C3C"
            }
        })
        .success(function(data) {
            data.sort(function(a, b) {
                return a.Name.localeCompare(b.Name);
            });
            $scope.directoryData = data;

            console.log($scope.directoryData);
            if (data == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notice:',
                    template: 'No business postings are currently available.'
                });
            }
        })
        .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'Something went wrong getting the business postings.'
            });
        })

    $scope.callIcon = settings.callIcon;
    $scope.mapsIcon = settings.mapsIcon;
    $scope.headerContent = settings.headerContent;
    $scope.cardHeader = settings.cardHeader;
    $scope.cardArrow = settings.cardArrow;
    $scope.cardButton = settings.cardButton;
    $scope.barHeader = settings.barHeader;
    $scope.memberFilter = '';
    $scope.directorySwitch = 'quicklink';

    if (settings.members == '' || settings.members == undefined) {
        console.log('using ls');
        $scope.members = JSON.parse(window.localStorage.getItem('lsMembers'));
    }
    else {
        console.log('using settigns');
        $scope.members = settings.members;
    }

    $scope.setCategory = function(id) {
        settings.apiDirectoryCategory = "http://api.micronetonline.com/v1/associations(" + settings.ccid + ")/quicklinks(" + id + ")/members?$filter=Status eq 2 or Status eq 4";
    };

    function onSuccess(position) {
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
    };

    function onError(error) {
        console.log(error);
    }

    // Distance from User to Member
    $scope.getDistance = function(member) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        var baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial";
        var paramsUrl = "&origins=" + $scope.latitude + "," + $scope.longitude + "&destinations=" + member.Latitude + "," + member.Longitude + "&key=AIzaSyBcBei7q2xKcvwAElQn6-Uw-pFI8JKAkPE";
        var gmUrl = baseUrl + paramsUrl;

        $http.get(gmUrl)
            .success(function(response) {
                member.distanceFromUser = response.rows[0].elements[0].distance.text;
            })
            .error(function(response) {
                member.distanceFromUser = "---";
            })
    }

    //Card Limiting and Loading
    $scope.filterLimitSearch = 15;

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });


    $scope.loadMore = function() {
        $scope.filterLimitSearch += 15;
    }

    $scope.onChange = function() {
        $ionicScrollDelegate.scrollTop(true);
        $scope.filterLimitSearch = 15;

        if ($scope.memberFilter.length >= 3) {
            $scope.directorySwitch = 'member';
        } else {
            $scope.directorySwitch = 'quicklink';
        }
    };

    $scope.filterMembers = function(member) {
        var regex = new RegExp($scope.regexEscape($scope.memberFilter), 'i');
        return (member.DisplayName !== null && member.DisplayName.match(regex)) ||
            (member.Description !== null && member.Description.match(regex)) ||
            (member.PrimaryPhone !== null && member.PrimaryPhone.match(regex)) ||
            (member.HoursOfOperation !== null && member.HoursOfOperation.match(regex)) ? true : false;
    };

    $scope.regexEscape = function(str) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    $scope.clearSearch = function() {
        $scope.memberFilter = '';
        $scope.directorySwitch = 'quicklink';
        $timeout(function() {
            var element = $window.document.getElementById('memsearch');
            if (element)
                element.focus();
        });
        $timeout(function() {
            angular.element('#memsearch').triggerHandler('click');
        });
        cordova.plugins.Keyboard.show();
    }

    //Open Member Phone Number in Native Phone Application
    $scope.openPhone = function(member) {
        console.log(member);
        if (member.DispPhone1) {
            $scope.phoneNumber = 'tel:' + member.DispPhone1;
        } else {
            $scope.phoneNumber = '';
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A phone number was not found for this business.'
            });
        }
    }

    //Open Member Location in Google Maps
    $scope.openMaps = function(member) {
        if (member.Latitude) {
            var location = cordova.InAppBrowser.open('http://maps.google.com/?q=' + member.Latitude + ', ' + member.Longitude, '_system', 'location = yes');
        } else {
            $scope.location;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A location was not found for this business.'
            });
        }
    }

    //Open Website through InAppBrowser
    $scope.openWebsite = function(member) {
        if (settings.useDirectoryWebsite == 'true') {
            var url = settings.directoryUrl + member.MemId;
            var openUrl = cordova.InAppBrowser.open(url, '_system', 'location = yes');
        } else if (member.Website) {
            var url = cordova.InAppBrowser.open(member.Website, '_system', 'location = yes');
        } else {
            $scope.website;
            var alertPopup = $ionicPopup.alert({
                title: 'Notice:',
                template: 'A website was not found for this member.'
            });
        }
    }

    //Open Email through Default Email Application
    $scope.openEmail = function(member) {
        if (member.Email) {
            $scope.email = document.location.href = 'mailto:' + member.Email + "?subject=" + member.DisplayName + "";
        } else {
            $scope.email;
            var alertPopup = $ionicPopup.alert({
                title: 'Error:',
                template: 'An email was not found.'
            });
        }
    }
});
