//グローバル変数

//再生領域
const videoElement = document.getElementById('my-video');

//デバイス情報
const audioSelect = document.getElementById('audioSource');
const videoSelect = document.getElementById('videoSource');
const deviceSelectors = [audioSelect, videoSelect];

//カメラの制約
 //値固定selectorで指定するもの
const resolutionSelect = document.getElementById('resolution');
const fpsSelect = document.getElementById('fps');
const codecSelect = document.getElementById('codec');
const focusModeSelect = document.getElementById('focusMode');
const exposureModeSelect = document.getElementById('exposureMode');
const whiteBalanceModeSelect = document.getElementById('whiteBalanceMode');
const configSelectors = [resolutionSelect, fpsSelect, codecSelect, focusModeSelect, exposureModeSelect, whiteBalanceModeSelect];

 //sliderで指定するもの
const focusDistanceSlider = document.getElementById('focusDistance');  //スライダー本体
const focusDistanceValue = document.getElementById('focusDistanceValue');  //数値の表示領域

const exposureCompensationSlider = document.getElementById('exposureCompensation');
const exposureCompensationValue = document.getElementById('exposureCompensationValue');
const isoSlider = document.getElementById('iso');
const isoValue = document.getElementById('isoValue');
const exposureTimeSlider = document.getElementById('exposureTime');
const exposureTimeValue = document.getElementById('exposureTimeValue');

const colorTemperatureSlider = document.getElementById('colorTemperature');
const colorTemperatureValue = document.getElementById('colorTemperatureValue');

//const contrastSlider = document.getElementById('contrast');
//const contrastValue = document.getElementById('contrastValue');
//const saturationSlider = document.getElementById('saturation');
//const saturationValue = document.getElementById('saturationValue');

//               0   1   2   3   4   5    6    7    8    9    10   11   12   13   14   15    16    17    18    19    20
const isoValues=[32, 40, 50, 64, 80, 100, 125, 160, 200, 250, 320, 400, 500, 640, 800, 1000, 1250, 1600, 2000, 2500, 3200];//0-20
//                        0  1  2  3  4  5   6   7   8   9   10  11  12  13  14  15   16   17   18   19   20   21   22   23   24   25    26    27    28    29    30    31    32    33    34    35     36     37   
const exposureTimeValues=[3, 4, 5, 6, 8, 10, 13, 15, 20, 25, 30, 40, 50, 60, 80, 100, 125, 160, 200, 250, 320, 400, 500, 640, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000, 5000, 6400, 8000, 10000, 25000, 50000];//0-37
let constraints = {};

function changeResolution() {
    console.log('change resolution.')
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    setConstraints();
    track.applyConstraints(constraints.video).then(function(){
        //何も無し
    });
}

function changeFps() {
    console.log('change frameRate.')
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    setConstraints();
    track.applyConstraints(constraints.video).then(function(){
        //何も無し
    });
}

function changeFocusMode() {
    console.log('change focusMode.')
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    setConstraints();
    track.applyConstraints(constraints.video).then(function(){
        const capabilities = track.getCapabilities();
        if ('focusDistance' in capabilities) {
            if (focusModeSelect.value==='manual') {
                focusDistanceSlider.hidden = false;
                focusDistanceValue.textContent = ("00"+Math.round( (focusDistanceSlider.value - focusDistanceSlider.min)
                                                                    /(focusDistanceSlider.max - focusDistanceSlider.min)*100)
                ).slice(-3);
            } else {
                focusDistanceSlider.hidden = true;
                focusDistanceValue.textContent = 'AUTO';
            }
        }
    });
}

function changeExposureMode() {
    console.log('change exposureMode.')
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    setConstraints();
    track.applyConstraints(constraints.video).then(function(){
        const capabilities = track.getCapabilities();
        if ('exposureCompensation' in capabilities) {
            if (exposureModeSelect.value==='manual') {
                exposureCompensationSlider.hidden = false;
                exposureCompensationValue.textContent =
                    ("+"
                        +Number(exposureCompensationSlider.value).toFixed(1)
                    ).slice(-4);
            } else {
                exposureCompensationSlider.hidden = true;
                exposureCompensationValue.textContent='---';
            }
        }
    
        if ('iso' in capabilities) {
            if (exposureModeSelect.value==='manual') {
                isoSlider.hidden = false;
                isoValue.textContent = ("   "+isoValues[isoSlider.value]).slice(-5);
            } else {
                isoSlider.hidden = true;
                isoValue.textContent = 'AUTO';
            }
        }
    
        if ('exposureTime' in capabilities) {
            if (exposureModeSelect.value==='manual') {
                exposureTimeSlider.hidden = false;
                exposureTimeValue.textContent = ("     "+exposureTimeValues[exposureTimeSlider.value]).slice(-6);
            } else {
                exposureTimeSlider.hidden = true;
                exposureTimeValue.textContent = 'AUTO';
            }
        }
    });
}

function changeWhiteBalanceMode() {
    console.log('change whiteBalanceMode.')
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    setConstraints();
    track.applyConstraints(constraints.video).then(function(){
        const capabilities = track.getCapabilities();
        if ('colorTemperature' in capabilities) {
            if (whiteBalanceModeSelect.value==='manual') {
                colorTemperatureSlider.hidden = false;
                colorTemperatureValue.textContent = (" "+colorTemperatureSlider.value).slice(-5);
            } else {
                colorTemperatureSlider.hidden = true;
                colorTemperatureValue.textContent = 'AUTO';
            }
        }
    });
}

function changeFocusDistance() {
    console.log('change focusDistance.')
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    setConstraints();
    track.applyConstraints(constraints.video).then(function(){
        focusDistanceValue.textContent = ("00"+Math.round( (focusDistanceSlider.value - focusDistanceSlider.min)
        /(focusDistanceSlider.max - focusDistanceSlider.min)*100)
        ).slice(-3);
    });
}

function changeExposureCompensation() {
    console.log('change exposureCompensation.')
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    setConstraints();
    track.applyConstraints(constraints.video).then(function(){
        exposureCompensationValue.textContent =
        ("+"
            +Number(exposureCompensationSlider.value).toFixed(1)
        ).slice(-4);
    });
}

function changeIso() {
    console.log('change iso.')
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    setConstraints();
    track.applyConstraints(constraints.video).then(function(){
        isoValue.textContent = ("   "+isoValues[isoSlider.value]).slice(-5);
    });
}

function changeExposureTime() {
    console.log('change exposureTime.')
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    setConstraints();
    track.applyConstraints(constraints.video).then(function(){
        exposureTimeValue.textContent = ("     "+exposureTimeValues[exposureTimeSlider.value]).slice(-6);
    });
}

function changeColorTemperature() {
    console.log('change colorTemperature.')
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    setConstraints();
    track.applyConstraints(constraints.video).then(function(){
        colorTemperatureValue.textContent = (" "+colorTemperatureSlider.value).slice(-5);
    });
}

//streamに対してカメラ設定できるようにする
function addApplyCameraSettings() {
    //イベントリスナ追加
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const capabilities = track.getCapabilities();
    const settings = track.getSettings();

    if ('resolution' in capabilities) {
        resolutionSelect.onchange=changeResolution;
    }
    if ('frameRate' in capabilities) {
        fpsSelect.onchange=changeFps;
    }
    //codec
    if ('focusMode' in capabilities) {
        focusModeSelect.hidden=false;
        focusModeSelect.onchange=changeFocusMode;
    } else {
        focusModeSelect.hidden=true;
    }
    if ('exposureMode' in capabilities) {
        exposureModeSelect.hidden=false;
        exposureModeSelect.onchange=changeExposureMode;
    } else {
        exposureModeSelect.hidden=true;
    }
    if ('whiteBalanceMode' in capabilities) {
        whiteBalanceModeSelect.hidden=false;
        whiteBalanceModeSelect.onchange=changeWhiteBalanceMode;
    } else {
        whiteBalanceModeSelect.hidden=true;
    }

    if ('focusDistance' in capabilities) {
        focusDistanceSlider.value=undefined;
        focusDistanceSlider.min = capabilities.focusDistance.min;
        focusDistanceSlider.max = capabilities.focusDistance.max;
        focusDistanceSlider.step = (capabilities.focusDistance.step==0) ? 0.1 : capabilities.focusDistance.step;
        focusDistanceSlider.value = settings.focusDistance;
        if (focusModeSelect.value==='manual') {
            focusDistanceSlider.hidden = false;
            focusDistanceValue.textContent = ("00"+Math.round( (focusDistanceSlider.value - focusDistanceSlider.min)
                                                                /(focusDistanceSlider.max - focusDistanceSlider.min)*100)
            ).slice(-3);
        } else {
            focusDistanceSlider.hidden = true;
            focusDistanceValue.textContent = 'AUTO';
        }
        focusDistanceSlider.oninput=changeFocusDistance;
    } else {
        focusDistanceSlider.hidden = true;
        focusDistanceValue.textContent = '無効';
    }

    if ('exposureCompensation' in capabilities) {
        exposureCompensationSlider.value = undefined;
        exposureCompensationSlider.min = capabilities.exposureCompensation.min;
        exposureCompensationSlider.max = capabilities.exposureCompensation.max;
        exposureCompensationSlider.step = (capabilities.exposureCompensation.step==0) ? 1.0 : capabilities.exposureCompensation.step;
        exposureCompensationSlider.value = settings.exposureCompensation;
        if (exposureModeSelect.value==='manual') {
            exposureCompensationSlider.hidden = false;
            exposureCompensationValue.textContent =
                ("+"
                    +Number(exposureCompensationSlider.value).toFixed(1)
                ).slice(-4);
        } else {
            exposureCompensationSlider.hidden = true;
            exposureCompensationValue.textContent='---';
        }
        exposureCompensationSlider.oninput=changeExposureCompensation;
    } else {
        exposureCompensationSlider.hidden = true;
        exposureCompensationValue.textContent='無効';
    }

    if ('iso' in capabilities) {
        //isoSlider.min = capabilities.iso.min;
        //isoSlider.max = capabilities.iso.max;
        //isoSlider.step = (capabilities.iso.step==0) ? 10 : capabilities.iso.step;
        isoSlider.min = 0;
        isoSlider.max = isoValues.length-1;
        isoSlider.step = 1;
        isoSlider.value = 0;//isoValues.indexof(settings.iso);
        if (exposureModeSelect.value==='manual') {
            isoSlider.hidden = false;
            isoValue.textContent = ("   "+isoValues[isoSlider.value]).slice(-5);
        } else {
            isoSlider.hidden = true;
            isoValue.textContent = 'AUTO';
        }
        isoSlider.oninput = changeIso;
    } else {
        isoSlider.hidden = true;
        isoValue.textContent = '無効';
    }

    if ('exposureTime' in capabilities) {
        //exposureTimeSlider.min = capabilities.exposureTime.min;
        //exposureTimeSlider.max = capabilities.exposureTime.max;
        //exposureTimeSlider.step = (capabilities.exposureTime.step==0) ? 10 : capabilities.exposureTime.step;
        exposureTimeSlider.value = undefined;
        exposureTimeSlider.min = 0;
        exposureTimeSlider.max = exposureTimeValues.length-1;
        exposureTimeSlider.step = 1;
        exposureTimeSlider.value = 0;//exposureTimeValues.indexof(settings.exposureTime);
        if (exposureModeSelect.value==='manual') {
            exposureTimeSlider.hidden = false;
            exposureTimeValue.textContent = ("     "+exposureTimeValues[exposureTimeSlider.value]).slice(-6);
        } else {
            exposureTimeSlider.hidden = true;
            exposureTimeValue.textContent = 'AUTO';
        }
        exposureTimeSlider.oninput = changeExposureTime;
    } else {
        exposureTimeSlider.hidden = true;
        exposureTimeValue.textContent = '無効';
    }

    if ('colorTemperature' in capabilities) {
        colorTemperatureSlider.value = undefined;
        colorTemperatureSlider.min = capabilities.colorTemperature.min;
        colorTemperatureSlider.max = capabilities.colorTemperature.max;
        colorTemperatureSlider.step = (capabilities.colorTemperature.step==0) ? 200 : capabilities.colorTemperature.step;
        colorTemperatureSlider.value = settings.colorTemperature;
        if (whiteBalanceModeSelect.value==='manual') {
            colorTemperatureSlider.hidden = false;
            colorTemperatureValue.textContent = (" "+colorTemperatureSlider.value).slice(-5);
        } else {
            colorTemperatureSlider.hidden = true;
            colorTemperatureValue.textContent = 'AUTO';
        }
        colorTemperatureSlider.oninput=changeColorTemperature;
    } else {
        colorTemperatureSlider.hidden = true;
        colorTemperatureValue.textContent = '無効';
    }
    //contrast
    //saturation
}

//設定に付けているイベントを削除する
function removeApplyCameraEvent() {
    resolutionSelect.removeEventListener('onchange',changeResolution);
    fpsSelect.removeEventListener('onchange',changeFps);
    // codecSelect
    focusModeSelect.removeEventListener('onchange',changeFocusMode);
    exposureModeSelect.removeEventListener('onchange',changeExposureMode);
    whiteBalanceModeSelect.removeEventListener('onchange',changeWhiteBalanceMode);

    focusDistanceSlider.removeEventListener('oninput',changeFocusDistance);
    exposureCompensationSlider.removeEventListener('oninput',changeExposureCompensation);
    isoSlider.removeEventListener('oninput',changeIso);
    exposureTimeSlider.removeEventListener('oninput',changeExposureTime);
    colorTemperatureSlider.removeEventListener('oninput',changeColorTemperature);

    //contrastSlider.removeEventListener('oninput',changeContrast);
    //saturationSlider.removeEventListener('oninput',changeSaturation);
}


function setConstraints() {
    //制約を丸ごと全部作る
    const audioSource = audioSelect.value;
    const videoSource = videoSelect.value;
    const resolutionWidth = resolutionSelect.value/9*16;
    const resolutionHeight = resolutionSelect.value;
    const frameRate = fpsSelect.value;

    const focusMode = focusModeSelect.value;
    const focusDistance = focusDistanceSlider.value;

    const exposureMode = exposureModeSelect.value;
    const exposureCompensation = exposureCompensationSlider.value;
    const iso = isoValues[Number(isoSlider.value)];
    const exposureTime = exposureTimeValues[Number(exposureTimeSlider.value)];

    const whiteBalanceMode = whiteBalanceModeSelect.value;
    const colorTemperature = colorTemperatureSlider.value;

    constraints = {};
    constraints.audio = {};
    constraints.audio.deviceId = audioSource ? {exact: audioSource} : undefined;
    constraints.video = {}
    constraints.video.deviceId = videoSource ? {exact: videoSource} : undefined;
    constraints.video.width = {ideal: Number(resolutionWidth)};
    constraints.video.height = {ideal: Number(resolutionHeight)};
    constraints.video.framerate = {ideal: Number(frameRate)};

    let constraintsVideoAdvancedFocus = {};
    constraintsVideoAdvancedFocus.focusMode = focusMode;
    if (focusMode==='manual') {
        constraintsVideoAdvancedFocus.focusDistance = Number(focusDistance);
    }

    let constraintsVideoAdvancedExposure = {};
    constraintsVideoAdvancedExposure.exposureMode = exposureMode;
    if (exposureMode==='manual') {
        constraintsVideoAdvancedExposure.iso = Number(iso);
        constraintsVideoAdvancedExposure.exposureTime = Number(exposureTime);
    } else {
        constraintsVideoAdvancedExposure.exposureCompensation = Number(exposureCompensation);
    }

    let constraintsVideoAdvancedWhiteBalance = {};
    constraintsVideoAdvancedWhiteBalance.whiteBalanceMode = whiteBalanceMode;
    if (whiteBalanceMode==='manual') {
        constraintsVideoAdvancedWhiteBalance.colorTemperature = Number(colorTemperature);
    }
    console.log(constraints);
    constraints.video.advanced = [ constraintsVideoAdvancedFocus, constraintsVideoAdvancedExposure, constraintsVideoAdvancedWhiteBalance ];
    console.log(constraints);
}

function setNewDeviceConstraints() {
    //制約を丸ごと全部作る
    const audioSource = audioSelect.value;
    const videoSource = videoSelect.value;
    const resolutionWidth = resolutionSelect.value/9*16;
    const resolutionHeight = resolutionSelect.value;
    const frameRate = fpsSelect.value;

    constraints = {};
    constraints.audio = {};
    constraints.audio.deviceId = audioSource ? {exact: audioSource} : undefined;
    constraints.video = {}
    constraints.video.deviceId = videoSource ? {exact: videoSource} : undefined;
    constraints.video.width = {ideal: Number(resolutionWidth)};
    constraints.video.height = {ideal: Number(resolutionHeight)};
    constraints.video.framerate = {ideal: Number(frameRate)};
}

function setCameraConfig() {
    //streamを全部止める前にallpyで持っているイベントリスナを停止する
    removeApplyCameraEvent();
    //streamを作る前に今あるstreamを全部止める
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
    setOptions();//selectorの内容をリセットする。
    setNewDeviceConstraints();//新しいデバイスにチェンジする時に必要な制約をセットする。

    navigator.mediaDevices.getUserMedia(constraints)
      .then(gotStream)
      .then(gotDevices)
      .then(function(){
        localStream=stream;
        setTimeout(function(){addApplyCameraSettings()},1000);//localstreamが取得できてしばらくしたらカメラ設定を反映
      })
      .catch(handleError);
}

//画質設定のオプションを選ぶ
function setOptions() {
    const cameraOptions = [
        ['resolution', '1080', '1080p',true],
        ['resolution', '720', '720p',false],
        ['resolution', '480', '480p',false],
        ['fps', '10', '10fps',false],
        ['fps', '15', '15fps',true],
        ['fps', '30', '30fps',false],
        ['codec', 'H264', 'H.264',true],
        ['codec', 'VP9', 'VP9(safari不可)',false],
        ['focusMode', 'continuous', '自動',true],
        ['focusMode', 'manual', 'マニュアル',false],
        ['exposureMode', 'continuous', '自動',true],
        ['exposureMode', 'manual', 'マニュアル',false],
        ['whiteBalanceMode', 'continuous', '自動',true],
        ['whiteBalanceMode', 'manual', 'マニュアル',false],
    ];
    const values = configSelectors.map(select => select.value);
    configSelectors.forEach(select => {
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
    });
    cameraOptions.forEach(function(cameraoption) {
        let select;
        const option = document.createElement('option');
        option.label = cameraoption[2];
        option.value = cameraoption[1];
        const selected = cameraoption[3];
        if ( cameraoption[0]==='resolution') {
            select=resolutionSelect;
        } else if (cameraoption[0]==='fps') {
            select=fpsSelect;
        } else if (cameraoption[0]==='codec') {
            select=codecSelect;
        } else if (cameraoption[0]==='focusMode') {
            select=focusModeSelect;
        } else if (cameraoption[0]==='exposureMode') {
            select=exposureModeSelect;
        } else if (cameraoption[0]==='whiteBalanceMode') {
            select=whiteBalanceModeSelect;
        } else {
          // console.log('Some other kind of source/device: ', deviceInfo);
        }
        if (!(typeof select === 'undefined')) {
          select.appendChild(option);
          select.options[select.options.length-1].selected=selected;
        }
      });
    //setOption呼び出し前の状態を反映させる場合は実行
    //configSelectors.forEach((select, selectorIndex) => {
    //    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
    //        select.value = values[selectorIndex];
    //    };
    //});
}

//デバイスを切り替える場合はストリームの取り直し
function gotDevices(deviceInfos) {

  //今選択されているものを覚えておく
  const values = deviceSelectors.map(select => select.value);

  //selectorのクリア
  deviceSelectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });

  //引数で渡されたデバイスをselectorにセットする
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;

    //デバイスのkindによってオーディオとビデオの選択肢に振り分け
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label || `microphone ${audioSelect.length + 1}`;
      audioSelect.appendChild(option);
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    } else {
      //オーディオでもビデオでもないものはログに出すのみ
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  //最初に覚えておいた選択肢にセットしなおす
  deviceSelectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
}
//初期設定する
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

//エラーログ出力
function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

//streamオフジェクトをビデオ枠にセットする
function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

