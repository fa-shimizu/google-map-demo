(function(t){function e(e){for(var o,a,l=e[0],s=e[1],p=e[2],c=0,d=[];c<l.length;c++)a=l[c],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&d.push(i[a][0]),i[a]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o]);u&&u(e);while(d.length)d.shift()();return r.push.apply(r,p||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,l=1;l<n.length;l++){var s=n[l];0!==i[s]&&(o=!1)}o&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},i={app:0},r=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=e,l=l.slice();for(var p=0;p<l.length;p++)e(l[p]);var u=s;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0db5":function(t,e,n){"use strict";var o=n("d09f"),i=n.n(o);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("GoogleMapLoader")],1)},r=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("div",{staticClass:"info"},[n("div",{staticClass:"input-box"},[n("p",{staticClass:"position-label"},[t._v("左下")]),n("span",{staticClass:"form-control"},[n("label",{attrs:{for:"lb-lat"}},[t._v("緯度")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputBounds.leftBottom.lat,expression:"inputBounds.leftBottom.lat"}],attrs:{type:"text",name:"lb-lat"},domProps:{value:t.inputBounds.leftBottom.lat},on:{input:function(e){e.target.composing||t.$set(t.inputBounds.leftBottom,"lat",e.target.value)}}})]),n("span",{staticClass:"form-control"},[n("label",{attrs:{for:"lb-lng"}},[t._v("経度")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputBounds.leftBottom.lng,expression:"inputBounds.leftBottom.lng"}],attrs:{type:"text",name:"lb-lng"},domProps:{value:t.inputBounds.leftBottom.lng},on:{input:function(e){e.target.composing||t.$set(t.inputBounds.leftBottom,"lng",e.target.value)}}})]),n("p",{staticClass:"position-label"},[t._v("右上")]),n("span",{staticClass:"form-control"},[n("label",{attrs:{for:"ru-lat"}},[t._v("緯度")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputBounds.rightUpper.lat,expression:"inputBounds.rightUpper.lat"}],attrs:{type:"text",name:"ru-lat"},domProps:{value:t.inputBounds.rightUpper.lat},on:{input:function(e){e.target.composing||t.$set(t.inputBounds.rightUpper,"lat",e.target.value)}}})]),n("span",{staticClass:"form-control"},[n("label",{attrs:{for:"ru-lng"}},[t._v("経度")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputBounds.rightUpper.lng,expression:"inputBounds.rightUpper.lng"}],attrs:{type:"text",name:"ru-lng"},domProps:{value:t.inputBounds.rightUpper.lng},on:{input:function(e){e.target.composing||t.$set(t.inputBounds.rightUpper,"lng",e.target.value)}}})])]),n("div",{staticClass:"text-box"},[n("span",{staticClass:"text-control center"},[n("span",[t._v("緯度")]),n("br"),n("span",[t._v(t._s(this.mapConfig.center.lat))])]),n("span",{staticClass:"text-control center"},[n("span",[t._v("経度")]),n("br"),n("span",[t._v(t._s(this.mapConfig.center.lng))])]),n("span",{staticClass:"text-control zoom"},[n("span",[t._v("縮尺")]),n("br"),n("span",[t._v(t._s(this.mapConfig.zoom))])])])]),n("div",{ref:"googleMap",staticClass:"map"})])},l=[],s=(n("d81d"),n("96cf"),n("1da1")),p=n("f464"),u=n.n(p);function c(t,e,n){this.bounds_=t,this.image_=e,this.map_=n,this.div_=null,this.setMap(n)}var d={center:{lat:33.56737,lng:133.543634},zoom:18},g=n("66f7"),f=n.n(g),m={data:function(){return{apiKey:"AIzaSyA89C4D5KoOejczXFer1NTXxEgJjoSGGPU",google:null,map:null,initConfig:d,overlay:null,initBounds:{leftBottom:{lat:d.center.lat-.001,lng:d.center.lng-.001},rightUpper:{lat:d.center.lat+.001,lng:d.center.lng+.001}},inputBounds:{leftBottom:{lat:null,lng:null},rightUpper:{lat:null,lng:null}},overlayImg:f.a}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u()({apiKey:t.apiKey});case 2:t.google=e.sent,t.map=t.initializeMap(),t.overlay=t.initializeOverlay(),t.inputBounds=t.initBounds;case 6:case"end":return e.stop()}}),e)})))()},computed:{mapConfig:function(){var t=this.map;if(null!==t){var e=t.getCenter(),n=t.getZoom();return{center:{lat:e.lat(),lng:e.lng()},zoom:n}}return this.initConfig},bounds:function(){return new this.google.maps.LatLngBounds(new this.google.maps.LatLng(this.initBounds.leftBottom.lat,this.initBounds.leftBottom.lng),new this.google.maps.LatLng(this.initBounds.rightUpper.lat,this.initBounds.rightUpper.lng))}},methods:{initializeMap:function(){return new this.google.maps.Map(this.$refs.googleMap,this.initConfig)},initializeOverlay:function(){return c.prototype=new this.google.maps.OverlayView,c.prototype.onAdd=function(){var t=document.createElement("div");t.style.borderStyle="none",t.style.borderWidth="0px",t.style.position="absolute";var e=document.createElement("img");e.src=this.image_,e.style.width="100%",e.style.height="100%",e.style.position="absolute",t.appendChild(e),this.div_=t;var n=this.getPanes();n.overlayLayer.appendChild(t)},c.prototype.draw=function(){var t=this.getProjection(),e=t.fromLatLngToDivPixel(this.bounds_.getSouthWest()),n=t.fromLatLngToDivPixel(this.bounds_.getNorthEast()),o=this.div_;o.style.left=e.x+"px",o.style.top=n.y+"px",o.style.width=n.x-e.x+"px",o.style.height=e.y-n.y+"px"},c.prototype.onRemove=function(){this.div_.parentNode.removeChild(this.div_),this.div_=null},new c(this.bounds,this.overlayImg,this.map)}}},v=m,h=(n("0db5"),n("2877")),b=Object(h["a"])(v,a,l,!1,null,"efc8579e",null),y=b.exports,B={name:"App",components:{GoogleMapLoader:y}},_=B,x=Object(h["a"])(_,i,r,!1,null,null,null),w=x.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(w)}}).$mount("#app")},"66f7":function(t,e,n){t.exports=n.p+"img/kouchi.320c98d0.png"},d09f:function(t,e,n){}});
//# sourceMappingURL=app.3e071b67.js.map