const videoElement = document.getElementById('my-video');
const audioSelect = document.getElementById('audioSource');
const videoSelect = document.getElementById('videoSource');
const selectors = [audioSelect, videoSelect];

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map(select => select.value);
  selectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label || `microphone ${audioSelect.length + 1}`;
      audioSelect.appendChild(option);
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    } else {
      // console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
}
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

//function gotStream(stream) {
//  window.stream = stream; // make stream available to console
//  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
//  return navigator.mediaDevices.enumerateDevices();
//}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

//function start() {
//  if (window.stream) {
//    window.stream.getTracks().forEach(track => {
//      track.stop();
//    });
//  }
//  const audioSource = audioSelect.value;
//  const videoSource = videoSelect.value;
//  const constraints = {
//    audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
//    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
//  };
//  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
//}
