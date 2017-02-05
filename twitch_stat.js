//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
// by AndytheDandyOne
//
// uses Twitch api with wind-bow url to get twitch's info without registering
//
// TODO: who is offline || done
// TODO: who is online || done
// TODO: who is broadcasting || done
// TODO: if broadcasting show whats status of broadcast || done
// TODO: click on users to go to twitch's user page || done
// https://wind-bow.gomix.me/twitch-api
// routes /users/:user, /channels/:channel, and /streams/:stream.
//users status online or offline

var url = 'https://wind-bow.gomix.me/twitch-api';
var urlUser = 'https://www.twitch.tv/';
var users = '/users/';
var channel = '/channel/';
var streams = '/streams/';
var usersArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function() {
    setup();
})

function setup() {
    createTableUsers();
    searchButton();
}

function searchButton() {
    var searchButton = document.getElementById('searchButton');
    searchButton.onclick = function(e) {
        e.preventDefault();
        var data = document.getElementById('searchField').value;
        if (data) {
            checkUserExist(data);
        } else {
            alert('Search field is empty');
        }
    }
}

function checkUserExist(name) {
    $.ajax({
        url: url + users + name,
        types: 'get',
        dataType: 'json',
        success: function(data) {
            var cleanIput = document.getElementById('searchField');

            if (data.name) {
                cleanIput.value = '';
                showSearch(data.name);
            } else {
                alert('User/Channel not found!')
                cleanIput.value = '';
            }
        }
    })
}

function showSearch(name) {
    var content = document.getElementById('displaySearch');

    if (name) {
        var aLink = document.createElement('a');
        var row = document.createElement('div');
        var cell = document.createElement('div');
        var statsDiv = document.createElement('div');
        var onOff = document.createElement('div');

        aLink.setAttribute('href', urlUser + name.toLowerCase());
        aLink.setAttribute('target', 'newwindow');

        row.setAttribute('class', 'row');
        row.setAttribute('id', 'row_' + name.toLowerCase() + 1);
        row.style.backgroundColor = '#FF7F50';

        cell.setAttribute('id', 'users_' + name.toLowerCase() + 1);
        cell.setAttribute('class', 'col-sm-2');
        cell.innerHTML = name;
        cell.backgroundColor = userStatusIndividual(name);

        onOff.setAttribute('class', 'col-sm-2');
        onOff.setAttribute('id', 'onOff_' + name.toLowerCase() + 1);
        onOff.innerHTML = 'OFFLINE';

        statsDiv.setAttribute('class', 'col-sm-8');
        statsDiv.setAttribute('id', 'statsDiv_' + name.toLowerCase() + 1);
        statsDiv.innerHTML = "NO FEED";

        row.appendChild(onOff);
        row.appendChild(cell);
        row.appendChild(statsDiv);
        aLink.appendChild(row);
        content.appendChild(aLink);
    }
}

function userStatusIndividual(i) {
    $.ajax({
        url: url + streams + i,
        type: 'get',
        dataType: 'json',
        success: function(data) {
            if (data.stream == null) {
                updateSearchTable(data.stream);
            } else {
                updateSearchTable(data.stream.channel.name, data.stream.channel.status);
            }
        }
    })
}

function createTableUsers() {
    var content = document.getElementById('divC');

    for (var i = 0; i < usersArray.length; i++) {

        var row = document.createElement('div');
        var newDiv = document.createElement('div');
        var statsDiv = document.createElement('div');
        var onOff = document.createElement('div');
        var aLink = document.createElement('a');

        row.setAttribute('class', 'row');
        row.setAttribute('id', 'row_' + usersArray[i].toLowerCase());
        row.style.backgroundColor = '#FF7F50';

        aLink.setAttribute('href', urlUser + usersArray[i].toLowerCase());
        aLink.setAttribute('target', 'newwindow');

        newDiv.setAttribute('id', 'users_' + usersArray[i].toLowerCase());
        newDiv.setAttribute('class', 'col-sm-2');
        newDiv.innerHTML = usersArray[i];
        newDiv.backgroundColor = userStatus(usersArray[i]);

        onOff.setAttribute('class', 'col-sm-2');
        onOff.setAttribute('id', 'onOff_' + usersArray[i].toLowerCase());
        onOff.innerHTML = 'OFFLINE';

        statsDiv.setAttribute('class', 'col-sm-8');
        statsDiv.setAttribute('id', 'statsDiv_' + usersArray[i].toLowerCase());
        statsDiv.innerHTML = "NO FEED";

        row.appendChild(onOff);
        row.appendChild(newDiv);
        row.appendChild(statsDiv);
        aLink.appendChild(row);
        content.appendChild(aLink);
    }
}

function userStatus(i) {

    $.ajax({
        url: url + streams + i,
        type: 'get',
        dataType: 'json',
        success: function(data) {
            if (data.stream == null) {
                updateTable(data.stream);
            } else {
                updateTable(data.stream.channel.name, data.stream.channel.status);
            }
        }
    })

}

function updateTable(status, lineup) {
    var row = document.getElementById('row_' + status);
    var onOff = document.getElementById('onOff_' + status);
    var stats = document.getElementById('statsDiv_' + status);

    if (status) {
        row.style.backgroundColor = '#7FFFD4';
        onOff.innerHTML = 'LIVE';
        stats.innerHTML = lineup;
    }
}

function updateSearchTable(status, lineup) {
    var row = document.getElementById('row_' + status + (1).toString());
    var onOff = document.getElementById('onOff_' + status + (1).toString());
    var stats = document.getElementById('statsDiv_' + status + (1).toString());
    if (status) {
        row.style.backgroundColor = '#7FFFD4';
        onOff.innerHTML = 'LIVE';
        stats.innerHTML = lineup;
    }
}
//
// var broadcastStatus = [
// {
// stream: {
// mature: false,
// status: "Greg working on Electron-Vue boilerplate w/ Akira #programming #vuejs #electron",
// broadcaster_language: "en",
// display_name: "FreeCodeCamp",
// game: "Creative",
// language: "en",
// _id: 79776140,
// name: "freecodecamp",
// created_at: "2015-01-14T03:36:47Z",
// updated_at: "2016-09-17T05:00:52Z",
// delay: null,
// logo: "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
// banner: null,
// video_banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-channel_offline_image-b8e133c78cd51cb0-1920x1080.png",
// background: null,
// profile_banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_banner-6f5e3445ff474aec-480.png",
// profile_banner_background_color: null,
// partner: false,
// url: "https://www.twitch.tv/freecodecamp",
// views: 161989,
// followers: 10048,
// _links: {
// self: "https://api.twitch.tv/kraken/channels/freecodecamp",
// follows: "https://api.twitch.tv/kraken/channels/freecodecamp/follows",
// commercial: "https://api.twitch.tv/kraken/channels/freecodecamp/commercial",
// stream_key: "https://api.twitch.tv/kraken/channels/freecodecamp/stream_key",
// chat: "https://api.twitch.tv/kraken/chat/freecodecamp",
// subscriptions: "https://api.twitch.tv/kraken/channels/freecodecamp/subscriptions",
// editors: "https://api.twitch.tv/kraken/channels/freecodecamp/editors",
// teams: "https://api.twitch.tv/kraken/channels/freecodecamp/teams",
// videos: "https://api.twitch.tv/kraken/channels/freecodecamp/videos"
// }
// },
// _links: {
// self: "https://api.twitch.tv/kraken/streams/freecodecamp",
// channel: "https://api.twitch.tv/kraken/channels/freecodecamp"
// }
// },
// {
// stream: null,
// display_name: "OgamingSC2",
// _links: {
// self: "https://api.twitch.tv/kraken/streams/ogamingsc2",
// channel: "https://api.twitch.tv/kraken/channels/ogamingsc2"
// }
// },
// {
// stream: {
// mature: false,
// status: "RERUN: StarCraft 2 - Kane vs. HuK (ZvP) - WCS Season 3 Challenger AM - Match 4",
// broadcaster_language: "en",
// display_name: "ESL_SC2",
// game: "StarCraft II",
// language: "en",
// _id: 30220059,
// name: "esl_sc2",
// created_at: "2012-05-02T09:59:20Z",
// updated_at: "2016-09-17T06:02:57Z",
// delay: null,
// logo: "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_image-d6db9488cec97125-300x300.jpeg",
// banner: null,
// video_banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-channel_offline_image-5a8657f8393c9d85-1920x1080.jpeg",
// background: null,
// profile_banner: "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_banner-f8295b33d1846e75-480.jpeg",
// profile_banner_background_color: "#050506",
// partner: true,
// url: "https://www.twitch.tv/esl_sc2",
// views: 60843789,
// followers: 135275,
// _links: {
// self: "https://api.twitch.tv/kraken/channels/esl_sc2",
// follows: "https://api.twitch.tv/kraken/channels/esl_sc2/follows",
// commercial: "https://api.twitch.tv/kraken/channels/esl_sc2/commercial",
// stream_key: "https://api.twitch.tv/kraken/channels/esl_sc2/stream_key",
// chat: "https://api.twitch.tv/kraken/chat/esl_sc2",
// subscriptions: "https://api.twitch.tv/kraken/channels/esl_sc2/subscriptions",
// editors: "https://api.twitch.tv/kraken/channels/esl_sc2/editors",
// teams: "https://api.twitch.tv/kraken/channels/esl_sc2/teams",
// videos: "https://api.twitch.tv/kraken/channels/esl_sc2/videos"
// }
// },
// _links: {
// self: "https://api.twitch.tv/kraken/streams/esl_sc2",
// channel: "https://api.twitch.tv/kraken/channels/esl_sc2"
// }
// },
// {
// stream: null,
// display_name: "noobs2ninjas",
// _links: {
// self: "https://api.twitch.tv/kraken/streams/esl_sc2",
// channel: "https://api.twitch.tv/kraken/channels/esl_sc2"
// }
// },
// {
// error: "Not Found",
// status: 404,
// message: "Channel 'not-a-valid-account' does not exist"
// }
// ];
