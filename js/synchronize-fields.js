'use strict';
window.synchronizeFields = (function (masterObject, masterData, slaveObject, slaveData, callback) {
  masterObject.addEventListener('change', function () {
    for (var i = 0; i < masterData.length; i++) {
      if (masterObject.value === masterData[i]) {
        callback(slaveObject, slaveData[i]);
        break;
      }
    }
  });
});
