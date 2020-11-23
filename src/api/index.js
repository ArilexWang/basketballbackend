/* eslint-disable newline-per-chained-call */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import vue from '../main.js'

const db = vue.$app.database()
export function getDatas(data) {
    return new Promise((resolve, reject) => {
        db.collection(data).get().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function updateInfo(info, collection) {
    const id = info._id
    delete info._id
    return new Promise((resolve, reject) => {
        db.collection(collection).doc(id).update(info).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function deleteInfo(info, collection) {
    return new Promise((resolve, reject) => {
        db.collection(collection).doc(info._id).remove().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function addInfo(info, collection) {
    return new Promise((resolve, reject) => {
        db.collection(collection).add(info).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}


export function getCollectionCount(collection) {
    return new Promise((resolve, reject) => {
        db.collection(collection).count().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function getCollectionsByPage(collection, page, limit) {
    return new Promise((resolve, reject) => {
        db.collection(collection).limit(limit).skip(page).get().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}