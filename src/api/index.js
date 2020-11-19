/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import request from '@/utils/request'

export function fetchToken() {
    return new Promise((resolve, reject) => {
        request.get('https://api.weixin.qq.com/cgi-bin/token', {
            params: {
                grant_type: 'client_credential',
                appid: 'wx0254886385e4f4ae',
                secret: '5af956969ca1728dd53b0f32b6df4c13',
            },
        }).then(res => {
            console.log(res)
            const now = new Date()
            const item = {
                token: res.access_token,
                expiry: now.getTime() + res.expires_in * 1000,
            }
            resolve(JSON.stringify(item))
        }).catch(err => {
            reject(err)
        })
    })
}

export function getAllCourts() {
    return request.post('/databasequery', {
        query: "db.collection(\"courts\").get()"
    })
}

export function updateCourt(court) {
    const queryStr = "db.collection(\"courts\").doc(\"" + court._id + "\").update({data:{price:" + court.price + ",locked:" + court.locked + "}})"
    console.log(queryStr)
    return request.post('/databaseupdate', {
        query: queryStr
    })
}

export function getAllMembersCount() {
    return request.post('/databasecount', {
        query: "db.collection(\"members\").count()"
    })
}

export function echo(msg) {
    return request.post('echo', {
        info: msg,
    })
}