import { useEffect, useState } from 'react';
import { useAudio, useBoolean, useInterval } from 'react-use';
import './App.css';

const HETTETTIME = Date.parse('Feb 21 2021 00:00:00');
function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  const [audio] = useAudio({
    src:
      'https://firebasestorage.googleapis.com/v0/b/lvtn-32984.appspot.com/o/music%2Fxuan_nay_con_khong_ve.m4a?alt=media&token=7129858d-c9ba-4bd1-b328-6581d1f80d38',
    autoPlay: true,
    loop: true,
  });

  useInterval(
    () => {
      let now = new Date();
      let timenow = now.getTime();
      let countdownDuration = (HETTETTIME - timenow) / 1000;
      if (countdownDuration < 0) {
        toggleIsRunning(false);
      } else {
        let txtsecs = Math.floor(countdownDuration % 60);
        let txtmins = Math.floor((countdownDuration / 60) % 60);
        let txthours = Math.floor((countdownDuration / (60 * 60)) % 24);
        let txtdays = Math.floor(countdownDuration / (60 * 60 * 24));
        setDays(txtdays);
        setHours(txthours);
        setMins(txtmins);
        setSecs(txtsecs);
      }
    },
    isRunning ? delay : null
  );

  return (
    <div className="container">
      {audio}
      <div className="main">
        <h2 id="tetornot">Sắp xa quê rồi!!! Chỉ còn...</h2>
        <div class="clearfix">
          <div class="clock">
            <div id="days" class="num">
              {days}
            </div>
            <div id="days-text" class="text">
              Ngày
            </div>
          </div>
          <div class="clock">
            <div id="hours" class="num">
              {hours}
            </div>
            <div id="hours-text" class="text">
              Giờ
            </div>
          </div>
          <div class="clock">
            <div id="mins" class="num">
              {mins}
            </div>
            <div id="mins-text" class="text">
              Phút
            </div>
          </div>
          <div class="clock">
            <div id="secs" class="num">
              {secs}
            </div>
            <div id="secs-text" class="text">
              Giây
            </div>
          </div>
          <h2 id="tetornot">thôi Sương à, ahuhu</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
