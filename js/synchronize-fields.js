'use strict';
window.synchronizeFields = (function (masterObject, masterData, slaveObject, slaveData, callback) {
  masterObject.addEventListener('change', function () {
    masterData.forEach(function (elem, i) {
      if (masterObject.value === elem) {
        callback(slaveObject, slaveData[i]);
      }
    });
  });
});
