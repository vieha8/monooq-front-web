export function storageAvailable(type) {
  let storage;
  const x = '__storage_test__';

  try {
    storage = window[type];

    if (storage === undefined) {
      return false;
    }

    if (storage) {
      storage.setItem(x, x);
      storage.removeItem(x);
    } else {
      return false;
    }

    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
}

export const isAvailableLocalStorage = () => storageAvailable('localStorage');
