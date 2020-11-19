import { resetRouter } from '@/router'

export function resetTokenAndClearUser() {
    // 退出登陆 清除用户资料
    localStorage.setItem('token', '')
    localStorage.setItem('userImg', '')
    localStorage.setItem('userName', '')
    // 重设路由
    resetRouter()
}

export const defaultDocumentTitle = 'vue-admin-template'
export function getDocumentTitle(pageTitle) {
    if (pageTitle) return `${defaultDocumentTitle} - ${pageTitle}`
    return `${defaultDocumentTitle}`
}

export function getTokenWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
        return null
    }
    return item.token
}