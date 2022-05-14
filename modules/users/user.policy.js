/**
 *
 * @namespace User.Policy
 * @memberof! User
 */

/**
 * Access policy controller
 * @param {Object} acl - ACL constructur object
 * @memberof PreRelease.Policy
 * @method
 */
module.exports.invokeRolesPolicies = (acl) => {
  acl.allow([{
    roles: ['admin'],
    allows: [
      { resources: 'users/get-current-user', permissions: 'get' },
    ]
  }]);
};