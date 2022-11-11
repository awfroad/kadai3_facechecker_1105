window.onload = () => {
    const video  = document.querySelector("#camera");
    const canvas = document.querySelector("#picture");
    const se     = document.querySelector('#se');

    /** カメラ設定 */
    const constraints = {
        audio: false,
        video: {
        width: 400,
        height: 300,
        facingMode: "user"   // フロントカメラを利用する
        }
    };

    /**
     * カメラを<video>と同期
     */
    navigator.mediaDevices.getUserMedia(constraints)
        .then( (stream) => {
            video.srcObject = stream;
            video.onloadedmetadata = (e) => {
            video.play();
            };
        })
        .catch( (err) => {
            console.log(err.name + ": " + err.message);
        });

    /**
     * シャッターボタン
    */

    document.querySelector("#shutter").addEventListener("click", () => {
        const ctx = canvas.getContext("2d");

        // 演出的な目的で一度映像を止めてSEを再生する
        video.pause();  // 映像を停止
        // se.play();      // シャッター音
        setTimeout( () => {
        video.play();    // 0.5秒後にカメラ再開
        }, 500);

        // 今日の日付データをcurrentDateに格納
        const currentDate = new Date();

        // 年・月・日・曜日を取得
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const date = currentDate.getDate();
        const day = currentDate.getDay();
        const weekday = ["日","月","火","水","木","金","土"];

        // 時間を取得
        const hour = formatTime(currentDate.getHours());
        const minute = formatTime(currentDate.getMinutes());
        const second = formatTime(currentDate.getSeconds());

        // 0~9の数値に0を足して2桁にする関数(例: 0:0:0 -> 00:00:00)
        function formatTime(val) {
        return ("0" + val).slice(-2);
        }

        // 取得した日付・時間をアウトプット
        const outputDateTimeEl = document.querySelector('.output-date-time');
        outputDateTimeEl.innerText = `${year}年${month}月${date}日${weekday[day]}曜日 ${hour}:${minute}:${second}`;
        
        // 取得した日付・時間をset_photoのselect内に保存
        let nowTime = document.querySelector('.output-date-time').innerHTML
        let archive = document.querySelector('.js-archive')
        console.log(nowTime);
        console.log(archive);

        $('.js-archive').append(`
        <option>${nowTime}</option>
        `);

        // canvasに画像を貼り付ける
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // 写真保存
        var base64 = canvas.toDataURL();
        
        // LocalStorageに保存する
        window.localStorage.setItem(nowTime, base64);

    }); 

};