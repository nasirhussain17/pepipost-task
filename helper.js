function cleanUrl(url) {
    // ensure that the urls are absolute
    const re = /^https?:\/\/[^/]+/;
    const match = url.match(re);
    if (match === null) {
        return null;
    }

    // remove redundant forward slashes
    const protocol = match[0];
    let queryUrl = url.substring(protocol.length);
    queryUrl = queryUrl.replace(/\/\/+/, '/');
    const result = protocol + queryUrl;
    return result;
}
function jsonSerialize(data) {
  return JSON.stringify(data);
}

module.exports ={cleanUrl,jsonSerialize}