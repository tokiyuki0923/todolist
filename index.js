

//formタグはgetFormであると指定
//inputタグはgetInputであると指定
// ulタグはulであると指定
const getForm = document.getElementById("formtagu");
const getInput = document.getElementById("new");
const ul = document.getElementById("ul");

//画面をリロードした時やtodoリスト開いた時に、ローカルストレージに保存されているtodosを取得してくる。その際に、JSON形式の文字列として保存されているため、parseでJSのオブジェクトに変換する
const todos = JSON.parse(localStorage.getItem("todos"));

// もしローカルストレージに保存されているtodosが空じゃなかったらそれぞれを追加しなおす作業
if(todos){
    todos.forEach(todo => {
        add(todo)
    });
}

//変数名.addEventListner→変数名の中身がsubmit(他にもいろんなイベントがある)が行われた時、functionの中身が行われる
getForm.addEventListener("submit", function (event){
    // フォームタグがEnterされた時、普通なら再レンダリングが発生してしまうが、それを止める。preventDefaultは、本来なら起こるブラウザの挙動を止めるためのメソッド（WebAPI）
    event.preventDefault();
    
    // 下に書いてあるadd関数を実行
    add();
});

// Enter押された時に、liタグを追加すると言う関数を定義
function add (todo){
    let todoText = getInput.value 
    
    //もし、過去に保存されていたtodoがあった場合、todoにはtodoTextをいれるという処理　
    if (todo) {
        todoText = todo;
    }

    // もしtodoTextの長さが1文字以上だった場合、if文の中身を実行する
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

    // 下にあるsaveDateという関数を発動
    saveDate(); 

    }
}
// saveDateという関数を定義、最終的にはliタグを全て配列の形にしてローカルストレージに保存する
function saveDate(){

    // querySelectorAll("")で指定したものを全て取得する。このときNodeListという、配列によく似た形で取得してくる
    const lists = document.querySelectorAll("li");

    // 空っぽの配列をtodosという変数に定義する
    const todos = [];

    // liタグのインナーテキストをそれぞれ全て取得する
    lists.forEach(list =>{
        // liタグのinnerTextを先ほど定義したtodosという配列にpushする
        todos.push(list.innerText);
    });

    // localStrage.setItemでローカルストレージに保存する。保存したいデータが複数（配列）だった場合、JSON形式の文字列で保存しなくちゃいけない。その時使うのがJSON.stringify()となる
    localStorage.setItem("todos",JSON.stringify(todos));
}

