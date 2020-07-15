const exposureTimeSlider = document.getElementById('exposureTime');
const exposureTimeNumber = document.getElementById('exposureTimeNumber');
const sceneModeSelect = document.getElementById('sceneMode');
const whiteBalanceSelect = document.getElementById('whiteBalance');
const focusModeSelect = document.getElementById('focusMode');
const exposureCompensationSelect = document.getElementById('exposureCompensation');
let updateCameraStatusTimer;

//明るさを反映
function applyExposureTime() {
    console.log('イベント発生');
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const exposureTime = exposureTimeSlider.value;

    let settings = track.getSettings();
    console.log(settings);

    let constraints = { advanced: [ {exposureMode: 'manual', exposureTime: Number(exposureTime) } ] };
    console.log(constraints);
    track.applyConstraints(constraints);

    settings = track.getSettings();
    console.log(settings);

}

//設定に付けているイベントを削除する
function removeApplyCameraEvent() {
    console.log('イベントリスナ削除');
    exposureTimeSlider.removeEventListener('oninput',applyExposureTime);
    if (!(typeof updateCameraStatusTimer === 'undefined')) {
        clearInterval(updateCameraStatusTimer);
    }
}

//streamに対してカメラ設定できるようにする
function applyCameraSettings() {
    getCameraSettings();

    //イベントリスナ追加
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const capabilities = track.getCapabilities();
    if ('exposureTime' in capabilities) {
        console.log('イベントリスナ設置');
//        exposureTimeSlider.addEventListener('oninput',applyExposureTime);
        exposureTimeSlider.oninput=applyExposureTime;
        updateCameraStatusTimer = setInterval(function(){getCameraSettings()},1000);
    }
}

//streamの現在をカメラ設定に反映する
function getCameraSettings() {
    const track = localStream.getVideoTracks()[0];//localstreamが未定義だと失敗する
//    console.log(track);
    const capabilities = track.getCapabilities();
    const settings = track.getSettings();
//    console.log(capabilities);
//    console.log(settings);
  
    //明るさが有効かどうか判定
    if (!('exposureTime' in capabilities)) {
        exposureTimeSlider.hidden = true;
        exposureTimeNumber.textContent='使えません';
    } else {
        exposureTimeSlider.min = capabilities.exposureTime.min;
        exposureTimeSlider.max = capabilities.exposureTime.max;
        exposureTimeSlider.step = (capabilities.exposureTime.step==0) ? 1 : capabilities.exposureTime.step;
        exposureTimeSlider.value = settings.exposureTime;
        exposureTimeNumber.textContent = '使えます'+settings.exposureTime;
        exposureTimeSlider.hidden = false;
    }
}
