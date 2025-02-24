/**
 * @param {string} path
 * @returns {RegExp}
 */
export const parsingURL = path => {
    const routeParams = /:(\w+)/g
    const replacedPath = path.replaceAll(routeParams, '(?<$1>[a-z0-9\\-]+)')
    return new RegExp(`^${replacedPath}$`)
}