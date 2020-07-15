const sceneModeSelect = document.getElementById('sceneMode');
const sceneModeSelectValue = document.getElementById('sceneModeValue');
const focusModeSelect = document.getElementById('focusMode');
const focusModeSelectValue = document.getElementById('focusModeValue');
const exposureCompensationSlider = document.getElementById('exposureCompensation');
const exposureCompensationValue = document.getElementById('exposureCompensationValue');
let updateCameraStatusTimer;

//露出補正を反映
function applyExposureCompensation() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const exposureCompensation = exposureCompensationSlider.value;

    let constraints = { exposureCompensation: {ideal: Number(exposureCompensation) } };
    track.applyConstraints(constraints);
    console.log(constraints);
}

//シーンモードを反映
function applySceneMode() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const sceneMode = sceneModeSelect.value;

    let constraints = { sceneMode: {ideal: sceneMode } };
    track.applyConstraints(constraints);
}

//フォーカスモードを反映
function applyFocusMode() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const focusMode = focusModeSelect.value;

    let constraints = { focusMode: {ideal: focusMode } };
    track.applyConstraints(constraints);
}


//設定に付けているイベントを削除する
function removeApplyCameraEvent() {
    console.log('イベントリスナ削除');
    exposureCompensationSlider.removeEventListener('oninput',applyExposureCompensation);
    focusModeSelect.removeEventListener('onchange',applyFocusMode);
    sceneModeSelect.removeEventListener('onchange',applySceneMode);
    if (!(typeof updateCameraStatusTimer === 'undefined')) {
        clearInterval(updateCameraStatusTimer);
    }
}

//streamに対してカメラ設定できるようにする
function addApplyCameraSettings() {
    getCameraSettings();

    //イベントリスナ追加
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const capabilities = track.getCapabilities();
    if ('exposureCompensation' in capabilities) {
        exposureCompensationSlider.oninput=applyExposureCompensation;
    }
    if ('focusMode' in capabilities) {
        focusModeSelect.onchange=applyFocusMode;
    }
    if ('sceneMode' in capabilities) {
        sceneModeSelect.onchange=applySceneMode;
    }
    updateCameraStatusTimer = setInterval(function(){updateCameraSettings()},1000);
}

//streamの現在をカメラ設定に反映する
function getCameraSettings() {
    const track = localStream.getVideoTracks()[0];//localstreamが未定義だと失敗する
    const capabilities = track.getCapabilities();
    const settings = track.getSettings();
  
    if (!('exposureCompensation' in capabilities)) {
        exposureCompensationSlider.hidden = true;
        exposureCompensationValue.textContent='使えません';
    } else {
        exposureCompensationSlider.min = capabilities.exposureCompensation.min;
        exposureCompensationSlider.max = capabilities.exposureCompensation.max;
        exposureCompensationSlider.step = (capabilities.exposureCompensation.step==0) ? 1 : capabilities.exposureCompensation.step;
        exposureCompensationSlider.value = settings.exposureCompensation;
        exposureCompensationValue.textContent = settings.exposureCompensation;
        exposureCompensationSlider.hidden = false;
    }
    if (!('focusMode' in capabilities)) {
        focusModeSelect.hidden=true;
        focusModeSelectValue.textContent='使えません';
    } else {
        focusModeSelectValue.textContent=settings.focusMode;
    }
    if (!('sceneMode' in capabilities)) {
        sceneModeSelect.hidden=true;
        sceneModeSelectValue.textContent='使えません';
    } else {
        sceneModeSelectValue.textContent=settings.sceneMode;
    }
}

function updateCameraSettings() {
    const track = localStream.getVideoTracks()[0];//localstreamが未定義だと失敗する
    const capabilities = track.getCapabilities();
    const settings = track.getSettings();
  
    //明るさが有効かどうか判定
    if ('exposureCompensation' in capabilities) {
        exposureCompensationValue.textContent = settings.exposureCompensation;
    }
    if ('focusMode' in capabilities) {
        focusModeSelectValue.textContent = settings.focusMode;
    }
    if ('sceneMode' in capabilities) {
        sceneModeSelectValue.textContent = settings.sceneMode;
    }
}
