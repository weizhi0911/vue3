import{C as o,k as e,j as s,f as u,r as i}from"./index-2faba407.js";var m=o({name:"Children",setup(n,t){return{open:()=>{t.emit("change","\u5B50\u7EC4\u4EF6\u6570\u636E")}}},render(){return e("div",null,[e(s("el-button"),{type:"primary",onClick:this.open},{default:()=>[u("\u70B9\u51FB\u89E6\u53D1\u5B50\u7EC4\u4EF6emit\u4E8B\u4EF6\uFF08\u5B50\u4F20\u7236\uFF09")]}),e("slot",{name:"item",text:"'hello from child'"},null)])}}),d=o({name:"Index",setup(n,t){const r=i("m33333333333sg"),a=l=>{alert(`\u5DF2\u6536\u5230${l}`)};return console.log(n),console.log(t),{msg:r,emitChanges:a,transmit:()=>{t.emit("parent","\u7236\u7EC4\u4EF6\u6570\u636E")}}},render(){return e("div",null,[u("\u8FD9\u4E2A\u662FTSX"),this.msg,e(m,{"on-Change":this.emitChanges},null),e(s("el-button"),{type:"primary",style:"margin-top:20px",onClick:this.transmit},{default:()=>[u("\u70B9\u51FB\u89E6\u53D1\u7236\u7EC4\u4EF6emit\u4E8B\u4EF6\uFF08\u7236\u4F20\u5B50\uFF09")]})])}});export{d as default};
