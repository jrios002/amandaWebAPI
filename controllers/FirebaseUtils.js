const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');


var config = {
    apiKey: "AIzaSyAvqilp3GlZHlBzkw-IUNoVli70kChg4a0",
    authDomain: "amandawebsite-214618.firebaseapp.com",
    databaseURL: "https://amandawebsite-214618.firebaseio.com",
    projectId: "amandawebsite-214618",
    storageBucket: "amandawebsite-214618.appspot.com",
    messagingSenderId: "928654366383",
    appId: "1:928654366383:web:e84229df564d619564e65a"
  };

  const retrieveLessons = (req, res) => {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    (async () => {
      try {
        let query = firebase.firestore().collection("lessons");
        var lessonList = [];
        var lesson = {
          id: '',
          name: '',
          date: '',
          dueDate: ''
        };

        await query.get()
        .then((snapshot) => {
          snapshot.docs.forEach(doc => {
            lesson = doc.data();
            lesson.id = doc.id;
            lessonList.push(lesson);
          })
        })
        .catch(err => {console.log(err)});
        // return res.status(200).send(lessonList);
        return res.status(200).json({"lessons": lessonList});
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  }
  
  module.exports = {
    retrieveLessons
  }