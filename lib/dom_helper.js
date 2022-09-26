"use strict";

/* // document.querySelector und document.querySelectorAll ersetzen durch $ und $$
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// querySelector und querySelectorAll als Methode am Node-Object definieren
Node.prototype.$ = function (selector) {
    return this.querySelector(selector);
};
Node.prototype.$$ = function (selector) {
    return this.querySelectorAll(selector);
};

// Array.from automatisch auf NodeList anwenden
NodeList.prototype.__proto__ = Array.prototype;
HTMLCollection.prototype.__proto__ = Array.prototype;

// addEventListener ersetzen mit on
// für einen Knoten - Node
Node.prototype.on = function (name, fn) {
    this.addEventListener(name, fn);
    return this;
};
// mit NodeList
NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
    this.forEach(function (elem) {
        elem.on(name, fn);
    });
    return this;
};

// Eventlistener mit off entfernen
Node.prototype.off = function (name, fn) {
    this.removeEventListener(name, fn);
    return this;
};
NodeList.prototype.off = NodeList.prototype.removeEventListener = function (name, fn) {
    this.forEach(function (elem) {
        elem.off(name, fn);
    });
    return this;
};

// ersetzen von setAttribute und getAttribute durch attr
Node.prototype.attr = function (attr, val) {
    if (typeof val !== "undefined") {
        this.setAttribute(attr, val);
        return this;
    } else {
        return this.getAttribute(attr);
    }
};

// Polyfill, um indexOf auch für alte IE zugänglich zu machen
if (!("indexOf" in Array.prototype)) {
    Array.prototype.indexOf = function (item) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === item) {
                return i;
            }
        }
        return -1;
    };
}

// Polyfill für remove - für IE bis einschließlich IE11
if (!("remove" in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
 */
// Fähigkeitenweiche für XHR-Object
var createFunctions = [
    function () { return new XMLHttpRequest() },
    function () { return new ActiveXObject(Msxml2.XMLHTTP) },
    function () { return new ActiveXObject(Msxml3.XMLHTTP) },
    function () { return new ActiveXObject(Microsoft.XMLHTTP) }
];

function createXHR() {
    var xmlhttp = null;
    for (var i = 0; i < createFunctions.length; i++) {
        try {
            xmlhttp = createFunctions[i];
        } catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}
/* 
// Arbeit mit Cookies erleichtern
// Cookies erzeugen
function createCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}
// Cookies auslesen
function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
//  Cookies löschen
function deleteCookie(name) {
    createCookie(name, '', -1);
}

// Zufallszahlen erzeugen
function rand(min, max) {
    return Math.floor(Math.random() * (max-min + 1)) + min;
}

// Elemente dynamisch erzeugen
function createElements(parent, elem, content) {
    let container = document.querySelector(parent);
    let newElem = document.createElement(elem);
    newElem.textContent = content;
    container.appendChild(newElem);
}

// Elemente dynamisch erzeugen - erweitert

function createElementsFromObject(elem) {
    if(typeof elem === "object" && Object.keys(elem).length !== 0) {
        let container = document.querySelector(elem.parentTag);
        let newElem = document.createElement(elem.tagName);
        if(elem.classNames) {
             elem.classNames.forEach(function(el) {
            newElem.classList.add(el);
        });
        }
        if(elem.attributes && typeof elem.attributes === "object") {
            for (let key in elem.attributes) {
                newElem.setAttribute(key, elem.attributes[key]);
            }
        }
        newElem.textContent = elem.content;
        container.appendChild(newElem);
    }
}

// Elemente bei Click löschen

function removeElement(e) {
    var elem = e.target;
    var body = document.querySelector("body");
    if(elem != body && elem.querySelectorAll("body").length === 0) {
        var parent = elem.parentNode;
        parent.removeChild(elem);
        return false;
    }
}

// Helper von Chris Ferdinandi, MIT License, https://gomakethings.com
    
var isInViewport = function(elem) {
    var distance = elem.getBoundingClientRect();
    return ( 
        distance.top >= 0 &&
        distance.left >= 0 && 
        distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        distance.right <= (window.innerWidth || document.documentElement.clientWidth) 
    ) ;
}

 */


