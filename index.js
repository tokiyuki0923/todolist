"use strict";

//formタグとはgetFormであると指定
//inputタグはgetInputであると指定
const getForm = document.querySelector("formtagu");
const getInput = document.getElementById("new")

// フォームタグがEnterされた時、普通なら再レンダリングが発生してしまうが、それを止める。preventDefaultは、本来なら起こるブラウザの挙動を止めるためのメソッド（WebAPI）
getForm.addEventListener("submit",function (event){
    event.preventDefault();
    console.log(getInput.value);
    add();
});

// Enter押された時に、liタグを追加する。
function add (){

    // Enter押された時に、liタグを追加する。
    const li = document.createElement("li")

    // そのliのテキストはinputタグに書かれている内容とする
    li.innerText = getInput.value

    // 実際に追加されたliタグにclassを付与する
    li.classList.add("list-group-item")
}