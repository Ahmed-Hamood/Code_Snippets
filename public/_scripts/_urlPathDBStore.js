let UrlPathsHistory = ['/']; // hashed paths
let currentUrlPathsHistoryIndex = 0;
let currentActivePath = '';

export default function _urlPathDBStore() {
 let getPreviousHistoryPath = () => UrlPathsHistory[--currentUrlPathsHistoryIndex];

 let getNextPathHistory = () => UrlPathsHistory[++currentUrlPathsHistoryIndex];

 let pushUrlPathHistory = (hashedUrlStr) => UrlPathsHistory.push(hashedUrlStr);

 let shiftUrlPathHistory = () => UrlPathsHistory.shift();
 let RemoveLastUrlPathHistory = () => UrlPathsHistory.splice(UrlPathsHistory.length - 1, 1);
 let getArrayPathsHistory = () => UrlPathsHistory;

 let getPathsArrayHistoryLength = () => UrlPathsHistory.length;

 let getCurrentUrlPathsHistoryIndex = () => currentUrlPathsHistoryIndex;
 let getLastUrlPathIndex = () => UrlPathsHistory.length - 1;
 let setCurrentUrlPathHistoryAsLastIndex = () => (currentUrlPathsHistoryIndex = UrlPathsHistory.length - 1);

 let IncreaseUrlPathHistoryIndex = () => currentUrlPathsHistoryIndex++;
 let DecreaseUrlPathHistoryIndex = () => currentUrlPathsHistoryIndex--;
 let ResetCurrentUrlPathHistoryIndex = () => (currentUrlPathsHistoryIndex = 0);

 let getLastUrlPathHistory = () => UrlPathsHistory[UrlPathsHistory.length - 1];

 let getCurrentActivePath = () => currentActivePath;
 let setCurrentActivePath = (urlPath) => (currentActivePath = urlPath);

 return {
  getPreviousHistoryPath,
  getNextPathHistory,
  pushUrlPathHistory,
  shiftUrlPathHistory,
  RemoveLastUrlPathHistory,
  getArrayPathsHistory,
  getPathsArrayHistoryLength,
  getCurrentUrlPathsHistoryIndex,
  IncreaseUrlPathHistoryIndex,
  DecreaseUrlPathHistoryIndex,
  ResetCurrentUrlPathHistoryIndex,
  getLastUrlPathIndex,
  setCurrentUrlPathHistoryAsLastIndex,
  getLastUrlPathHistory,
  getCurrentActivePath,
  setCurrentActivePath,
 };
}
