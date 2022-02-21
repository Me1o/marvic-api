const acl = require('acl');
const memoryBackend = new acl.memoryBackend();
const aclInstance = new acl(memoryBackend);
/**
 * @type {acl}
 */
module.exports = aclInstance;