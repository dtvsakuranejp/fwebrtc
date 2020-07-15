const sceneModeSelect = document.getElementById('sceneMode');
const sceneModeSelectValue = document.getElementById('sceneModeValue');

const focusModeSelect = document.getElementById('focusMode');
const focusModeSelectValue = document.getElementById('focusModeValue');

const exposureModeSelect = document.getElementById('exposureMode');
const exposureModeSelectValue = document.getElementById('exposureModeValue');

const whiteBalanceModeSelect = document.getElementById('whiteBalanceMode');
const whiteBalanceModeSelectValue = document.getElementById('whiteBalanceModeValue');

const focusDistanceSlider = document.getElementById('focusDistance');
const focusDistanceSliderValue = document.getElementById('focusDistanceValue');

const exposureTimeSlider = document.getElementById('exposureTime');
const exposureTimeSliderValue = document.getElementById('exposureTimeValue');

const colorTemperatureSlider = document.getElementById('colorTemperature');
const colorTemperatureSliderValue = document.getElementById('colorTemperatureValue');

const exposureCompensationSlider = document.getElementById('exposureCompensation');
const exposureCompensationSliderValue = document.getElementById('exposureCompensationValue');

const isoSlider = document.getElementById('iso');
const isoSliderValue = document.getElementById('isoValue');

const brightnessSlider = document.getElementById('brightness');
const brightnessSliderValue = document.getElementById('brightnessValue');

//let updateCameraStatusTimer;

//シーンモードを反映
function applySceneMode() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const sceneMode = sceneModeSelect.value;
    let constraints = { advanced: [ { sceneMode: sceneMode }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//フォーカスモードを反映
function applyFocusMode() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const focusMode = focusModeSelect.value;
    let constraints = { advanced: [ { focusMode: focusMode }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//露出モードを反映
function applyExposureMode() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const exposureMode = exposureModeSelect.value;
    let constraints = { advanced: [ { exposureMode: exposureMode }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//ホワイトバランスモードを反映
function applyWhiteBalanceMode() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const whiteBalanceMode = whiteBalanceModeSelect.value;
    let constraints = { advanced: [ { whiteBalanceMode: whiteBalanceMode }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//フォーカス距離を反映、参考資料によりmanualを追加
function applyFocusDistance() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const focusDistance = focusDistanceSlider.value;
    let constraints = { advanced: [ { focusMode: "manual", focusDistance: Number(focusDistance) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//露出時間を反映、参考資料によりmanualを追加
function applyExposureTime() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const exposureTime = exposureTimeSlider.value;
    let constraints = { advanced: [ { exposureMode: "manual", exposureTime: Number(exposureTime) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//色温度を反映、参考資料によりmanualを追加
function applyColorTemperature() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const colorTemperature = colorTemperatureSlider.value;
    let constraints = { advanced: [ { whiteBalanceMode: "manual", colorTemperature: Number(colorTemperature) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//露出補正を反映、参考資料によりcontinuousを追加
function applyExposureCompensation() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const exposureCompensation = exposureCompensationSlider.value;
    let constraints = { advanced: [ { exposureMode:"continuous", exposureCompensation: Number(exposureCompensation) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//isoを反映、参考資料によりmanualを追加
function applyIso() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const iso = isoSlider.value;
    let constraints = { advanced: [ { exposureMode: "manual", iso: Number(iso) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//brightnessを反映、参考資料によりmanualを追加
function applyBrightness() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const brightness = brightnessSlider.value;
    let constraints = { advanced: [ { exposureMode: "manual", brightness: Number(brightness) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}

//設定に付けているイベントを削除する
function removeApplyCameraEvent() {
//    console.log('イベントリスナ削除');
    sceneModeSelect.removeEventListener('onchange',applySceneMode);
    focusModeSelect.removeEventListener('onchange',applyFocusMode);
    exposureModeSelect.removeEventListener('onchange',applyExposureMode);
    whiteBalanceModeSelect.removeEventListener('onchange',applyWhiteBalanceMode);

    focusDistanceSlider.removeEventListener('oninput',applyFocusDistance);
    exposureTimeSlider.removeEventListener('oninput',applyExposureTime);
    colorTemperatureSlider.removeEventListener('oninput',applyColorTemperature);
    exposureCompensationSlider.removeEventListener('oninput',applyExposureCompensation);
    isoSlider.removeEventListener('oninput',applyIso);
    brightnessSlider.removeEventListener('oninput',applyBrightness);
//    if (!(typeof updateCameraStatusTimer === 'undefined')) {
//        clearInterval(updateCameraStatusTimer);
//    }
}

//streamに対してカメラ設定できるようにする
function addApplyCameraSettings() {
    getCameraSettings();

    //イベントリスナ追加
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const capabilities = track.getCapabilities();
    if ('sceneMode' in capabilities) {
        sceneModeSelect.onchange=applySceneMode;
    }
    if ('focusMode' in capabilities) {
        focusModeSelect.onchange=applyFocusMode;
    }
    if ('exposureMode' in capabilities) {
        sceneModeSelect.onchange=applyExposureMode;
    }
    if ('whiteBalanceMode' in capabilities) {
        focusModeSelect.onchange=applyWhiteBalanceMode;
    }

    if ('focusDistance' in capabilities) {
        focusDistanceSlider.oninput=applyFocusDistance;
    }
    if ('exposureTime' in capabilities) {
        exposureTimeSlider.oninput=applyExposureTime;
    }
    if ('colorTemperature' in capabilities) {
        colorTemperatureSlider.oninput=applyColorTemperature;
    }
    if ('exposureCompensation' in capabilities) {
        exposureCompensationSlider.oninput=applyExposureCompensation;
    }
    if ('iso' in capabilities) {
        isoSlider.oninput=applyIso;
    }
    if ('brightness' in capabilities) {
        isoSlider.oninput=applyBrightness;
    }
//    updateCameraStatusTimer = setInterval(function(){updateCameraSettings()},1000);
}

//streamの現在をカメラ設定に反映する
function getCameraSettings() {
    const track = localStream.getVideoTracks()[0];//localstreamが未定義だと失敗する
    const capabilities = track.getCapabilities();
    const settings = track.getSettings();
  
    if (!('sceneMode' in capabilities)) {
        sceneModeSelect.hidden=true;
        sceneModeSelectValue.textContent='使えません';
    } else {
        sceneModeSelectValue.textContent=settings.sceneMode;
    }
    if (!('focusMode' in capabilities)) {
        focusModeSelect.hidden=true;
        focusModeSelectValue.textContent='使えません';
    } else {
        focusModeSelectValue.textContent=settings.focusMode;
    }
    if (!('exposureMode' in capabilities)) {
        exposureModeSelect.hidden=true;
        exposureModeSelectValue.textContent='使えません';
    } else {
        exposureModeSelectValue.textContent=settings.exposureMode;
    }
    if (!('whiteBalanceMode' in capabilities)) {
        whiteBalanceModeSelect.hidden=true;
        whiteBalanceModeSelectValue.textContent='使えません';
    } else {
        whiteBalanceModeSelectValue.textContent=settings.whiteBalanceMode;
    }

    if (!('focusDistance' in capabilities)) {
        focusDistanceSlider.hidden = true;
        focusDistanceSliderValue.textContent='使えません';
    } else {
        focusDistanceSlider.min = capabilities.focusDistance.min;
        focusDistanceSlider.max = capabilities.focusDistance.max;
        focusDistanceSlider.step = (capabilities.focusDistance.step==0) ? 1 : capabilities.focusDistance.step;
        focusDistanceSlider.value = settings.focusDistance;
        focusDistanceSliderValue.textContent = settings.focusDistance;
        focusDistanceSlider.hidden = false;
    }
    if (!('exposureTime' in capabilities)) {
        exposureTimeSlider.hidden = true;
        exposureTimeSliderValue.textContent='使えません';
    } else {
        exposureTimeSlider.min = capabilities.exposureTime.min;
        exposureTimeSlider.max = capabilities.exposureTime.max;
        exposureTimeSlider.step = (capabilities.exposureTime.step==0) ? 1 : capabilities.exposureTime.step;
        exposureTimeSlider.value = settings.exposureTime;
        exposureTimeSliderValue.textContent = settings.exposureTime;
        exposureTimeSlider.hidden = false;
    }
    if (!('colorTemperature' in capabilities)) {
        colorTemperatureSlider.hidden = true;
        colorTemperatureSliderValue.textContent='使えません';
    } else {
        colorTemperatureSlider.min = capabilities.colorTemperature.min;
        colorTemperatureSlider.max = capabilities.colorTemperature.max;
        colorTemperatureSlider.step = (capabilities.colorTemperature.step==0) ? 1 : capabilities.colorTemperature.step;
        colorTemperatureSlider.value = settings.colorTemperature;
        colorTemperatureSliderValue.textContent = settings.colorTemperature;
        colorTemperatureSlider.hidden = false;
    }
    if (!('exposureCompensation' in capabilities)) {
        exposureCompensationSlider.hidden = true;
        exposureCompensationSliderValue.textContent='使えません';
    } else {
        exposureCompensationSlider.min = capabilities.exposureCompensation.min;
        exposureCompensationSlider.max = capabilities.exposureCompensation.max;
        exposureCompensationSlider.step = (capabilities.exposureCompensation.step==0) ? 1 : capabilities.exposureCompensation.step;
        exposureCompensationSlider.value = settings.exposureCompensation;
        exposureCompensationSliderValue.textContent = settings.exposureCompensation;
        exposureCompensationSlider.hidden = false;
    }
    if (!('iso' in capabilities)) {
        isoSlider.hidden = true;
        isoSliderValue.textContent='使えません';
    } else {
        isoSlider.min = capabilities.iso.min;
        isoSlider.max = capabilities.iso.max;
        isoSlider.step = (capabilities.iso.step==0) ? 1 : capabilities.iso.step;
        isoSlider.value = settings.iso;
        isoSliderValue.textContent = settings.iso;
        isoSlider.hidden = false;
    }
    if (!('brightness' in capabilities)) {
        brightnessSlider.hidden = true;
        brightnessSliderValue.textContent='使えません';
    } else {
        brightnessSlider.min = capabilities.brightness.min;
        brightnessSlider.max = capabilities.brightness.max;
        brightnessSlider.step = (capabilities.brightness.step==0) ? 1 : capabilities.brightness.step;
        brightnessSlider.value = settings.brightness;
        brightnessSliderValue.textContent = settings.brightness;
        brightnessSlider.hidden = false;
    }
}

function updateCameraSettings() {
    const track = localStream.getVideoTracks()[0];//localstreamが未定義だと失敗する
    const capabilities = track.getCapabilities();
    const constraints = track.getConstraints();
    const settings = track.getSettings();
//  console.log(settings);
    if ('sceneMode' in capabilities) {
        sceneModeSelectValue.textContent =  sceneModeSelect.value +'->'+ constraints.sceneMode +'->'+ settings.sceneMode;
    }
    if ('focusMode' in capabilities) {
        focusModeSelectValue.textContent = focusModeSelect.value +'->'+ constraints.focusMode +'->'+ settings.focusMode;
    }
    if ('exposureMode' in capabilities) {
        exposureModeSelectValue.textContent =  exposureModeSelect.value +'->'+ constraints.exposureMode +'->'+ settings.exposureMode;
    }
    if ('whiteBalanceMode' in capabilities) {
        whiteBalanceModeSelectValue.textContent = whiteBalanceModeSelect.value +'->'+ constraints.whiteBalanceMode +'->'+ settings.whiteBalanceMode;
    }

    if ('focusDistance' in capabilities) {
        focusDistanceSliderValue.textContent = focusDistanceSlider.value +'->'+ constraints.focusDistance +'->'+ settings.focusDistance;
    }
    if ('exposureTime' in capabilities) {
        exposureTimeSliderValue.textContent = exposureTimeSlider.value +'->'+ constraints.exposureTime +'->'+ settings.exposureTime;
    }
    if ('colorTemperature' in capabilities) {
        colorTemperatureSliderValue.textContent = colorTemperatureSlider.value +'->'+ constraints.colorTemperature +'->'+ settings.colorTemperature;
    }
    if ('exposureCompensation' in capabilities) {
        exposureCompensationSliderValue.textContent = exposureCompensationSlider.value +'->'+ constraints.exposureCompensation +'->'+ settings.exposureCompensation;
    }
    if ('iso' in capabilities) {
        isoSliderValue.textContent = isoSlider.value +'->'+ constraints.iso +'->'+ settings.iso;
    }
    if ('brightness' in capabilities) {
        brightnessSliderValue.textContent = brightnessSlider.value +'->'+ constraints.brightness +'->'+ settings.brightness;
    }
}
