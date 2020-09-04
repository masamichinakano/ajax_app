function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) { 
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {  //ここの記述でクリック、既読するというリクエストをjsに送っている
      const postId = post.getAttribute("data-id");　
      const XHR = new XMLHttpRequest();  //XHRに生成する定義
      XHR.open("GET", `/posts/${postId}`, true);  //jsでの定義
      XHR.responseType = "json";
      XHR.send();   //jsから情報をコントローラーへ送る
      XHR.onload = () => {　//データベースの内容を書き換えjsに返却される
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        const item = XHR.response.post;  //ifの定義でHTMLへ反映させる
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);