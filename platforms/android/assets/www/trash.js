
$(document).ready(function () {
  $("#chat-form").on('submit', function () {
    //Function to initialize chat plugin
    $applozic.fn.applozic({
      userId: $("#userId").val(), // Replace USER_ID with the user's unique identifier
      userName: $("#userId").val(), // Replace DISPLAY_NAME with the user's name
      password:  $("#userId").val(),
      appId: '32e918ebdeb86f11baa454f84ea13249f',  // Replace APPLICATION_KEY with the Application key received after Signup from https://www.applozic.com/signup.html
      ojq: $original,
      notificationIconLink: "https://www.applozic.com/resources/images/applozic_icon.png",
      maxAttachmentSize: 25, //max attachment size in MB
      desktopNotification: true,
      locShare: false,
      googleApiKey: "AIzaSyBnWuWrBFWyV1IUp597AO5VA6spB1leu8Y",
      onInit: function() {
        $applozic.fn.applozic('loadTab', '');
        //Todo: Register your push notification here. registerPushNotifications();
        registerPushNotifications();
      }
    });
    // var contactjson = {"contacts": [{"userId": "user1", "displayName": "Devashish", "imageLink": "https://www.applozic.com/resources/images/applozic_icon.png"}, {"userId": "user2", "displayName": "Adarsh", "imageLink": "https://www.applozic.com/resources/images/applozic_icon.png"}, {"userId": "user3", "displayName": "Shanki", "imageLink": "https://www.applozic.com/resources/images/applozic_icon.png"}]};
    // To load contact list use below function and pass contacts json in format shown above in variable 'contactjson'.
    // $applozic.fn.applozic('loadContacts', contactjson);
    return false;
  });
});
//Function to initialize chat plugin

function registerPushNotifications() {
  var push = PushNotification.init({
    android: {
      senderID: '319513635655',
      alert: true,
      badge: true,
      sound: true,
      vibrate: true,
      clearNotifications: true
    },
    browser:{},
    ios: {
      alert: true,
      badge: true,
      sound: true
    },
    windows:{}
  });

  push.on('registration', function (data) {
    // if (!Kinvey.getActiveUser()) {
    //   console.log('No active user.');
    // } else {
      // Kinvey.Push.register(data.registrationId).then(function () {
        console.log('Device has been registered.');
        var userPxy = {
          'applicationId': '32e918ebdeb86f11baa454f84ea13249f', // Replace APPLICATION_KEY with the Application key received after Signup from https://www.applozic.com/signup.html
          'userId':  $("#userId").val(), // Replace USER_ID with the user's unique identifier
          'registrationId': data.registrationId, //Replace GCM_REGISTRATION_ID with GCM registration id
          'pushNotificationFormat' : '1',
          'deviceType': '1',       //1 for Android, 4 for iOS
          'deviceApnsType' : '1', //1 for Distribution and 0 for Development APNS Certificate
          'appVersionCode': '106'
        };

        $.ajax({
          url: "https://apps.applozic.com/rest/ws/register/client",
          type: 'post',
          data: w.JSON.stringify(userPxy),
          contentType: 'application/json',
          headers: {'Application-Key': '32e918ebdeb86f11baa454f84ea13249f'}, // Replace APPLICATION_KEY with the Application key received after Signup from https://www.applozic.com/signup.html
          success: function (result) {
            console.log(result);
          }
        });
      // }).catch(function (error) {
      //   console.error(error);
      // });
    //}
  });

  push.on('notification', function (data) {
    console.log(data);
  });

  $applozic.fn.applozic('getUserDetail', {callback: function getUserDetail(response) {
    if(response.status === 'success') {
      // write your logic
    }
  }
});

$applozic.fn.applozic('subscribeToEvents',     {
  onConnect: function () {
    console.log('connected successfully');
  }, onConnectFailed: function () {
    console.log('connection failed');
  }, onMessageDelivered: function (obj) {
    console.log('onMessageDelivered: ' + obj);
  }, onMessageRead: function (obj) {
    console.log('onMessageRead: '  + obj);
  }, onMessageReceived: function (obj) {
    console.log('onMessageReceived: ' + obj);
  }, onMessageSentUpdate: function (obj) {
    console.log('onMessageSentUpdate: ' + obj);
  }, onUserConnect: function (obj) {
    console.log('onUserConnect: ' + obj);
  }, onUserDisconnect: function (obj) {
    console.log('onUserDisconnect: ' + obj);
  }, onUserBlocked: function (obj) {
    console.log('onUserBlocked: ' + obj);
  }, onUserUnblocked: function (obj) {
    console.log('onUserUnblocked: ' + obj);
  }, onUserActivated: function () {
    console.log('user activated by admin');
  }, onUserDeactivated: function () {
    console.log('user deactivated by admin');
  }
});
