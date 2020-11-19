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

export function getDatas(data) {
    return request.post('/databasequery', {
        query: "db.collection(\"" + data + "\").get()"
    })
}

export function updateInfo(info, collection) {
    const id = info._id
    delete info._id
    const data = { data: info }
    const queryStr = "db.collection(\"" + collection + "\").doc(\"" + id + "\").update(" + JSON.stringify(data) + ")"
    return request.post('/databaseupdate', {
        query: queryStr
    })
}

export function deleteInfo(info, collection) {
    const queryStr = "db.collection(\"" + collection + "\").doc(\"" + info._id + "\").remove()"
    console.log(queryStr)
    return request.post('/databasedelete', {
        query: queryStr
    })
}

export function addInfo(info, collection) {
    const data = { data: info }
    const queryStr = "db.collection(\"" + collection + "\").add(" + JSON.stringify(data) + ")"
    return request.post('/databaseadd', {
        query: queryStr
    })
}


export function getCollectionCount(collection) {
    return request.post('/databasecount', {
        query: "db.collection(\"" + collection + "\").count()"
    })
}

export function getCollectionsByPage(collection, page, limit) {
    return request.post('/databasequery', {
        query: "db.collection(\"" + collection + "\").limit(" + limit + ").skip(" + page + ").get()"
    })
}

export function echo(msg) {
    return request.post('echo', {
        info: msg,
    })
}