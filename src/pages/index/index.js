//@ts-check
import smoothscroll from 'smoothscroll-polyfill';
import 'jquery'
import 'bootstrap'
//import 'popper.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
//import indexEsm from './index.esm.js'
import FirebaseMJS, {
    //syncEmailVerified_ToDB,
    Email_ResendPassword,
    FIRESTORE_COLLECTION
} from '../../js/firebase/FirebaseMJS.js'

// import firebase from "firebase/app";
// import "firebase/auth"
// import 'firebase/firestore'

//import fontawesome from "@fortawesome/fontawesome";
// import {
//     faUser,
//     faShoppingCart
// } from "@fortawesome/fontawesome-free-solid";
// import index_css from './index.css'
import {
    UserData
} from '../../js/dataDefine/index.js'
import {
    useComponent
} from '../../js/others/useComponent3.js'

import cusModalLogin from '../../webcomponents/cusModalLogin3/cusModalLogin.js'
import cusModalUserProfile from '../../webcomponents/cusModalUserProfile3/cusModalUserProfile.js'
import cusFullPageScroll from '../../webcomponents/cusFullPageScroll/fullPageScroll.js'

import '../../webcomponents/cusModalUserProfile3/cusModalUserProfile.css'
import '../../webcomponents/cusModalLogin3/cusModalLogin.css'
require('@babel/polyfill') //for async await syntax

//const Swal = require('sweetalert2')
import Swal from 'sweetalert2'

//fontawesome.library.add([faUser,faShoppingCart]);

//require("html-loader!./webpack_html/img_html.html");
window.Swal = Swal;
window.$ = $


// kick off the polyfill!
smoothscroll.polyfill();

let firebaseConfig = require('../../projectConfig/firebaseProj.config.json')
let firebase = require('firebase/app');
require('firebase/auth')
require('firebase/firestore')
firebase.initializeApp(firebaseConfig);

// To apply the default browser preference instead of explicitly setting it.
firebase.auth().useDeviceLanguage();

let liLogin = document.querySelector('#liLogin');
let liUserDropdown = document.querySelector('#liUserDropdown');
let aMyOrder = document.querySelector('#aMyOrder');
let aMyProfile = document.querySelector('#aMyProfile');
let aLogout = document.querySelector('#aLogout');
let spanDisplayEmail = document.querySelector('#spanDisplayEmail');
let aOpenModalShopcart = document.querySelector('#aOpenModalShopcart');

window.firebase = firebase

var proxyMainPageUI
/**
 * @callback pushUrlFunc
 * @param {string} url - ...
 */
window.app = {
    pushUrl: (url) => {
        /* history.push(?) */
    },
    viewSize: function () {
        return $('#sizer').find('div:visible').data('size');
    },
    setShopItemCount: function (itemCount) {
        proxyMainPageUI.shopItemCount = itemCount;
    },
    navbar1: document.querySelector('#navbar1'),
    openModalShopCart: null,
    userData: null,
}
//-------------Proxy
//---pure data
let proxyUserMenuDropdown = {
    /** user dropdown menu, display login button / user dropdown menu */
    isLogin: false,
    /** user dropdown menu, display email account name */
    loginName: "",
}
//mvvm observeble pattern
proxyUserMenuDropdown = new Proxy(proxyUserMenuDropdown, {
    get: function (target, prop) {
        return target[prop];
    },
    set: function (target, prop, value) {
        switch (prop) {
            case "isLogin":
                if (value == true) {
                    //remove class displayNone
                    liLogin.classList.add('displayNone')
                    liUserDropdown.classList.remove('displayNone')
                } else {
                    //add class displayNone
                    liLogin.classList.remove('displayNone')
                    liUserDropdown.classList.add('displayNone')
                }
                break;
            case "loginName":
                spanDisplayEmail.textContent = value;
                break;
            default:
                break;
        }
        target[prop] = value;
        return true;
    }
})

//test mvvm data binding
let aTestLogin = document.querySelector('#aTestLogin');
let aTestLogout = document.querySelector('#aTestLogout');
aTestLogin.addEventListener('click', (e) => {
    proxyUserMenuDropdown.isLogin = true;
    proxyUserMenuDropdown.loginName = "John"
})
aTestLogout.addEventListener('click', (e) => {
    proxyUserMenuDropdown.isLogin = false;
})

//------------firebase onAuthChanged
// tset case 1: no authUser (not signin)
// tset case 2: has authUser -- UI display name change
// tset case 3: (has authUser, has window.app.userData) -- sync emailVerified_auth
// tset case 4: (has authUser, no window.app.userData) -- getDbUser
// tset case 5: (has authUser, no window.app.userData, has DbUser) -- window.app.userData = dbUser; + sync emailVerified_auth;
// tset case 6: (has authUser, no window.app.userData, no DbUser) -- userInfo = authUser; + window.app.userData = userInfo(已同時 sync emailVerified_auth);
firebase.auth().onAuthStateChanged(function (authUser) {
    let db = firebase.firestore();
    //functions....
    /**
     * save partial fields of UserInfo to firestore.collection('Users')
     * @param {any} userInfo 
     */
    function SetUserData(userInfo) {
        // let type = 
        return db.collection(FIRESTORE_COLLECTION.Users).doc(userInfo.uid).set(userInfo, {
            merge: true
        })
    }
    /**
     * save UserInfo.emailVerified to firestore.collection('Users')
     * @param {boolean} emailVerified_FromAuth auth-user's emailVerified prop value
     * @param {string} uid auth-user's uid
     */
    function syncEmailVerified_ToDB(emailVerified_FromAuth, uid) {
        let userInfo = {
            uid: uid,
            emailVerified: emailVerified_FromAuth
        }
        return SetUserData(userInfo)
    }
    //-----------------
    if (authUser) {
        // User is signed in.

        proxyUserMenuDropdown.isLogin = true;
        proxyUserMenuDropdown.loginName = authUser.email

        let {
            uid,
            emailVerified: emailVerified_auth
        } = authUser
        console.log("LOG:: authUser", authUser)
        console.log("LOG:: uid", uid)

        //----window.app.userData exist
        if (window.app.userData) {
            let {
                emailVerified: emailVerified_db
            } = window.app.userData
            //sync auth emailVerified to DB
            if (emailVerified_auth != emailVerified_db)
                syncEmailVerified_ToDB(emailVerified_auth, uid)
        }
        //----window.app.userData not exist!
        if (!window.app.userData) {
            console.log('load user data from firestore...')

            function getDbUser(uid) {
                return db.collection(FIRESTORE_COLLECTION.Users).doc(uid).get()
                    .then((querySnapshot) => {
                        if (querySnapshot.exists === false)
                            return null;
                        else
                            return querySnapshot.data();

                        // let dbUser = {
                        //     exists: querySnapshot.exists,
                        //     doc: querySnapshot.data()
                        // }
                        // return dbUser
                    })
            }

            function getUserInfo(authUser) {
                let userInfo = new UserData();
                // let dispalyName = null;
                // if (authUser.dispalyName === undefined)
                //     dispalyName = null;
                // else
                //     dispalyName = authUser.dispalyName;
                // }
                userInfo.dispalyName =(authUser.dispalyName)?authUser.dispalyName:null
                userInfo.email = authUser.email;
                userInfo.emailVerified = authUser.emailVerified;
                userInfo.phoneNumber = authUser.phoneNumber;
                userInfo.photoURL = authUser.photoURL;
                userInfo.uid = authUser.uid;
                userInfo.listProviderId = UserData.getListProviderId_ByAuthUserProviderData(authUser.providerData);
                //providerId: auto get by self. //authUser.providerData[0].providerId,   

                return userInfo
            }
            // start load db user info --> ready to set window.app.userData
            getDbUser(uid)
                .then((dbUser) => {
                    // db user exist
                    if (dbUser) {
                        window.app.userData = Object.assign(new UserData(), dbUser);
                        let emailVerified_db = dbUser.emailVerified
                        //sync auth emailVerified to DB
                        if (emailVerified_auth != emailVerified_db)
                            syncEmailVerified_ToDB(emailVerified_auth, uid)
                    } //not exist
                    else {
                        //get info from authUser
                        let userInfo = getUserInfo(authUser);
                        window.app.userData = userInfo;
                        //save info to db (First time)
                        SetUserData(userInfo);
                        // return true //new user
                    }

                })
                .catch((err) => {
                    console.error('onAuthStateChanged, get userData failed. ', err.code, err.message)
                })

        }

    } else {
        // No user is signed in.
        proxyUserMenuDropdown.isLogin = false;
        proxyUserMenuDropdown.loginName = null
        console.log('No user is signed in...')
    }
});


//firebase.analytics();
// console.log(firebase)

// let db = firebase.firestore();

// db.collection("Products")//.where("autoNum", "==", 7)
//     .get()
//     .then(function (querySnapshot) {
//     })
//     .catch((err) => {

//     })
// console.log(__dirname)
/**@enum {string} */
const ENUM_static_scroll_href_Id = {
    history: 'history',
    news: 'news',
    qanda: 'qanda',
    contactus: 'contactus',
    //page-react
}
/**@enum {string} */
const ENUM_reactSwitchPage = {
    ProductListSearch: 'ProductListSearch',
    ViewOrders: 'ViewOrders',
}
//---pure data
proxyMainPageUI = {
    /**@type {boolean} */
    isReactPage: false,
    //.history|'news'|'qanda'|'contactus
    /**@type {ENUM_static_scroll_href_Id} */
    scrollToHrefId: ENUM_static_scroll_href_Id.history,
    /**@type {ENUM_reactSwitchPage} */
    reactSwitchPage: ENUM_reactSwitchPage.ProductListSearch,
    /**@type {number} */
    shopItemCount: 0,
    /**@type {cusFullPageScroll}} */
    cusFullPageScroll: null,
    /**@type {cusModalLogin}} */
    cusModalLogin: null,
    /**@type {cusModalUserProfile}} */
    cusModalUserProfile: null,
}

//mvvm observeble pattern

let pageStatic = $('#page-static')
let pageReact = $('#page-react')
//let navbar1 = document.querySelector('#navbar1');
//let navbar_height = window.app.navbar1.offsetHeight + 5
proxyMainPageUI = new Proxy(proxyMainPageUI, {
    get: function (target, prop) {
        return target[prop];
    },
    set: function (target, prop, value) {
        switch (prop) {
            case "isReactPage":
                if (value == true) {
                    pageStatic.hide()
                    pageReact.fadeIn(500)
                } else {
                    pageStatic.fadeIn(500)
                    pageReact.hide()
                }
                break;
            case "scrollToHrefId":
                target.cusFullPageScroll.scrollToElem('#' + value)
                break;
            case "shopItemCount":
                //$('.fa-shopping-cart').attr("data-count", value)
                let numberBadges = document.querySelectorAll('.numberBadge')
                numberBadges.forEach((element) => {
                    element.textContent = value
                })
                break;
            case "reactSwitchPage":
                switch (value) {
                    case ENUM_reactSwitchPage.ProductListSearch:
                        window.app.pushUrl('/ProductListSearch'); //ProductListSearch
                        setTimeout(() => {
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'auto' //'smooth'
                            });
                        }, 10); //0的話有可能無法滑到最頂端，看運氣

                        break;
                    case ENUM_reactSwitchPage.ViewOrders:
                        window.app.pushUrl('/ViewOrders'); //ProductListSearch
                        setTimeout(() => {
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'auto' //'smooth'
                            });
                        }, 10); //0的話有可能無法滑到最頂端，看運氣
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        target[prop] = value;
        return true;
    }
})


//------------ load webcomponents
let newTagName = "cus-full-page-scroll";
let pathHtml_fullPageScroll = '../../webcomponents/cusFullPageScroll/fullPageScroll.htm';
if (!proxyMainPageUI.cusFullPageScroll)
    useComponent(newTagName, pathHtml_fullPageScroll, cusFullPageScroll)
    .then((htmlFile) => {
        let newComponent = new htmlFile.ctor(htmlFile.templateContent);
        proxyMainPageUI.cusFullPageScroll = newComponent
        pageStatic.append(newComponent)
        //newComponent.scrollToElem('#news')
    })
//---------------------Constructor()-> setFirebase(firebase) - > Auth().getRedirectResult()
newTagName = "cus-modal-login";
//let login_Element = document.querySelector(newTagName);
if (!proxyMainPageUI.cusModalLogin) {
    useComponent(newTagName, '../../webcomponents/cusModalLogin3/cusModalLogin.htm', cusModalLogin)
        .then((htmlFile) => {
            let plugins = {
                Swal,
                Email_ResendPassword
            }
            //class-instance APPEAR!!  you can set template now~~~
            let newComponent = new htmlFile.ctor(htmlFile.templateContent, plugins);
            proxyMainPageUI.cusModalLogin = newComponent
            
            document.body.appendChild(newComponent)
        })
}
//------------------- aMyProfile
let pathHtml_userProfile = '../../webcomponents/cusModalUserProfile3/cusModalUserProfile.htm';
aMyProfile.addEventListener('click', (e) => {
    e.preventDefault();
    let newTagName = "cus-modal-user-profile";
    //let login_Element = document.querySelector(newTagName);
    if (proxyMainPageUI.cusModalUserProfile)
        proxyMainPageUI.cusModalUserProfile.showModal(true)
    else {
        useComponent(newTagName, pathHtml_userProfile, cusModalUserProfile)
            .then((compUI) => {
                let plugins = {
                    Swal,
                    Email_ResendPassword
                }

                let newComponent = new compUI.ctor(compUI.templateContent, plugins);
                proxyMainPageUI.cusModalUserProfile = newComponent
                newComponent.setDataDefine({
                    UserData: UserData
                });
                document.body.appendChild(newComponent)

                let uid = firebase.auth().currentUser.uid
                newComponent.loadDbProfile(uid);
                newComponent.showModal(true)
                //UI control
                newComponent.proxyUI.isEmailVerified = firebase.auth().currentUser.emailVerified;
            })

            .catch((err) => {
                console.log(err)
            });
    }
});

// get 5 navbar items
let all_MenuHref = document.querySelectorAll('a[href]')
// ----------- add button click event
//     <a href="#history" class="nav-link">老店歷史</a>
//     <a href="#news" class="nav-link">最新消息</a>
//     <a href="#page-react" class="nav-link" id="aOrderProducts">產品訂購</a>
//     <a href="#qanda" class="nav-link">常見問題(購物)</a>
//     <a href="#contactus" class="nav-link">聯絡我們</a>
let array_MenuHrefs = [...all_MenuHref].filter((item) => {
    let href = item.getAttribute('href')
    return href !== "#" // 總共有5個
})
// add nav item click event
// e.preventDefault()->ignore default scroll behavior, need to change react page?
array_MenuHrefs.forEach(function (element) {
    let href = element.getAttribute('href')
    switch (href) {
        case '#page-react':
            element.addEventListener('click', (e) => {
                e.preventDefault()
                proxyMainPageUI.isReactPage = true;
                proxyMainPageUI.reactSwitchPage = ENUM_reactSwitchPage.ProductListSearch;
            });
            break;
        case '#history':
            element.addEventListener('click', (e) => {
                e.preventDefault()
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.history
            });
            break;
        case '#news':
            element.addEventListener('click', (e) => {
                e.preventDefault()
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.news
            });
            break;
        case '#qanda':
            element.addEventListener('click', (e) => {
                e.preventDefault()
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.qanda
            });
            break;
        case '#contactus':
            element.addEventListener('click', (e) => {
                e.preventDefault()
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.contactus
            });
            break;
        default:
            break;
    }
});

//------------------- liLogin
liLogin.addEventListener('click', (e) => {
    e.preventDefault()
    proxyMainPageUI.cusModalLogin.showModal(true)
});
//------------------- aLogout
aLogout.addEventListener('click', (e) => {
    e.preventDefault()
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
})
//------------------- aMyOrder
aMyOrder.addEventListener('click', (e) => {
    e.preventDefault()
    proxyMainPageUI.isReactPage = true
    proxyMainPageUI.reactSwitchPage = ENUM_reactSwitchPage.ViewOrders
    //window.app.pushUrl('/ViewOrders'); //ProductListSearch
});


aOpenModalShopcart.addEventListener('click', () => {
    proxyMainPageUI.isReactPage = true
    proxyMainPageUI.reactSwitchPage = ENUM_reactSwitchPage.ProductListSearch;
    setTimeout(() => {
        if (window.app.openModalShopCart)
            window.app.openModalShopCart();
    }, 100);
})
//-------------
$(document).ready(function () {
    //pageStatic.hide();
    //pageReact.hide();
    proxyMainPageUI.isReactPage = false;
})
