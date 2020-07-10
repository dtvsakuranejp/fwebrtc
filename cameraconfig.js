//const videoElement = document.getElementById('my-video');
const resolutionSelect = document.getElementById('resolution');
const fpsSelect = document.getElementById('fps');
//const whiteBalanceSelect = document.getElementById('whiteBalance');
//const focusModeSelect = document.getElementById('focusMode');
//const exposureSelect = document.getElementById('exposure');
//const configSelectors = [resolutionSelect, fpsSelect, whiteBalanceSelect, focusModeSelect, exposureSelect];
const configSelectors = [resolutionSelect, fpsSelect];

function setOptions() {
    const cameraOptions = [
        ['resolution', '1080', '1080p'],
        ['resolution', '720', '720p'],
        ['resolution', '480', '480p'],
        ['fps', '15', '15fps'],
        ['fps', '30', '30fps'],
        ['whiteBalance', '', ''],
        ['focusMode', '', ''],
        ['exposure', '', '']
    ];
    const values = configSelectors.map(select => select.value);
    configSelectors.forEach(select => {
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
    });
    cameraOptions.forEach(function(cameraoption) {
        const option = document.createElement('option');
        option.label = cameraoption[2];
        option.value = cameraoption[1];
        if ( cameraoption[0]==='resolution') {
            resolutionSelect.appendChild(option);
        } else if (cameraoption[0]==='fps') {
            fpsSelect.appendChild(option);
//        } else if (cameraoption[0]==='whiteBalance') {
//            whiteBalanceSelect.appendChild(option);
//        } else if (cameraoption[0]==='focusMode') {
//            focusModeSelect.appendChild(option);
//        } else if (cameraoption[0]==='exposure') {
//            exposureSelect.appendChild(option);
        } else {
          // console.log('Some other kind of source/device: ', deviceInfo);
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
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const audioSource = audioSelect.value;
  const videoSource = videoSelect.value;
  const resolutionWidth = resolution.value/9*16;
  const resolutionHeight = resolution.value;
  const frameRate = fps.value;
  //const whiteBalance
  //const focusMode
  //const exposure
  const constraints = {
    audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {
        deviceId: videoSource ? {exact: videoSource} : undefined,
        width: {ideal: resolutionWidth},
        height: {ideal: resolutionHeight},
        frameRate:{ideal: frameRate},
        //whiteBalance
        //focusMode
        //exposure
    },
  };
  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).then(function(){localStream=stream;}).catch(handleError);
}
