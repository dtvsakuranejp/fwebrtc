//const exposureTimeSlider = document.getElementById('exposureTime');
//const exposureTimeNumber = document.getElementById('exposureTimeNumber');
const sceneModeSelect = document.getElementById('sceneMode');
//const whiteBalanceSelect = document.getElementById('whiteBalance');
const focusModeSelect = document.getElementById('focusMode');
//const exposureCompensationSelect = document.getElementById('exposureCompensation');
const exposureCompensationSlider = document.getElementById('exposureCompensation');
const exposureCompensationNumber = document.getElementById('exposureCompensationNumber');
let updateCameraStatusTimer;

//露出補正を反映
function applyExposureCompensation() {
    console.log('exposureCompensationイベント発生');
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const exposureCompensation = exposureCompensationSlider.value;

    let settings = track.getSettings();
    console.log(settings);

    let constraints = { exposureCompensation: {ideal: Number(exposureCompensation) },
                        advanced: [{exposureCompensation: Number(exposureCompensation)}] };
    console.log(constraints);
    track.applyConstraints(constraints);

    settings = track.getSettings();
    console.log(settings);

}

//設定に付けているイベントを削除する
function removeApplyCameraEvent() {
    console.log('イベントリスナ削除');
    exposureCompensationSlider.removeEventListener('oninput',applyExposureCompensation);
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
    if ('exposureCompensation' in capabilities) {
        console.log('イベントリスナ設置');
        exposureCompensationSlider.oninput=applyExposureCompensation;
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
    if (!('exposureCompensation' in capabilities)) {
        exposureCompensationSlider.hidden = true;
        exposureCompensationNumber.textContent='使えません';
    } else {
        exposureCompensationSlider.min = capabilities.exposureCompensation.min;
        exposureCompensationSlider.max = capabilities.exposureCompensation.max;
        exposureCompensationSlider.step = (capabilities.exposureCompensation.step==0) ? 1 : capabilities.exposureCompensation.step;
        exposureCompensationSlider.value = settings.exposureCompensation;
        exposureCompensationNumber.textContent = '使えます'+settings.exposureCompensation;
        exposureCompensationSlider.hidden = false;
    }
}
