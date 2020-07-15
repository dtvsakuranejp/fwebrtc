//const videoElement = document.getElementById('my-video');
const resolutionSelect = document.getElementById('resolution');
const fpsSelect = document.getElementById('fps');
const codecSelect = document.getElementById('codec');
//const bandwidthSelect = document.getElementById('bandwidth');
//const whiteBalanceSelect = document.getElementById('whiteBalance');
//const focusModeSelect = document.getElementById('focusMode');
//const exposureCompensationSelect = document.getElementById('exposureCompensation');
//const configSelectors = [resolutionSelect, fpsSelect, whiteBalanceSelect, focusModeSelect, exposureSelect];
//const configSelectors = [resolutionSelect, fpsSelect, exposureCompensationSelect];
const configSelectors = [resolutionSelect, fpsSelect, codecSelect];

function setOptions() {
    const cameraOptions = [
        ['resolution', '1080', '1080p',true],
        ['resolution', '720', '720p',false],
        ['resolution', '480', '480p',false],
        ['fps', '10', '10fps',false],
        ['fps', '15', '15fps',true],
        ['fps', '30', '30fps',false],
        ['codec', 'H264', 'H.264',false],
        ['codec', 'VP9', 'VP9(safari不可)',true],
        ['whiteBalance', '', '',true],
        ['focusMode', '', '',true],
        ['exposureCompensation', '+2', '2',false],
        ['exposureCompensation', '+1', '1',false],
        ['exposureCompensation', '0', '0',true],
        ['exposureCompensation', '-1', '-1',false],
        ['exposureCompensation', '-2', '-2',false],
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
//        } else if (cameraoption[0]==='exposureCompensation') {
//          select=exposureCompensationSelect;
//        } else if (cameraoption[0]==='whiteBalance') {
//            whiteBalanceSelect.appendChild(option);
//        } else if (cameraoption[0]==='focusMode') {
//            focusModeSelect.appendChild(option);
        } else {
          // console.log('Some other kind of source/device: ', deviceInfo);
        }
        if (!(typeof select === 'undefined')) {
          select.appendChild(option);
          select.options[select.options.length-1].selected=selected;
        }
      });
    configSelectors.forEach((select, selectorIndex) => {
        if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
            select.value = values[selectorIndex];
        };
    });
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
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
  const audioSource = audioSelect.value;
  const videoSource = videoSelect.value;
  const resolutionWidth = resolutionSelect.value/9*16;
  const resolutionHeight = resolutionSelect.value;
  const frameRate = fpsSelect.value;
  //const whiteBalance
  //const focusMode
  //const exposureCompensation = exposureCompensationSelect.value;
  const constraints = {
    audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {
        deviceId: videoSource ? {exact: videoSource} : undefined,
        width: {ideal: resolutionWidth},
        height: {ideal: resolutionHeight},
        frameRate:{ideal: frameRate},
        //whiteBalance
        //focusMode
        //exposureCompensation:{ideal: exposureCompensation},
    },
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(gotStream)
    .then(gotDevices)
    .then(function(){
      localStream=stream;
      setTimeout(function(){applyCameraSettings()},1000);//localstreamが取得できてしばらくしたらカメラ設定を反映
    })
    .catch(handleError);
}
