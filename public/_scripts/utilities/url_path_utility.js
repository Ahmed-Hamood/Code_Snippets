export function ConvertPathFromSlashToHashes(LocationUrlLink) {
 return GetLocationPathPart(LocationUrlLink).replaceAll(/\//g, '#');
}

export function ConvertPathFromHashToSlash(LocationUrlLink) {
 return GetLocationHashPart(LocationUrlLink).replaceAll(/\#/g, '/');
}

export function GetLocationPathPart(fullUrlLink) {
 const url = new URL(fullUrlLink);
 return url.pathname;
}

export function GetLocationHashPart(fullUrlLink) {
 const url = new URL(fullUrlLink);
 return url.hash;
}
