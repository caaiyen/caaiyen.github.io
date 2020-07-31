$(document).ready(function () {
    
    
    var date = new Date();
    var dateuse = date.toDateString();
   // console.log(dateuse);
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
   // console.log(time);

    //function for connect
    $('#connect_btn').click(function (){
        var client = mqtt.connect($('#broker_input').val());

        client.on('connect', function () {
            $('#display_status').val("connected");
            console.log("connected");
        })
  
        //function for publish
    $('#publish_button').click(function () {
        console.log("Successfully Published!");
        console.log($('#payload').val());
        $('#atay').append("<tr><td>" + $('#topic_input').val() + "</td><td>" + $('#payload').val() + "</td><td>" + dateuse + " " + time + "</td></tr>")
        client.publish ($('#topic_input').val() ,  $('#payload').val());
    })

    //function for subscribe
    $('#subscribe_button').click(function () {
        console.log("Subscribed successfully!");
        $('#table3 tbody').append("<tr><td>" +  $('#sub_input').val() + "</td><td>" + dateuse + time + "</td></tr>");
        client.subscribe($('#sub_input').val());
        })

        //receive a message
        client.on("message", function (topic, payload) {
            var topic = $('#topic_input').val();
            var payload = $('#payload').val();
            var row = "<tr><td>"+ topic +"</td><td>"+ payload+"</td><td>" + dateuse + " " +  time +  "</td></tr>";
            $('#tbl-body').append(row);
          })
    })
})