

//formタグはgetFormであると指定
//inputタグはgetInputであると指定
// ulタグはulであると指定
const getForm = document.getElementById("formtagu");
const getInput = document.getElementById("new");
const ul = document.getElementById("ul");

// フォームタグがEnterされた時、普通なら再レンダリングが発生してしまうが、それを止める。preventDefaultは、本来なら起こるブラウザの挙動を止めるためのメソッド（WebAPI）
//変数名.addEventListner→変数名の中身がsubmit(他にもいろんなイベントがある)が行われた時、functionの中身が行われる
getForm.addEventListener("submit", function (event){
    event.preventDefault();
    
    // 下に書いてあるadd関数を実行
    add();
});

// Enter押された時に、liタグを追加すると言う関数を定義
function add (){
    let todoText = getInput.value 
    if(todoText.length > 0){
            // Enter押された時に、liタグを追加する。
    const li = document.createElement("li");

    // そのliのテキストはinputタグに書かれている内容とする
    li.innerText = todoText;

    // 実際に追加されたliタグにclassを付与する
    li.classList.add("list-group-item");

    // ulタグの中にliタグを追加させる
    ul.appendChild(li);

    // 最後にinputの中身を空にする
    // getInput.valueではなくてtodoTextにしたら動かなかった、なんでだろう
    getInput.value = "";
    }
}

