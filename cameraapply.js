const autoFocusButton = document.getElementById('autoFocusMode');
const focusDistanceSlider = document.getElementById('focusDistance');
const focusDistanceValue = document.getElementById('focusDistanceValue');
let manualFocus=false;

const resetExposureButton = document.getElementById('resetExposure');
const exposureCompensationSlider = document.getElementById('exposureCompensation');
const exposureCompensationValue = document.getElementById('exposureCompensationValue');

const autoWhiteBalanceButton = document.getElementById('autoWhiteBalance');
const colorTemperatureSlider = document.getElementById('colorTemperature');
const colorTemperatureValue = document.getElementById('colorTemperatureValue');
let manualWhiteBalance=false;

//フォーカスをオートにする
function applyAutoFocus() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const focusMode = "continuous";
    manualFocus=false;
    let constraints = { advanced: [ { focusMode: focusMode }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//フォーカス距離を反映、参考資料によりmanualを追加
function applyFocusDistance() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const focusDistance = focusDistanceSlider.value;
    manualFocus=true;
    let constraints = { advanced: [ { focusMode: "manual", focusDistance: Number(focusDistance) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}

//露出補正をリセットする
function applyNomalExposure() {
    exposureCompensationSlider.value=0;
//    applyExposureTime();
}
//露出補正を反映
function applyExposureCompensation() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const exposureCompensation = exposureCompensationSlider.value;
    let constraints = { advanced: [ { exposureCompensation: Number(exposureCompensation) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}

//ホワイトバランスをオートにする（たぶん）
function applyAutoWhiteBalance() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const whiteBalanceMode = "continuous";
    manualWhiteBalance=false;
    let constraints = { advanced: [ { whiteBalanceMode: whiteBalanceMode }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//色温度を反映、参考資料によりmanualを追加
function applyColorTemperature() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const colorTemperature = colorTemperatureSlider.value;
    manualWhiteBalance=true;
    let constraints = { advanced: [ { whiteBalanceMode: "manual", colorTemperature: Number(colorTemperature) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}

//設定に付けているイベントを削除する
function removeApplyCameraEvent() {
    autoFocusButton.removeEventListener('onclick',applyAutoFocus);
    focusDistanceSlider.removeEventListener('oninput',applyFocusDistance);

    resetExposureButton.removeEventListener('onclick',applyNomalExposure);
    exposureCompensationSlider.removeEventListener('oninput',applyExposureCompensation);

    autoWhiteBalanceButton.removeEventListener('onclick',applyAutoWhiteBalance);
    colorTemperatureSlider.removeEventListener('oninput',applyColorTemperature);
}

//streamに対してカメラ設定できるようにする
function addApplyCameraSettings() {
    getCameraSettings();

    //イベントリスナ追加
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const capabilities = track.getCapabilities();
    if ('focusMode' in capabilities) {
        autoFocusButton.onclick=applyAutoFocus;
    }
    if ('focusDistance' in capabilities) {
        focusDistanceSlider.oninput=applyFocusDistance;
    }
    if ('exposureCompensation' in capabilities) {
        exposureCompensationSlider.oninput=applyExposureCompensation;
    }
    if ('whiteBalanceMode' in capabilities) {
        autoWhiteBalanceButton.onchange=applyAutoWhiteBalance;
    }
    if ('colorTemperature' in capabilities) {
        colorTemperatureSlider.oninput=applyColorTemperature;
    }
}

//streamの現在をカメラ設定に反映する
function getCameraSettings() {
    const track = localStream.getVideoTracks()[0];//localstreamが未定義だと失敗する
    const capabilities = track.getCapabilities();
    const settings = track.getSettings();

    if (!('focusMode' in capabilities)) {
        autoFocusButton.textContent="無効";
    } else {
        autoFocusButton.textContent="AUTO";
    }
    if (!('focusDistance' in capabilities)) {
        focusDistanceSlider.hidden = true;
        focusDistanceValue.textContent='マニュアル操作不可';
    } else {
        focusDistanceSlider.min = capabilities.focusDistance.min;
        focusDistanceSlider.max = capabilities.focusDistance.max;
        focusDistanceSlider.step = (capabilities.focusDistance.step==0) ? 0.05 : capabilities.focusDistance.step;
        focusDistanceSlider.value = settings.focusDistance;
        focusDistanceSlider.hidden = false;
        focusDistanceValue.textContent = manualFocus ?
                ("0000"
                    +Math.round(
                                (focusDistanceSlider.value - focusDistanceSlider.min)
                                /(focusDistanceSlider.max - focusDistanceSlider.min)*1000)
                ).slice(-4)
            : "AUTO";
    }

    if (!('exposureCompensation' in capabilities)) {
        resetExposureButton.textContent="無効";
        exposureCompensationSlider.hidden = true;
        exposureCompensationValue.textContent='マニュアル操作不可';
    } else {
        resetExposureButton.textContent="RESET";
        exposureCompensationSlider.min = capabilities.exposureCompensation.min;
        exposureCompensationSlider.max = capabilities.exposureCompensation.max;
        exposureCompensationSlider.step = (capabilities.exposureCompensation.step==0) ? 0.5 : capabilities.exposureCompensation.step;
        exposureCompensationSlider.value = settings.exposureCompensation;
        exposureCompensationSlider.hidden = false;
        exposureCompensationValue.textContent =
            ("+"
                +exposureCompensationSlider.value.toFixed(1)
            ).slice(-4);
    }

    if (!('whiteBalanceMode' in capabilities)) {
        autoWhiteBalanceButton.textContent="無効";
    } else {
        autoWhiteBalanceButton.textContent="AUTO";
    }
    if (!('colorTemperature' in capabilities)) {
        colorTemperatureSlider.hidden = true;
        colorTemperatureValue.textContent='マニュアル操作不可';
    } else {
        colorTemperatureSlider.min = capabilities.colorTemperature.min;
        colorTemperatureSlider.max = capabilities.colorTemperature.max;
        colorTemperatureSlider.step = (capabilities.colorTemperature.step==0) ? 50 : capabilities.colorTemperature.step;
        colorTemperatureSlider.value = settings.colorTemperature;
        colorTemperatureSlider.hidden = false;
        colorTemperatureValue.textContent = manualWhiteBalance ? 
                (" "
                    +colorTemperatureSlider.value
                ).slice(-5)
            : " AUTO";
    }
}

function updateCameraSettings() {
    const track = localStream.getVideoTracks()[0];//localstreamが未定義だと失敗する
    const capabilities = track.getCapabilities();

    if ('focusDistance' in capabilities) {
        focusDistanceValue.textContent = manualFocus ?
                ("0000"
                    +Math.round(
                                (focusDistanceSlider.value - focusDistanceSlider.min)
                                /(focusDistanceSlider.max - focusDistanceSlider.min)*1000)
                ).slice(-4)
            : "AUTO";
    }
    if ('exposureCompensation' in capabilities) {
        exposureCompensationValue.textContent =
            ("+"
                +exposureCompensationSlider.value.toFixed(1)
            ).slice(-4);
    }
    if ('colorTemperature' in capabilities) {
        colorTemperatureValue.textContent = manualWhiteBalance ? 
                (" "
                    +colorTemperatureSlider.value
                ).slice(-5)
            : " AUTO";
    }
}
