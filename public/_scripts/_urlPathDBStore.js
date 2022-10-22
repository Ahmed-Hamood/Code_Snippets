let UrlPathsHistory = ['/']; // hashed paths
let currentUrlPathsHistoryIndex = 0;
let currentActivePath = ""
console.log("SSSSSSSSSSSSSS");

export default function _urlPathDBStore() {
 let getPreviousHistoryPath = () => UrlPathsHistory[--currentUrlPathsHistoryIndex];

 let getNextPathHistory = () => UrlPathsHistory[++currentUrlPathsHistoryIndex];

 let pushUrlPathHistory = (hashedUrlStr) => {
  UrlPathsHistory.push(hashedUrlStr);
  currentUrlPathsHistoryIndex = UrlPathsHistory.length - 1;
 };

 let shiftUrlPathHistory = () => {
  UrlPathsHistory.shift();
 };

 let getArrayPathsHistory = () => UrlPathsHistory;

 let getPathsArrayHistoryLength = () => UrlPathsHistory.length;

 let getCurrentUrlPathsHistoryIndex = () => currentUrlPathsHistoryIndex;
 let getLastUrlPathIndex = () => UrlPathsHistory.length - 1;

 let IncreaseUrlPathIndex = () => currentUrlPathsHistoryIndex++;
 let DecreaseUrlPathIndex = () => currentUrlPathsHistoryIndex--;
 let ResetCurrentUrlPathHistoryIndex = () => (currentUrlPathsHistoryIndex = 0);

 let getLastUrlPathHistory = () => UrlPathsHistory[UrlPathsHistory.length - 1];


 let getCurrentActivePath = () => currentActivePath
 let setCurrentActivePath = (urlPath) => currentActivePath = urlPath

 return {
  getPreviousHistoryPath,
  getNextPathHistory,
  pushUrlPathHistory,
  shiftUrlPathHistory,
  getArrayPathsHistory,
  getPathsArrayHistoryLength,
  getCurrentUrlPathsHistoryIndex,
  IncreaseUrlPathIndex,
  DecreaseUrlPathIndex,
  ResetCurrentUrlPathHistoryIndex,
  getLastUrlPathIndex,
  getLastUrlPathHistory,

  getCurrentActivePath,
  setCurrentActivePath
 };
}
