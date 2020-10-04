import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chat } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore) { }

  private temp: any;
  public currentUser: any = {};
  public chat: Chat = {
    chatId: '',
    messages: []
  }
  conversationId;

  createUser(uid, data) {
    return this.afs.doc('users/' + uid).set({
      uid: uid,
      name: data.name,
      email: data.email
    })
  }

  updateUser(id, data) {
    return this.afs.doc('users/' + id).update(data);
  }

  setCurrentUser(uid) {
    localStorage.setItem('uid', uid)
    this.afs.doc('users/' + uid).valueChanges().subscribe(resp => {
      this.temp = resp;
      this.currentUser = this.temp;
    }, err => { console.log('error', err) })
  }

  getCurrentUser() {
    return this.afs.doc('users/' + localStorage.getItem('uid')).valueChanges();
  }


  /* USERS */


  public getUsers() {
    return this.afs.collection<any>('users').snapshotChanges();
  }

  /* FINAL CODE */


  getChat(chatId) {
    return this.afs.collection('conversations', ref => ref.where('chatId', '==', chatId)).valueChanges()
  }

  refreshCurrentUser() {
    this.afs.collection('users/' + localStorage.getItem('uid')).valueChanges().subscribe(data => {
      this.temp = data;
      this.currentUser = this.temp;
    })
  }

  async addConvo(user) {
    //data to be added.
    let userMsg = { name: user.name, uid: user.uid, chatId: this.chat.chatId }
    let otherMsg = { name: this.currentUser.name, uid: this.currentUser.uid, chatId: this.chat.chatId }
    //first set both references.  
    let myReference = this.afs.doc('users/' + this.currentUser.uid);
    let otherReference = this.afs.doc('users/' + user.uid);
    // Updating my profile 
    myReference.get().subscribe(d => {
      let c = d.data()
      if (!c.conversations) {
        c.conversations = [];
      }
      c.conversations.push(userMsg);
      return myReference.update({ conversations: c.conversations })
    })
    // Updating Other User Profile
    otherReference.get().subscribe(d => {
      let c = d.data()
      if (!c.conversations) {
        c.conversations = [];
      }
      c.conversations.push(otherMsg);
      return otherReference.update({ conversations: c.conversations })
    })

  }

  addNewChat() {
    const chatId = this.afs.createId();
    return this.afs.doc('conversations/' + chatId).set({
      chatId: chatId,
      messages: []
    }).then(() => {
      this.chat = {
        chatId: chatId,
        messages: []
      }
    })
  }

  pushNewMessage(list) {
    return this.afs.doc('conversations/' + this.chat.chatId).update(
      { messages: list }
    )
  }

  clearData() {
    localStorage.clear();
    this.currentUser = {
      conversations: [],
      name: '',
      email: '',
      uid: ''
    }
    this.chat = null;
    this.temp = null;
  }


}
