const brightnessSlider = document.getElementById('brightness');
const brightnessNumber = document.getElementById('brightnessNumber');
const sceneModeSelect = document.getElementById('sceneMode');
const whiteBalanceSelect = document.getElementById('whiteBalance');
const focusModeSelect = document.getElementById('focusMode');
const exposureCompensationSelect = document.getElementById('exposureCompensation');
let updateCameraStatusTimer;

//明るさを反映
function applyBrightness(track, value) {
    track.applyConstraints({advanced: [ {brightness: value} ]});
}

//設定に付けているイベントを削除する
function removeApplyCameraEvent() {
    brightnessSlider.removeEventListener('oninput',applyBrightness);
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
    if ('brightness' in capabilities) {
        brightnessSlider.oninput = applyBrightness(track, brightnessSlider.value);
//    updateCameraStatusTimer = setInterval(getCameraSettings(localStream),500)    
    }
}

//streamの現在をカメラ設定に反映する
function getCameraSettings(track) {
    console.log(track);
    const capabilities = track.getCapabilities();
    const settings = track.getSettings();
  
    //明るさが有効かどうか判定
    console.log(capabilities);
    if (!('brightness' in capabilities)) {
        brightnessSlider.hidden = true;
        brightnessSlider.textContent='使えません';
    } else {
        brightnessSlider.min = capabilities.brightness.min;
        brightnessSlider.max = capabilities.brightness.max;
        brightnessSlider.step = capabilities.brightness.step;
        brightnessSlider.value = settings.brightness;
        brightnessSlider.textContent = '使えます'+settings.brightness;
        brightnessSlider.hidden = false;
    }
}
