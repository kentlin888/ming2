import toolsMJS from './tools.mjs'

var tools = new toolsMJS()
tools.setup(firebase)
//tools.addProduct()

//console.log(tools.firebase)
//tools.setup(firebase)
//console.log(firebase)

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var loginUser = user;
        console.log("User is logined", user)
    } else {
        var loginUser = null;
        console.log("User is not logined yet.");
    }
});

var storageRef = firebase.storage().ref();
var uploadFileInput = document.getElementById("uploadFileInput");
uploadFileInput.addEventListener("change", function () {
    var file = this.files[0];
    var uploadTask = storageRef.child('images/' + file.name).put(file);
    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
    });
}, false);