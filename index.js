"use strict";

//formタグとはgetFormであると指定
//inputタグはgetInputであると指定
const getForm = document.getElementById("formtagu");
const getInput = document.getElementById("new")

// フォームタグがEnterされた時、普通なら再レンダリングが発生してしまうが、それを止める。preventDefaultは、本来なら起こるブラウザの挙動を止めるためのメソッド（WebAPI）
getForm.addEventListener("submit",function (event){
    event.preventDefault();
    console.log(getInput.value);
});