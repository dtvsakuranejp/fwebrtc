const exposureTimeSlider = document.getElementById('exposureTime');
const exposureTimeNumber = document.getElementById('exposureTimeNumber');
const sceneModeSelect = document.getElementById('sceneMode');
const whiteBalanceSelect = document.getElementById('whiteBalance');
const focusModeSelect = document.getElementById('focusMode');
const exposureCompensationSelect = document.getElementById('exposureCompensation');
let updateCameraStatusTimer;

//明るさを反映
function applyExposureTime(track, value) {
    track.applyConstraints({advanced: [ {exposureTime: value} ]});
}

//設定に付けているイベントを削除する
function removeApplyCameraEvent() {
    exposureTimeSlider.removeEventListener('oninput',applyExposureTime);
    if (!(typeof updateCameraStatusTimer === 'undefined')) {
        clearInterval(updateCameraStatusTimer);
    }
}

//streamに対してカメラ設定できるようにする
function applyCameraSettings() {
    const track = localStream.getVideoTracks()[0];//localstreamが未定義だと失敗する
    getCameraSettings(track);

    //イベントリスナ追加
    const capabilities = track.getCapabilities();
    if ('exposureTime' in capabilities) {
        exposureTimeSlider.oninput = applyExposureTime(track, exposureTimeSlider.value);
    updateCameraStatusTimer = setInterval(getCameraSettings(localStream),500)    
    }
}

//streamの現在をカメラ設定に反映する
function getCameraSettings(track) {
    console.log(track);
    const capabilities = track.getCapabilities();
    const settings = track.getSettings();
  
    //明るさが有効かどうか判定
    console.log(capabilities);
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
