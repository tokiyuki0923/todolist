

//formタグはgetFormであると指定
//inputタグはgetInputであると指定
// ulタグはulであると指定
const getForm = document.getElementById("formtagu");
const getInput = document.getElementById("new");
const ul = document.getElementById("ul");

//画面をリロードした時やtodoリスト開いた時に、ローカルストレージに保存されているtodosを取得してくる。その際に、JSON形式の文字列として保存されているため、parseでJSのオブジェクトに変換する。
const todos = JSON.parse(localStorage.getItem("todos"));

// もしローカルストレージに保存されているtodosが空じゃなかったらそれぞれを追加しなおす作業
// 仮引数を設定しないとforEach文は機能しない。ECMAScriptでそう設定されている。こう覚えるしかない
// 疑問として、todoが定義してあるのはlists.forEach文の中なのに、なぜグローバルスコープから参照可能なのかという点
if(todos){
    todos.forEach(todo => {
        add(todo);
    })
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

    // inputタグに書かれているものをtodoTextと定義
    let todoText = getInput.value;


    // もし、下の方で定義してあるtodoが存在（true）すれば、書いてある内容をtodoTextに定義
    if(todo){
        todoText = todo.text ;
    }

    // もし、todoTextが存在するならば（inputタグに書かれている内容が存在する時と、ローカルストレージに保存してあるものが存在する時）、以下の関数を実行する。
    if(todoText){
        //Enter押された時に、liタグを追加する。
    const li = document.createElement("li");

    // そのliのテキストはinputタグに書かれている内容と、ローカルストレージに保存してあるものとする
    li.innerText = todoText;

    // 実際に追加されたliタグにclassを付与する
    li.classList.add("list-group-item");

    /* もし、「ローカルストレージに保存しているもの」があり「completed状態（クラスにtext-decoration-line-throughが含まれている）」を返した場合
    追加し直すliにtext-decoration-line-throughというクラスを付与する */
    if(todo && todo.completed){
        li.classList.add("text-decoration-line-through")
    }



    // 右クリックされた時にタスクを削除するという機能
    li.addEventListener("contextmenu",function(event){
        event.preventDefault();
        
        // liを取り除く
        li.remove();

        // 取り除いた後ローカルストレージに保存
        saveDate();
    });


    // タスクをクリックした時、取消線をつけるようにする
    li.addEventListener("click",function(){
        // classList.toggle("")で("")内に入っているクラスを付けたり消したりする
        li.classList.toggle("text-decoration-line-through"); 
        saveDate();
    });






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
    let todos = [];
    
    // タスクのインナーテキストとクラス名"text-decoration-line-through"が追加されているかどうかをそれぞれ全て取得する
    lists.forEach(list => {
        // listの内容をtext、text-decoration-line-throughが含まれていたらcompletedという状態をtodoと定義
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        };
        // todoをtodosという空っぽの配列にpushする
        todos.push(todo);
    });
    
    // localStrage.setItemでローカルストレージに保存する。保存したいデータが複数（配列）だった場合、JSON形式の文字列で保存しなくちゃいけない。その時使うのがJSON.stringify()となる
    localStorage.setItem("todos",JSON.stringify(todos));
}

