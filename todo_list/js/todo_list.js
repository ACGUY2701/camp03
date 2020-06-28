// カレンダーの適用
$(function () {
  $("#datepicker").datepicker();
  $("#datepicker").datepicker("option", "showOn", "button");
});

// カレンダーの日付を取得(getDate関数)
$("#datepicker").datepicker("getDate");
//  立ち上げて2秒後にフェードイン
$("main").fadeIn(2000);

//1.ADD TODO クリックイベント
$("#save").on("click", function () {
  // val()で値を取得する
  const date = $("#datepicker").val();
  const value = $("#memo").val();

  const array = [date, value];
  console.log(array.join("\n"));

  // html側で入力されたデータを取得して確認
  // データを保存する
  localStorage.setItem(date, value);

  function getNewNote() {
    return `<div class="note">
            <textarea cols="30" rows="2">${array.join("\n")}</textarea>
            <button id="delete-button" type="button">削除</button>
            </div>
            `;
  }

  console.log(value, "vv");
  var $date = getNewNote(value);

  var $note = $($date);
  // 付箋をドラッグできるようにする
  $note.draggable();
  // 削除ボタンが押されたら付箋を削除
  $note.children("#delete-button").on("click", function () {
    $(this).parents(".note").remove();
    localStorage.removeItem(date);
  });
  $("#list").append($note);

  // この↓消しちゃダメ
});

//2.clear クリックイベント
$("#clear").on("click", function () {
  $("#datepicker").val("");
  $("#memo").val("");
  $("#list").empty();
  localStorage.clear();
});

//2.ページ読み込み：保存データ取得表示

for (let i = 0; i < localStorage.length; i++) {
  // 保存されたデータのkeyを取得
  const todo = localStorage.key(i);
  // const keyの中身をみている
  console.log(todo);
  // getItemのKeyを使って保存されたデータを全部取得
  const data = localStorage.getItem(todo);
  //  const valueの中身をみている
  console.log(data);

  const array = [todo, data];

  const html = function getNewNote() {
    return `<div class="note">
      <textarea cols="30" rows="2">${array.join("\n")}</textarea>
      <button id="delete-button" type="button">削除</button>
    </div>`;
  };

  // var $date = getNewNote(data);

  // var $(".note") = $($date);
  // 付箋をドラッグできるようにする;
  $(".note").draggable();
  // 削除ボタンが押されたら付箋を削除
  $(".note")
    .children("#delete-button")
    .on("click", function () {
      $(this).parents(".note").remove();
    });

  $("#list").append(html);
}
