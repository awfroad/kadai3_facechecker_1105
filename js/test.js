
// select要素を取得
let select_state = document.querySelector(".js-achive");

select_state.addEventListener('change',function(){

    console.log(select_state.value);

    const str = document.getElementById("test").value;
    console.log(str);
    // document.getElementById("span3").textContent = str;
    // localStorage.getItem(str);
    
    // LocalStroageからデータを取得する
    let canvas1 = document.querySelector("#picture1");
    let ctx = canvas1.getContext("2d");
    var base64 = window.localStorage.getItem(str);
    
    // Imageオブジェクトを作成し、src属性にデータを設定する
    var image = new Image();
    image.src = base64;
    image.onload = function(){
        
        // 画像の読み込みが終わったら、Canvasに画像を反映する。
        ctx.drawImage(image, 0, 0, 400, 300);
        
    };
    
});
