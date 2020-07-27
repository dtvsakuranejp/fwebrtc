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

const autoIsoButton = document.getElementById('autoIso');
const isoSlider = document.getElementById('iso');
const isoValue = document.getElementById('isoValue');
let manualIso=false;

const resetContrastButton = document.getElementById('autoContrast');
const contrastSlider = document.getElementById('contrast');
const contrastValue = document.getElementById('contrastValue');

const resetSaturationButton = document.getElementById('autoSaturation');
const saturationSlider = document.getElementById('saturation');
const saturationValue = document.getElementById('saturationValue');



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
    applyExposureCompensation();
}
//露出補正を反映
function applyExposureCompensation() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const exposureCompensation = exposureCompensationSlider.value;
    let constraints = { advanced: [ { exposureCompensation: Number(exposureCompensation) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}

//ホワイトバランスをオートにする（ならない）
function applyAutoWhiteBalance() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const whiteBalanceMode = "continuous";
    manualWhiteBalance=false;
    let constraints = { advanced: [ { whiteBalanceMode: whiteBalanceMode }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//色温度を反映
function applyColorTemperature() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const colorTemperature = colorTemperatureSlider.value;
    manualWhiteBalance=true;
    let constraints = { advanced: [ { colorTemperature: Number(colorTemperature) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}


//ISOをオートにする（ならない？）
function applyAutoIso() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const exposureMode = "continuous";
    manualIso=false;
    let constraints = { advanced: [ { exposureMode: exposureMode }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}
//ISO感度を反映
function applyIso() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const iso = isoSlider.value;
    manualIso=true;
    let constraints = { advanced: [ { iso: Number(iso) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}

//コントラストをリセットする
function applyNomalContrast() {
    contrastSlider.value=0;
    applyContrast();
}
//コントラストを反映
function applyContrast() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const contrast = contrastSlider.value;
    let constraints = { advanced: [ { contrast: Number(contrast) }] };
    track.applyConstraints(constraints).then(updateCameraSettings);
}

//彩度をリセットする
function applyNomalSaturation() {
    saturationSlider.value=0;
    applySaturation();
}
//コントラストを反映
function applySaturation() {
    const track = localStream.getVideoTracks()[0];//localStreamが未定義だと失敗する
    const saturation = saturationSlider.value;
    let constraints = { advanced: [ { saturation: Number(saturation) }] };
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

    autoIsoButton.removeEventListener('onclick',applyAutoIso);
    isoSlider.removeEventListener('oninput',applyIso);

    resetContrastButton.removeEventListener('onclick',applyNomalContrast);
    contrastSlider.removeEventListener('oninput',applyContrast);

    resetSaturationButton.removeEventListener('onclick',applyNomalSaturation);
    saturationSlider.removeEventListener('oninput',applySaturation);
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
        resetExposureButton.onclick=applyNomalExposure;
        exposureCompensationSlider.oninput=applyExposureCompensation;
    }
    if ('whiteBalanceMode' in capabilities) {
        autoWhiteBalanceButton.onclick=applyAutoWhiteBalance;
    }
    if ('colorTemperature' in capabilities) {
        colorTemperatureSlider.oninput=applyColorTemperature;
    }
    if ('exposureMode' in capabilities) {
        autoIsoButton.oninput=applyAutoIso;
    }
    if ('iso' in capabilities) {
        isoSlider.oninput=applyIso;
    }
    if ('contrast' in capabilities) {
        resetExposureButton.onclick=applyNomalContrast;
        contrastSlider.oninput=applyContrast;
    }
    if ('saturation' in capabilities) {
        resetSaturationButton.onclick=applyNomalSaturation;
        saturationSlider.oninput=applySaturation;
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
                ("000"
                    +Math.round(
                                (focusDistanceSlider.value - focusDistanceSlider.min)
                                /(focusDistanceSlider.max - focusDistanceSlider.min)*1000)
                ).slice(-3)
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
                +Number(exposureCompensationSlider.value).toFixed(1)
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

    if (!('exposureMode' in capabilities)) {
        autoIsoButton.textContent="無効";
    } else {
        autoIsoButton.textContent="AUTO";
    }
    if (!('iso' in capabilities)) {
        isoSlider.hidden = true;
        isoValue.textContent='マニュアル操作不可';
    } else {
        isoSlider.min = capabilities.iso.min;
        isoSlider.max = capabilities.iso.max;
        isoSlider.step = (capabilities.iso.step==0) ? 10 : capabilities.iso.step;
        isoSlider.value = settings.iso;
        isoSlider.hidden = false;
        isoValue.textContent = manualIso ? 
                (" "
                    +isoSlider.value
                ).slice(-5)
            : " AUTO";
    }

    if (!('contrast' in capabilities)) {
        resetContrastButton.textContent="無効";
        contrastSlider.hidden = true;
        contrastValue.textContent='マニュアル操作不可';
    } else {
        resetContrastButton.textContent="RESET";
        contrastSlider.min = capabilities.contrast.min;
        contrastSlider.max = capabilities.contrast.max;
        contrastSlider.step = (capabilities.contrast.step==0) ? 0.5 : capabilities.contrast.step;
        contrastSlider.value = settings.contrast;
        contrastSlider.hidden = false;
        contrastValue.textContent =
            ("+"
                +Number(contrastSlider.value).toFixed(1)
            ).slice(-4);
    }

    if (!('saturation' in capabilities)) {
        resetSaturationButton.textContent="無効";
        saturationSlider.hidden = true;
        saturationValue.textContent='マニュアル操作不可';
    } else {
        resetSaturationButton.textContent="RESET";
        saturationSlider.min = capabilities.saturation.min;
        saturationSlider.max = capabilities.saturation.max;
        saturationSlider.step = (capabilities.saturation.step==0) ? 0.5 : capabilities.saturation.step;
        saturationSlider.value = settings.saturation;
        saturationSlider.hidden = false;
        saturationValue.textContent =
            ("+"
                +Number(saturationSlider.value).toFixed(1)
            ).slice(-4);
    }



}

function updateCameraSettings() {
    const track = localStream.getVideoTracks()[0];//localstreamが未定義だと失敗する
    const capabilities = track.getCapabilities();

    if ('focusDistance' in capabilities) {
        focusDistanceValue.textContent = manualFocus ?
                ("000"
                    +Math.round(
                                (focusDistanceSlider.value - focusDistanceSlider.min)
                                /(focusDistanceSlider.max - focusDistanceSlider.min)*1000)
                ).slice(-3)
            : "AUTO";
    }
    if ('exposureCompensation' in capabilities) {
        exposureCompensationValue.textContent =
            ("+"
                +Number(exposureCompensationSlider.value).toFixed(1)
            ).slice(-4);
    }
    if ('colorTemperature' in capabilities) {
        colorTemperatureValue.textContent = manualWhiteBalance ? 
                (" "
                    +colorTemperatureSlider.value
                ).slice(-5)
            : " AUTO";
    }




    if ('iso' in capabilities) {
        isoValue.textContent = manualIso ? 
                (" "
                    +isoSlider.value
                ).slice(-5)
            : " AUTO";
    }

    if ('contrast' in capabilities) {
        contrastValue.textContent =
            ("+"
                +Number(contrastSlider.value).toFixed(1)
            ).slice(-4);
    }

    if ('saturation' in capabilities) {
        saturationValue.textContent =
            ("+"
                +Number(saturationSlider.value).toFixed(1)
            ).slice(-4);
    }

}
