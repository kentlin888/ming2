https://ithelp.ithome.com.tw/articles/10209533


# 安裝 Firebase 工具
`$ npm install -g firebase-tools`

# 初始化 Firebase SDK for Cloud Functions
`firebase init`
or
`firebase init hosting`

# index.js
```js
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
```

# 加入 addMessage() 函式
```js
// 抓取要傳遞給此 HTTP 端點的 text 參數值並將這個值新增到 Realtime Database 下的路徑 
`/messages/:pushId/original`
exports.addMessage = functions.https.onRequest((req, res) => {
  const original = req.query.text; //抓取訊息內容
  // 使用 Firebase Admin SDK 將訊息新增到 Realtime Database
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    return res.redirect(303, snapshot.ref.toString());
  });
});
```

# 部署和執行 addMessage()
`$ firebase deploy --only functions`

# try URL
https://us-central1-ming1-d8ff5.cloudfunctions.net/addMessage?text=testStart20200605

# 加入 makeUppercase() 函式 --- 自動監聽DB，並轉大寫
```js
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original').onCreate((snapshot, context) => {
    const original = snapshot.val();
    console.log('Uppercasing', context.params.pushId, original);
    const uppercase = original.toUpperCase();
    return snapshot.ref.parent.child('uppercase').set(uppercase);
});
```
`firebase deploy --only functions`

# try URL
https://us-central1-ming1-d8ff5.cloudfunctions.net/addMessage?text=testStart20200605999

# Firebase Functions - 實現 Serverless(下)
https://ithelp.ithome.com.tw/articles/10209716  
https://github.com/firebase/functions-samples/tree/Node-8/exif-images  
https://github.com/firebase/functions-samples  

# 如果沒有連接登入的話要先輸入下面這一行
`firebase login `
# 著輸入在本地配置 CLI 的指令，選擇和專案連接的 firebase 專案
`firebase use --add`
![](2020-06-05-10-21-06.png)


https://firebase.google.com/docs/functions/local-emulator  
$\color{yellow}{Test ~Firebase ~locally}$
===
open local emulator
`npm run serve`
try
`https://127.0.0.1:5001/ming1-d8ff5/us-central1/addMessage?text=testStart1`  
https://us-central1-ming1-d8ff5.cloudfunctions.net/addMessage?text=testStart20200605

setup database emulator  
https://firebase.google.com/docs/emulator-suite/install_and_configure  
`firebase setup:emulators:firestore`  
`firebase init firestore`  
将您的本地 HTTP 函数作为托管代理  
`firebase emulators:start`  
如果要在模拟器启动后运行测试套件或测试脚本，请使用 emulators:exec 命令：  
`firebase emulators:exec "./my-test.sh"`

`firebase init emulators`  
~~firebase serve --only functions,firestore~~  

Emulator Suite
===
>Shell
>===
>set GOOGLE_APPLICATION_CREDENTIALS=c:\Users\Administrator\Desktop\vsProj\ming1\adminKeys\serviceAccount.json  
>echo %GOOGLE_APPLICATION_CREDENTIALS%  
>firebase functions:shell  

call cloud functions --
===
```js
var addMessage = firebase.functions().httpsCallable('addMessage');
addMessage({text: messageText}).then(function(result) {
  // Read result of the Cloud Function.
  var sanitizedMessage = result.data.text;
  // ...
});
```

onCall
===
client
```js
functions.httpsCallable('getUser')({uid})
  .then(r => console.log(r.data.email))
```
server
```js
export const getUser = functions.https.onCall((data, context) => {
  if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'}
  return new Promise((resolve, reject) => {
    // find a user by data.uid and return the result
    resolve(user)
  })
})
```
