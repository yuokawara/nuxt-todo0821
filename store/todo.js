import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

// firestore DB定義
const db = firebase.firestore()
const todoRef = db.collection('todo')

// state定義 todo一覧を管理
export const state = () => ({
  todo: []
})

// actions定義 bindは関連付けされるの意味
export const actions = {
  // 初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todo', todoRef)
  }),

  // 追加 第一引数はcontext、第2引数はname
  add: firestoreAction((context, name) => {
    if(name.trim()) {
      todoRef.add({
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),

  // 削除
  remove: firestoreAction((context, id) => {
    todoRef.doc(id).delete()
  }),

  // checkbox操作時の処理 todoの完了、未完了を管理
  toggle: firestoreAction((context, todo) => {
    todoRef.doc(todo.id).update({
      // 反転
      done: !todo.done
    })
  })
}
